import { cheatBotAction } from "./cheatBot.js";
import * as ort from "onnxruntime-web";

let ortConfigured = false;

function configureOrtRuntime() {
  if (ortConfigured) {
    return;
  }

  ort.env.wasm.wasmPaths = "https://cdn.jsdelivr.net/npm/onnxruntime-web@1.21.0/dist/";
  ort.env.wasm.numThreads = 1;

  ortConfigured = true;
}

export class BotManager {
  constructor(config) {
    this.config = config;
    this.modelSession = null;
    this.decisionTreeModel = null;
    this.ort = ort;
    this.sequenceLength = 1;
    this.featureSize = 1;
    this.leftSequence = [];
    this.rightSequence = [];
    this.labelByIndex = ["up", "down", "stay"];
    this.lastLeftAction = "stay";
    this.lastRightAction = "stay";
    this.leftBusy = false;
    this.rightBusy = false;
    this.inputName = "input";
    this.outputName = "logits";
    this.lastInferenceError = "";
    this.lastInferenceInfo = "";
    this.modelKind = "none";
  }

  hasUsableBot() {
    if (this.modelSession || this.decisionTreeModel) {
      return true;
    }
    return this.config.enableCheatBot;
  }

  async loadOnnxModelFromUrl(modelUrl) {
    configureOrtRuntime();
    this.modelSession = await this.ort.InferenceSession.create(modelUrl);
    this.decisionTreeModel = null;
    this.modelKind = "onnx";
    this.#syncInputShapeFromModel();
    this.#resetSequences();
    return true;
  }

  async loadOnnxModelFromFile(file) {
    const bytes = await file.arrayBuffer();
    configureOrtRuntime();
    this.modelSession = await this.ort.InferenceSession.create(bytes);
    this.decisionTreeModel = null;
    this.modelKind = "onnx";
    this.#syncInputShapeFromModel();
    this.#resetSequences();
    return true;
  }

  async loadDecisionTreeFromFile(file) {
    const content = await file.text();
    const parsed = JSON.parse(content);

    if (!parsed || parsed.model_type !== "decision_tree") {
      throw new Error("Invalid decision tree model JSON");
    }

    this.decisionTreeModel = parsed;
    this.modelSession = null;
    this.modelKind = "decision_tree";

    const seq = Number(parsed.input?.sequence_length ?? 1);
    const feat = Number(parsed.input?.feature_size ?? 1);
    this.sequenceLength = Number.isFinite(seq) && seq > 0 ? seq : 1;
    this.featureSize = Number.isFinite(feat) && feat > 0 ? feat : 1;

    if (parsed.label_by_index) {
      const mapped = [];
      for (const key of Object.keys(parsed.label_by_index)) {
        mapped[Number(key)] = parsed.label_by_index[key];
      }
      this.labelByIndex = mapped;
    }

    this.lastInferenceInfo = `decision-tree shape=[1,${this.sequenceLength},${this.featureSize}]`;
    this.lastInferenceError = "";
    this.#resetSequences();
    return true;
  }

  getDebugInfo() {
    return {
      modelKind: this.modelKind,
      inputName: this.inputName,
      outputName: this.outputName,
      sequenceLength: this.sequenceLength,
      featureSize: this.featureSize,
      lastInferenceError: this.lastInferenceError,
      lastInferenceInfo: this.lastInferenceInfo,
      lastLeftAction: this.lastLeftAction,
      lastRightAction: this.lastRightAction,
    };
  }

  async runSanityCheck() {
    const probes = [-120, -20, 0, 20, 120];
    const outputs = [];

    if (this.decisionTreeModel) {
      for (const delta of probes) {
        const flat = [delta];
        const cls = evaluateDecisionTree(this.decisionTreeModel, flat);
        outputs.push({ deltaY: delta, action: this.labelByIndex[cls] ?? "stay", classIndex: cls });
      }
      return { modelKind: "decision_tree", outputs };
    }

    if (this.modelSession && this.ort) {
      for (const delta of probes) {
        const feature = this.featureSize === 1
          ? [delta]
          : [0, 0, 480, 270 + delta, 0, 0].slice(0, this.featureSize);

        const seq = [];
        for (let i = 0; i < this.sequenceLength; i += 1) {
          seq.push(feature);
        }

        const flat = Float32Array.from(seq.flat());
        const inputTensor = new this.ort.Tensor("float32", flat, [1, this.sequenceLength, this.featureSize]);
        const out = await this.modelSession.run({ [this.inputName]: inputTensor });

        const preferred = out[this.outputName]?.data;
        const fallbackKey = Object.keys(out)[0];
        const fallback = fallbackKey ? out[fallbackKey]?.data : null;
        const logits = preferred ?? fallback ?? [];

        let maxIdx = 0;
        for (let i = 1; i < logits.length; i += 1) {
          if (logits[i] > logits[maxIdx]) {
            maxIdx = i;
          }
        }

        outputs.push({ deltaY: delta, action: this.labelByIndex[maxIdx] ?? "stay", classIndex: maxIdx });
      }
      return { modelKind: "onnx", outputs };
    }

    return { modelKind: "none", outputs: [] };
  }

  predictRightAction(state) {
    if (this.modelSession || this.decisionTreeModel) {
      return this.#predictWithModel(state, "right");
    }
    if (this.config.enableCheatBot) {
      return cheatBotAction("right", state);
    }
    return "stay";
  }

  predictLeftAction(state) {
    if (this.modelSession || this.decisionTreeModel) {
      return this.#predictWithModel(state, "left");
    }
    if (this.config.enableCheatBot) {
      return cheatBotAction("left", state);
    }
    return "stay";
  }

  #predictWithModel(state, side) {
    if (this.decisionTreeModel) {
      return this.#predictWithDecisionTree(state, side);
    }

    if (!this.modelSession || !this.ort) {
      return "stay";
    }

    try {
      const feature = this.#stateToFeature(state, side);
      const sequence = side === "left" ? this.leftSequence : this.rightSequence;
      sequence.push(feature);
      if (sequence.length > this.sequenceLength) {
        sequence.shift();
      }

      if (sequence.length < this.sequenceLength) {
        return "stay";
      }

      const isBusy = side === "left" ? this.leftBusy : this.rightBusy;
      const lastAction = side === "left" ? this.lastLeftAction : this.lastRightAction;
      if (isBusy) {
        return lastAction;
      }

      if (side === "left") {
        this.leftBusy = true;
      } else {
        this.rightBusy = true;
      }

      const flat = Float32Array.from(sequence.flat());
      const inputTensor = new this.ort.Tensor("float32", flat, [1, this.sequenceLength, this.featureSize]);
      this.modelSession
        .run({ [this.inputName]: inputTensor })
        .then((out) => {
          const preferred = out[this.outputName]?.data;
          const fallbackKey = Object.keys(out)[0];
          const fallback = fallbackKey ? out[fallbackKey]?.data : null;
          const logits = preferred ?? fallback;
          if (!logits || logits.length === 0) {
            this.lastInferenceError = "Model output kosong";
            return;
          }

          let maxIdx = 0;
          for (let i = 1; i < logits.length; i += 1) {
            if (logits[i] > logits[maxIdx]) {
              maxIdx = i;
            }
          }
          const nextAction = this.labelByIndex[maxIdx] ?? "stay";
          this.lastInferenceError = "";
          this.lastInferenceInfo = `output=${this.outputName} len=${logits.length}`;
          if (side === "left") {
            this.lastLeftAction = nextAction;
          } else {
            this.lastRightAction = nextAction;
          }
        })
        .catch((error) => {
          const message = String(error);
          this.lastInferenceError = message;

          const fixed = this.#applyDimensionHintFromError(message);
          if (fixed) {
            // Keep current action now; next frame will use updated dimensions.
            this.lastInferenceInfo = `dimension auto-fix -> shape=[1,${this.sequenceLength},${this.featureSize}]`;
          }
          // Keep last action on inference failure.
        })
        .finally(() => {
          if (side === "left") {
            this.leftBusy = false;
          } else {
            this.rightBusy = false;
          }
        });

      return lastAction;
    } catch {
      return "stay";
    }
  }

  #stateToFeature(state, side) {
    const own = side === "left" ? state.leftPaddle : state.rightPaddle;
    const opp = side === "left" ? state.rightPaddle : state.leftPaddle;

    if (this.featureSize === 1) {
      const ownCenterY = own.y + (this.config.paddleHeight / 2);
      return [state.ball.y - ownCenterY];
    }

    return [
      own.y,
      opp.y,
      state.ball.x,
      state.ball.y,
      state.ball.vx,
      state.ball.vy
    ];
  }

  #predictWithDecisionTree(state, side) {
    const feature = this.#stateToFeature(state, side);
    const sequence = side === "left" ? this.leftSequence : this.rightSequence;
    sequence.push(feature);
    if (sequence.length > this.sequenceLength) {
      sequence.shift();
    }
    if (sequence.length < this.sequenceLength) {
      return "stay";
    }

    try {
      const flat = sequence.flat();
      const classIndex = evaluateDecisionTree(this.decisionTreeModel, flat);
      const action = this.labelByIndex[classIndex] ?? "stay";
      this.lastInferenceError = "";
      this.lastInferenceInfo = `decision-tree class=${classIndex} action=${action}`;
      if (side === "left") {
        this.lastLeftAction = action;
      } else {
        this.lastRightAction = action;
      }
      return action;
    } catch (error) {
      this.lastInferenceError = String(error);
      return side === "left" ? this.lastLeftAction : this.lastRightAction;
    }
  }

  #resetSequences() {
    this.leftSequence = [];
    this.rightSequence = [];
    this.leftBusy = false;
    this.rightBusy = false;
    this.lastLeftAction = "stay";
    this.lastRightAction = "stay";
  }

  #syncInputShapeFromModel() {
    if (!this.modelSession) {
      return;
    }

    this.inputName = this.modelSession.inputNames?.[0] ?? "input";
    this.outputName = this.modelSession.outputNames?.[0] ?? "logits";

    const metadata = this.modelSession.inputMetadata?.[this.inputName];
    const dims = metadata?.dimensions ?? [];

    if (dims.length === 3) {
      const seq = normalizeDimValue(dims[1]);
      const feat = normalizeDimValue(dims[2]);
      if (seq !== null) {
        this.sequenceLength = seq;
      }
      if (feat !== null) {
        this.featureSize = feat;
      }
    }

    this.lastInferenceInfo = `input=${this.inputName} output=${this.outputName} shape=[1,${this.sequenceLength},${this.featureSize}]`;
  }

  #applyDimensionHintFromError(message) {
    const seqMatch = message.match(/index:\s*1\s*Got:\s*\d+\s*Expected:\s*(\d+)/i);
    const featMatch = message.match(/index:\s*2\s*Got:\s*\d+\s*Expected:\s*(\d+)/i);

    let changed = false;
    if (seqMatch) {
      const seq = Number.parseInt(seqMatch[1], 10);
      if (Number.isFinite(seq) && seq > 0 && seq !== this.sequenceLength) {
        this.sequenceLength = seq;
        changed = true;
      }
    }
    if (featMatch) {
      const feat = Number.parseInt(featMatch[1], 10);
      if (Number.isFinite(feat) && feat > 0 && feat !== this.featureSize) {
        this.featureSize = feat;
        changed = true;
      }
    }

    if (changed) {
      this.#resetSequences();
    }

    return changed;
  }
}

function evaluateDecisionTree(model, flatFeatures) {
  const tree = model.tree;
  const childrenLeft = tree.children_left;
  const childrenRight = tree.children_right;
  const feature = tree.feature;
  const threshold = tree.threshold;
  const value = tree.value;
  const classes = model.classes;

  let node = 0;
  while (childrenLeft[node] !== -1 && childrenRight[node] !== -1) {
    const featureIndex = feature[node];
    const compare = flatFeatures[featureIndex] ?? 0;
    node = compare <= threshold[node] ? childrenLeft[node] : childrenRight[node];
  }

  const leafValues = value[node];
  let maxPos = 0;
  for (let i = 1; i < leafValues.length; i += 1) {
    if (leafValues[i] > leafValues[maxPos]) {
      maxPos = i;
    }
  }

  const classIdx = classes[maxPos];
  return Number(classIdx);
}

function normalizeDimValue(dim) {
  if (typeof dim === "number") {
    return Number.isFinite(dim) && dim > 0 ? dim : null;
  }
  if (typeof dim === "bigint") {
    return dim > 0n ? Number(dim) : null;
  }
  if (typeof dim === "string") {
    const parsed = Number.parseInt(dim, 10);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
  }
  return null;
}

import "./styles.css";
import { gameConfig, modelConfig } from "./config/gameConfig.js";
import { GameLoop } from "./core/gameLoop.js";
import { KeyboardInput } from "./input/keyboard.js";
import { createPvpController } from "./modes/pvpMode.js";
import { createPveController } from "./modes/pveMode.js";
import { createBvbController } from "./modes/bvbMode.js";
import { BotManager } from "./bot/botManager.js";
import { MatchRecorder } from "./data/recorder.js";
import { ReplayStore, renderReplayFrame } from "./data/replay.js";
import {
  bindButtons,
  getSelectedModelFile,
  getSelectedReplayDeleteId,
  getSelectedReplayId,
  renderReplayOptions,
  setStatus
} from "./ui/menu.js";
import { drawScene } from "./ui/hud.js";

const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");
const modelLogEl = document.getElementById("model-log");

const keyboard = new KeyboardInput();
const botManager = new BotManager(gameConfig);
const replayStore = new ReplayStore(modelConfig.replayHistoryKey, gameConfig.maxReplayHistory);

let activeLoop = null;
let activeRecorder = null;
let activeMode = "idle";
let lastCompletedMode = "pvp";
let activeReplayTimer = null;
let activeReplayId = null;

const LOG_EVERY_N_FRAMES = 3;
const MAX_LOG_LINES = 200;
const DEBUG_LOG_EVERY_N_FRAMES = 30;

function boot() {
  renderReplayOptions(replayStore.loadAll());
  drawIdle();
  clearModelLog();
  appendModelLog("[init] log siap. jalankan PVE/BVB untuk melihat output model.");
  bindButtons({
    onPvp: () => startMatch("pvp"),
    onPve: () => startMatch("pve"),
    onBvb: () => startMatch("bvb"),
    onStop: stopMatch,
    onReplayLast: replayLast,
    onReplaySelected: replaySelected,
    onStopReplay: stopReplay,
    onDeleteReplay: deleteSelectedReplay,
    onExportCsv: exportLastCsv,
    onTrainGuide: showTrainGuide,
    onLoadModel: loadModelFromFile
  });
}

function startMatch(mode) {
  if (mode !== "pvp" && !botManager.hasUsableBot()) {
    setStatus("Model bot belum tersedia. Kumpulkan data PVP lalu train model.", true);
    return;
  }

  stopReplay();
  stopMatch();

  activeMode = mode;
  activeRecorder = new MatchRecorder(mode);
  clearModelLog();
  appendModelLog(`[match] mode=${mode}`);

  const controller = buildController(mode);
  activeLoop = new GameLoop(gameConfig, controller, {
    onRender: (state) => drawScene(ctx, state, gameConfig, getLabels(mode)),
    onFrame: (state, actions, frameIdx) => {
      activeRecorder.record(frameIdx, performance.now(), state, actions, getPlayerIds(mode));
      logModelOutput(mode, frameIdx, actions);
    },
    onMatchEnd: (state) => {
      finalizeMatch();
      setStatus(`Match selesai. Skor ${state.leftScore}-${state.rightScore}`);
    }
  });

  setStatus(`Match dimulai (${mode.toUpperCase()})`);
  activeLoop.start();
}

function stopMatch() {
  if (!activeLoop) {
    return;
  }

  activeLoop.stop();
  finalizeMatch();
  setStatus("Match dihentikan");
  activeMode = "idle";
}

function finalizeMatch() {
  if (!activeRecorder) {
    return;
  }

  lastCompletedMode = activeMode;

  const csv = activeRecorder.toCsv();
  localStorage.setItem(modelConfig.lastCsvKey, csv);

  const replayPayload = activeRecorder.toReplayPayload();
  const list = replayStore.save(replayPayload);
  renderReplayOptions(list);

  activeRecorder = null;
  activeLoop = null;
}

function replayLast() {
  const latest = replayStore.latest();
  if (!latest) {
    setStatus("Belum ada replay.", true);
    return;
  }
  playbackReplay(latest);
}

function replaySelected() {
  const selectedId = getSelectedReplayId();
  if (!selectedId) {
    setStatus("Pilih replay dulu.", true);
    return;
  }

  const replay = replayStore.byId(selectedId);
  if (!replay) {
    setStatus("Replay tidak ditemukan.", true);
    return;
  }

  playbackReplay(replay);
}

function playbackReplay(replayPayload) {
  stopReplay();
  stopMatch();
  clearModelLog();
  appendModelLog(`[replay] id=${replayPayload.id} mode=${replayPayload.mode}`);
  setStatus(`Replay ${replayPayload.id} dimulai`);
  activeReplayId = replayPayload.id;

  let idx = 0;
  const labels = getLabels(replayPayload.mode);

  activeReplayTimer = setInterval(() => {
    if (idx >= replayPayload.frames.length) {
      stopReplay(false);
      setStatus(`Replay ${replayPayload.id} selesai`);
      return;
    }

    const row = replayPayload.frames[idx];
    const frame = renderReplayFrame(row);
    drawScene(
      ctx,
      {
        leftPaddle: { x: gameConfig.paddleInset, y: frame.leftPaddle.y },
        rightPaddle: { x: gameConfig.width - gameConfig.paddleInset - gameConfig.paddleWidth, y: frame.rightPaddle.y },
        ball: { x: frame.ball.x, y: frame.ball.y },
        leftScore: frame.leftScore,
        rightScore: frame.rightScore
      },
      gameConfig,
      labels
    );

    idx += 1;
  }, Math.round(1000 / gameConfig.replayFps));
}

function stopReplay(showStatus = true) {
  if (!activeReplayTimer) {
    return;
  }

  clearInterval(activeReplayTimer);
  activeReplayTimer = null;
  if (showStatus) {
    setStatus(`Replay ${activeReplayId ?? ""} dihentikan`);
    appendModelLog("[replay] stopped");
  }
  activeReplayId = null;
}

function deleteSelectedReplay() {
  const replayId = getSelectedReplayDeleteId();
  if (!replayId) {
    setStatus("Pilih replay yang mau dihapus.", true);
    return;
  }

  if (activeReplayId === replayId) {
    stopReplay(false);
  }

  const next = replayStore.deleteById(replayId);
  renderReplayOptions(next);
  setStatus(`Replay ${replayId} dihapus`);
}

function exportLastCsv() {
  const csv = localStorage.getItem(modelConfig.lastCsvKey);
  if (!csv) {
    setStatus("Belum ada data match untuk diexport.", true);
    return;
  }

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  const stamp = new Date().toISOString().replaceAll(":", "-");
  link.href = url;
  link.download = `match_${lastCompletedMode}_${stamp}.csv`;
  link.click();
  URL.revokeObjectURL(url);

  setStatus("CSV berhasil diexport");
}

function showTrainGuide() {
  const hint = "Buka folder train/, jalankan scripts/run_train.ps1 untuk training. Detail: docs/training_spec.md";
  setStatus(hint);
}

async function loadModelFromFile() {
  const file = getSelectedModelFile();
  if (!file) {
    setStatus("Pilih file model (.onnx atau .json) dulu.", true);
    return;
  }

  try {
    const lower = file.name.toLowerCase();
    if (lower.endsWith(".onnx")) {
      await botManager.loadOnnxModelFromFile(file);
    } else if (lower.endsWith(".json")) {
      await botManager.loadDecisionTreeFromFile(file);
    } else {
      throw new Error("Unsupported model file. Gunakan .onnx atau .json");
    }

    const debug = botManager.getDebugInfo();
    appendModelLog(
      `[model] loaded kind=${debug.modelKind} input=${debug.inputName} output=${debug.outputName} shape=[1,${debug.sequenceLength},${debug.featureSize}]`
    );

    const sanity = await botManager.runSanityCheck();
    appendModelLog(`[model] sanity-check kind=${sanity.modelKind}`);
    for (const row of sanity.outputs) {
      appendModelLog(`[sanity] deltaY=${row.deltaY} -> ${row.action} (class=${row.classIndex})`);
    }

    setStatus(`Model loaded: ${file.name}`);
  } catch (error) {
    const message = String(error);
    if (message.toLowerCase().includes("no available backend") || message.toLowerCase().includes("initwasm")) {
      setStatus("Gagal load model ONNX: backend WASM gagal init. Cek koneksi internet lalu reload halaman.", true);
      return;
    }
    setStatus(`Gagal load model: ${message}`, true);
  }
}

function getLabels(mode) {
  if (mode === "pvp") {
    return { left: "P1", right: "P2" };
  }
  if (mode === "pve") {
    return { left: "Player", right: "Bot" };
  }
  return { left: "Bot-L", right: "Bot-R" };
}

function getPlayerIds(mode) {
  if (mode === "pvp") {
    return { left: "player_1", right: "player_2" };
  }
  if (mode === "pve") {
    return { left: "player_1", right: "bot_001" };
  }
  return { left: "bot_001", right: "bot_002" };
}

function buildController(mode) {
  if (mode === "pvp") {
    return createPvpController(keyboard);
  }
  if (mode === "pve") {
    return createPveController(keyboard, botManager);
  }
  return createBvbController(botManager);
}

function drawIdle() {
  drawScene(
    ctx,
    {
      leftPaddle: {
        x: gameConfig.paddleInset,
        y: gameConfig.height / 2 - gameConfig.paddleHeight / 2
      },
      rightPaddle: {
        x: gameConfig.width - gameConfig.paddleInset - gameConfig.paddleWidth,
        y: gameConfig.height / 2 - gameConfig.paddleHeight / 2
      },
      ball: {
        x: gameConfig.width / 2,
        y: gameConfig.height / 2
      },
      leftScore: 0,
      rightScore: 0
    },
    gameConfig,
    { left: "P1", right: "P2" }
  );
}

function logModelOutput(mode, frameIdx, actions) {
  if (mode === "pvp") {
    return;
  }
  if (frameIdx % LOG_EVERY_N_FRAMES !== 0) {
    return;
  }

  const timeSec = (frameIdx * gameConfig.fixedDeltaTime).toFixed(2);
  if (mode === "pve") {
    appendModelLog(`[f=${frameIdx} | t=${timeSec}s] bot(right) -> ${actions.right}`);
    maybeLogBotDebug(frameIdx);
    return;
  }
  appendModelLog(`[f=${frameIdx} | t=${timeSec}s] bot(left) -> ${actions.left}, bot(right) -> ${actions.right}`);
  maybeLogBotDebug(frameIdx);
}

function maybeLogBotDebug(frameIdx) {
  if (frameIdx % DEBUG_LOG_EVERY_N_FRAMES !== 0) {
    return;
  }

  const debug = botManager.getDebugInfo();
  if (debug.lastInferenceError) {
    appendModelLog(`[debug] inference-error: ${debug.lastInferenceError}`);
    return;
  }
  if (debug.lastInferenceInfo) {
    appendModelLog(`[debug] ${debug.lastInferenceInfo}`);
  }
}

function appendModelLog(text) {
  const line = document.createElement("div");
  line.textContent = text;
  modelLogEl.appendChild(line);

  while (modelLogEl.childElementCount > MAX_LOG_LINES) {
    modelLogEl.removeChild(modelLogEl.firstChild);
  }

  modelLogEl.scrollTop = modelLogEl.scrollHeight;
}

function clearModelLog() {
  modelLogEl.innerHTML = "";
}

boot();

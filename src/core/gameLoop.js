import { checkScore, resetBall, updateBallPhysics, updatePaddlePhysics } from "./physics.js";

export class GameLoop {
  constructor(config, controller, callbacks = {}) {
    this.config = config;
    this.controller = controller;
    this.callbacks = callbacks;
    this.running = false;
    this.accumulator = 0;
    this.lastTime = 0;
    this.frameIndex = 0;
    this.state = createInitialState(config);
  }

  start() {
    if (this.running) {
      return;
    }
    this.running = true;
    this.lastTime = performance.now();
    this.accumulator = 0;
    this.frameIndex = 0;
    this.rafId = requestAnimationFrame(this.#tick);
  }

  stop() {
    this.running = false;
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
    }
  }

  #tick = (now) => {
    if (!this.running) {
      return;
    }

    const elapsedSec = (now - this.lastTime) / 1000;
    this.lastTime = now;
    this.accumulator += Math.min(elapsedSec, 0.05);

    while (this.accumulator >= this.config.fixedDeltaTime) {
      this.#step(this.config.fixedDeltaTime);
      this.accumulator -= this.config.fixedDeltaTime;
    }

    this.callbacks.onRender?.(this.state);
    this.rafId = requestAnimationFrame(this.#tick);
  };

  #step(dt) {
    const actions = this.controller(this.snapshot());

    updatePaddlePhysics(this.state.leftPaddle, actions.left, this.config, dt);
    updatePaddlePhysics(this.state.rightPaddle, actions.right, this.config, dt);
    updateBallPhysics(this.state, this.config, dt);

    const scorer = checkScore(this.state, this.config);
    if (scorer && (this.state.leftScore >= this.config.scoreLimit || this.state.rightScore >= this.config.scoreLimit)) {
      this.callbacks.onFrame?.(this.snapshot(), actions, this.frameIndex);
      this.callbacks.onMatchEnd?.(this.snapshot(), scorer);
      this.stop();
      return;
    }

    this.callbacks.onFrame?.(this.snapshot(), actions, this.frameIndex);
    this.frameIndex += 1;
  }

  snapshot() {
    return structuredClone(this.state);
  }

  reset(direction) {
    this.state = createInitialState(this.config);
    resetBall(this.state, this.config, direction);
    this.frameIndex = 0;
  }
}

function createInitialState(config) {
  const state = {
    leftPaddle: {
      x: config.paddleInset,
      y: config.height / 2 - config.paddleHeight / 2,
      vy: 0,
      lastAction: "stay"
    },
    rightPaddle: {
      x: config.width - config.paddleInset - config.paddleWidth,
      y: config.height / 2 - config.paddleHeight / 2,
      vy: 0,
      lastAction: "stay"
    },
    ball: {
      x: config.width / 2,
      y: config.height / 2,
      vx: config.ballSpeedInitialPxPerSec,
      vy: 0,
      speed: config.ballSpeedInitialPxPerSec
    },
    leftScore: 0,
    rightScore: 0
  };

  return state;
}

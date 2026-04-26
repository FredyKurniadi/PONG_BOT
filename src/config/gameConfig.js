export const gameConfig = {
  width: 960,
  height: 540,
  paddleWidth: 14,
  paddleHeight: 96,
  paddleInset: 24,
  paddleSpeedInitialPxPerSec: 120,
  paddleSpeedMaxPxPerSec: 460,
  paddleAccelerationPxPerSec2: 920,
  paddleDecelerationPxPerSec2: 700,
  paddleDirectionChangeDecelerationPxPerSec2: 1300,
  ballRadius: 10,
  ballSpeedInitialPxPerSec: 280,
  ballSpeedMaxPxPerSec: 700,
  ballSpeedIncreasePerPaddleHit: 20,
  maxBounceAngleDeg: 65,
  fixedDeltaTime: 1 / 60,
  scoreLimit: 5,
  replayFps: 60,
  enableCheatBot: false,
  maxReplayHistory: 20
};

export const modelConfig = {
  actionLabels: ["up", "down", "stay"],
  modelMetadataKey: "pong:onnx:model:metadata",
  replayHistoryKey: "pong:replays",
  lastCsvKey: "pong:last-csv",
  trainingDocPath: "../docs/training_spec.md"
};

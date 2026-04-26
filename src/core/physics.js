import { clamp, circleIntersectsRect } from "./collision.js";

const DEG_TO_RAD = Math.PI / 180;

export function updatePaddlePhysics(paddle, action, config, dt) {
  const previousVelocity = paddle.vy;
  const previousAction = paddle.lastAction ?? "stay";
  let nextVelocity = previousVelocity;

  if (action === "stay") {
    nextVelocity = 0;
  } else {
    const isDirectionSwitch =
      (previousAction === "up" && action === "down") ||
      (previousAction === "down" && action === "up");

    if (isDirectionSwitch) {
      nextVelocity = 0;
    }

    const direction = action === "up" ? -1 : 1;
    nextVelocity += direction * config.paddleAccelerationPxPerSec2 * dt;
  }

  nextVelocity = clamp(
    nextVelocity,
    -config.paddleSpeedMaxPxPerSec,
    config.paddleSpeedMaxPxPerSec
  );

  paddle.vy = nextVelocity;
  paddle.y += paddle.vy * dt;
  paddle.y = clamp(paddle.y, 0, config.height - config.paddleHeight);
  paddle.lastAction = action;
}

export function updateBallPhysics(state, config, dt) {
  const { ball } = state;
  ball.x += ball.vx * dt;
  ball.y += ball.vy * dt;

  if (ball.y - config.ballRadius <= 0) {
    ball.y = config.ballRadius;
    ball.vy *= -1;
  }

  if (ball.y + config.ballRadius >= config.height) {
    ball.y = config.height - config.ballRadius;
    ball.vy *= -1;
  }

  const leftRect = state.leftPaddle;
  const rightRect = state.rightPaddle;

  if (ball.vx < 0 && circleIntersectsRect(ball.x, ball.y, config.ballRadius, toRect(leftRect, config))) {
    applyPaddleBounce(ball, leftRect, config, +1);
  } else if (ball.vx > 0 && circleIntersectsRect(ball.x, ball.y, config.ballRadius, toRect(rightRect, config))) {
    applyPaddleBounce(ball, rightRect, config, -1);
  }
}

export function checkScore(state, config) {
  if (state.ball.x + config.ballRadius < 0) {
    state.rightScore += 1;
    resetBall(state, config, -1);
    return "right";
  }
  if (state.ball.x - config.ballRadius > config.width) {
    state.leftScore += 1;
    resetBall(state, config, +1);
    return "left";
  }
  return null;
}

export function resetBall(state, config, direction = Math.random() > 0.5 ? 1 : -1) {
  state.ball.x = config.width / 2;
  state.ball.y = config.height / 2;
  state.ball.speed = config.ballSpeedInitialPxPerSec;
  state.ball.vx = config.ballSpeedInitialPxPerSec * direction;
  state.ball.vy = 0;
}

function toRect(paddle, config) {
  return {
    x: paddle.x,
    y: paddle.y,
    width: config.paddleWidth,
    height: config.paddleHeight
  };
}

function applyPaddleBounce(ball, paddle, config, directionX) {
  const paddleCenterY = paddle.y + config.paddleHeight / 2;
  const offsetNorm = (ball.y - paddleCenterY) / (config.paddleHeight / 2);
  const clampedOffset = clamp(offsetNorm, -1, 1);
  const bounceAngle = clampedOffset * config.maxBounceAngleDeg * DEG_TO_RAD;

  ball.speed = Math.min(
    (ball.speed ?? config.ballSpeedInitialPxPerSec) + config.ballSpeedIncreasePerPaddleHit,
    config.ballSpeedMaxPxPerSec
  );

  ball.vx = Math.cos(bounceAngle) * ball.speed * directionX;
  ball.vy = Math.sin(bounceAngle) * ball.speed;

  if (directionX > 0) {
    ball.x = paddle.x + config.paddleWidth + config.ballRadius;
  } else {
    ball.x = paddle.x - config.ballRadius;
  }
}


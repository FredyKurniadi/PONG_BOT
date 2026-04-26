export function drawScene(ctx, state, config, labels = { left: "P1", right: "P2" }) {
  ctx.clearRect(0, 0, config.width, config.height);

  ctx.fillStyle = "#121914";
  ctx.fillRect(0, 0, config.width, config.height);

  ctx.fillStyle = "#edf7ef";
  drawCenterLine(ctx, config);

  ctx.fillRect(state.leftPaddle.x, state.leftPaddle.y, config.paddleWidth, config.paddleHeight);
  ctx.fillRect(state.rightPaddle.x, state.rightPaddle.y, config.paddleWidth, config.paddleHeight);

  ctx.beginPath();
  ctx.arc(state.ball.x, state.ball.y, config.ballRadius, 0, Math.PI * 2);
  ctx.fill();

  ctx.font = "700 28px Segoe UI";
  ctx.fillText(`${labels.left}: ${state.leftScore}`, 32, 42);
  ctx.fillText(`${labels.right}: ${state.rightScore}`, config.width - 170, 42);
}

function drawCenterLine(ctx, config) {
  const segmentHeight = 16;
  const gap = 12;
  const x = config.width / 2 - 2;

  for (let y = 0; y < config.height; y += segmentHeight + gap) {
    ctx.fillRect(x, y, 4, segmentHeight);
  }
}

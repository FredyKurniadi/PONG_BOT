export function cheatBotAction(side, state, tolerance = 6) {
  const paddle = side === "left" ? state.leftPaddle : state.rightPaddle;
  const paddleCenter = paddle.y + 48;
  if (state.ball.y < paddleCenter - tolerance) {
    return "up";
  }
  if (state.ball.y > paddleCenter + tolerance) {
    return "down";
  }
  return "stay";
}

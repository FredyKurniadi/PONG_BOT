export class MatchRecorder {
  constructor(mode) {
    this.mode = mode;
    this.rows = [];
    this.matchId = `${Date.now()}`;
  }

  record(frameIdx, timestampMs, state, actions, players) {
    this.rows.push({
      match_id: this.matchId,
      frame_idx: frameIdx,
      timestamp_ms: timestampMs,
      mode: this.mode,
      player_left_id: players.left,
      player_right_id: players.right,
      left_paddle_y: round(state.leftPaddle.y),
      right_paddle_y: round(state.rightPaddle.y),
      ball_x: round(state.ball.x),
      ball_y: round(state.ball.y),
      ball_vx: round(state.ball.vx),
      ball_vy: round(state.ball.vy),
      label_action_left: actions.left,
      label_action_right: actions.right,
      score_left: state.leftScore,
      score_right: state.rightScore
    });
  }

  toCsv() {
    if (!this.rows.length) {
      return "";
    }

    const columns = Object.keys(this.rows[0]);
    const lines = [columns.join(",")];

    for (const row of this.rows) {
      lines.push(columns.map((key) => escapeCsv(String(row[key]))).join(","));
    }

    return lines.join("\n");
  }

  toReplayPayload() {
    return {
      id: this.matchId,
      mode: this.mode,
      created_at: new Date().toISOString(),
      frames: this.rows
    };
  }
}

function escapeCsv(value) {
  if (value.includes(",") || value.includes("\"") || value.includes("\n")) {
    return `"${value.replaceAll("\"", "\"\"")}"`;
  }
  return value;
}

function round(num) {
  return Math.round(num * 1000) / 1000;
}

export class ReplayStore {
  constructor(storageKey, maxItems) {
    this.storageKey = storageKey;
    this.maxItems = maxItems;
  }

  loadAll() {
    const raw = localStorage.getItem(this.storageKey);
    if (!raw) {
      return [];
    }
    try {
      return JSON.parse(raw);
    } catch {
      return [];
    }
  }

  save(payload) {
    const current = this.loadAll();
    const next = [payload, ...current].slice(0, this.maxItems);
    localStorage.setItem(this.storageKey, JSON.stringify(next));
    return next;
  }

  latest() {
    const all = this.loadAll();
    return all[0] ?? null;
  }

  byId(id) {
    return this.loadAll().find((item) => item.id === id) ?? null;
  }

  deleteById(id) {
    const next = this.loadAll().filter((item) => item.id !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(next));
    return next;
  }
}

export function renderReplayFrame(frameRow) {
  return {
    leftPaddle: { y: Number(frameRow.left_paddle_y) },
    rightPaddle: { y: Number(frameRow.right_paddle_y) },
    ball: {
      x: Number(frameRow.ball_x),
      y: Number(frameRow.ball_y)
    },
    leftScore: Number(frameRow.score_left),
    rightScore: Number(frameRow.score_right)
  };
}

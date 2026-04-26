export class KeyboardInput {
  constructor() {
    this.keys = new Set();
    window.addEventListener("keydown", (event) => {
      this.keys.add(event.code);
    });
    window.addEventListener("keyup", (event) => {
      this.keys.delete(event.code);
    });
  }

  getP1Action() {
    const up = this.keys.has("KeyW");
    const down = this.keys.has("KeyS");
    return this.#resolveDirection(up, down);
  }

  getP2Action() {
    const up = this.keys.has("ArrowUp");
    const down = this.keys.has("ArrowDown");
    return this.#resolveDirection(up, down);
  }

  #resolveDirection(upPressed, downPressed) {
    if (upPressed && !downPressed) {
      return "up";
    }
    if (downPressed && !upPressed) {
      return "down";
    }
    return "stay";
  }
}

import { describe, expect, it } from "vitest";
import { gameConfig } from "../src/config/gameConfig.js";
import { updatePaddlePhysics } from "../src/core/physics.js";

describe("paddle physics", () => {
  it("accelerates paddle upward", () => {
    const paddle = { y: 100, vy: 0 };
    updatePaddlePhysics(paddle, "up", gameConfig, gameConfig.fixedDeltaTime);
    expect(paddle.vy).toBeLessThan(0);
  });

  it("decelerates paddle to zero on stay", () => {
    const paddle = { y: 100, vy: 200 };
    updatePaddlePhysics(paddle, "stay", gameConfig, gameConfig.fixedDeltaTime);
    expect(paddle.vy).toBeLessThan(200);
  });
});

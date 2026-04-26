export function createPveController(keyboard, botManager) {
  return (state) => ({
    left: keyboard.getP1Action(),
    right: botManager.predictRightAction(state)
  });
}

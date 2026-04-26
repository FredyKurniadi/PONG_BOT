export function createBvbController(botManager) {
  return (state) => ({
    left: botManager.predictLeftAction(state),
    right: botManager.predictRightAction(state)
  });
}

export function createPvpController(keyboard) {
  return () => ({
    left: keyboard.getP1Action(),
    right: keyboard.getP2Action()
  });
}

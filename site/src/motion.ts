/** Pointer motion stays optional; keyboard commands respond immediately. */
export function isKeyboardInput() {
  return document.documentElement.dataset.inputModality === 'keyboard';
}

export function motionToken(name: string, fallback: string) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback;
}

export function menuExitDuration() {
  if (isKeyboardInput()) return 0;
  const token = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ? '--motion-reduced'
    : '--motion-drawer';
  return Number.parseFloat(motionToken(token, '0ms')) || 0;
}

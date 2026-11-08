// Must match .container-page (max-w-page = 76rem, sm:px-8).
const CONTAINER_PX = 1216;
const CONTAINER_PAD = 32;

/**
 * Horizontal position for a sky body (moon, sun) of radius R: centered in
 * the empty gutter right of the content when there is room, otherwise
 * peeking in from the screen edge so it covers as little text as possible.
 */
export function skyBodyX(w: number, R: number): number {
  const contentRight = (w + Math.min(w, CONTAINER_PX)) / 2 - CONTAINER_PAD;
  const gutter = w - contentRight;
  return gutter >= R * 2 + 24 ? contentRight + gutter / 2 : w - R * 0.6;
}

/** Document-space top of an element (0 if missing). */
export function docTop(id: string): number {
  const el = document.getElementById(id);
  return el ? el.getBoundingClientRect().top + window.scrollY : 0;
}

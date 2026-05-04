/**
 * Global scroll-fade registry — single rAF loop computes a 0..1 distance-from-
 * viewport-center progress for every registered element and writes it as the
 * `--fade-progress` CSS variable. CSS handles the visual mapping (scale, blur,
 * opacity) via the `.scroll-fade` / `.scroll-fade-word` utility classes.
 *
 * One global loop instead of one rAF per element, because typical home pages
 * end up with 50–200 fade units (cards + per-word text spans).
 */

/**
 * Safe zone — height of the centered viewport band where elements stay 100%
 * focused (both progresses = 0). Expressed as a fraction of viewport height.
 * E.g. 0.5 → the middle 50vh of the screen is "in focus".
 */
const SAFE_ZONE_VH = 0.4;

/**
 * Falloff — distance *after* the safe zone over which progress ramps from
 * 0 → 1. Expressed as a fraction of viewport height. Total reach from the
 * viewport center is `(SAFE_ZONE_VH / 2 + FALLOFF_VH) * vh`.
 */
const FALLOFF_VH = 0.4;

/**
 * Easing exponent applied to the linear distance progress.
 *   - going away (progress 0 → 1): slow start, fast end
 *   - coming back (progress 1 → 0): fast start, slow end (i.e. settles in
 *     softly when an element approaches the safe zone)
 * Higher = more pronounced curve. 2 = quadratic, 3 = cubic.
 */
const EASE_EXPONENT = 2.4;

const elements = new Set<HTMLElement>();
let rafId = 0;
let running = false;

function tick() {
  const vh = window.innerHeight;
  const vpCenter = vh / 2;
  const safeHalf = (vh * SAFE_ZONE_VH) / 2;
  const falloff = vh * FALLOFF_VH;
  for (const el of elements) {
    const rect = el.getBoundingClientRect();
    const elCenter = rect.top + rect.height / 2;
    // Signed distance — positive = element is BELOW the viewport center
    // (receding into the background), negative = ABOVE center (approaching
    // the camera as we scroll past it). Each direction drives its own var so
    // CSS can render asymmetric depth-of-field behavior.
    const delta = elCenter - vpCenter;
    let back = 0;
    let front = 0;
    if (delta > safeHalf) {
      const linear = falloff > 0 ? Math.min(1, (delta - safeHalf) / falloff) : 1;
      back = Math.pow(linear, EASE_EXPONENT);
    } else if (delta < -safeHalf) {
      const linear = falloff > 0 ? Math.min(1, (-delta - safeHalf) / falloff) : 1;
      front = Math.pow(linear, EASE_EXPONENT);
    }
    el.style.setProperty("--fade-back", back.toFixed(3));
    el.style.setProperty("--fade-front", front.toFixed(3));
    // Front elements render ABOVE their sibling fade-elements but MUST stay
    // below the fixed site header (which uses z-50). z scales continuously
    // with `front` so larger front-progress always strictly above smaller —
    // capped at 40 to leave a 10-unit buffer under the header.
    const z = front > 0 ? 10 + Math.round(front * 30) : 1;
    el.style.zIndex = String(z);
  }
  if (running) rafId = requestAnimationFrame(tick);
}

export function registerFade(el: HTMLElement) {
  elements.add(el);
  if (!running) {
    running = true;
    rafId = requestAnimationFrame(tick);
  }
}

export function unregisterFade(el: HTMLElement) {
  elements.delete(el);
  if (elements.size === 0) {
    running = false;
    cancelAnimationFrame(rafId);
  }
}

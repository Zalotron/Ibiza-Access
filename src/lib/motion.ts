/**
 * Global motion tokens. Use these for every animation, transition or scroll-linked
 * effect. Keep duration and curve consistent across the site so the brand feels
 * coherent. Mirror values defined in `globals.css` (--duration-default, --ease-default).
 */

export const MOTION_DURATION_MS = 300;
export const MOTION_DURATION_S = MOTION_DURATION_MS / 1000;

/** Slow start, fast middle, slow end — sine in-out. Brand curve. */
export const MOTION_CURVE: [number, number, number, number] = [
  0.65, 0, 0.35, 1,
];

/** Convenience preset for Framer Motion / Motion v12 transitions. */
export const motionTransition = {
  duration: MOTION_DURATION_S,
  ease: MOTION_CURVE,
} as const;

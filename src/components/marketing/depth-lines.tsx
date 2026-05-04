"use client";

import { useEffect, useRef } from "react";

/**
 * Decorative parallax lines in the brand accent color used to exaggerate the
 * depth-of-field illusion of the page.
 *
 * Each line declares its `parallax` multiplier directly:
 *   - parallax = 1   → moves 1:1 with the page (in the focus plane). Sharp.
 *   - parallax < 1   → drifts SLOWER than the page (background). Rendered
 *                       behind in-flow content (z = -1).
 *   - parallax > 1   → rushes past FASTER than the page (foreground).
 *                       Rendered in front of content (z = 45, below header).
 *
 * From parallax we derive:
 *   - thickness = parallax * SCALE   (slow → thin, fast → thick)
 *   - blur      = |parallax - 1| * X (in plane = sharp, deviation = OOF)
 *   - opacity   = base - |parallax - 1| * X (more deviation = more faded)
 *
 * Position uses two phase parameters so lines spawn along the WHOLE page,
 * not all crowded into a single viewport's vertical span:
 *   - peakPhase (0..1) — when in scroll progression the line peaks at peakY.
 *   - peakY     (0..1) — viewport y at the peak (as a vh fraction).
 */

type Line = {
  parallax: number;
  peakPhase: number;
  peakY: number;
  rotate: number;
  lengthVw: number;
};

type Derived = {
  blur: number;
  thickness: number;
  opacity: number;
};

const BLUR_PER_UNIT_DIFF = 11;
const THICKNESS_SCALE = 2.5;
const OPACITY_BASE = 0.34;
const OPACITY_FADE_PER_UNIT_DIFF = 0.08;

function derive(parallax: number): Derived {
  const diff = Math.abs(parallax - 1);
  return {
    blur: diff * BLUR_PER_UNIT_DIFF,
    thickness: Math.max(0.5, parallax * THICKNESS_SCALE),
    opacity: Math.max(0.12, OPACITY_BASE - diff * OPACITY_FADE_PER_UNIT_DIFF),
  };
}

// Single source of truth — back/front split is automatic via parallax < 1.
// Sparse field: peakPhase, peakY, parallax and rotate are all distributed so
// no two lines crowd in the same screen region at the same scroll position.
const LINES: Line[] = [
  { parallax: 0.05, peakPhase: 0.04, peakY: 0.18, rotate: -22, lengthVw: 280 },
  { parallax: 0.7, peakPhase: 0.13, peakY: 0.96, rotate: 18, lengthVw: 280 },
  { parallax: 1.32, peakPhase: 0.22, peakY: 0.85, rotate: 12, lengthVw: 70 },
  { parallax: 0.78, peakPhase: 0.28, peakY: 0.1, rotate: 42, lengthVw: 280 },
  { parallax: 2.2, peakPhase: 0.34, peakY: 0.5, rotate: -38, lengthVw: 280 },
  { parallax: 0.18, peakPhase: 0.4, peakY: 0.74, rotate: 24, lengthVw: 80 },
  { parallax: 0.95, peakPhase: 0.49, peakY: 0.7, rotate: -36, lengthVw: 280 },
  { parallax: 1.45, peakPhase: 0.58, peakY: 0.04, rotate: -18, lengthVw: 280 },
  { parallax: 0.32, peakPhase: 0.64, peakY: 0.46, rotate: 80, lengthVw: 280 },
  { parallax: 1.5, peakPhase: 0.73, peakY: 0.58, rotate: -82, lengthVw: 280 },
  { parallax: 2.85, peakPhase: 0.82, peakY: 0.66, rotate: -8, lengthVw: 280 },
  { parallax: 0.5, peakPhase: 0.88, peakY: 0.38, rotate: 50, lengthVw: 280 },
];

type Entry = { line: Line; derived: Derived };
const BACK_ENTRIES: Entry[] = [];
const FRONT_ENTRIES: Entry[] = [];
for (const line of LINES) {
  const entry = { line, derived: derive(line.parallax) };
  if (line.parallax < 1) BACK_ENTRIES.push(entry);
  else FRONT_ENTRIES.push(entry);
}

function DepthLine({
  line,
  derived,
  refSetter,
}: {
  line: Line;
  derived: Derived;
  refSetter: (el: HTMLDivElement | null) => void;
}) {
  return (
    <div
      ref={refSetter}
      className="absolute left-1/2 top-0 origin-center will-change-transform"
      style={{
        width: `${line.lengthVw}vw`,
        height: `${derived.thickness}px`,
        backgroundColor: "var(--color-accent)",
        opacity: derived.opacity,
        filter: derived.blur ? `blur(${derived.blur}px)` : undefined,
        transform: `translate3d(-50%, var(--depth-y, 0px), 0) rotate(${line.rotate}deg)`,
      }}
    />
  );
}

export function DepthLines() {
  const backRefs = useRef<(HTMLDivElement | null)[]>([]);
  const frontRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const sy = window.scrollY;
      const vh = window.innerHeight;
      const maxScroll = Math.max(
        1,
        document.documentElement.scrollHeight - vh,
      );
      // Per-line viewport position:
      //   y = peakY * vh + parallax * (peakPhase * maxScroll - scrollY)
      // → at sy = peakPhase * maxScroll the line sits at peakY * vh in
      //   viewport, regardless of parallax. parallax then governs how fast
      //   the line travels through the viewport on either side of that peak.
      for (let i = 0; i < BACK_ENTRIES.length; i++) {
        const el = backRefs.current[i];
        if (!el) continue;
        const { line } = BACK_ENTRIES[i];
        const peakScroll = line.peakPhase * maxScroll;
        const y = line.peakY * vh + line.parallax * (peakScroll - sy);
        el.style.setProperty("--depth-y", `${y}px`);
      }
      for (let i = 0; i < FRONT_ENTRIES.length; i++) {
        const el = frontRefs.current[i];
        if (!el) continue;
        const { line } = FRONT_ENTRIES[i];
        const peakScroll = line.peakPhase * maxScroll;
        const y = line.peakY * vh + line.parallax * (peakScroll - sy);
        el.style.setProperty("--depth-y", `${y}px`);
      }
      raf = requestAnimationFrame(update);
    };
    update();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div aria-hidden className="pointer-events-none">
      <div
        className="pointer-events-none fixed inset-0 overflow-hidden"
        style={{ zIndex: -1 }}
      >
        {BACK_ENTRIES.map((entry, i) => (
          <DepthLine
            key={`back-${i}`}
            line={entry.line}
            derived={entry.derived}
            refSetter={(el) => {
              backRefs.current[i] = el;
            }}
          />
        ))}
      </div>
      <div
        className="pointer-events-none fixed inset-0 overflow-hidden"
        style={{ zIndex: 45 }}
      >
        {FRONT_ENTRIES.map((entry, i) => (
          <DepthLine
            key={`front-${i}`}
            line={entry.line}
            derived={entry.derived}
            refSetter={(el) => {
              frontRefs.current[i] = el;
            }}
          />
        ))}
      </div>
    </div>
  );
}

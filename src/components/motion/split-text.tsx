"use client";

import { Fragment, useRef, type ReactNode, type ElementType } from "react";
import { useScrollFade } from "@/lib/hooks/use-scroll-fade";
import { cn } from "@/lib/utils";

/**
 * Inline word with scroll-fade registered. Words on the same visual line share
 * y-coordinate, so the registry assigns them the same `--fade-progress` —
 * giving a per-line feel without explicit line grouping.
 */
function FadeWord({ children }: { children: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useScrollFade(ref);
  return (
    <span ref={ref} className="scroll-fade-word">
      {children}
    </span>
  );
}

/**
 * Splits a string into per-word scroll-fade spans. Whitespace is preserved as
 * plain text nodes so wrapping behavior matches the original.
 *
 * Children must be a plain string. For headings/paragraphs that contain inline
 * formatting (italics, accent colors), pass each segment as its own SplitText
 * and compose them, or wrap whole inline-formatted runs as children.
 */
export function SplitText({
  children,
  className,
  as: As = "span",
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}) {
  const tokens = collectTokens(children);
  return (
    <As className={cn(className)}>
      {tokens.map((tok, i) => (
        <Fragment key={i}>
          {typeof tok === "string"
            ? splitString(tok).map((part, j) =>
                part.kind === "ws" ? (
                  <span key={j}>{part.text}</span>
                ) : (
                  <FadeWord key={j}>{part.text}</FadeWord>
                ),
              )
            : tok}
        </Fragment>
      ))}
    </As>
  );
}

type Part = { kind: "word" | "ws"; text: string };

function splitString(s: string): Part[] {
  // Keep whitespace runs as their own tokens so they don't get blurred.
  const out: Part[] = [];
  const re = /(\s+)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(s))) {
    if (m.index > last) out.push({ kind: "word", text: s.slice(last, m.index) });
    out.push({ kind: "ws", text: m[0] });
    last = m.index + m[0].length;
  }
  if (last < s.length) out.push({ kind: "word", text: s.slice(last) });
  return out;
}

function collectTokens(node: ReactNode): (string | ReactNode)[] {
  if (node == null || typeof node === "boolean") return [];
  if (typeof node === "string" || typeof node === "number") return [String(node)];
  if (Array.isArray(node)) return node.flatMap(collectTokens);
  return [node];
}

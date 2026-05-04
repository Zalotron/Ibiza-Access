"use client";

import Image from "next/image";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Brand service card — single source of truth for how a service is displayed
 * in any listing. All visual decisions (aspect ratio, gradient, hover reveal,
 * used badge) live here so future styling tweaks propagate everywhere.
 */
export type ServiceCardProps = {
  /** Background image URL. */
  img: string;
  /** Title shown over the image (always visible). */
  titulo: string;
  /** Short description, only revealed on mouseover. Optional. */
  descripcion?: string;
  /** When true, render a check badge at the top-right of the card. */
  used?: boolean;
  /** Forwarded to the article's class (e.g. for grid spans). */
  className?: string;
};

export function ServiceCard({
  img,
  titulo,
  descripcion,
  used = false,
  className,
}: ServiceCardProps) {
  return (
    <article
      className={cn(
        "group relative isolate aspect-[4/5] overflow-hidden rounded-md bg-muted shadow-[0_0_0_rgba(0,0,0,0.5)] transition-[scale,transform,box-shadow] duration-default ease-default hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(0,0,0,0.18)]",
        className,
      )}
    >
      <Image
        src={img}
        alt={titulo}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        className="object-cover transition-[scale,transform] duration-default ease-default group-hover:scale-105"
      />

      {/* Bottom-anchored content stack — title stays in view; description
          expands on hover, pushing the title upward to make room. */}
      <div className="absolute inset-x-0 bottom-0 flex flex-col bg-black/35 px-3 py-2">
        <h3 className="font-display text-2xl text-white [text-shadow:0_2px_6px_rgba(0,0,0,0.85),0_0_24px_rgba(0,0,0,0.7)]">
          {titulo}
        </h3>
        {descripcion && (
          <p className="h-0 overflow-hidden pt-0 text-sm leading-snug text-white/95 opacity-0 transition-[height,opacity,padding-top] duration-default ease-default group-hover:h-auto group-hover:pt-1 group-hover:opacity-100 [text-shadow:0_2px_6px_rgba(0,0,0,0.85),0_0_24px_rgba(0,0,0,0.7)]">
            {descripcion}
          </p>
        )}
      </div>

      {/* Used badge (top-right) */}
      {used && (
        <div
          aria-label="Selected"
          className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-md bg-accent text-accent-foreground shadow-photo"
        >
          <Check className="h-5 w-5" aria-hidden="true" />
        </div>
      )}
    </article>
  );
}

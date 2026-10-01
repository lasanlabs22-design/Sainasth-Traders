"use client";

import { useState } from "react";
import Image from "next/image";
import type { Machine } from "@/lib/types";
import { machineTitle } from "@/lib/format";
import { MachineMedia } from "./MachineMedia";

/** Product imagery + finish selector. Uses photos when present, illustration otherwise. */
export function ProductShowcase({ machine }: { machine: Machine }) {
  const [finish, setFinish] = useState(0);
  const [photo, setPhoto] = useState(0);
  const hasPhotos = machine.images.length > 0;

  return (
    <div className="lg:sticky lg:top-28">
      <div className="arch relative aspect-[4/4.4] overflow-hidden border border-line bg-gradient-to-b from-cream via-sand to-cream">
        <div className="kolam absolute inset-0 opacity-40" />
        <div className="arch absolute inset-3 border border-brass/30" />
        <div className="absolute inset-x-12 bottom-6 h-1/4 rounded-full bg-white/50 blur-3xl" />
        <MachineMedia
          key={`${finish}-${photo}`}
          machine={machine}
          index={photo}
          finishColor={machine.finishes[finish]?.color}
          priority
          steam
          sizes="(min-width: 1024px) 45vw, 100vw"
          className="h-full w-full animate-[fadeIn_.6s_ease]"
        />
        {machine.badge && (
          <span className="absolute left-1/2 top-8 -translate-x-1/2 rounded-full bg-espresso px-4 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-brass-light">
            {machine.badge}
          </span>
        )}
      </div>

      {hasPhotos && machine.images.length > 1 && (
        <div className="no-scrollbar mt-4 flex gap-3 overflow-x-auto">
          {machine.images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setPhoto(i)}
              aria-label={`View photo ${i + 1}`}
              className={`relative size-20 shrink-0 overflow-hidden rounded-2xl border bg-cream ${i === photo ? "border-brass" : "border-line"}`}
            >
              <Image src={src} alt="" fill sizes="80px" className="object-contain p-2" />
            </button>
          ))}
        </div>
      )}

      {!hasPhotos && machine.finishes.length > 0 && (
        <div className="mt-6 text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-muted">
            Finish · <span className="font-semibold text-espresso">{machine.finishes[finish].name}</span>
          </p>
          <div className="mt-3 flex justify-center gap-3" role="radiogroup" aria-label={`${machineTitle(machine)} finishes`}>
            {machine.finishes.map((f, i) => (
              <button
                key={f.name}
                type="button"
                role="radio"
                aria-checked={i === finish}
                aria-label={f.name}
                onClick={() => setFinish(i)}
                className={`size-9 rounded-full border-2 transition-all ${i === finish ? "scale-110 border-brass" : "border-transparent"}`}
              >
                <span className="block size-full rounded-full shadow-inner ring-1 ring-black/10" style={{ background: f.color }} />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

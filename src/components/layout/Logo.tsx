import Link from "next/link";
import { site } from "@/data/site";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="group flex items-center gap-3" aria-label={`${site.name} — home`}>
      <span className="relative grid size-11 place-items-center rounded-full border border-brass/60 bg-espresso text-brass-light shadow-[inset_0_0_0_3px_var(--color-espresso),inset_0_0_0_4px_rgba(220,187,120,0.35)]">
        {/* Dabara-tumbler monogram — the South-Indian filter-coffee cup */}
        <svg viewBox="0 0 32 32" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
          <path d="M11 8h10l-1.5 11h-7z" />
          <path d="M5 21c0 2.5 4.9 4 11 4s11-1.5 11-4" />
          <path d="M5 21c1-1.6 5-2.6 11-2.6s10 1 11 2.6" />
          <path d="M14 5c-.8.9.8 1.4 0 2.4M18 5c-.8.9.8 1.4 0 2.4" strokeLinecap="round" />
        </svg>
      </span>
      <span className="leading-none">
        <span className={`block font-display text-2xl font-semibold tracking-tight ${light ? "text-ivory" : "text-espresso"}`}>{site.name}</span>
        <span className={`mt-1 block text-[0.6rem] font-semibold uppercase tracking-[0.32em] ${light ? "text-brass-light" : "text-brass-deep"}`}>
          Guntur · Vijayawada
        </span>
      </span>
    </Link>
  );
}

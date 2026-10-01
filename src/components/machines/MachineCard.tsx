import Link from "next/link";
import type { Machine } from "@/lib/types";
import { formatPrice } from "@/lib/format";
import { getCategory } from "@/lib/catalog";
import { MachineMedia } from "./MachineMedia";
import { Icon } from "@/components/ui/Icon";

export function MachineCard({ machine, priority = false }: { machine: Machine; priority?: boolean }) {
  const category = getCategory(machine.category);
  return (
    <Link
      href={`/machines/${machine.slug}`}
      className="group relative flex h-full flex-col rounded-[1.75rem] border border-line/70 bg-ivory p-3 transition-all duration-500 ease-luxe hover:-translate-y-1 hover:border-brass/60 hover:shadow-[0_30px_60px_-30px_rgba(43,27,18,0.45)]"
    >
      <div className="arch relative aspect-[4/4.3] overflow-hidden bg-gradient-to-b from-cream to-sand">
        <div className="kolam absolute inset-0 opacity-40" />
        <div className="absolute inset-x-6 bottom-0 h-1/3 rounded-t-full bg-white/40 blur-2xl" />
        <MachineMedia
          machine={machine}
          priority={priority}
          sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="h-full w-full transition-transform duration-700 ease-luxe group-hover:scale-[1.04]"
        />
        {machine.badge && (
          <span className="absolute left-1/2 top-5 -translate-x-1/2 whitespace-nowrap rounded-full bg-espresso/90 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-brass-light">
            {machine.badge}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col px-3 pb-3 pt-5">
        <p className="eyebrow tracking-[0.2em]!">
          {machine.brand} · {category.name}
        </p>
        <h3 className="mt-2 text-2xl leading-tight">{machine.name}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-muted">{machine.tagline}</p>

        <div className="mt-auto flex items-end justify-between gap-3 pt-5">
          <div>
            <p className="text-[0.65rem] uppercase tracking-[0.2em] text-muted">{machine.price === null ? "Commercial" : "From"}</p>
            <p className="font-display text-xl font-semibold text-espresso">{formatPrice(machine.price)}</p>
          </div>
          <span className="grid size-11 place-items-center rounded-full border border-line text-espresso transition-colors duration-300 group-hover:border-espresso group-hover:bg-espresso group-hover:text-brass-light">
            <Icon name="arrow" className="size-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}

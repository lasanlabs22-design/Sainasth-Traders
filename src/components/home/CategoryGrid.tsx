import Link from "next/link";
import { categories, machines } from "@/data/machines";
import { MachineVisual } from "@/components/machines/MachineVisual";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const tones = ["#b9bcc0", "#2b2b2d", "#8d1d22", "#e8dcc4"];

export function CategoryGrid() {
  return (
    <section className="container-luxe py-20 sm:py-28">
      <SectionHeading
        eyebrow="Find your machine"
        title={
          <>
            Four ways to a <em className="text-brass-deep">perfect cup</em>
          </>
        }
        telugu="మీకు సరైన యంత్రాన్ని ఎంచుకోండి"
        intro="Whether it’s a quiet morning ritual or a café serving five hundred cups a day, we’ll match you with the right machine."
      />

      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((c, i) => {
          const count = machines.filter((m) => m.category === c.slug).length;
          return (
            <Reveal key={c.slug} delay={i * 90}>
              <Link
                href={`/machines?category=${c.slug}`}
                className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-line bg-cream p-6 transition-all duration-500 ease-luxe hover:-translate-y-1 hover:bg-espresso"
              >
                <div className="kolam absolute inset-0 opacity-30 transition-opacity group-hover:opacity-0" />
                <div className="kolam-dark absolute inset-0 opacity-0 transition-opacity group-hover:opacity-60" />
                <div className="relative flex items-start justify-between">
                  <span className="font-display text-sm text-brass-deep group-hover:text-brass-light">0{i + 1}</span>
                  <span className="rounded-full border border-line px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-widest text-muted group-hover:border-white/20 group-hover:text-ivory/60">
                    {count} models
                  </span>
                </div>
                <MachineVisual kind={c.visual} color={tones[i]} className="relative mx-auto my-4 h-44 w-44 transition-transform duration-700 ease-luxe group-hover:scale-105" />
                <h3 className="relative text-3xl transition-colors group-hover:text-ivory">{c.name}</h3>
                <p lang="te" className="relative font-telugu text-sm text-brass-deep group-hover:text-brass-light/80">
                  {c.telugu}
                </p>
                <p className="relative mt-3 text-sm leading-relaxed text-muted transition-colors group-hover:text-ivory/65">{c.blurb}</p>
                <span className="relative mt-5 text-sm font-semibold text-espresso group-hover:text-brass-light">Browse →</span>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

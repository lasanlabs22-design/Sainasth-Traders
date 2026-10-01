import { promises } from "@/data/content";
import { machines } from "@/data/machines";

export function BrandMarquee() {
  const brands = Array.from(new Set(machines.map((m) => m.brand)));
  const row = [...brands, ...brands];
  return (
    <section aria-label="Brands and promises" className="container-luxe mt-16 sm:mt-20">
      <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4">
        {promises.map((p) => (
          <li key={p.label} className="bg-ivory px-5 py-6 text-center">
            <p className="font-display text-2xl text-espresso">{p.label}</p>
            <p className="mt-1 text-xs uppercase tracking-[0.18em] text-muted">{p.sub}</p>
          </li>
        ))}
      </ul>

      <div className="relative mt-10 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
        <p className="eyebrow mb-4 text-center">Brands we sell &amp; service</p>
        <div className="marquee flex w-max gap-14">
          {row.map((b, i) => (
            <span key={i} className="whitespace-nowrap font-display text-3xl italic text-mocha/50" aria-hidden={i >= brands.length}>
              {b}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

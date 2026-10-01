import Link from "next/link";
import type { Machine } from "@/lib/types";
import { formatPrice, machineTitle } from "@/lib/format";
import { site } from "@/data/site";
import { MachineMedia } from "@/components/machines/MachineMedia";
import { KolamRosette } from "@/components/ui/Ornament";
import { Icon } from "@/components/ui/Icon";

const stats = [
  { value: "10+", label: "Years brewing" },
  { value: "2", label: "Showrooms" },
  { value: "48h", label: "Service promise" },
];

export function Hero({ spotlight }: { spotlight: Machine }) {
  return (
    <section className="container-luxe pt-3 sm:pt-6">
      <div className="relative isolate overflow-hidden rounded-[2rem] bg-espresso text-ivory sm:rounded-[2.5rem]">
        <div className="kolam-dark absolute inset-0 -z-10 opacity-70" />
        <div className="absolute -right-40 -top-40 -z-10 size-[36rem] rounded-full bg-[radial-gradient(circle,rgba(220,187,120,0.22),transparent_65%)]" />
        <KolamRosette className="absolute -bottom-24 -left-24 -z-10 size-96 text-brass/10" />

        <div className="grid items-center gap-10 px-6 pb-10 pt-12 sm:px-12 sm:pt-16 lg:grid-cols-[1.1fr_1fr] lg:gap-6 lg:px-16 lg:py-20">
          <div>
            <p className="eyebrow text-brass-light">Est. {site.established} · Guntur &amp; Vijayawada</p>
            <h1 className="mt-5 text-[2.75rem] leading-[0.98] text-ivory sm:text-6xl lg:text-7xl">
              The art of coffee,
              <br />
              <em className="brass-text font-medium">crafted for Andhra homes.</em>
            </h1>
            <p lang="te" className="mt-4 font-telugu text-lg text-brass-light/80">
              ప్రతి కప్పులో సంప్రదాయం, ప్రతి యంత్రంలో నైపుణ్యం
            </p>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-ivory/70 sm:text-lg">
              From our grandmothers’ brass filter to the perfect Italian espresso — we bring the world’s finest coffee machines to your
              kitchen, office and café, with a free demo and local service you can trust.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/machines" className="btn btn-brass">
                Explore Machines <Icon name="arrow" className="size-4" />
              </Link>
              <Link href="/contact#enquire" className="btn btn-ghost-light">
                Book a Free Home Demo
              </Link>
            </div>

            <dl className="mt-10 grid max-w-md grid-cols-3 divide-x divide-white/10 border-t border-white/10 pt-6">
              {stats.map((s) => (
                <div key={s.label} className="flex flex-col px-3 first:pl-0">
                  <dt className="order-2 mt-1 text-[0.65rem] uppercase tracking-[0.2em] text-ivory/50">{s.label}</dt>
                  <dd className="font-display text-3xl text-brass-light sm:text-4xl">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="arch relative aspect-[4/4.6] overflow-hidden border border-brass/40 bg-gradient-to-b from-mocha/80 via-roast to-espresso p-2">
              <div className="arch absolute inset-3 border border-brass/25" />
              <div className="absolute inset-x-10 bottom-10 h-1/3 rounded-full bg-brass/20 blur-3xl" />
              <MachineMedia machine={spotlight} priority steam sizes="(min-width: 1024px) 40vw, 90vw" className="h-full w-full" />
            </div>

            <Link
              href={`/machines/${spotlight.slug}`}
              className="absolute -bottom-4 left-1/2 flex w-[88%] -translate-x-1/2 items-center justify-between gap-4 rounded-2xl border border-brass/30 bg-ivory/95 p-4 text-espresso shadow-2xl backdrop-blur transition-transform hover:-translate-y-0.5 sm:w-[80%]"
            >
              <span>
                <span className="eyebrow block text-[0.6rem]">In the spotlight</span>
                <span className="mt-1 block font-display text-xl leading-tight">{machineTitle(spotlight)}</span>
              </span>
              <span className="text-right">
                <span className="block text-sm font-semibold">{formatPrice(spotlight.price)}</span>
                <span className="text-xs text-brass-deep">View →</span>
              </span>
            </Link>
          </div>
        </div>
        <div className="h-8 lg:h-0" />
      </div>
    </section>
  );
}

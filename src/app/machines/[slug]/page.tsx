import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllMachines, getCategory, getMachine, getRelatedMachines } from "@/lib/catalog";
import { formatPrice, machineEnquiryMessage, machineTitle, telLink, whatsappLink } from "@/lib/format";
import type { MachineSpecs } from "@/lib/types";
import { site } from "@/data/site";
import { ProductShowcase } from "@/components/machines/ProductShowcase";
import { MachineCard } from "@/components/machines/MachineCard";
import { Icon } from "@/components/ui/Icon";
import { LotusDivider } from "@/components/ui/Ornament";
import { SectionHeading } from "@/components/ui/SectionHeading";

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getAllMachines()).map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const machine = await getMachine((await params).slug);
  if (!machine) return {};
  return {
    title: `${machineTitle(machine)} ${machine.model}`,
    description: `${machine.tagline} ${machine.description.slice(0, 120)}… Available in Guntur & Vijayawada.`,
  };
}

const specLabels: Record<keyof MachineSpecs, string> = {
  pressure: "Pump pressure",
  boiler: "Heating system",
  waterTank: "Water tank",
  grinder: "Grinder",
  power: "Power",
  dimensions: "Dimensions (W × D × H)",
  weight: "Weight",
  warranty: "Warranty",
};

const useLabels = { home: "Home", office: "Office", cafe: "Café & Hotel" } as const;

const assurances = [
  { icon: "demo", text: "Free demo at home or showroom" },
  { icon: "install", text: "Expert installation & setup" },
  { icon: "amc", text: "AMC & genuine spares" },
] as const;

export default async function MachinePage({ params }: Params) {
  const machine = await getMachine((await params).slug);
  if (!machine) notFound();

  const related = await getRelatedMachines(machine);
  const category = getCategory(machine.category);
  const title = machineTitle(machine);
  const wa = whatsappLink(machineEnquiryMessage(machine));
  const specs = (Object.keys(specLabels) as (keyof MachineSpecs)[]).filter((k) => machine.specs[k]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: title,
    brand: { "@type": "Brand", name: machine.brand },
    model: machine.model,
    description: machine.description,
    category: category.name,
    ...(machine.price !== null && {
      offers: { "@type": "Offer", priceCurrency: "INR", price: machine.price, availability: "https://schema.org/InStock", seller: { "@type": "Organization", name: site.name } },
    }),
  };

  return (
    <>
      <nav aria-label="Breadcrumb" className="container-luxe pt-6 text-xs text-muted">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link href="/" className="hover:text-brass-deep">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/machines" className="hover:text-brass-deep">
              Machines
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href={`/machines?category=${category.slug}`} className="hover:text-brass-deep">
              {category.name}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-espresso">{machine.name}</li>
        </ol>
      </nav>

      <section className="container-luxe grid gap-10 py-8 sm:py-12 lg:grid-cols-2 lg:gap-16">
        <ProductShowcase machine={machine} />

        <div>
          <p className="eyebrow">
            {machine.brand} · {category.name}
          </p>
          <h1 className="mt-3 text-5xl leading-[1] sm:text-6xl">{machine.name}</h1>
          <p className="mt-2 text-sm text-muted">Model {machine.model}</p>
          <p className="mt-5 font-display text-2xl italic text-brass-deep">{machine.tagline}</p>

          <div className="mt-7 flex flex-wrap items-end gap-x-4 gap-y-1 border-y border-line py-5">
            <p className="font-display text-4xl font-semibold text-espresso">{formatPrice(machine.price)}</p>
            {machine.mrp && machine.price !== null && (
              <>
                <p className="pb-1 text-muted line-through">{formatPrice(machine.mrp)}</p>
                <p className="mb-1 rounded-full bg-leaf/10 px-3 py-0.5 text-xs font-semibold text-leaf">
                  Save {Math.round(((machine.mrp - machine.price) / machine.mrp) * 100)}%
                </p>
              </>
            )}
            <p className="w-full text-xs text-muted">
              {machine.price === null ? "Configured and quoted for your café — includes installation." : "Indicative price · EMI options available · Ask for current offers"}
            </p>
          </div>

          <p className="mt-6 leading-relaxed text-ink/85">{machine.description}</p>

          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {machine.highlights.map((h) => (
              <li key={h} className="flex items-start gap-3 text-sm">
                <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-espresso text-brass-light">
                  <Icon name="check" className="size-3" />
                </span>
                {h}
              </li>
            ))}
          </ul>

          <dl className="mt-7 flex flex-wrap gap-3 text-sm">
            <div className="rounded-full border border-line bg-cream px-4 py-2">
              <dt className="inline text-muted">Ideal for </dt>
              <dd className="inline font-semibold">{machine.idealFor.map((u) => useLabels[u]).join(" · ")}</dd>
            </div>
            {machine.cupsPerDay && (
              <div className="rounded-full border border-line bg-cream px-4 py-2">
                <dt className="inline text-muted">Cups / day </dt>
                <dd className="inline font-semibold">{machine.cupsPerDay}</dd>
              </div>
            )}
          </dl>

          <div className="mt-8 hidden gap-3 sm:flex">
            <a href={wa} target="_blank" rel="noopener" className="btn btn-brass flex-1">
              <Icon name="whatsapp" /> Enquire on WhatsApp
            </a>
            <Link href={`/contact?machine=${machine.slug}#enquire`} className="btn btn-primary flex-1">
              Book a free demo
            </Link>
          </div>

          <ul className="mt-8 grid gap-3 rounded-3xl border border-line bg-cream p-5 sm:grid-cols-3">
            {assurances.map((a) => (
              <li key={a.text} className="flex items-center gap-3 text-xs leading-snug sm:flex-col sm:text-center">
                <Icon name={a.icon} className="size-6 shrink-0 text-brass-deep" />
                {a.text}
              </li>
            ))}
          </ul>

          {specs.length > 0 && (
            <div className="mt-10">
              <h2 className="text-3xl">Specifications</h2>
              <LotusDivider className="mt-3 justify-start [&>span:first-child]:hidden" />
              <dl className="mt-4 divide-y divide-line overflow-hidden rounded-2xl border border-line">
                {specs.map((k, i) => (
                  <div key={k} className={`grid grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] gap-4 px-5 py-3.5 text-sm ${i % 2 ? "bg-ivory" : "bg-cream/60"}`}>
                    <dt className="text-muted">{specLabels[k]}</dt>
                    <dd className="font-medium text-espresso">{machine.specs[k]}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-3 text-xs text-muted">Specifications are indicative and may vary by batch. Please confirm with our team before purchase.</p>
            </div>
          )}
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-cream py-16 sm:py-24">
          <div className="container-luxe">
            <SectionHeading eyebrow="You may also like" title={<>Similar <em className="text-brass-deep">machines</em></>} />
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((m) => (
                <MachineCard key={m.slug} machine={m} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Sticky mobile action bar */}
      <div className="mobile-action-bar fixed inset-x-0 bottom-0 z-30 border-t border-line bg-ivory/95 px-4 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3 backdrop-blur-xl sm:hidden">
        <div className="flex items-center gap-2">
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs text-muted">{title}</p>
            <p className="font-display text-xl font-semibold leading-tight">{formatPrice(machine.price)}</p>
          </div>
          <a href={telLink(site.phone)} aria-label="Call us" className="grid size-12 place-items-center rounded-full border border-line">
            <Icon name="phone" className="size-5" />
          </a>
          <a href={wa} target="_blank" rel="noopener" className="btn btn-brass px-5">
            <Icon name="whatsapp" /> Enquire
          </a>
        </div>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}

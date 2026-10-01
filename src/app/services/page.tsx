import type { Metadata } from "next";
import { services } from "@/data/content";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { CtaBand } from "@/components/home/CtaBand";

export const metadata: Metadata = {
  title: "Services — Installation, AMC & Rentals",
  description: "Coffee machine installation, annual maintenance contracts, office and café rentals, barista training and genuine spares in Guntur and Vijayawada.",
};

const plans = [
  {
    name: "Home Care",
    for: "Home espresso & capsule",
    points: ["2 preventive visits / year", "Descaling & gasket check", "Priority phone support", "10% off spares"],
  },
  {
    name: "Office Care",
    for: "Bean-to-cup in offices & clinics",
    points: ["Quarterly preventive visits", "Brew-unit service & calibration", "48-hour breakdown response", "Loaner machine if needed"],
    highlight: true,
  },
  {
    name: "Café Care",
    for: "Commercial multi-group machines",
    points: ["Monthly preventive visits", "Group-head & boiler service", "Same-day breakdown response", "Barista refresher session"],
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title={
          <>
            Care that lasts <em className="text-brass-deep">as long as the machine</em>
          </>
        }
        telugu="మా సేవలు"
        intro="A great machine deserves great care. Our technicians in Guntur and Vijayawada keep every cup tasting like the first."
        crumbs={[{ href: "/services", label: "Services" }]}
      />

      <section className="container-luxe py-16 sm:py-24">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={(i % 3) * 90}>
              <article className="group relative h-full overflow-hidden rounded-[1.75rem] border border-line bg-cream p-7 transition-colors duration-500 hover:border-brass sm:p-8">
                <span className="absolute right-6 top-5 font-display text-6xl text-brass/20">0{i + 1}</span>
                <span className="grid size-14 place-items-center rounded-full bg-espresso text-brass-light">
                  <Icon name={s.icon} className="size-6" />
                </span>
                <h2 className="mt-6 text-3xl">{s.title}</h2>
                <p className="mt-3 leading-relaxed text-muted">{s.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden bg-espresso py-20 text-ivory sm:py-28">
        <div className="kolam-dark absolute inset-0 opacity-50" />
        <div className="container-luxe relative">
          <SectionHeading
            light
            eyebrow="Annual maintenance"
            title={
              <>
                Choose your <em className="brass-text">care plan</em>
              </>
            }
            telugu="వార్షిక నిర్వహణ ప్రణాళికలు"
            intro="Plans are tailored to your machine and usage — ask us for a quote."
          />
          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {plans.map((p) => (
              <article
                key={p.name}
                className={`relative rounded-[1.75rem] border p-8 ${p.highlight ? "border-brass bg-gradient-to-b from-mocha to-roast" : "border-white/10 bg-white/[0.03]"}`}
              >
                {p.highlight && (
                  <span className="absolute -top-3 left-8 rounded-full bg-brass px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-espresso">
                    Most popular
                  </span>
                )}
                <h3 className="text-3xl text-ivory">{p.name}</h3>
                <p className="mt-1 text-sm text-brass-light/80">{p.for}</p>
                <ul className="mt-6 space-y-3 text-sm text-ivory/75">
                  {p.points.map((pt) => (
                    <li key={pt} className="flex gap-3">
                      <Icon name="check" className="mt-0.5 size-4 shrink-0 text-brass-light" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className="pt-20 sm:pt-28">
        <CtaBand title="Need a technician?" body="Book a service visit or ask about an AMC for your machine — even if you didn’t buy it from us." />
      </div>
    </>
  );
}

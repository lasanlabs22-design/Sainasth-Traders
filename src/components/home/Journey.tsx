import { services } from "@/data/content";
import { site } from "@/data/site";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const steps = [
  { n: "01", title: "Visit or call", body: "Walk into our Guntur or Vijayawada showroom, or simply WhatsApp us." },
  { n: "02", title: "Free demo", body: "We brew with you — at the showroom or your home — and find your match." },
  { n: "03", title: "Install & learn", body: "Same-week installation, grinder calibration and a hands-on walkthrough." },
  { n: "04", title: "Lifetime care", body: "AMC plans, genuine spares and technicians who know your machine." },
];

export function Journey() {
  return (
    <section className="relative overflow-hidden bg-espresso py-20 text-ivory sm:py-28">
      <div className="kolam-dark absolute inset-0 opacity-50" />
      <div className="container-luxe relative">
        <SectionHeading
          light
          eyebrow={`The ${site.name} way`}
          title={
            <>
              More than a sale — <em className="brass-text">a lifelong ritual</em>
            </>
          }
          telugu="కొనుగోలు నుండి సేవ వరకు"
        />

        <ol className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal as="li" key={s.n} delay={i * 100} className="bg-espresso p-7 sm:p-8">
              <span className="font-display text-5xl text-brass-light/80">{s.n}</span>
              <h3 className="mt-6 text-2xl text-ivory">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ivory/60">{s.body}</p>
            </Reveal>
          ))}
        </ol>

        <ul className="mt-14 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-6">
          {services.map((s) => (
            <li key={s.title} className="text-center">
              <span className="mx-auto grid size-14 place-items-center rounded-full border border-brass/40 text-brass-light">
                <Icon name={s.icon} className="size-6" />
              </span>
              <p className="mt-3 text-sm font-medium text-ivory/85">{s.title}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

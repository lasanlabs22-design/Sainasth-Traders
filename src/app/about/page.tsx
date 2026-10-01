import type { Metadata } from "next";
import { site } from "@/data/site";
import { PageHero } from "@/components/ui/PageHero";
import { Heritage } from "@/components/home/Heritage";
import { Showrooms } from "@/components/home/Showrooms";
import { CtaBand } from "@/components/home/CtaBand";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Our Story",
  description: `The story of ${site.name} — bringing premium coffee machines and South-Indian coffee hospitality to Guntur and Vijayawada.`,
};

const milestones = [
  { year: site.established, text: "Opened our first showroom in Guntur with three espresso machines and a filter-coffee counter." },
  { year: "2017", text: "Started commercial installations for cafés and hotels across the Krishna–Guntur region." },
  { year: "2020", text: "Opened our Vijayawada showroom and launched office rental plans." },
  { year: "Today", text: "Hundreds of homes, offices and cafés brewing with machines we installed and continue to care for." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Our story"
        title={
          <>
            Tradition in every cup, <em className="text-brass-deep">craft in every machine</em>
          </>
        }
        telugu="మా కథ"
        crumbs={[{ href: "/about", label: "Our Story" }]}
      />
      <Heritage />

      <section className="bg-cream py-20 sm:py-28">
        <div className="container-luxe max-w-4xl">
          <p className="eyebrow text-center">Milestones</p>
          <h2 className="mt-4 text-center text-4xl sm:text-5xl">A decade of brewing</h2>
          <ol className="relative mt-14 space-y-10 border-l border-brass/40 pl-8 sm:pl-12">
            {milestones.map((m, i) => (
              <Reveal as="li" key={m.year} delay={i * 80} className="relative">
                <span className="absolute -left-[2.45rem] top-1.5 size-3 rotate-45 border border-brass bg-ivory sm:-left-[3.45rem]" />
                <p className="font-display text-3xl text-brass-deep">{m.year}</p>
                <p className="mt-2 max-w-xl leading-relaxed text-muted">{m.text}</p>
              </Reveal>
            ))}
          </ol>
          <p className="mt-10 text-center text-xs text-muted">Milestones are placeholder content for the POC.</p>
        </div>
      </section>

      <Showrooms />
      <CtaBand />
    </>
  );
}

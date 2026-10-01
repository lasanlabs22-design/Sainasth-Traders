import { testimonials } from "@/data/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";

export function Testimonials() {
  return (
    <section className="container-luxe py-20 sm:py-28">
      <SectionHeading eyebrow="Kind words" title={<>Brewing smiles across <em className="text-brass-deep">Andhra</em></>} telugu="మా వినియోగదారుల మాటల్లో" />
      <div className="no-scrollbar -mx-4 mt-14 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0">
        {testimonials.map((t, i) => (
          <Reveal as="article" key={i} delay={i * 100} className="w-[85%] shrink-0 snap-center md:w-auto">
            <figure className="relative flex h-full flex-col rounded-[1.75rem] border border-line bg-cream p-7 sm:p-8">
              <span className="absolute right-6 top-2 font-display text-8xl leading-none text-brass/25" aria-hidden="true">
                “
              </span>
              <div className="flex gap-1 text-brass" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Icon key={j} name="star" className="size-4 fill-current" />
                ))}
              </div>
              <blockquote className="mt-5 flex-1 font-display text-xl leading-snug text-espresso sm:text-[1.35rem]">{t.quote}</blockquote>
              <figcaption className="mt-6 border-t border-line pt-4 text-sm">
                <span className="font-semibold text-espresso">{t.name}</span>
                <span className="text-muted">
                  {" "}
                  · {t.role}, {t.city}
                </span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

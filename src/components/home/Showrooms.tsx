import { showrooms } from "@/data/site";
import { telLink } from "@/lib/format";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function Showrooms({ withMaps = false, heading = true }: { withMaps?: boolean; heading?: boolean }) {
  return (
    <section className="container-luxe py-20 sm:py-28">
      {heading && (
        <SectionHeading
          eyebrow="Visit us"
          title={
            <>
              Two showrooms, <em className="text-brass-deep">one warm welcome</em>
            </>
          }
          telugu="మా షోరూమ్‌లను సందర్శించండి"
          intro="Taste before you buy. Every machine on display is ready to brew — and the coffee is always on us."
        />
      )}
      <div className={`grid gap-5 md:grid-cols-2 ${heading ? "mt-14" : ""}`}>
        {showrooms.map((s, i) => (
          <Reveal key={s.city} delay={i * 120}>
            <article className="group relative h-full overflow-hidden rounded-[2rem] border border-line bg-cream">
              {withMaps && (
                <iframe
                  title={`Map of ${s.city} showroom`}
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(s.mapQuery)}&z=14&output=embed`}
                  className="h-56 w-full border-0 grayscale-[40%] sepia-[20%] sm:h-64"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              )}
              <div className="relative p-7 sm:p-9">
                {!withMaps && <div className="kolam absolute inset-0 opacity-30" />}
                <div className="relative">
                  <p className="eyebrow">Showroom 0{i + 1}</p>
                  <h3 className="mt-3 text-4xl sm:text-5xl">
                    {s.city}
                    <span lang="te" className="ml-3 font-telugu text-lg text-brass-deep">
                      {s.telugu}
                    </span>
                  </h3>
                  <ul className="mt-6 space-y-3 text-sm text-ink">
                    <li className="flex gap-3">
                      <Icon name="pin" className="mt-0.5 size-4 shrink-0 text-brass-deep" />
                      <span>{s.address.join(", ")}</span>
                    </li>
                    <li className="flex gap-3">
                      <Icon name="clock" className="mt-0.5 size-4 shrink-0 text-brass-deep" />
                      <span>{s.hours}</span>
                    </li>
                  </ul>
                  <div className="mt-7 flex flex-wrap gap-3">
                    <a href={telLink(s.phone)} className="btn btn-primary">
                      <Icon name="phone" className="size-4" /> Call {s.city}
                    </a>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(s.mapQuery)}`}
                      target="_blank"
                      rel="noopener"
                      className="btn btn-ghost"
                    >
                      Directions
                    </a>
                  </div>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

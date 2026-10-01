import Link from "next/link";
import { navLinks, showrooms, site } from "@/data/site";
import { categories } from "@/data/machines";
import { telLink } from "@/lib/format";
import { Icon } from "@/components/ui/Icon";
import { KolamRosette, LotusDivider } from "@/components/ui/Ornament";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-espresso pb-28 text-ivory/75 sm:pb-10">
      <div className="kolam-dark absolute inset-0 opacity-40" />
      <KolamRosette className="absolute -left-20 -top-20 size-80 text-brass/10" />

      <div className="container-luxe relative pt-16 sm:pt-20">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr_1.4fr]">
          <div>
            <Logo light />
            <p className="mt-6 max-w-xs text-sm leading-relaxed">{site.description}</p>
            <p lang="te" className="mt-4 font-telugu text-brass-light/70">
              ప్రతి కప్పులో సంప్రదాయం
            </p>
            <div className="mt-6 flex gap-3">
              {(["instagram", "facebook", "youtube"] as const).map((s) => (
                <a
                  key={s}
                  href={site.social[s]}
                  aria-label={s}
                  target="_blank"
                  rel="noopener"
                  className="grid size-10 place-items-center rounded-full border border-white/15 transition-colors hover:border-brass-light hover:text-brass-light"
                >
                  <Icon name={s} className="size-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="eyebrow text-brass-light">Explore</h3>
            <ul className="mt-5 space-y-3 text-sm">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-brass-light">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="eyebrow text-brass-light">Machines</h3>
            <ul className="mt-5 space-y-3 text-sm">
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link href={`/machines?category=${c.slug}`} className="hover:text-brass-light">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-1">
            {showrooms.map((s) => (
              <div key={s.city}>
                <h3 className="font-display text-2xl text-ivory">
                  {s.city} <span lang="te" className="ml-1 font-telugu text-sm text-brass-light/70">{s.telugu}</span>
                </h3>
                <p className="mt-2 text-sm leading-relaxed">{s.address.join(", ")}</p>
                <a href={telLink(s.phone)} className="mt-2 inline-flex items-center gap-2 text-sm text-brass-light hover:underline">
                  <Icon name="phone" className="size-3.5" /> {s.phone}
                </a>
              </div>
            ))}
          </div>
        </div>

        <LotusDivider light className="mt-16" />
        <div className="mt-6 flex flex-col items-center justify-between gap-3 text-xs text-ivory/50 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p>Brand names belong to their respective owners. Prices are indicative.</p>
        </div>
      </div>
    </footer>
  );
}

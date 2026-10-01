import Link from "next/link";
import { LotusDivider } from "./Ornament";

interface Props {
  eyebrow: string;
  title: React.ReactNode;
  telugu?: string;
  intro?: string;
  crumbs?: { href: string; label: string }[];
}

/** Compact, ornamented header used at the top of inner pages. */
export function PageHero({ eyebrow, title, telugu, intro, crumbs = [] }: Props) {
  return (
    <section className="relative overflow-hidden border-b border-line bg-cream">
      <div className="kolam absolute inset-0 opacity-40" />
      <div className="absolute left-1/2 top-full size-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(180,140,72,0.18),transparent_65%)]" />
      <div className="container-luxe relative py-14 text-center sm:py-20">
        {crumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-6 text-xs text-muted">
            <ol className="flex flex-wrap items-center justify-center gap-2">
              <li>
                <Link href="/" className="hover:text-brass-deep">
                  Home
                </Link>
              </li>
              {crumbs.map((c) => (
                <li key={c.href} className="flex items-center gap-2">
                  <span aria-hidden="true">/</span>
                  <Link href={c.href} className="hover:text-brass-deep">
                    {c.label}
                  </Link>
                </li>
              ))}
            </ol>
          </nav>
        )}
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mx-auto mt-4 max-w-3xl text-5xl leading-[1.02] sm:text-6xl lg:text-7xl">{title}</h1>
        {telugu && (
          <p lang="te" className="mt-3 font-telugu text-brass-deep">
            {telugu}
          </p>
        )}
        <LotusDivider className="mt-6" />
        {intro && <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">{intro}</p>}
      </div>
    </section>
  );
}

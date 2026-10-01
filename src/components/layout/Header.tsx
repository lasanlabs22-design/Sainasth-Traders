"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navLinks, site } from "@/data/site";
import { telLink, whatsappLink } from "@/lib/format";
import { Icon } from "@/components/ui/Icon";
import { KolamRosette } from "@/components/ui/Ornament";
import { Logo } from "./Logo";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <div className="bg-espresso text-ivory/80">
        <div className="container-luxe flex h-9 items-center justify-center gap-6 text-[0.7rem] tracking-[0.14em] sm:justify-between">
          <p className="truncate">
            <span className="text-brass-light">✦</span> Free home demos across Guntur &amp; Vijayawada
          </p>
          <a href={telLink(site.phone)} className="hidden items-center gap-2 hover:text-brass-light sm:flex">
            <Icon name="phone" className="size-3.5" /> {site.phone}
          </a>
        </div>
      </div>

      <header
        className={`sticky top-0 z-40 transition-all duration-500 ${
          scrolled ? "border-b border-line/70 bg-ivory/85 shadow-[0_10px_30px_-20px_rgba(28,18,12,0.4)] backdrop-blur-xl" : "bg-ivory"
        }`}
      >
        <div className="container-luxe flex h-[4.5rem] items-center justify-between gap-6 lg:h-20">
          <Logo />

          <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors hover:text-brass-deep ${
                  isActive(l.href) ? "text-brass-deep" : "text-ink"
                }`}
              >
                {l.label}
                {isActive(l.href) && <span className="absolute inset-x-4 -bottom-0.5 h-px bg-brass" />}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link href="/contact#enquire" className="btn btn-primary hidden min-h-11 sm:inline-flex">
              Book a Demo
            </Link>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="grid size-11 place-items-center rounded-full border border-line text-espresso lg:hidden"
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              <Icon name="menu" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className={`fixed inset-0 z-50 lg:hidden ${open ? "pointer-events-auto" : "pointer-events-none"}`}
      >
        <div
          className={`absolute inset-0 bg-espresso/60 backdrop-blur-sm transition-opacity duration-500 ${open ? "opacity-100" : "opacity-0"}`}
          onClick={() => setOpen(false)}
        />
        <div
          className={`absolute inset-y-0 right-0 flex w-full max-w-sm flex-col overflow-hidden bg-espresso text-ivory transition-transform duration-500 ease-luxe ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="kolam-dark absolute inset-0 opacity-60" />
          <KolamRosette className="absolute -bottom-16 -right-16 size-64 text-brass/15" />
          <div className="relative flex h-[4.5rem] items-center justify-between px-5">
            <Logo light />
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="grid size-11 place-items-center rounded-full border border-white/20"
              aria-label="Close menu"
            >
              <Icon name="close" />
            </button>
          </div>

          <nav aria-label="Mobile" className="relative mt-8 flex flex-col px-6">
            {[{ href: "/", label: "Home" }, ...navLinks].map((l, i) => (
              <Link
                key={l.href}
                href={l.href}
                className={`flex items-baseline justify-between border-b border-white/10 py-4 font-display text-3xl ${
                  pathname === l.href ? "text-brass-light" : "text-ivory"
                }`}
              >
                {l.label}
                <span className="font-sans text-xs tracking-widest text-ivory/40">0{i + 1}</span>
              </Link>
            ))}
          </nav>

          <p lang="te" className="relative mt-8 px-6 font-telugu text-brass-light/80">
            {site.telugu} — మీ ఇంటికే ఉచిత డెమో
          </p>

          <div className="relative mt-auto grid gap-3 p-6">
            <a href={whatsappLink(`Hello ${site.name}, I'd like to know more about your coffee machines.`)} className="btn btn-brass" target="_blank" rel="noopener">
              <Icon name="whatsapp" /> Chat on WhatsApp
            </a>
            <a href={telLink(site.phone)} className="btn btn-ghost-light">
              <Icon name="phone" className="size-4" /> {site.phone}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

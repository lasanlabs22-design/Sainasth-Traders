# Kaapi House — Architecture

Premium coffee-machine showroom site for Guntur & Vijayawada. POC built on **Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4**.

## 1. Goals

| Goal | How it's met |
|---|---|
| Premium + traditional look | Espresso/brass/ivory palette, Cormorant Garamond serif, Telugu accents (Noto Serif Telugu), kolam dot-grids, temple-arch frames, lotus dividers, dabara-tumbler monogram |
| Mobile-first | Every layout designed at 390px first; mobile drawer nav, swipe rails, filter bottom-sheet, sticky Call/WhatsApp bar on product pages, 44px+ tap targets, safe-area insets |
| Lead generation | WhatsApp deep links with pre-filled messages everywhere, enquiry form → `/api/enquiry`, click-to-call, "Book a demo" CTAs |
| Local SEO | Static pre-rendering, per-page metadata, `Store` + `Product` JSON-LD, sitemap.xml, robots.txt, city keywords |
| Easy hand-over | All business info in one file, all machines in one file, photos dropped into `/public` |

## 2. Folder structure

```
src/
├─ app/                         Routes (App Router)
│  ├─ layout.tsx                Fonts, header/footer, WhatsApp FAB, Store JSON-LD
│  ├─ page.tsx                  Home
│  ├─ machines/page.tsx         Catalogue (filters, search, sort)
│  ├─ machines/[slug]/page.tsx  Product detail (SSG via generateStaticParams)
│  ├─ services/page.tsx         Services + AMC plans
│  ├─ about/page.tsx            Story + milestones
│  ├─ contact/page.tsx          Enquiry form + showrooms with maps
│  ├─ api/enquiry/route.ts      Lead intake endpoint
│  ├─ sitemap.ts · robots.ts · not-found.tsx · icon.svg
│  └─ globals.css               Design tokens (@theme) + motif utilities
├─ components/
│  ├─ layout/    Header (client), Footer, Logo, WhatsAppFab
│  ├─ home/      Hero, BrandMarquee, CategoryGrid, Featured, Heritage, Journey, Testimonials, Showrooms, CtaBand
│  ├─ machines/  MachineCard, MachineMedia, MachineVisual (SVG renders), ProductShowcase (client), Catalogue (client)
│  ├─ forms/     EnquiryForm (client)
│  └─ ui/        Icon, Ornament, SectionHeading, PageHero, Reveal
├─ data/         ← content lives here (swap for a CMS later)
│  ├─ site.ts       Brand name, phones, WhatsApp, showrooms, nav
│  ├─ machines.ts   Categories + machine catalogue
│  └─ content.ts    Services, promises, testimonials
└─ lib/
   ├─ types.ts      Domain model (Machine, Category, Showroom…)
   ├─ catalog.ts    Data-access layer (async getters) — the only thing pages call
   ├─ format.ts     INR formatting, WhatsApp / tel links
   └─ enquiry.ts    Shared validation (client + server)
public/images/machines/   Client product photos go here
```

## 3. Rendering strategy

| Route | Mode | Why |
|---|---|---|
| `/`, `/about`, `/services` | Static | Pure content, fastest TTFB |
| `/machines/[slug]` | SSG (12 pages) | SEO-critical product pages |
| `/machines`, `/contact` | Dynamic | Read `?category=` / `?machine=` to pre-select filters/form |
| `/api/enquiry` | Route handler | Lead intake |

Server Components by default; only interactive islands are client components (Header, Catalogue, ProductShowcase, EnquiryForm, Reveal).

## 4. Data flow

```
data/*.ts ──► lib/catalog.ts (async getters) ──► Server Components ──► props ──► client islands
```

Pages never import `data/` directly for machines — they go through `lib/catalog.ts`. Moving to a CMS means rewriting that one file.

## 5. Images

`Machine.images: string[]` — empty ⇒ an illustrated SVG render (`MachineVisual`) in the machine's selected finish colour.
To add real photos: put files in `public/images/machines/` and set e.g. `images: ["/images/machines/dedica-1.webp", "/images/machines/dedica-2.webp"]`. `next/image` handles AVIF/WebP conversion and responsive sizes; multiple images show a thumbnail strip on the product page.
Best results: transparent-background PNG/WebP, ~1600px tall, machine centred.

## 6. Lead pipeline

1. Visitor submits the form → validated client-side (`lib/enquiry.ts`)
2. `POST /api/enquiry` re-validates (same function) → currently logs to console
3. Success screen offers "Continue on WhatsApp" with a pre-filled summary

**Production options** (plug into `route.ts`): email via Resend, Google Sheets append, or a CRM (Zoho / HubSpot) webhook. Add a rate limit / honeypot when going live.

## 7. Roadmap

| Phase | Scope |
|---|---|
| **1 — POC (now)** | Static catalogue, illustrated machines, WhatsApp + form leads |
| 2 — Launch | Client photos & real inventory, real addresses/phones, domain, Vercel deploy, GA4 + Search Console, Google Business Profile links, lead email |
| 3 — Self-serve | Headless CMS (Sanity or Payload) so staff edit machines/prices; offers banner; blog for local SEO ("best coffee machine for office in Vijayawada") |
| 4 — Commerce | Online booking for demos/service, Razorpay deposits/EMI, AMC renewals, customer service tickets, Telugu language toggle (next-intl) |

## 8. Hosting

Recommended: **Vercel** (zero-config for Next.js, free tier is enough for this traffic). Alternatives: any Node host (`npm run build && npm start`) or a VPS behind Nginx.

# Kaapi House — Coffee Machine Showroom (POC)

Premium, mobile-first website for a coffee-machine dealer in Guntur & Vijayawada. Built with Next.js 16, React 19, TypeScript and Tailwind CSS v4.

## Run

```bash
npm install
npm run dev        # http://localhost:3000 (hot reload)
# or production:
npm run build && npm start
```

## Common edits

| Change | File |
|---|---|
| Business name, phone, WhatsApp, showroom addresses | `src/data/site.ts` |
| Machines, prices, specs, photos | `src/data/machines.ts` |
| Services, testimonials | `src/data/content.ts` |
| Colours & fonts | `src/app/globals.css` (`@theme`) and `src/app/layout.tsx` |

**Adding client photos:** drop images in `public/images/machines/` and list them in the machine's `images` array. Until then each machine shows an illustrated render.

All names, phone numbers, addresses, prices and testimonials are POC placeholders. See [ARCHITECTURE.md](ARCHITECTURE.md) for the full design.

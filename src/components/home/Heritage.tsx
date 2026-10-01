import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { LotusDivider } from "@/components/ui/Ornament";

/** Brass dabara–tumbler illustration: the South-Indian filter-coffee set. */
function DabaraArt() {
  return (
    <svg viewBox="0 0 400 440" className="h-full w-full" role="img" aria-label="Brass dabara and tumbler with filter coffee">
      <defs>
        <linearGradient id="brassBody" x1="0" x2="1">
          <stop offset="0" stopColor="#6e521f" />
          <stop offset="0.22" stopColor="#d9b46a" />
          <stop offset="0.4" stopColor="#f3dca0" />
          <stop offset="0.62" stopColor="#b48c48" />
          <stop offset="1" stopColor="#5e4519" />
        </linearGradient>
        <linearGradient id="foam" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#e9cfa7" />
          <stop offset="1" stopColor="#b98a5a" />
        </linearGradient>
        <radialGradient id="floor">
          <stop offset="0" stopColor="#1c120c" stopOpacity="0.35" />
          <stop offset="1" stopColor="#1c120c" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="200" cy="398" rx="150" ry="18" fill="url(#floor)" />
      {/* dabara (wide bowl) */}
      <path d="M70 318 C70 300 330 300 330 318 L318 372 C310 394 90 394 82 372 Z" fill="url(#brassBody)" />
      <ellipse cx="200" cy="318" rx="130" ry="18" fill="#7a5a22" />
      <ellipse cx="200" cy="316" rx="124" ry="14" fill="#8a6a2f" />
      <path d="M64 316 C64 300 336 300 336 316" fill="none" stroke="#f3dca0" strokeWidth="5" strokeLinecap="round" />
      <path d="M96 350 h208" stroke="#5e4519" strokeOpacity="0.45" strokeWidth="1.5" />
      <path d="M100 360 h200" stroke="#f3dca0" strokeOpacity="0.4" strokeWidth="1" />
      {/* tumbler */}
      <path d="M134 120 L266 120 L248 318 C246 330 154 330 152 318 Z" fill="url(#brassBody)" />
      <ellipse cx="200" cy="120" rx="68" ry="12" fill="#5e4519" />
      <ellipse cx="200" cy="122" rx="62" ry="9" fill="url(#foam)" />
      <path d="M128 120 C128 104 272 104 272 120" fill="none" stroke="#f3dca0" strokeWidth="6" strokeLinecap="round" />
      <path d="M144 170 h112M146 190 h108" stroke="#5e4519" strokeOpacity="0.4" strokeWidth="1.5" />
      <path d="M150 280 h100" stroke="#f3dca0" strokeOpacity="0.5" strokeWidth="1" />
      {/* foam bubbles */}
      {[[180, 121], [196, 118], [214, 123], [226, 119], [170, 124]].map(([x, y]) => (
        <circle key={`${x}`} cx={x} cy={y} r="2" fill="#f6ead2" />
      ))}
      {/* steam */}
      <g className="steam" fill="none" stroke="#b48c48" strokeWidth="2.5" strokeLinecap="round" opacity="0.6">
        <path d="M184 96 c-8 -12 8 -20 0 -32 c-8 -12 8 -20 0 -32" />
        <path d="M204 92 c-8 -12 8 -20 0 -32 c-8 -12 8 -20 0 -32" />
        <path d="M222 96 c-8 -12 8 -20 0 -32 c-8 -12 8 -20 0 -32" />
      </g>
    </svg>
  );
}

const pillars = [
  { title: "Rooted", body: "We grew up on degree coffee. We know how Andhra likes its cup — strong, rich and generous." },
  { title: "Refined", body: "Every machine we sell is tested in our showroom and calibrated for local water and beans." },
  { title: "Reliable", body: "Technicians in both cities, genuine spares in stock and service that answers the phone." },
];

export function Heritage() {
  return (
    <section className="container-luxe py-20 sm:py-28">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal className="relative mx-auto w-full max-w-md">
          <div className="arch relative aspect-[4/4.6] overflow-hidden border border-line bg-gradient-to-b from-sand via-cream to-ivory p-8">
            <div className="kolam absolute inset-0 opacity-50" />
            <div className="arch absolute inset-3 border border-brass/30" />
            <div className="relative h-full">
              <DabaraArt />
            </div>
          </div>
          <div className="absolute -right-2 bottom-12 rounded-full bg-kumkum px-5 py-3 text-center text-ivory shadow-xl sm:-right-8">
            <p className="font-display text-2xl leading-none">Since</p>
            <p className="text-xs tracking-[0.25em]">2014</p>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <p className="eyebrow">Our heritage</p>
          <h2 className="mt-4 text-4xl leading-[1.05] sm:text-5xl">
            From the brass <em className="text-brass-deep">dabara</em> to the perfect <em className="text-brass-deep">doppio</em>.
          </h2>
          <p lang="te" className="mt-3 font-telugu text-brass-deep">
            ఫిల్టర్ కాఫీ నుండి ఎస్ప్రెస్సో వరకు
          </p>
          <p className="mt-6 text-lg leading-relaxed text-muted">
            Coffee in Andhra has always been a ritual — the decoction dripping slowly at dawn, the frothy pour between tumbler and
            dabara. We honour that tradition by bringing the same care to modern espresso and bean-to-cup machines, so your morning cup
            is as soulful as it is precise.
          </p>
          <LotusDivider className="my-8 justify-start [&>span:first-child]:hidden" />
          <dl className="grid gap-6 sm:grid-cols-3">
            {pillars.map((p) => (
              <div key={p.title}>
                <dt className="font-display text-2xl text-espresso">{p.title}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-muted">{p.body}</dd>
              </div>
            ))}
          </dl>
          <Link href="/about" className="btn btn-ghost mt-10">
            Read our story
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

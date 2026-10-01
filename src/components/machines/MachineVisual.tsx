import type { SVGProps } from "react";
import type { VisualKind } from "@/lib/types";

interface Props {
  kind: VisualKind;
  color?: string;
  className?: string;
  /** Animate steam above the cup. */
  steam?: boolean;
  title?: string;
}

/**
 * Hand-drawn SVG renders of each machine type. Used as a premium placeholder
 * until real product photography is supplied (see Machine.images).
 */
export function MachineVisual({ kind, color = "#b9bcc0", className, steam = false, title }: Props) {
  const id = `mv-${kind}-${color.replace(/[^a-z0-9]/gi, "")}`;
  const light = isLight(color);

  return (
    <svg viewBox="0 0 400 400" className={className} role="img" aria-label={title ?? `${kind} coffee machine illustration`}>
      <defs>
        <linearGradient id={`${id}-shade`} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity={light ? 0.25 : 0.18} />
          <stop offset="0.35" stopColor="#fff" stopOpacity="0.04" />
          <stop offset="0.75" stopColor="#000" stopOpacity="0.06" />
          <stop offset="1" stopColor="#000" stopOpacity={light ? 0.18 : 0.32} />
        </linearGradient>
        <linearGradient id={`${id}-chrome`} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#8d9095" />
          <stop offset="0.25" stopColor="#f5f5f4" />
          <stop offset="0.5" stopColor="#b4b7bb" />
          <stop offset="0.8" stopColor="#eeeeec" />
          <stop offset="1" stopColor="#7d8085" />
        </linearGradient>
        <linearGradient id={`${id}-chromeV`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#f2f2f0" />
          <stop offset="0.5" stopColor="#a9acb0" />
          <stop offset="1" stopColor="#d9dad8" />
        </linearGradient>
        <linearGradient id={`${id}-glass`} x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#2a2a2e" />
          <stop offset="1" stopColor="#0c0c0e" />
        </linearGradient>
        <linearGradient id={`${id}-coffee`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#c99a6b" />
          <stop offset="0.35" stopColor="#7a4a2a" />
          <stop offset="1" stopColor="#3a2014" />
        </linearGradient>
        <linearGradient id={`${id}-brass`} x1="0" x2="1">
          <stop offset="0" stopColor="#8a6a2f" />
          <stop offset="0.5" stopColor="#e3c584" />
          <stop offset="1" stopColor="#9c7838" />
        </linearGradient>
        <radialGradient id={`${id}-shadow`}>
          <stop offset="0" stopColor="#1c120c" stopOpacity="0.38" />
          <stop offset="1" stopColor="#1c120c" stopOpacity="0" />
        </radialGradient>
      </defs>

      <ellipse cx="200" cy="352" rx={kind === "commercial" ? 175 : 125} ry="16" fill={`url(#${id}-shadow)`} />

      {kind === "espresso" && <Espresso id={id} color={color} />}
      {kind === "espresso-grinder" && <Espresso id={id} color={color} grinder />}
      {kind === "superauto" && <SuperAuto id={id} color={color} />}
      {kind === "capsule" && <Capsule id={id} color={color} />}
      {kind === "commercial" && <Commercial id={id} color={color} />}

      {steam && (
        <g className="steam" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" opacity="0.8">
          <path d={steamPath(kind)} />
          <path d={steamPath(kind, 8)} />
          <path d={steamPath(kind, -8)} />
        </g>
      )}
    </svg>
  );
}

function steamPath(kind: VisualKind, dx = 0) {
  const x = (kind === "commercial" ? 120 : kind === "espresso-grinder" ? 218 : 200) + dx;
  const y = kind === "superauto" ? 236 : kind === "capsule" ? 262 : kind === "commercial" ? 268 : 262;
  return `M${x} ${y} c-6 -8 6 -14 0 -22 c-6 -8 6 -14 0 -22`;
}

function isLight(hex: string) {
  const m = hex.replace("#", "");
  if (m.length !== 6) return false;
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(m.slice(i, i + 2), 16));
  return 0.299 * r + 0.587 * g + 0.114 * b > 170;
}

type PartProps = { id: string; color: string };

function Body({ id, color, ...rect }: PartProps & SVGProps<SVGRectElement>) {
  return (
    <>
      <rect {...rect} fill={color} stroke="rgba(0,0,0,.18)" strokeWidth="1" />
      <rect {...rect} fill={`url(#${id}-shade)`} />
    </>
  );
}

function Cup({ x, y, id, w = 34 }: { x: number; y: number; id: string; w?: number }) {
  return (
    <g>
      <path d={`M${x} ${y} h${w} l-3 ${w * 0.7} a4 4 0 0 1 -4 3 h${-(w - 14)} a4 4 0 0 1 -4 -3 z`} fill="#fbf7f0" stroke="#d8cbb6" />
      <path d={`M${x + w - 1} ${y + 6} q12 2 8 12 q-3 6 -10 5`} fill="none" stroke="#e7dac4" strokeWidth="4" />
      <ellipse cx={x + w / 2} cy={y + 1.5} rx={w / 2 - 1.5} ry="3" fill={`url(#${id}-coffee)`} />
    </g>
  );
}

function DripTray({ id, x, y, w }: { id: string; x: number; y: number; w: number }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height="20" rx="4" fill={`url(#${id}-chrome)`} stroke="rgba(0,0,0,.2)" />
      {Array.from({ length: Math.floor(w / 12) }).map((_, i) => (
        <rect key={i} x={x + 8 + i * 12} y={y + 4} width="5" height="4" rx="1.5" fill="rgba(0,0,0,.25)" />
      ))}
    </g>
  );
}

function Gauge({ id, cx, cy, r = 17 }: { id: string; cx: number; cy: number; r?: number }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r + 3} fill={`url(#${id}-chrome)`} />
      <circle cx={cx} cy={cy} r={r} fill="#f8f4ec" />
      <path d={`M${cx - r * 0.7} ${cy + r * 0.3} A ${r * 0.75} ${r * 0.75} 0 0 1 ${cx + r * 0.7} ${cy + r * 0.3}`} fill="none" stroke="#b48c48" strokeWidth="1.5" />
      <path d={`M${cx + r * 0.25} ${cy - r * 0.35} A ${r * 0.75} ${r * 0.75} 0 0 1 ${cx + r * 0.7} ${cy + r * 0.3}`} fill="none" stroke="#8e2b1d" strokeWidth="2" />
      <line x1={cx} y1={cy} x2={cx + r * 0.45} y2={cy - r * 0.55} stroke="#1c120c" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx={cx} cy={cy} r="2" fill="#1c120c" />
    </g>
  );
}

function Portafilter({ id, x, y, handle = 70, flip = false }: { id: string; x: number; y: number; handle?: number; flip?: boolean }) {
  const dir = flip ? -1 : 1;
  return (
    <g>
      <rect x={x - 32} y={y} width="64" height="22" rx="5" fill={`url(#${id}-chrome)`} stroke="rgba(0,0,0,.2)" />
      <path d={`M${x - 28} ${y + 22} h56 l-4 12 h-48 z`} fill={`url(#${id}-chrome)`} stroke="rgba(0,0,0,.2)" />
      <rect
        x={flip ? x - 26 - handle : x + 26}
        y={y + 23}
        width={handle}
        height="10"
        rx="5"
        fill="#17110d"
        transform={`rotate(${dir * -4} ${x + dir * 26} ${y + 28})`}
      />
      <rect x={x - 6} y={y + 34} width="12" height="5" rx="2" fill={`url(#${id}-chromeV)`} />
    </g>
  );
}

function Espresso({ id, color, grinder = false }: PartProps & { grinder?: boolean }) {
  const left = grinder ? 92 : 112;
  const width = grinder ? 216 : 176;
  const gx = grinder ? 218 : 200;
  return (
    <g>
      {grinder && (
        <g>
          <path d="M106 34 h62 l-8 52 h-46 z" fill="#c98a3c" fillOpacity="0.2" stroke="rgba(0,0,0,.25)" />
          {Array.from({ length: 16 }).map((_, i) => (
            <ellipse key={i} cx={118 + (i % 5) * 9 + (i % 2) * 3} cy={58 + Math.floor(i / 5) * 7} rx="4" ry="2.8" fill="#4a2b18" transform={`rotate(${i * 37} ${118 + (i % 5) * 9} ${58 + Math.floor(i / 5) * 7})`} />
          ))}
          <rect x="102" y="28" width="70" height="9" rx="4" fill="#17110d" />
          <rect x="110" y="86" width="54" height="8" fill="#17110d" />
        </g>
      )}
      <rect x={left - 6} y="84" width={width + 12} height="12" rx="4" fill={`url(#${id}-chrome)`} />
      <Body id={id} color={color} x={left} y="94" width={width} height="236" rx="12" />
      {/* control panel */}
      <rect x={left + 14} y="110" width={width - 28} height="54" rx="8" fill="rgba(0,0,0,.08)" />
      <Gauge id={id} cx={gx} cy={137} />
      {[-48, -34, 34, 48].map((dx) => (
        <circle key={dx} cx={gx + dx} cy={137} r="5" fill={`url(#${id}-chrome)`} stroke="rgba(0,0,0,.25)" />
      ))}
      {grinder && (
        <g>
          <rect x="108" y="178" width="44" height="36" rx="6" fill="rgba(0,0,0,.18)" />
          <rect x="118" y="196" width="24" height="14" rx="3" fill={`url(#${id}-chromeV)`} />
          <circle cx="130" cy="244" r="12" fill={`url(#${id}-chrome)`} stroke="rgba(0,0,0,.2)" />
          <circle cx="130" cy="244" r="4" fill="#17110d" />
        </g>
      )}
      {/* group head + portafilter */}
      <rect x={gx - 30} y="176" width="60" height="16" rx="5" fill={`url(#${id}-chromeV)`} stroke="rgba(0,0,0,.2)" />
      <Portafilter id={id} x={gx} y={190} />
      <line x1={gx - 3} y1="230" x2={gx - 3} y2="262" stroke="#5a3420" strokeWidth="2" />
      <line x1={gx + 3} y1="230" x2={gx + 3} y2="262" stroke="#5a3420" strokeWidth="2" />
      {/* steam wand */}
      <circle cx={left + width + 2} cy="168" r="7" fill={`url(#${id}-chrome)`} stroke="rgba(0,0,0,.2)" />
      <path d={`M${left + width + 4} 176 q22 4 22 30 v76`} fill="none" stroke={`url(#${id}-chromeV)`} strokeWidth="6" strokeLinecap="round" />
      {/* tray area */}
      <rect x={left + 10} y="244" width={width - 20} height="60" rx="8" fill="rgba(0,0,0,.14)" />
      <Cup id={id} x={gx - 17} y={268} />
      <DripTray id={id} x={left + 6} y={302} w={width - 12} />
      <rect x={left - 4} y="324" width={width + 8} height="14" rx="5" fill="#17110d" opacity="0.85" />
      <rect x={gx - 18} y="312" width="36" height="3" rx="1.5" fill={`url(#${id}-brass)`} opacity="0.9" />
    </g>
  );
}

function SuperAuto({ id, color }: PartProps) {
  return (
    <g>
      <Body id={id} color={color} x="116" y="64" width="168" height="272" rx="18" />
      <rect x="128" y="64" width="144" height="16" rx="6" fill="rgba(255,255,255,.12)" />
      <rect x="182" y="68" width="36" height="6" rx="3" fill="rgba(0,0,0,.3)" />
      {/* display */}
      <rect x="140" y="96" width="120" height="66" rx="8" fill={`url(#${id}-glass)`} stroke="rgba(255,255,255,.15)" />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <circle cx={164 + i * 36} cy="120" r="9" fill="none" stroke="#dcbb78" strokeWidth="1.4" />
          <path d={`M${159 + i * 36} 119 h10 v4 a5 5 0 0 1 -10 0 z`} fill="#dcbb78" opacity="0.8" />
          <rect x={154 + i * 36} y="138" width="20" height="3" rx="1.5" fill="#dcbb78" opacity="0.5" />
        </g>
      ))}
      {[0, 1, 2, 3].map((i) => (
        <circle key={i} cx={152 + i * 32} cy="176" r="5" fill="rgba(255,255,255,.25)" stroke="rgba(0,0,0,.25)" />
      ))}
      {/* brew recess */}
      <rect x="150" y="194" width="100" height="128" rx="12" fill="#0f0b09" opacity="0.82" />
      <rect x="178" y="198" width="44" height="20" rx="5" fill={`url(#${id}-chromeV)`} />
      <rect x="187" y="216" width="8" height="10" rx="2" fill="#2a2a2e" />
      <rect x="205" y="216" width="8" height="10" rx="2" fill="#2a2a2e" />
      {/* latte glass */}
      <g>
        <path d="M182 244 h36 l-3 62 h-30 z" fill="#fbf7f0" opacity="0.18" stroke="rgba(255,255,255,.6)" />
        <path d="M183.5 258 h33 l-1 16 h-31 z" fill="#f2e6d3" />
        <path d="M184.5 274 h31 l-0.8 14 h-29.4 z" fill="#a8703f" />
        <path d="M185.3 288 h29.4 l-0.6 16 h-28.2 z" fill="#f6efe4" />
      </g>
      <DripTray id={id} x={156} y={304} w={88} />
      <rect x="120" y="330" width="160" height="10" rx="4" fill="#17110d" opacity="0.85" />
      <rect x="186" y="186" width="28" height="2.5" rx="1.25" fill={`url(#${id}-brass)`} />
    </g>
  );
}

function Capsule({ id, color }: PartProps) {
  return (
    <g>
      <Body id={id} color={color} x="150" y="100" width="100" height="236" rx="30" />
      {/* head + lever */}
      <path d="M150 140 q0 -40 50 -40 q50 0 50 40 z" fill="rgba(0,0,0,.12)" />
      <path d="M162 108 q38 -34 80 -6" fill="none" stroke={`url(#${id}-chromeV)`} strokeWidth="7" strokeLinecap="round" />
      <circle cx="184" cy="152" r="7" fill={`url(#${id}-chrome)`} stroke="rgba(0,0,0,.2)" />
      <circle cx="216" cy="152" r="7" fill={`url(#${id}-chrome)`} stroke="rgba(0,0,0,.2)" />
      <circle cx="184" cy="152" r="2.5" fill="#dcbb78" />
      {/* spout */}
      <rect x="186" y="200" width="28" height="18" rx="5" fill={`url(#${id}-chromeV)`} />
      <line x1="200" y1="218" x2="200" y2="264" stroke="#5a3420" strokeWidth="2.5" />
      <rect x="160" y="226" width="80" height="80" rx="10" fill="rgba(0,0,0,.12)" />
      <Cup id={id} x={183} y={268} />
      <DripTray id={id} x={162} y={302} w={76} />
      <rect x="154" y="326" width="92" height="12" rx="5" fill="#17110d" opacity="0.85" />
    </g>
  );
}

function Commercial({ id, color }: PartProps) {
  return (
    <g>
      {/* cups on warmer */}
      {[0, 1, 2, 3, 4].map((i) => (
        <path key={i} d={`M${108 + i * 44} 84 h26 l-3 18 h-20 z`} fill="#fbf7f0" stroke="#d8cbb6" />
      ))}
      <rect x="54" y="100" width="292" height="12" rx="4" fill={`url(#${id}-chrome)`} />
      <rect x="54" y="98" width="292" height="3" fill="#dcbb78" opacity="0.6" />
      <Body id={id} color={color} x="60" y="110" width="280" height="160" rx="10" />
      <rect x="60" y="110" width="280" height="18" fill="rgba(0,0,0,.12)" />
      <rect x="172" y="138" width="56" height="16" rx="3" fill={`url(#${id}-brass)`} />
      <Gauge id={id} cx={145} cy={146} r={13} />
      <Gauge id={id} cx={255} cy={146} r={13} />
      {/* button pads */}
      {[120, 280].map((x) => (
        <rect key={x} x={x - 26} y="172" width="52" height="14" rx="4" fill={`url(#${id}-glass)`} />
      ))}
      {[120, 280].map((x) => (
        <g key={x}>
          <rect x={x - 30} y="194" width="60" height="16" rx="5" fill={`url(#${id}-chromeV)`} stroke="rgba(0,0,0,.2)" />
          <Portafilter id={id} x={x} y={208} handle={60} flip={x < 200} />
          <line x1={x - 3} y1="248" x2={x - 3} y2="268" stroke="#5a3420" strokeWidth="2" />
          <line x1={x + 3} y1="248" x2={x + 3} y2="268" stroke="#5a3420" strokeWidth="2" />
        </g>
      ))}
      {/* steam wands */}
      <path d="M66 190 q-18 4 -18 26 v74" fill="none" stroke={`url(#${id}-chromeV)`} strokeWidth="6" strokeLinecap="round" />
      <path d="M334 190 q18 4 18 26 v74" fill="none" stroke={`url(#${id}-chromeV)`} strokeWidth="6" strokeLinecap="round" />
      {/* lower body + tray */}
      <rect x="60" y="262" width="280" height="56" rx="6" fill="rgba(0,0,0,.25)" />
      <Cup id={id} x={103} y={274} />
      <Cup id={id} x={263} y={274} />
      <DripTray id={id} x={64} y={306} w={272} />
      <Body id={id} color={color} x="56" y="326" width="288" height="14" rx="4" />
      {[70, 322].map((x) => (
        <rect key={x} x={x} y="340" width="10" height="8" rx="2" fill={`url(#${id}-chromeV)`} />
      ))}
    </g>
  );
}

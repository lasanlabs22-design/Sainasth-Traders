/** Traditional brass ornaments — a lotus-and-dot divider and a kolam rosette. */

export function LotusDivider({ className = "", light = false }: { className?: string; light?: boolean }) {
  const c = light ? "var(--color-brass-light)" : "var(--color-brass)";
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`} aria-hidden="true">
      <span className="h-px w-12 sm:w-20" style={{ background: `linear-gradient(90deg, transparent, ${c})` }} />
      <svg viewBox="0 0 48 24" className="h-5 w-10" fill="none" stroke={c} strokeWidth="1.2">
        <path d="M24 3c3 4 3 10 0 15-3-5-3-11 0-15z" />
        <path d="M24 18c-4-1-9-5-10-10 5 0 9 4 10 10zM24 18c4-1 9-5 10-10-5 0-9 4-10 10z" />
        <path d="M24 18c-6 1-13-1-17-5 6-2 13 0 17 5zM24 18c6 1 13-1 17-5-6-2-13 0-17 5z" />
        <circle cx="3" cy="13" r="1" fill={c} />
        <circle cx="45" cy="13" r="1" fill={c} />
      </svg>
      <span className="h-px w-12 sm:w-20" style={{ background: `linear-gradient(270deg, transparent, ${c})` }} />
    </div>
  );
}

export function KolamRosette({ className = "" }: { className?: string }) {
  const dots = [];
  for (let r = 0; r < 5; r++) for (let c = 0; c < 5; c++) dots.push([20 + c * 20, 20 + r * 20]);
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" stroke="currentColor" strokeWidth="1.1" aria-hidden="true">
      {dots.map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="1.6" fill="currentColor" stroke="none" />
      ))}
      <path d="M60 10 C90 30 90 30 110 60 C90 90 90 90 60 110 C30 90 30 90 10 60 C30 30 30 30 60 10Z" />
      <path d="M60 30 C75 45 75 45 90 60 C75 75 75 75 60 90 C45 75 45 75 30 60 C45 45 45 45 60 30Z" />
      <path d="M30 30 Q60 50 90 30 Q70 60 90 90 Q60 70 30 90 Q50 60 30 30Z" />
      <circle cx="60" cy="60" r="8" />
    </svg>
  );
}

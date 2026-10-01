import { LotusDivider } from "./Ornament";

interface Props {
  eyebrow: string;
  title: React.ReactNode;
  telugu?: string;
  intro?: string;
  align?: "center" | "left";
  light?: boolean;
}

export function SectionHeading({ eyebrow, title, telugu, intro, align = "center", light = false }: Props) {
  const centered = align === "center";
  return (
    <div className={centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className={`eyebrow ${light ? "text-brass-light" : ""}`}>{eyebrow}</p>
      <h2 className={`mt-4 text-4xl leading-[1.05] sm:text-5xl ${light ? "text-ivory" : ""}`}>{title}</h2>
      {telugu && (
        <p lang="te" className={`mt-2 font-telugu text-base ${light ? "text-brass-light/80" : "text-brass-deep"}`}>
          {telugu}
        </p>
      )}
      {centered && <LotusDivider className="mt-5" light={light} />}
      {intro && <p className={`mt-5 text-base leading-relaxed sm:text-lg ${light ? "text-ivory/70" : "text-muted"}`}>{intro}</p>}
    </div>
  );
}

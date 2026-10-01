import { getFeaturedMachines, getMachine } from "@/lib/catalog";
import { Hero } from "@/components/home/Hero";
import { BrandMarquee } from "@/components/home/BrandMarquee";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { Featured } from "@/components/home/Featured";
import { Heritage } from "@/components/home/Heritage";
import { Journey } from "@/components/home/Journey";
import { Testimonials } from "@/components/home/Testimonials";
import { Showrooms } from "@/components/home/Showrooms";
import { CtaBand } from "@/components/home/CtaBand";

export default async function HomePage() {
  const [featured, spotlight] = await Promise.all([getFeaturedMachines(), getMachine("la-marzocco-linea-mini")]);

  return (
    <>
      <Hero spotlight={spotlight ?? featured[0]} />
      <BrandMarquee />
      <CategoryGrid />
      <Featured machines={featured.filter((m) => m.slug !== spotlight?.slug)} />
      <Heritage />
      <Journey />
      <Testimonials />
      <Showrooms />
      <CtaBand />
    </>
  );
}

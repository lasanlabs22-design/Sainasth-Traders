import type { Metadata } from "next";
import { getAllMachines, getCategories } from "@/lib/catalog";
import type { CategorySlug } from "@/lib/types";
import { PageHero } from "@/components/ui/PageHero";
import { Catalogue } from "@/components/machines/Catalogue";
import { CtaBand } from "@/components/home/CtaBand";

export const metadata: Metadata = {
  title: "Coffee Machines",
  description: "Browse premium espresso, bean-to-cup, capsule and commercial coffee machines available in Guntur and Vijayawada.",
};

export default async function MachinesPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const [{ category }, machines, categories] = await Promise.all([searchParams, getAllMachines(), getCategories()]);
  const initial = categories.some((c) => c.slug === category) ? (category as CategorySlug) : undefined;

  return (
    <>
      <PageHero
        eyebrow="The collection"
        title={
          <>
            Machines worthy of <em className="text-brass-deep">your ritual</em>
          </>
        }
        telugu="మా కాఫీ యంత్రాల సేకరణ"
        intro="Every machine here can be tasted at our showrooms or demonstrated at your home. Prices are indicative — ask us for current offers and EMI plans."
        crumbs={[{ href: "/machines", label: "Machines" }]}
      />
      <section className="container-luxe py-10 sm:py-14">
        <Catalogue key={initial ?? "all"} machines={machines} categories={categories} initialCategory={initial} />
      </section>
      <CtaBand title="Can’t decide? Let us help." body="Tell us how many cups you brew a day and your budget — we’ll shortlist the right three machines for you." />
    </>
  );
}

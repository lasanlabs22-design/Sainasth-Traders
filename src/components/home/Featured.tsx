import Link from "next/link";
import type { Machine } from "@/lib/types";
import { MachineCard } from "@/components/machines/MachineCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function Featured({ machines }: { machines: Machine[] }) {
  return (
    <section className="relative bg-cream py-20 sm:py-28">
      <div className="kolam absolute inset-0 opacity-25" />
      <div className="container-luxe relative">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            align="left"
            eyebrow="The collection"
            title={
              <>
                Signature machines, <em className="text-brass-deep">hand-picked</em>
              </>
            }
            telugu="మా ప్రత్యేక ఎంపికలు"
          />
          <Link href="/machines" className="btn btn-ghost shrink-0">
            View all machines
          </Link>
        </div>

        {/* Horizontal rail on mobile, grid from md */}
        <div className="no-scrollbar -mx-4 mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 md:mx-0 md:grid md:grid-cols-2 md:overflow-visible md:px-0 xl:grid-cols-4">
          {machines.slice(0, 4).map((m, i) => (
            <Reveal key={m.slug} delay={i * 90} className="w-[78%] shrink-0 snap-center sm:w-[46%] md:w-auto">
              <MachineCard machine={m} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

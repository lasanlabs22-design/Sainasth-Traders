import type { Metadata } from "next";
import { getAllMachines } from "@/lib/catalog";
import { machineTitle, telLink, whatsappLink } from "@/lib/format";
import { site } from "@/data/site";
import { PageHero } from "@/components/ui/PageHero";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { Showrooms } from "@/components/home/Showrooms";
import { Icon } from "@/components/ui/Icon";

export const metadata: Metadata = {
  title: "Visit Us & Book a Demo",
  description: "Visit our coffee machine showrooms in Guntur and Vijayawada, or book a free home demo.",
};

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ machine?: string }> }) {
  const [{ machine }, machines] = await Promise.all([searchParams, getAllMachines()]);
  const options = machines.map((m) => ({ slug: m.slug, label: machineTitle(m) }));

  const quick = [
    { icon: "phone" as const, label: "Call us", value: site.phone, href: telLink(site.phone) },
    { icon: "whatsapp" as const, label: "WhatsApp", value: "Chat instantly", href: whatsappLink(`Hello ${site.name}!`) },
    { icon: "mail" as const, label: "Email", value: site.email, href: `mailto:${site.email}` },
  ];

  return (
    <>
      <PageHero
        eyebrow="Visit us"
        title={
          <>
            Come for the coffee, <em className="text-brass-deep">stay for the conversation</em>
          </>
        }
        telugu="మమ్మల్ని సంప్రదించండి"
        crumbs={[{ href: "/contact", label: "Visit Us" }]}
      />

      <section id="enquire" className="container-luxe scroll-mt-28 py-16 sm:py-24">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          <div>
            <p className="eyebrow">Book a free demo</p>
            <h2 className="mt-4 text-4xl leading-[1.05] sm:text-5xl">
              Tell us about your <em className="text-brass-deep">perfect cup</em>.
            </h2>
            <p className="mt-5 leading-relaxed text-muted">
              Share a few details and our coffee specialist will call you back — usually within the same working day — to arrange a demo
              at our showroom or at your home, office or café.
            </p>
            <ul className="mt-8 space-y-3">
              {quick.map((q) => (
                <li key={q.label}>
                  <a
                    href={q.href}
                    target={q.icon === "whatsapp" ? "_blank" : undefined}
                    rel="noopener"
                    className="flex items-center gap-4 rounded-2xl border border-line bg-cream p-4 transition-colors hover:border-brass"
                  >
                    <span className="grid size-12 shrink-0 place-items-center rounded-full bg-espresso text-brass-light">
                      <Icon name={q.icon} className="size-5" />
                    </span>
                    <span>
                      <span className="block text-xs uppercase tracking-[0.2em] text-muted">{q.label}</span>
                      <span className="block font-semibold text-espresso">{q.value}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <EnquiryForm machines={options} defaultMachine={machine} />
        </div>
      </section>

      <div className="bg-cream">
        <Showrooms withMaps heading={false} />
      </div>
    </>
  );
}

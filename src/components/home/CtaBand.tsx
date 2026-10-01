import Link from "next/link";
import { site } from "@/data/site";
import { whatsappLink } from "@/lib/format";
import { Icon } from "@/components/ui/Icon";
import { KolamRosette } from "@/components/ui/Ornament";

export function CtaBand({
  title = "Taste it before you take it home.",
  body = "Book a free, no-obligation demo at your home, office or café anywhere in Guntur and Vijayawada.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="container-luxe pb-20 sm:pb-28">
      <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-brass-light via-brass to-brass-deep px-6 py-14 text-center sm:rounded-[2.5rem] sm:px-12 sm:py-20">
        <KolamRosette className="absolute -left-10 -top-10 size-56 text-espresso/10" />
        <KolamRosette className="absolute -bottom-12 -right-10 size-64 text-espresso/10" />
        <p className="eyebrow relative text-espresso/70">Free home demo</p>
        <h2 className="relative mx-auto mt-4 max-w-2xl text-4xl leading-[1.05] sm:text-6xl">{title}</h2>
        <p className="relative mx-auto mt-5 max-w-xl text-espresso/75">{body}</p>
        <div className="relative mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/contact#enquire" className="btn btn-primary">
            Book my demo <Icon name="arrow" className="size-4" />
          </Link>
          <a
            href={whatsappLink(`Hello ${site.name}, I'd like to book a free coffee machine demo.`)}
            target="_blank"
            rel="noopener"
            className="btn border border-espresso/30 text-espresso hover:bg-espresso/10"
          >
            <Icon name="whatsapp" /> WhatsApp us
          </a>
        </div>
      </div>
    </section>
  );
}

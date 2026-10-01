import { site } from "@/data/site";
import { whatsappLink } from "@/lib/format";
import { Icon } from "@/components/ui/Icon";

export function WhatsAppFab() {
  return (
    <a
      href={whatsappLink(`Hello ${site.name}, I'd like to know more about your coffee machines.`)}
      target="_blank"
      rel="noopener"
      aria-label="Chat with us on WhatsApp"
      className="wa-fab fixed bottom-5 right-5 z-30 grid size-14 place-items-center rounded-full bg-[#1f9d55] text-white shadow-[0_14px_30px_-10px_rgba(31,157,85,0.7)] ring-4 ring-ivory/70 transition-transform hover:scale-105"
    >
      <Icon name="whatsapp" className="size-7" />
    </a>
  );
}

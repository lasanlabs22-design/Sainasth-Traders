import { site } from "@/data/site";
import type { Machine } from "@/lib/types";

const inr = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });

export function formatPrice(price: number | null): string {
  return price === null ? "Price on request" : inr.format(price);
}

export function machineTitle(m: Pick<Machine, "brand" | "name">): string {
  return `${m.brand} ${m.name}`;
}

export function whatsappLink(message: string): string {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function machineEnquiryMessage(m: Machine): string {
  return `Hello ${site.name}, I'm interested in the ${machineTitle(m)} (${m.model}). Please share price, availability and a demo slot.`;
}

export function telLink(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

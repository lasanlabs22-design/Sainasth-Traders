import type { Showroom } from "@/lib/types";

/**
 * Business identity — edit this one file to rebrand the whole site.
 * All values below are POC placeholders.
 */
export const site = {
  name: "Kaapi House",
  telugu: "కాఫీ హౌస్",
  tagline: "Premium coffee machines for Guntur & Vijayawada",
  description:
    "Authorised sales, installation and service of premium espresso, bean-to-cup and commercial coffee machines across Guntur and Vijayawada.",
  url: "https://www.example.com",
  phone: "+91 90000 00000",
  whatsapp: "919000000000",
  email: "hello@example.com",
  established: "2014",
  social: {
    instagram: "https://instagram.com/",
    facebook: "https://facebook.com/",
    youtube: "https://youtube.com/",
  },
} as const;

export const showrooms: Showroom[] = [
  {
    city: "Guntur",
    telugu: "గుంటూరు",
    address: ["Showroom address line 1", "Brodipet, Guntur", "Andhra Pradesh 522002"],
    phone: "+91 90000 00001",
    hours: "Mon – Sat · 10:00 am – 8:30 pm",
    mapQuery: "Brodipet, Guntur, Andhra Pradesh",
  },
  {
    city: "Vijayawada",
    telugu: "విజయవాడ",
    address: ["Showroom address line 1", "MG Road, Labbipet, Vijayawada", "Andhra Pradesh 520010"],
    phone: "+91 90000 00002",
    hours: "Mon – Sat · 10:00 am – 8:30 pm",
    mapQuery: "MG Road, Labbipet, Vijayawada, Andhra Pradesh",
  },
];

export const navLinks = [
  { href: "/machines", label: "Machines" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "Our Story" },
  { href: "/contact", label: "Visit Us" },
] as const;

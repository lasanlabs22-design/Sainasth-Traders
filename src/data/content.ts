import type { Testimonial } from "@/lib/types";

export const services = [
  {
    title: "Free Home Demo",
    body: "We bring the machine to your home or office, brew with you, and help you choose — no obligation.",
    icon: "demo",
  },
  {
    title: "Installation & Setup",
    body: "Certified technicians install, calibrate the grind and teach you the machine on day one.",
    icon: "install",
  },
  {
    title: "Annual Maintenance (AMC)",
    body: "Scheduled descaling, gasket checks and priority breakdown visits for homes, offices and cafés.",
    icon: "amc",
  },
  {
    title: "Office & Café Rentals",
    body: "Flexible monthly plans for offices, clinics and cafés — machine, beans and service bundled.",
    icon: "rental",
  },
  {
    title: "Barista Training",
    body: "Hands-on sessions for café staff and home enthusiasts — extraction, milk texturing and latte art.",
    icon: "training",
  },
  {
    title: "Genuine Spares",
    body: "Original gaskets, filters, portafilters and accessories stocked in both showrooms.",
    icon: "spares",
  },
] as const;

export const promises = [
  { label: "Free demo", sub: "at your home" },
  { label: "Same-week", sub: "installation" },
  { label: "EMI options", sub: "on all machines" },
  { label: "Local service", sub: "Guntur & Vijayawada" },
] as const;

export const testimonials: Testimonial[] = [
  {
    quote:
      "They came home, made filter-strength coffee on the espresso machine for my father, and he was sold. Installation was the next day.",
    name: "Customer name",
    role: "Home customer",
    city: "Guntur",
  },
  {
    quote:
      "We run two cafés on Appia machines from them. When a pump failed on a Sunday, their technician was there within hours.",
    name: "Customer name",
    role: "Café owner",
    city: "Vijayawada",
  },
  {
    quote:
      "The office rental plan was simple — machine, beans and monthly service in one bill. Our team loves the bean-to-cup.",
    name: "Customer name",
    role: "Office administrator",
    city: "Vijayawada",
  },
];

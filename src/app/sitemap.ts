import type { MetadataRoute } from "next";
import { getAllMachines } from "@/lib/catalog";
import { site } from "@/data/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = ["", "/machines", "/services", "/about", "/contact"].map((p) => ({ url: `${site.url}${p}`, changeFrequency: "weekly" as const, priority: p ? 0.8 : 1 }));
  const machines = (await getAllMachines()).map((m) => ({ url: `${site.url}/machines/${m.slug}`, changeFrequency: "monthly" as const, priority: 0.7 }));
  return [...pages, ...machines];
}

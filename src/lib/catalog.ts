import { categories, machines } from "@/data/machines";
import type { CategorySlug, Machine } from "@/lib/types";

/**
 * Data-access layer. Pages only talk to these functions, so swapping the
 * static data for a CMS or database later means changing this file only.
 */

export async function getAllMachines(): Promise<Machine[]> {
  return machines;
}

export async function getMachine(slug: string): Promise<Machine | undefined> {
  return machines.find((m) => m.slug === slug);
}

export async function getFeaturedMachines(): Promise<Machine[]> {
  return machines.filter((m) => m.featured);
}

export async function getRelatedMachines(machine: Machine, limit = 3): Promise<Machine[]> {
  return machines
    .filter((m) => m.slug !== machine.slug && m.category === machine.category)
    .concat(machines.filter((m) => m.category !== machine.category && m.idealFor.some((u) => machine.idealFor.includes(u))))
    .filter((m) => m.slug !== machine.slug)
    .slice(0, limit);
}

export async function getCategories() {
  return categories;
}

export function getCategory(slug: CategorySlug) {
  return categories.find((c) => c.slug === slug)!;
}

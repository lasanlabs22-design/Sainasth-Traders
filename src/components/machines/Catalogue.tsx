"use client";

import { useEffect, useMemo, useState } from "react";
import type { Category, CategorySlug, Machine, UseCase } from "@/lib/types";
import { MachineCard } from "./MachineCard";
import { Icon } from "@/components/ui/Icon";

const useCases: { value: UseCase; label: string }[] = [
  { value: "home", label: "Home" },
  { value: "office", label: "Office" },
  { value: "cafe", label: "Café & Hotel" },
];

const budgets = [
  { value: "u20", label: "Under ₹20,000", test: (p: number | null) => p !== null && p < 20000 },
  { value: "20-60", label: "₹20,000 – ₹60,000", test: (p: number | null) => p !== null && p >= 20000 && p <= 60000 },
  { value: "60-150", label: "₹60,000 – ₹1.5 lakh", test: (p: number | null) => p !== null && p > 60000 && p <= 150000 },
  { value: "premium", label: "₹1.5 lakh+ / on request", test: (p: number | null) => p === null || p > 150000 },
] as const;

const sorts = [
  { value: "featured", label: "Recommended" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
] as const;

type Sort = (typeof sorts)[number]["value"];

export function Catalogue({ machines, categories, initialCategory }: { machines: Machine[]; categories: Category[]; initialCategory?: CategorySlug }) {
  const [category, setCategory] = useState<CategorySlug | "all">(initialCategory ?? "all");
  const [uses, setUses] = useState<UseCase[]>([]);
  const [budget, setBudget] = useState<string | null>(null);
  const [sort, setSort] = useState<Sort>("featured");
  const [query, setQuery] = useState("");
  const [sheetOpen, setSheetOpen] = useState(false);

  // Keep ?category= in the URL shareable without a server round-trip.
  useEffect(() => {
    const url = new URL(window.location.href);
    if (category === "all") url.searchParams.delete("category");
    else url.searchParams.set("category", category);
    window.history.replaceState(null, "", url);
  }, [category]);

  useEffect(() => {
    document.body.style.overflow = sheetOpen ? "hidden" : "";
  }, [sheetOpen]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const b = budgets.find((x) => x.value === budget);
    const list = machines.filter(
      (m) =>
        (category === "all" || m.category === category) &&
        (uses.length === 0 || uses.some((u) => m.idealFor.includes(u))) &&
        (!b || b.test(m.price)) &&
        (!q || `${m.brand} ${m.name} ${m.model} ${m.tagline}`.toLowerCase().includes(q)),
    );
    const price = (m: Machine) => m.price ?? Number.MAX_SAFE_INTEGER;
    if (sort === "price-asc") list.sort((a, b) => price(a) - price(b));
    if (sort === "price-desc") list.sort((a, b) => price(b) - price(a));
    if (sort === "featured") list.sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
    return list;
  }, [machines, category, uses, budget, sort, query]);

  const activeCount = uses.length + (budget ? 1 : 0) + (sort !== "featured" ? 1 : 0);
  const reset = () => {
    setUses([]);
    setBudget(null);
    setSort("featured");
    setQuery("");
    setCategory("all");
  };

  const filters = (
    <div className="space-y-8">
      <fieldset>
        <legend className="eyebrow mb-3">Ideal for</legend>
        <div className="flex flex-wrap gap-2">
          {useCases.map((u) => {
            const on = uses.includes(u.value);
            return (
              <button
                key={u.value}
                type="button"
                aria-pressed={on}
                onClick={() => setUses(on ? uses.filter((x) => x !== u.value) : [...uses, u.value])}
                className={`min-h-10 rounded-full border px-4 text-sm transition-colors ${on ? "border-espresso bg-espresso text-ivory" : "border-line bg-ivory hover:border-brass"}`}
              >
                {u.label}
              </button>
            );
          })}
        </div>
      </fieldset>

      <fieldset>
        <legend className="eyebrow mb-3">Budget</legend>
        <div className="space-y-1">
          {budgets.map((b) => (
            <label key={b.value} className="flex min-h-10 cursor-pointer items-center gap-3 rounded-lg px-2 text-sm hover:bg-cream">
              <input
                type="radio"
                name="budget"
                checked={budget === b.value}
                onChange={() => setBudget(b.value)}
                className="size-4 accent-[var(--color-brass-deep)]"
              />
              {b.label}
            </label>
          ))}
          {budget && (
            <button type="button" onClick={() => setBudget(null)} className="px-2 pt-1 text-xs font-semibold text-brass-deep underline">
              Clear budget
            </button>
          )}
        </div>
      </fieldset>

      <fieldset>
        <legend className="eyebrow mb-3">Sort by</legend>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as Sort)}
          className="min-h-11 w-full rounded-xl border border-line bg-ivory px-3 text-sm focus:border-brass"
        >
          {sorts.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </fieldset>
    </div>
  );

  return (
    <div>
      {/* Category chips — scrollable rail on mobile */}
      <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0">
        {[{ slug: "all" as const, name: "All machines" }, ...categories].map((c) => {
          const on = category === c.slug;
          return (
            <button
              key={c.slug}
              type="button"
              aria-pressed={on}
              onClick={() => setCategory(c.slug)}
              className={`min-h-11 shrink-0 rounded-full border px-5 text-sm font-medium transition-all ${
                on ? "border-espresso bg-espresso text-brass-light" : "border-line bg-ivory text-ink hover:border-brass"
              }`}
            >
              {c.name}
            </button>
          );
        })}
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-[260px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-28 rounded-3xl border border-line bg-ivory p-6">
            {filters}
            <button type="button" onClick={reset} className="mt-8 text-sm font-semibold text-brass-deep underline-offset-4 hover:underline">
              Reset all filters
            </button>
          </div>
        </aside>

        <div>
          <div className="flex items-center gap-3">
            <label className="relative flex-1">
              <span className="sr-only">Search machines</span>
              <Icon name="search" className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by brand or model…"
                className="min-h-12 w-full rounded-full border border-line bg-ivory pl-11 pr-4 text-sm placeholder:text-muted/70 focus:border-brass focus:outline-none"
              />
            </label>
            <button
              type="button"
              onClick={() => setSheetOpen(true)}
              className="relative flex min-h-12 items-center gap-2 rounded-full border border-line bg-ivory px-5 text-sm font-medium lg:hidden"
            >
              <Icon name="filter" className="size-4" /> Filters
              {activeCount > 0 && <span className="grid size-5 place-items-center rounded-full bg-brass text-[0.65rem] font-bold text-espresso">{activeCount}</span>}
            </button>
          </div>

          <p className="mt-5 text-sm text-muted" aria-live="polite">
            Showing <span className="font-semibold text-espresso">{results.length}</span> {results.length === 1 ? "machine" : "machines"}
          </p>

          {results.length > 0 ? (
            <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((m, i) => (
                <MachineCard key={m.slug} machine={m} priority={i < 3} />
              ))}
            </div>
          ) : (
            <div className="mt-6 rounded-3xl border border-dashed border-line bg-cream px-6 py-16 text-center">
              <p className="font-display text-3xl">No machines match those filters.</p>
              <p className="mt-2 text-muted">Try widening your budget — or ask us, we can source almost any model.</p>
              <button type="button" onClick={reset} className="btn btn-primary mt-6">
                Reset filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile bottom sheet */}
      <div className={`fixed inset-0 z-50 lg:hidden ${sheetOpen ? "" : "pointer-events-none"}`} role="dialog" aria-modal="true" aria-label="Filters">
        <div className={`absolute inset-0 bg-espresso/50 transition-opacity duration-300 ${sheetOpen ? "opacity-100" : "opacity-0"}`} onClick={() => setSheetOpen(false)} />
        <div
          className={`absolute inset-x-0 bottom-0 max-h-[85dvh] overflow-y-auto rounded-t-[2rem] bg-ivory p-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))] transition-transform duration-500 ease-luxe ${
            sheetOpen ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <div className="mx-auto mb-5 h-1 w-12 rounded-full bg-line" />
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-3xl">Refine</h2>
            <button type="button" onClick={reset} className="text-sm font-semibold text-brass-deep">
              Reset
            </button>
          </div>
          {filters}
          <button type="button" onClick={() => setSheetOpen(false)} className="btn btn-primary mt-8 w-full">
            Show {results.length} {results.length === 1 ? "machine" : "machines"}
          </button>
        </div>
      </div>
    </div>
  );
}

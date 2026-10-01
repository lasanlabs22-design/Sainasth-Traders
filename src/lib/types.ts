export type CategorySlug = "espresso" | "bean-to-cup" | "capsule" | "commercial";

export type UseCase = "home" | "office" | "cafe";

/** Which illustrated placeholder to draw when no product photo exists yet. */
export type VisualKind = "espresso" | "espresso-grinder" | "superauto" | "capsule" | "commercial";

export interface Finish {
  name: string;
  /** CSS colour used for the swatch and the illustrated placeholder body. */
  color: string;
}

export interface MachineSpecs {
  pressure?: string;
  boiler?: string;
  waterTank?: string;
  grinder?: string;
  power?: string;
  dimensions?: string;
  weight?: string;
  warranty?: string;
}

export interface Machine {
  slug: string;
  name: string;
  brand: string;
  model: string;
  category: CategorySlug;
  idealFor: UseCase[];
  /** Indicative price in INR. `null` → "Price on request". */
  price: number | null;
  mrp?: number;
  tagline: string;
  description: string;
  highlights: string[];
  specs: MachineSpecs;
  finishes: Finish[];
  visual: VisualKind;
  /**
   * Real product photos, relative to /public (e.g. "/images/machines/dedica-1.webp").
   * Leave empty to use the illustrated placeholder.
   */
  images: string[];
  featured?: boolean;
  badge?: string;
  cupsPerDay?: string;
}

export interface Category {
  slug: CategorySlug;
  name: string;
  telugu: string;
  blurb: string;
  visual: VisualKind;
}

export interface Showroom {
  city: string;
  telugu: string;
  address: string[];
  phone: string;
  hours: string;
  mapQuery: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  city: string;
}

/** Shared enquiry contract — validated on both client and API route. */

export const enquiryTypes = ["Buy a machine", "Book a free demo", "Office / café rental", "Service or AMC", "Other"] as const;
export const cities = ["Guntur", "Vijayawada", "Other"] as const;

export interface Enquiry {
  name: string;
  phone: string;
  city: (typeof cities)[number];
  type: (typeof enquiryTypes)[number];
  machine?: string;
  message?: string;
}

export type EnquiryErrors = Partial<Record<keyof Enquiry, string>>;

export function validateEnquiry(input: Record<string, unknown>): { data?: Enquiry; errors: EnquiryErrors } {
  const errors: EnquiryErrors = {};
  const str = (k: string) => (typeof input[k] === "string" ? (input[k] as string).trim() : "");

  const name = str("name");
  const phone = str("phone").replace(/[\s-]/g, "");
  const city = str("city");
  const type = str("type");
  const machine = str("machine").slice(0, 120);
  const message = str("message").slice(0, 1000);

  if (name.length < 2) errors.name = "Please enter your name.";
  if (!/^(\+91)?[6-9]\d{9}$/.test(phone)) errors.phone = "Enter a valid 10-digit Indian mobile number.";
  if (!(cities as readonly string[]).includes(city)) errors.city = "Choose a city.";
  if (!(enquiryTypes as readonly string[]).includes(type)) errors.type = "Choose what you need.";

  if (Object.keys(errors).length) return { errors };
  return {
    errors,
    data: { name, phone, city: city as Enquiry["city"], type: type as Enquiry["type"], machine: machine || undefined, message: message || undefined },
  };
}

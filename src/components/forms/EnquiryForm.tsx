"use client";

import { useState } from "react";
import { cities, enquiryTypes, validateEnquiry, type EnquiryErrors } from "@/lib/enquiry";
import { site } from "@/data/site";
import { whatsappLink } from "@/lib/format";
import { Icon } from "@/components/ui/Icon";

type Status = "idle" | "sending" | "sent" | "error";

export function EnquiryForm({ machines, defaultMachine }: { machines: { slug: string; label: string }[]; defaultMachine?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [summary, setSummary] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const raw = Object.fromEntries(new FormData(e.currentTarget));
    const { data, errors } = validateEnquiry(raw);
    setErrors(errors);
    if (!data) return;

    setStatus("sending");
    try {
      const res = await fetch("/api/enquiry", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      if (!res.ok) throw new Error(await res.text());
      setSummary(
        `Hello ${site.name}, I'm ${data.name} from ${data.city}. I'd like to: ${data.type}${data.machine ? ` — ${data.machine}` : ""}.${data.message ? ` ${data.message}` : ""}`,
      );
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-[2rem] border border-brass/40 bg-cream p-8 text-center sm:p-12" role="status">
        <span className="mx-auto grid size-16 place-items-center rounded-full bg-espresso text-brass-light">
          <Icon name="check" className="size-7" />
        </span>
        <h3 className="mt-6 text-4xl">Thank you!</h3>
        <p lang="te" className="mt-1 font-telugu text-brass-deep">
          ధన్యవాదాలు
        </p>
        <p className="mx-auto mt-4 max-w-sm text-muted">Our team will call you within working hours. For a faster reply, continue the conversation on WhatsApp.</p>
        <a href={whatsappLink(summary)} target="_blank" rel="noopener" className="btn btn-brass mt-8">
          <Icon name="whatsapp" /> Continue on WhatsApp
        </a>
      </div>
    );
  }

  const field = "mt-2 min-h-12 w-full rounded-xl border bg-ivory px-4 text-base text-ink placeholder:text-muted/60 focus:border-brass focus:outline-none sm:text-sm";
  const border = (k: keyof EnquiryErrors) => (errors[k] ? "border-kumkum" : "border-line");
  const err = (k: keyof EnquiryErrors) =>
    errors[k] && (
      <p id={`${k}-error`} className="mt-1.5 text-xs text-kumkum">
        {errors[k]}
      </p>
    );

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5 rounded-[2rem] border border-line bg-ivory p-6 shadow-[0_30px_60px_-40px_rgba(43,27,18,0.5)] sm:grid-cols-2 sm:p-10">
      <label className="block text-sm font-medium">
        Full name
        <input name="name" autoComplete="name" placeholder="Your name" className={`${field} ${border("name")}`} aria-invalid={!!errors.name} aria-describedby="name-error" />
        {err("name")}
      </label>
      <label className="block text-sm font-medium">
        Mobile number
        <input
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="98xxx xxxxx"
          className={`${field} ${border("phone")}`}
          aria-invalid={!!errors.phone}
          aria-describedby="phone-error"
        />
        {err("phone")}
      </label>
      <label className="block text-sm font-medium">
        City
        <select name="city" defaultValue="" className={`${field} ${border("city")}`} aria-invalid={!!errors.city}>
          <option value="" disabled>
            Select city
          </option>
          {cities.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        {err("city")}
      </label>
      <label className="block text-sm font-medium">
        I’d like to
        <select name="type" defaultValue={defaultMachine ? "Book a free demo" : ""} className={`${field} ${border("type")}`} aria-invalid={!!errors.type}>
          <option value="" disabled>
            Choose one
          </option>
          {enquiryTypes.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
        {err("type")}
      </label>
      <label className="block text-sm font-medium sm:col-span-2">
        Machine of interest <span className="font-normal text-muted">(optional)</span>
        <select name="machine" defaultValue={machines.find((m) => m.slug === defaultMachine)?.label ?? ""} className={`${field} border-line`}>
          <option value="">Not sure yet — please advise</option>
          {machines.map((m) => (
            <option key={m.slug}>{m.label}</option>
          ))}
        </select>
      </label>
      <label className="block text-sm font-medium sm:col-span-2">
        Message <span className="font-normal text-muted">(optional)</span>
        <textarea name="message" rows={4} placeholder="Cups per day, preferred demo time, anything else…" className={`${field} min-h-28 border-line py-3`} />
      </label>

      <div className="flex flex-col items-start gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted">We’ll only use your number to respond to this enquiry.</p>
        <button type="submit" disabled={status === "sending"} className="btn btn-primary w-full disabled:opacity-60 sm:w-auto">
          {status === "sending" ? "Sending…" : "Send enquiry"} <Icon name="arrow" className="size-4" />
        </button>
      </div>
      {status === "error" && (
        <p className="text-sm text-kumkum sm:col-span-2" role="alert">
          Something went wrong. Please try again, or reach us on WhatsApp.
        </p>
      )}
    </form>
  );
}

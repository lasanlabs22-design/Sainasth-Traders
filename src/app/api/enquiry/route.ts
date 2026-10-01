import { NextResponse } from "next/server";
import { validateEnquiry } from "@/lib/enquiry";

/**
 * Enquiry intake. For the POC it validates and logs.
 * Production: forward to email (Resend), a Google Sheet, or a CRM here —
 * see ARCHITECTURE.md › "Lead pipeline".
 */
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const { data, errors } = validateEnquiry(body);
  if (!data) return NextResponse.json({ ok: false, errors }, { status: 422 });

  console.info("[enquiry]", new Date().toISOString(), data);

  return NextResponse.json({ ok: true });
}

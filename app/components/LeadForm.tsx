"use client";
import { useState } from "react";
import { CheckCircle2, ArrowRight } from "lucide-react";

export type LeadFormProperty = { id: string; slug: string; name: string; address: string };

export default function LeadForm({
  properties = [],
  defaultPropertySlug,
}: {
  properties?: LeadFormProperty[];
  defaultPropertySlug?: string;
}) {
  const [state, setState] = useState<"idle" | "submitting" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  if (state === "sent") {
    return (
      <div className="rounded-3xl bg-white p-8 shadow-xl">
        <CheckCircle2 className="gold" size={34} />
        <h3 className="serif mt-4 text-3xl">Enquiry received.</h3>
        <p className="mt-3 text-sm leading-6 text-[#6f6a61]">
          Thanks! Our team will reach out on the number you shared. You can also message us directly on WhatsApp for a faster reply.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        setState("submitting");
        setError("");
        const form = e.currentTarget;
        const data = new FormData(form);
        const propertySlug = data.get("propertySlug");
        const propertyId = properties.find((p) => p.slug === propertySlug)?.id;
        try {
          const res = await fetch("/api/leads", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: data.get("name"),
              phone: data.get("phone"),
              propertyId,
              budgetBand: data.get("budgetBand") || undefined,
              roomType: data.get("roomType") || undefined,
              moveInDate: data.get("moveInDate") || undefined,
              institute: data.get("institute") || undefined,
              source: "website",
            }),
          });
          if (!res.ok) {
            const body = await res.json().catch(() => ({}));
            throw new Error(body.error || "Something went wrong");
          }
          setState("sent");
        } catch (err) {
          setState("error");
          setError(err instanceof Error ? err.message : "Something went wrong");
        }
      }}
      className="rounded-3xl bg-white p-7 text-[#171717] shadow-2xl sm:p-8"
    >
      <p className="gold text-xs font-bold uppercase tracking-[.2em]">Get best deal</p>
      <h3 className="serif mt-2 text-3xl">Find your DivineStays home.</h3>
      <div className="mt-6 grid gap-3">
        <input
          name="name"
          required
          placeholder="Your name"
          className="rounded-xl border border-[#e7e0d4] bg-[#faf8f4] px-4 py-3 outline-none focus:border-[#c9953d]"
        />
        <input
          name="phone"
          required
          placeholder="WhatsApp / phone number"
          className="rounded-xl border border-[#e7e0d4] bg-[#faf8f4] px-4 py-3 outline-none focus:border-[#c9953d]"
        />
        <select
          name="propertySlug"
          defaultValue={defaultPropertySlug ?? ""}
          className="rounded-xl border border-[#e7e0d4] bg-[#faf8f4] px-4 py-3"
        >
          <option value="">Choose preferred location</option>
          {properties.map((p) => (
            <option key={p.slug} value={p.slug}>
              {p.name} — {p.address}
            </option>
          ))}
        </select>
        <div className="grid gap-3 sm:grid-cols-2">
          <select name="budgetBand" defaultValue="" className="rounded-xl border border-[#e7e0d4] bg-[#faf8f4] px-4 py-3">
            <option value="">Budget</option>
            <option value="UNDER_7000">Under ₹7,000</option>
            <option value="RANGE_7000_10000">₹7,000–₹10,000</option>
            <option value="ABOVE_10000">₹10,000+</option>
          </select>
          <select name="roomType" defaultValue="" className="rounded-xl border border-[#e7e0d4] bg-[#faf8f4] px-4 py-3">
            <option value="">Room type</option>
            <option value="SINGLE">Single</option>
            <option value="DOUBLE_SHARING">Double sharing</option>
            <option value="TRIPLE_SHARING">Triple sharing</option>
          </select>
        </div>
        <input name="moveInDate" type="date" className="rounded-xl border border-[#e7e0d4] bg-[#faf8f4] px-4 py-3" />
        <input
          name="institute"
          placeholder="Institute / coaching (optional)"
          className="rounded-xl border border-[#e7e0d4] bg-[#faf8f4] px-4 py-3"
        />
      </div>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      <button
        disabled={state === "submitting"}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#1b1a18] px-5 py-3.5 font-semibold text-white disabled:opacity-60"
      >
        {state === "submitting" ? "Sending…" : "Get my options"} <ArrowRight size={17} />
      </button>
      <p className="mt-3 text-center text-[11px] text-[#8a8378]">
        We'll use your details only to respond to your accommodation enquiry.
      </p>
    </form>
  );
}

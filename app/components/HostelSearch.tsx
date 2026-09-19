"use client";

import { FormEvent, useMemo, useState } from "react";

export default function HostelSearch() {
  const [query, setQuery] = useState("");
  const [submitted, setSubmitted] = useState("");

  const suggestions = useMemo(
    () => ["hostel in Kota", "hostel near Allen", "hostel in Landmark City", "PG in Kunadi"],
    []
  );

  async function submit(event: FormEvent) {
    event.preventDefault();
    const clean = query.trim();
    if (clean.length < 2) return;

    setSubmitted(clean);
    const analyticsConsent = window.localStorage.getItem("divinestays-analytics-consent") === "granted";

    if (analyticsConsent) {
      await fetch("/api/search-events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: clean, analyticsConsent: true }),
      }).catch(() => {});
    }

    document.getElementById("properties")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="mt-10 max-w-3xl rounded-2xl border border-white/10 bg-white/8 p-4 backdrop-blur">
      <form onSubmit={submit} className="flex flex-col gap-3 sm:flex-row">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search hostels in Kota…"
          aria-label="Search hostels in Kota"
          className="min-w-0 flex-1 rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none placeholder:text-white/45 focus:border-[#c9953d]"
        />
        <button className="rounded-xl bg-white px-5 py-3 font-semibold text-[#1b1a18]">Search</button>
      </form>
      <div className="mt-3 flex flex-wrap gap-2">
        {suggestions.map((item) => (
          <button key={item} type="button" onClick={() => setQuery(item)} className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-white/60 hover:text-white">
            {item}
          </button>
        ))}
      </div>
      {submitted && (
        <p className="mt-3 text-xs text-white/60">
          Showing DivineStays options for: <span className="text-white">{submitted}</span>
        </p>
      )}
    </div>
  );
}

"use client";
import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

export default function ReviewForm({ propertyId }: { propertyId: string }) {
  const [state, setState] = useState<"idle" | "submitting" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  if (state === "sent") {
    return (
      <div className="rounded-2xl border border-[#e7e0d4] bg-white p-6">
        <CheckCircle2 className="gold" size={28} />
        <p className="mt-3 text-sm leading-6 text-[#6f6a61]">
          Thanks! Your review is submitted and will appear once it's moderated.
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
        try {
          const res = await fetch("/api/reviews", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              propertyId,
              authorName: data.get("authorName"),
              rating: data.get("rating"),
              comment: data.get("comment"),
            }),
          });
          if (!res.ok) {
            const body = await res.json().catch(() => ({}));
            throw new Error(body.error || "Something went wrong");
          }
          setState("sent");
          form.reset();
        } catch (err) {
          setState("error");
          setError(err instanceof Error ? err.message : "Something went wrong");
        }
      }}
      className="rounded-2xl border border-[#e7e0d4] bg-white p-6"
    >
      <p className="font-semibold">Write a review</p>
      <div className="mt-4 grid gap-3">
        <input
          name="authorName"
          required
          placeholder="Your name"
          className="rounded-xl border border-[#e7e0d4] bg-[#faf8f4] px-4 py-3 outline-none focus:border-[#c9953d]"
        />
        <select
          name="rating"
          required
          defaultValue=""
          className="rounded-xl border border-[#e7e0d4] bg-[#faf8f4] px-4 py-3"
        >
          <option value="" disabled>
            Rating
          </option>
          {[5, 4, 3, 2, 1].map((n) => (
            <option key={n} value={n}>
              {n} star{n === 1 ? "" : "s"}
            </option>
          ))}
        </select>
        <textarea
          name="comment"
          required
          minLength={10}
          rows={3}
          placeholder="Share your experience"
          className="rounded-xl border border-[#e7e0d4] bg-[#faf8f4] px-4 py-3 outline-none focus:border-[#c9953d]"
        />
      </div>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      <button
        disabled={state === "submitting"}
        className="mt-4 rounded-xl bg-[#1b1a18] px-5 py-3 text-sm font-semibold text-white disabled:opacity-60"
      >
        {state === "submitting" ? "Submitting…" : "Submit review"}
      </button>
    </form>
  );
}

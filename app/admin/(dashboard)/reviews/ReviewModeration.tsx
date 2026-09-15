"use client";
import { useState } from "react";

type Review = {
  id: string;
  authorName: string;
  rating: number;
  comment: string;
  propertyName: string;
  createdAt: string;
};

export default function ReviewModeration({ reviews: initialReviews }: { reviews: Review[] }) {
  const [reviews, setReviews] = useState(initialReviews);
  const [savingId, setSavingId] = useState<string | null>(null);

  async function decide(id: string, status: "APPROVED" | "REJECTED") {
    setSavingId(id);
    await fetch(`/api/admin/reviews/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    }).catch(() => {});
    setReviews((prev) => prev.filter((r) => r.id !== id));
    setSavingId(null);
  }

  if (reviews.length === 0) {
    return <p className="text-sm text-[#8a8378]">Nothing pending — all caught up.</p>;
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <div key={review.id} className="rounded-2xl border border-[#e7e0d4] bg-white p-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="font-semibold">
              {review.authorName} · {review.rating}★ · <span className="text-[#8a8378]">{review.propertyName}</span>
            </p>
            <span className="text-xs text-[#8a8378]">{new Date(review.createdAt).toLocaleString("en-IN")}</span>
          </div>
          <p className="mt-2 text-sm leading-6 text-[#6f6a61]">{review.comment}</p>
          <div className="mt-4 flex gap-2">
            <button
              disabled={savingId === review.id}
              onClick={() => decide(review.id, "APPROVED")}
              className="rounded-full bg-[#1b1a18] px-4 py-1.5 text-sm font-semibold text-white disabled:opacity-60"
            >
              Approve
            </button>
            <button
              disabled={savingId === review.id}
              onClick={() => decide(review.id, "REJECTED")}
              className="rounded-full border border-[#e7e0d4] px-4 py-1.5 text-sm font-semibold disabled:opacity-60"
            >
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

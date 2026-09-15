import { Star } from "lucide-react";
import type { Review } from "@prisma/client";

export default function ReviewList({ reviews }: { reviews: Review[] }) {
  if (reviews.length === 0) {
    return <p className="text-sm text-[#8a8378]">No reviews yet — be the first to share your experience.</p>;
  }
  return (
    <div className="space-y-4">
      {reviews.map((r) => (
        <div key={r.id} className="rounded-2xl border border-[#e7e0d4] bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="font-semibold">{r.authorName}</p>
            <span className="flex items-center gap-1 text-sm">
              <Star size={14} fill="currentColor" className="gold" /> {r.rating}
            </span>
          </div>
          <p className="mt-2 text-sm leading-6 text-[#6f6a61]">{r.comment}</p>
          <p className="mt-2 text-xs text-[#8a8378]">{new Date(r.createdAt).toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "numeric" })}</p>
        </div>
      ))}
    </div>
  );
}

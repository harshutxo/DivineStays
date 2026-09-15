import { Star } from "lucide-react";
import type { RatingSummary } from "@/lib/rating";

export default function RatingStars({ summary, size = 15 }: { summary: RatingSummary; size?: number }) {
  if (!summary) {
    return <span className="text-xs text-[#8a8378]">No reviews yet</span>;
  }
  return (
    <span className="flex items-center gap-1 text-sm">
      <Star size={size} fill="currentColor" className="gold" />
      {summary.average.toFixed(1)}
      <span className="text-xs text-[#8a8378]">({summary.count})</span>
    </span>
  );
}

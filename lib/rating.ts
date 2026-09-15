export type RatingSummary = { average: number; count: number } | null;

export function ratingSummary(reviews: { rating: number }[]): RatingSummary {
  if (reviews.length === 0) return null;
  const total = reviews.reduce((sum, r) => sum + r.rating, 0);
  return { average: Math.round((total / reviews.length) * 10) / 10, count: reviews.length };
}

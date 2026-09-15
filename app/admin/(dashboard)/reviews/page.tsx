import { prisma } from "@/lib/prisma";
import ReviewModeration from "./ReviewModeration";

export const dynamic = "force-dynamic";

export default async function AdminReviewsPage() {
  const reviews = await prisma.review.findMany({
    where: { status: "PENDING" },
    orderBy: { createdAt: "asc" },
    include: { property: { select: { name: true } } },
  });

  return (
    <div>
      <h1 className="serif text-3xl">Reviews pending moderation</h1>
      <div className="mt-6">
        <ReviewModeration
          reviews={reviews.map((r) => ({
            id: r.id,
            authorName: r.authorName,
            rating: r.rating,
            comment: r.comment,
            propertyName: r.property.name,
            createdAt: r.createdAt.toISOString(),
          }))}
        />
      </div>
    </div>
  );
}

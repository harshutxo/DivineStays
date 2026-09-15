import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminOverviewPage() {
  const [newLeads, pendingReviews, totalProperties] = await Promise.all([
    prisma.lead.count({ where: { status: "NEW" } }),
    prisma.review.count({ where: { status: "PENDING" } }),
    prisma.property.count({ where: { isPublished: true } }),
  ]);

  return (
    <div>
      <h1 className="serif text-3xl">Overview</h1>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <Link href="/admin/leads" className="rounded-2xl border border-[#e7e0d4] bg-white p-6">
          <p className="text-3xl font-bold">{newLeads}</p>
          <p className="mt-1 text-sm text-[#6f6a61]">New leads</p>
        </Link>
        <Link href="/admin/reviews" className="rounded-2xl border border-[#e7e0d4] bg-white p-6">
          <p className="text-3xl font-bold">{pendingReviews}</p>
          <p className="mt-1 text-sm text-[#6f6a61]">Reviews pending moderation</p>
        </Link>
        <div className="rounded-2xl border border-[#e7e0d4] bg-white p-6">
          <p className="text-3xl font-bold">{totalProperties}</p>
          <p className="mt-1 text-sm text-[#6f6a61]">Published properties</p>
        </div>
      </div>
      <p className="mt-8 text-sm text-[#8a8378]">
        Property, offer and FAQ content is managed via <code>npm run db:studio</code> for now.
      </p>
    </div>
  );
}

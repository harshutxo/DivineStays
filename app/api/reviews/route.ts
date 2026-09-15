import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { reviewSchema } from "@/lib/validation";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const parsed = reviewSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid input" }, { status: 400 });
  }

  const property = await prisma.property.findUnique({ where: { id: parsed.data.propertyId } });
  if (!property) {
    return NextResponse.json({ error: "Unknown property" }, { status: 404 });
  }

  const review = await prisma.review.create({
    data: { ...parsed.data, status: "PENDING" },
  });

  return NextResponse.json({ ok: true, id: review.id }, { status: 201 });
}

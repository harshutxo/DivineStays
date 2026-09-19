import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { leadSchema } from "@/lib/validation";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid input" }, { status: 400 });
  }

  const { propertyId, moveInDate, consentAt, ...rest } = parsed.data;

  const lead = await prisma.lead.create({
    data: {
      ...rest,
      propertyId: propertyId || null,
      moveInDate: moveInDate ? new Date(moveInDate) : null,
      consentAt: new Date(consentAt),
    },
  });

  return NextResponse.json({ ok: true, id: lead.id }, { status: 201 });
}

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const query = typeof body?.query === "string" ? body.query.trim().slice(0, 160) : "";
  const analyticsConsent = body?.analyticsConsent === true;

  if (!analyticsConsent || query.length < 2) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const event = await prisma.searchEvent.create({
    data: { query, source: "site_search" },
    select: { id: true },
  });

  return NextResponse.json({ ok: true, id: event.id }, { status: 201 });
}

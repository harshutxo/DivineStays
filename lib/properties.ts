import "server-only";
import { prisma } from "./prisma";
import type { Faq, Offer, Photo, Property, Review } from "@prisma/client";

export type PropertyWithExtras = Property & {
  photos: Photo[];
  reviews: Review[];
  offers: Offer[];
  faqs: Faq[];
};

export async function getPublishedProperties(): Promise<PropertyWithExtras[]> {
  return prisma.property.findMany({
    where: { isPublished: true },
    orderBy: { sortOrder: "asc" },
    include: {
      photos: { orderBy: { sortOrder: "asc" } },
      reviews: { where: { status: "APPROVED" }, orderBy: { createdAt: "desc" } },
      offers: { where: { isActive: true } },
      faqs: { orderBy: { sortOrder: "asc" } },
    },
  });
}

export async function getPropertyBySlug(slug: string): Promise<PropertyWithExtras | null> {
  return prisma.property.findFirst({
    where: { slug, isPublished: true },
    include: {
      photos: { orderBy: { sortOrder: "asc" } },
      reviews: { where: { status: "APPROVED" }, orderBy: { createdAt: "desc" } },
      offers: { where: { isActive: true } },
      faqs: { orderBy: { sortOrder: "asc" } },
    },
  });
}

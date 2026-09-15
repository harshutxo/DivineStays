import { z } from "zod";

export const budgetBandValues = ["UNDER_7000", "RANGE_7000_10000", "ABOVE_10000"] as const;
export const roomTypeValues = ["SINGLE", "DOUBLE_SHARING", "TRIPLE_SHARING"] as const;

export const leadSchema = z.object({
  name: z.string().trim().min(2, "Name is too short").max(120),
  phone: z.string().trim().min(8, "Enter a valid phone number").max(20),
  propertyId: z.string().trim().min(1).optional(),
  budgetBand: z.enum(budgetBandValues).optional(),
  roomType: z.enum(roomTypeValues).optional(),
  moveInDate: z.string().trim().min(1).optional(),
  institute: z.string().trim().max(160).optional(),
  source: z.string().trim().max(60).default("website"),
});

export type LeadInput = z.infer<typeof leadSchema>;

export const reviewSchema = z.object({
  propertyId: z.string().trim().min(1, "Select a property"),
  authorName: z.string().trim().min(2, "Name is too short").max(120),
  rating: z.coerce.number().int().min(1).max(5),
  comment: z.string().trim().min(10, "Please share a few more details").max(2000),
});

export type ReviewInput = z.infer<typeof reviewSchema>;

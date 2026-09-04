import "server-only";
import { createClient } from "@supabase/supabase-js";

export const PROPERTY_PHOTOS_BUCKET = "property-photos";
export const REVIEW_PHOTOS_BUCKET = "review-photos";

export function getSupabaseAdmin() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY are not set");
  return createClient(url, key, { auth: { persistSession: false } });
}

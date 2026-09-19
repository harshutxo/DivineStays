ALTER TABLE "Lead" ADD COLUMN IF NOT EXISTS "utmSource" TEXT;
ALTER TABLE "Lead" ADD COLUMN IF NOT EXISTS "utmMedium" TEXT;
ALTER TABLE "Lead" ADD COLUMN IF NOT EXISTS "utmCampaign" TEXT;
ALTER TABLE "Lead" ADD COLUMN IF NOT EXISTS "landingPage" TEXT;
ALTER TABLE "Lead" ADD COLUMN IF NOT EXISTS "referrerDomain" TEXT;
ALTER TABLE "Lead" ADD COLUMN IF NOT EXISTS "consentAt" TIMESTAMP(3);

CREATE INDEX IF NOT EXISTS "Lead_source_idx" ON "Lead"("source");
CREATE INDEX IF NOT EXISTS "Lead_utmSource_utmCampaign_idx" ON "Lead"("utmSource","utmCampaign");
CREATE INDEX IF NOT EXISTS "Lead_createdAt_idx" ON "Lead"("createdAt");
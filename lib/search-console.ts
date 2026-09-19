import "server-only";
import { createSign } from "node:crypto";

const TOKEN_URL = "https://oauth2.googleapis.com/token";
const SEARCH_ANALYTICS_SCOPE = "https://www.googleapis.com/auth/webmasters.readonly";

function base64Url(value: string | Buffer) {
  const raw = typeof value === "string" ? Buffer.from(value) : value;
  return raw.toString("base64").replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}

async function getAccessToken() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!email || !privateKey) {
    throw new Error("Google Search Console credentials are not configured");
  }

  const now = Math.floor(Date.now() / 1000);
  const header = base64Url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claims = base64Url(JSON.stringify({
    iss: email,
    scope: SEARCH_ANALYTICS_SCOPE,
    aud: TOKEN_URL,
    iat: now,
    exp: now + 3600,
  }));
  const unsigned = header + "." + claims;

  const signer = createSign("RSA-SHA256");
  signer.update(unsigned);
  signer.end();
  const assertion = unsigned + "." + base64Url(signer.sign(privateKey));

  const response = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion,
    }),
    cache: "no-store",
  });

  if (!response.ok) throw new Error("Google authorization failed");
  const payload = await response.json();
  if (!payload.access_token) throw new Error("Google authorization token missing");
  return payload.access_token as string;
}

export type SearchQueryRow = {
  query: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
};

export async function getSearchQueries(days = 28): Promise<{
  startDate: string;
  endDate: string;
  rows: SearchQueryRow[];
}> {
  const siteUrl = process.env.GOOGLE_SEARCH_CONSOLE_SITE_URL;
  if (!siteUrl) throw new Error("GOOGLE_SEARCH_CONSOLE_SITE_URL is not configured");

  const safeDays = Math.min(Math.max(Math.floor(days), 1), 90);
  const end = new Date();
  end.setUTCDate(end.getUTCDate() - 1);
  const start = new Date(end);
  start.setUTCDate(start.getUTCDate() - (safeDays - 1));

  const yyyyMmDd = (date: Date) => date.toISOString().slice(0, 10);
  const startDate = yyyyMmDd(start);
  const endDate = yyyyMmDd(end);
  const accessToken = await getAccessToken();

  const endpoint =
    "https://www.googleapis.com/webmasters/v3/sites/" +
    encodeURIComponent(siteUrl) +
    "/searchAnalytics/query";

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      startDate,
      endDate,
      type: "web",
      dimensions: ["query"],
      rowLimit: 100,
      startRow: 0,
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error("Search Console query failed: " + detail.slice(0, 300));
  }

  const payload = await response.json();
  const rows: SearchQueryRow[] = (payload.rows ?? []).map((row: {
    keys?: string[];
    clicks?: number;
    impressions?: number;
    ctr?: number;
    position?: number;
  }) => ({
    query: row.keys?.[0] ?? "",
    clicks: Number(row.clicks ?? 0),
    impressions: Number(row.impressions ?? 0),
    ctr: Number(row.ctr ?? 0),
    position: Number(row.position ?? 0),
  }));

  return { startDate, endDate, rows };
}

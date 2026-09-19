import { prisma } from "@/lib/prisma";

const keywordGroups = [
  {
    title: "Core Kota demand",
    terms: ["hostel in Kota", "hostel rooms in Kota", "best hostel in Kota", "student hostel Kota", "PG in Kota", "rooms for students in Kota"],
  },
  {
    title: "Coaching intent",
    terms: ["hostel near Allen Kota", "hostel near Allen Sakar", "hostel near Allen Samyak", "hostel near Allen Sangyan", "hostel near Allen Supath"],
  },
  {
    title: "Location intent",
    terms: ["hostel Jhawar Nagar", "hostel Landmark City Kota", "hostel Kunadi Kota", "hostel Coral Park Kota", "PG Landmark City Kota"],
  },
];

export const dynamic = "force-dynamic";

export default async function SearchIntelligencePage() {
  const recentSearches = await prisma.searchEvent.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  const counts = new Map<string, number>();
  for (const event of recentSearches) {
    counts.set(event.query, (counts.get(event.query) ?? 0) + 1);
  }

  const popularSearches = Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 25);

  return (
    <div>
      <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <p className="gold text-sm font-bold uppercase tracking-[.2em]">Growth intelligence</p>
          <h1 className="serif mt-2 text-4xl">Search intelligence</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#6f6a61]">
            See what visitors search on DivineStays, then compare it with Google Search Console query data.
          </p>
        </div>
        <a href="https://search.google.com/search-console" target="_blank" rel="noreferrer" className="inline-flex rounded-full bg-[#1b1a18] px-5 py-3 text-sm font-semibold text-white">
          Open Search Console ↗
        </a>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        <div className="rounded-2xl border border-[#e7e0d4] bg-white p-6">
          <p className="text-3xl font-bold">{recentSearches.length}</p>
          <p className="mt-1 text-sm text-[#6f6a61]">Recent consented site searches</p>
        </div>
        <div className="rounded-2xl border border-[#e7e0d4] bg-white p-6">
          <p className="text-3xl font-bold">{popularSearches.length}</p>
          <p className="mt-1 text-sm text-[#6f6a61]">Popular query groups in the last 100 searches</p>
        </div>
        <div className="rounded-2xl border border-[#e7e0d4] bg-white p-6">
          <p className="text-3xl font-bold">Google</p>
          <p className="mt-1 text-sm text-[#6f6a61]">Search Console supplies external search-query visibility</p>
        </div>
      </div>

      <div className="mt-8 rounded-3xl border border-[#e7e0d4] bg-white p-7">
        <h2 className="serif text-2xl">What your own visitors searched</h2>
        <p className="mt-2 text-sm leading-6 text-[#6f6a61]">These exact on-site terms are stored only when the visitor has accepted optional analytics.</p>
        {popularSearches.length === 0 ? (
          <p className="mt-6 rounded-xl bg-[#f7f3ea] p-5 text-sm text-[#6f6a61]">No consented site searches yet. Once visitors use the search box, their terms will appear here.</p>
        ) : (
          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead><tr className="border-b border-[#e7e0d4] text-[#8a8378]"><th className="pb-3 pr-4">Query</th><th className="pb-3">Searches</th></tr></thead>
              <tbody>{popularSearches.map(([query, count]) => <tr key={query} className="border-b border-[#f0ebe2]"><td className="py-3 pr-4 font-medium">{query}</td><td className="py-3">{count}</td></tr>)}</tbody>
            </table>
          </div>
        )}
      </div>

      <div className="mt-8 rounded-3xl border border-[#e7e0d4] bg-white p-7">
        <h2 className="serif text-2xl">Keyword watchlist</h2>
        <p className="mt-2 text-sm leading-6 text-[#6f6a61]">
          These are the initial keyword families for SEO landing pages. Search Console is the source of truth for which Google queries actually generated visibility for DivineStays.
        </p>
        <div className="mt-7 grid gap-6 md:grid-cols-3">
          {keywordGroups.map((group) => (
            <div key={group.title}>
              <h3 className="font-semibold">{group.title}</h3>
              <div className="mt-3 space-y-2">
                {group.terms.map((term) => <div key={term} className="rounded-xl bg-[#f7f3ea] px-3 py-2 text-sm">{term}</div>)}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-[#e7e0d4] bg-[#1b1a18] p-6 text-white">
        <p className="text-sm font-semibold">Important privacy boundary</p>
        <p className="mt-2 text-sm leading-6 text-white/65">
          Search Console can report queries, clicks, impressions, CTR and average position for DivineStays. It does not reveal the identity or phone number of someone who merely searched Google. A person's name and phone number enter the DivineStays system only through a voluntary enquiry submission.
        </p>
      </div>
    </div>
  );
}
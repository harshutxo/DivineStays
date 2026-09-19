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

export default function SearchIntelligencePage() {
  return (
    <div>
      <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <p className="gold text-sm font-bold uppercase tracking-[.2em]">Growth intelligence</p>
          <h1 className="serif mt-2 text-4xl">Search intelligence</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#6f6a61]">
            Use Google Search Console to see the queries that caused DivineStays pages to appear, plus impressions, clicks, CTR and average position.
          </p>
        </div>
        <a
          href="https://search.google.com/search-console"
          target="_blank"
          rel="noreferrer"
          className="inline-flex rounded-full bg-[#1b1a18] px-5 py-3 text-sm font-semibold text-white"
        >
          Open Search Console ↗
        </a>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        <div className="rounded-2xl border border-[#e7e0d4] bg-white p-6">
          <p className="text-2xl font-bold">Queries</p>
          <p className="mt-2 text-sm leading-6 text-[#6f6a61]">Exact search strings for which Google showed a DivineStays result.</p>
        </div>
        <div className="rounded-2xl border border-[#e7e0d4] bg-white p-6">
          <p className="text-2xl font-bold">Demand signals</p>
          <p className="mt-2 text-sm leading-6 text-[#6f6a61]">Impressions, clicks, CTR and average position help identify SEO opportunities.</p>
        </div>
        <div className="rounded-2xl border border-[#e7e0d4] bg-white p-6">
          <p className="text-2xl font-bold">Leads</p>
          <p className="mt-2 text-sm leading-6 text-[#6f6a61]">Submitted enquiries carry source, campaign and landing-page attribution.</p>
        </div>
      </div>

      <div className="mt-10 rounded-3xl border border-[#e7e0d4] bg-white p-7">
        <h2 className="serif text-2xl">Keyword watchlist</h2>
        <p className="mt-2 text-sm leading-6 text-[#6f6a61]">
          These are the initial keyword families we should target with property and locality landing pages. Search Console will show which of these actually generate visibility for DivineStays once the site has enough data.
        </p>
        <div className="mt-7 grid gap-6 md:grid-cols-3">
          {keywordGroups.map((group) => (
            <div key={group.title}>
              <h3 className="font-semibold">{group.title}</h3>
              <div className="mt-3 space-y-2">
                {group.terms.map((term) => (
                  <div key={term} className="rounded-xl bg-[#f7f3ea] px-3 py-2 text-sm">{term}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-[#e7e0d4] bg-[#1b1a18] p-6 text-white">
        <p className="text-sm font-semibold">What DivineStays can know</p>
        <p className="mt-2 text-sm leading-6 text-white/65">
          Search Console can tell us which queries led to DivineStays visibility and clicks. It does not provide the identity, phone number or other private details of people who merely typed a search into Google. A name/phone lead is collected only when a visitor voluntarily submits the DivineStays enquiry form.
        </p>
      </div>
    </div>
  );
}

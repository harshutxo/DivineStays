import { notFound } from "next/navigation";
import { MapPin, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { getPropertyBySlug, getPublishedProperties } from "@/lib/properties";
import { ratingSummary } from "@/lib/rating";
import RatingStars from "@/app/components/RatingStars";
import CallWhatsAppButtons from "@/app/components/CallWhatsAppButtons";
import ReviewList from "@/app/components/ReviewList";
import ReviewForm from "@/app/components/ReviewForm";
import FaqList from "@/app/components/FaqList";
import LeadForm from "@/app/components/LeadForm";

export const dynamic = "force-dynamic";

export default async function PropertyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);
  if (!property) notFound();

  const allProperties = await getPublishedProperties();
  const photos =
    property.photos.length > 0
      ? property.photos.map((p) => p.url)
      : [0, 1, 2, 3].map((i) => `https://picsum.photos/seed/${property.slug}-${i}/800/600`);

  return (
    <main>
      <nav className="container flex items-center justify-between py-6">
        <Link href="/" className="text-2xl font-semibold">
          Divine<span className="gold">Stays</span>
        </Link>
        <Link href="/#properties" className="text-sm font-semibold">
          All locations
        </Link>
      </nav>

      <section className="container">
        <div className="grid gap-3 sm:grid-cols-4">
          {photos.slice(0, 4).map((url, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={url}
              src={url}
              alt={`${property.name} photo ${i + 1}`}
              className={`h-64 w-full rounded-2xl object-cover ${i === 0 ? "sm:col-span-2 sm:row-span-2 sm:h-full" : ""}`}
            />
          ))}
        </div>
      </section>

      <section className="container mt-10 grid gap-10 lg:grid-cols-[1.2fr_.8fr]">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-[#f7f3ea] px-3 py-1.5 text-xs font-medium">{property.tag}</span>
            {property.verified && (
              <span className="flex items-center gap-1 text-xs font-medium text-[#3f7d4c]">
                <ShieldCheck size={15} /> Verified
              </span>
            )}
            <RatingStars summary={ratingSummary(property.reviews)} />
          </div>
          <h1 className="serif mt-4 text-4xl sm:text-5xl">{property.name}</h1>
          <p className="mt-2 flex items-center gap-1 text-[#6f6a61]">
            <MapPin size={16} /> {property.address}
          </p>
          <p className="mt-1 text-sm font-semibold">{property.near}</p>
          <p className="mt-5 leading-7 text-[#6f6a61]">{property.description}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {property.features.map((f) => (
              <span key={f} className="rounded-full bg-[#f7f3ea] px-3 py-1.5 text-xs">
                {f}
              </span>
            ))}
          </div>

          <div className="mt-8">
            <CallWhatsAppButtons propertyName={property.name} />
          </div>

          {property.offers.length > 0 && (
            <div className="mt-10">
              <h2 className="serif text-2xl">Current offers</h2>
              <div className="mt-4 space-y-3">
                {property.offers.map((offer) => (
                  <div key={offer.id} className="rounded-2xl border border-[#c9953d]/40 bg-[#fbf3e2] p-5">
                    <p className="font-semibold">
                      {offer.title} · <span className="gold">{offer.discountText}</span>
                    </p>
                    <p className="mt-1 text-sm leading-6 text-[#6f6a61]">{offer.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-10">
            <h2 className="serif text-2xl">Location</h2>
            <iframe
              title={`Map for ${property.name}`}
              className="mt-4 h-80 w-full rounded-2xl border border-[#e7e0d4]"
              loading="lazy"
              src={`https://www.google.com/maps?q=${encodeURIComponent(property.mapQuery)}&output=embed`}
            />
          </div>

          {property.faqs.length > 0 && (
            <div className="mt-10">
              <h2 className="serif text-2xl">Frequently asked questions</h2>
              <div className="mt-4">
                <FaqList faqs={property.faqs} />
              </div>
            </div>
          )}

          <div className="mt-10">
            <h2 className="serif text-2xl">Reviews</h2>
            <div className="mt-4 grid gap-6 sm:grid-cols-2">
              <ReviewList reviews={property.reviews} />
              <ReviewForm propertyId={property.id} />
            </div>
          </div>
        </div>

        <div className="lg:sticky lg:top-8 lg:self-start">
          <LeadForm properties={allProperties} defaultPropertySlug={property.slug} />
        </div>
      </section>

      <footer className="container border-t border-[#e7e0d4] py-8 mt-16">
        <div className="flex flex-col justify-between gap-2 text-sm text-[#6f6a61] sm:flex-row">
          <span>© 2026 DivineStays · Kota, Rajasthan</span>
          <span>Student accommodation, made simpler.</span>
        </div>
      </footer>
    </main>
  );
}

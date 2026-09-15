import { ArrowRight, MapPin, ShieldCheck } from "lucide-react";
import Link from "next/link";
import RatingStars from "./RatingStars";
import CallWhatsAppButtons from "./CallWhatsAppButtons";
import { ratingSummary } from "@/lib/rating";
import type { PropertyWithExtras } from "@/lib/properties";

export default function PropertyCard({ property }: { property: PropertyWithExtras }) {
  const photo = property.photos[0]?.url ?? `https://picsum.photos/seed/${property.slug}/640/480`;
  const hasOffer = property.offers.length > 0;

  return (
    <article className="card overflow-hidden rounded-3xl border border-[#e7e0d4] bg-white">
      <div
        className="relative flex h-56 items-end bg-cover bg-center p-7 text-white"
        style={{ backgroundImage: `linear-gradient(180deg, rgba(23,22,20,.15), rgba(23,22,20,.75)), url(${photo})` }}
      >
        {hasOffer && (
          <span className="absolute right-4 top-4 rounded-full bg-[#c9953d] px-3 py-1 text-xs font-bold text-black">
            Offer
          </span>
        )}
        <div>
          <p className="text-sm text-[#dfc38f]">
            <MapPin size={14} className="mr-1 inline" />
            {property.area}
          </p>
          <h3 className="serif mt-2 text-3xl">{property.name}</h3>
          <p className="mt-1 text-sm text-white/65">{property.address}</p>
        </div>
      </div>
      <div className="p-7">
        <div className="flex items-center justify-between gap-4">
          <span className="rounded-full bg-[#f7f3ea] px-3 py-1.5 text-xs font-medium">{property.tag}</span>
          <div className="flex items-center gap-3">
            {property.verified && (
              <span className="flex items-center gap-1 text-xs font-medium text-[#3f7d4c]">
                <ShieldCheck size={15} /> Verified
              </span>
            )}
            <RatingStars summary={ratingSummary(property.reviews)} />
          </div>
        </div>
        <p className="mt-4 text-sm font-semibold">{property.near}</p>
        <p className="mt-2 text-sm leading-6 text-[#6f6a61]">{property.description}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {property.features.map((f) => (
            <span key={f} className="rounded-full bg-[#f7f3ea] px-3 py-1.5 text-xs">
              {f}
            </span>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <CallWhatsAppButtons propertyName={property.name} />
          <Link href={`/properties/${property.slug}`} className="inline-flex items-center gap-2 text-sm font-bold">
            View details <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </article>
  );
}

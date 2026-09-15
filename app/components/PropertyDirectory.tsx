"use client";
import { useMemo, useState } from "react";
import PropertyCard from "./PropertyCard";
import { ratingSummary } from "@/lib/rating";
import type { PropertyWithExtras } from "@/lib/properties";

export default function PropertyDirectory({ properties }: { properties: PropertyWithExtras[] }) {
  const [area, setArea] = useState("all");
  const [sort, setSort] = useState<"default" | "rating">("default");

  const areas = useMemo(() => Array.from(new Set(properties.map((p) => p.area))), [properties]);

  const visible = useMemo(() => {
    let list = area === "all" ? properties : properties.filter((p) => p.area === area);
    if (sort === "rating") {
      list = [...list].sort((a, b) => {
        const ra = ratingSummary(a.reviews)?.average ?? 0;
        const rb = ratingSummary(b.reviews)?.average ?? 0;
        return rb - ra;
      });
    }
    return list;
  }, [properties, area, sort]);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <select
          value={area}
          onChange={(e) => setArea(e.target.value)}
          className="rounded-full border border-[#e7e0d4] bg-white px-4 py-2 text-sm"
        >
          <option value="all">All areas</option>
          {areas.map((a) => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </select>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as "default" | "rating")}
          className="rounded-full border border-[#e7e0d4] bg-white px-4 py-2 text-sm"
        >
          <option value="default">Sort: featured</option>
          <option value="rating">Sort: rating</option>
        </select>
        <span className="text-sm text-[#8a8378]">
          {visible.length} location{visible.length === 1 ? "" : "s"}
        </span>
      </div>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {visible.map((p) => (
          <PropertyCard key={p.slug} property={p} />
        ))}
      </div>
    </div>
  );
}

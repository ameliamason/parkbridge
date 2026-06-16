"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { MapPlaceholder } from "@/components/MapPlaceholder";
import type { SearchResult } from "@/lib/types";

const FILTERS = ["Under £4", "Covered", "Accessible", "Pre-book", "On-street", "24h"];

function ResultsContent() {
  const params = useSearchParams();
  const router = useRouter();
  const label = params.get("label") ?? "";
  const lat = parseFloat(params.get("lat") ?? "51.505");
  const lng = parseFloat(params.get("lng") ?? "-0.09");

  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [sort, setSort] = useState<"near" | "cheap">("near");
  const [activeFilters, setActiveFilters] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!lat || !lng) return;
    fetch(`/api/search?lat=${lat}&lng=${lng}`)
      .then((r) => r.json())
      .then((data) => {
        setResults(data.results ?? []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [lat, lng]);

  function toggleFilter(f: string) {
    setActiveFilters((prev) => {
      const next = new Set(prev);
      next.has(f) ? next.delete(f) : next.add(f);
      return next;
    });
  }

  const sorted = [...results].sort((a, b) => {
    if (sort === "cheap") return a.tariff.price_per_hour_pence - b.tariff.price_per_hour_pence;
    return a.distance_metres - b.distance_metres;
  });

  const pins = sorted.map((r) => ({
    lat: r.lat,
    lng: r.lng,
    label: `£${(r.tariff.price_per_hour_pence / 100).toFixed(2)}`,
    selected: r.id === selectedId,
    onClick: () => setSelectedId(r.id),
  }));

  return (
    <main className="flex h-dvh flex-col bg-white">
      {/* Search bar / back */}
      <div className="z-10 bg-white px-3 pb-2 pt-3 shadow-sm">
        <button
          onClick={() => router.back()}
          className="flex w-full items-center gap-3 rounded-xl bg-gray-100 px-4 py-3 text-left"
        >
          <svg
            className="h-4 w-4 shrink-0"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path d="M15 5l-7 7 7 7" />
          </svg>
          <span className="flex-1 truncate text-sm font-semibold">{label}</span>
          <svg
            className="h-4 w-4 shrink-0 text-gray-400"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-3.5-3.5" />
          </svg>
        </button>

        <div className="mt-2 flex gap-2 overflow-x-auto pb-1">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => toggleFilter(f)}
              className={`shrink-0 rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                activeFilters.has(f)
                  ? "border-[oklch(0.55_0.15_250)] bg-[oklch(0.55_0.15_250)] text-white"
                  : "border-gray-200 text-gray-600"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Leaflet map */}
      <MapPlaceholder
        className="h-48 shrink-0"
        lat={lat}
        lng={lng}
        zoom={15}
        pins={pins}
        youAreHere
      />

      {/* Sort + count */}
      <div className="flex items-center justify-between px-4 py-2">
        <span className="font-mono text-xs tracking-widest text-gray-400">
          {loading ? "LOADING…" : `${sorted.length} RESULTS · WITHIN 400M`}
        </span>
        <button
          onClick={() => setSort((s) => (s === "near" ? "cheap" : "near"))}
          className="rounded-full border border-gray-200 px-3 py-1 text-xs font-semibold"
        >
          {sort === "near" ? "Nearest first" : "Cheapest first"} ▾
        </button>
      </div>

      <ul className="flex-1 divide-y divide-gray-100 overflow-y-auto">
        {sorted.map((r) => (
          <li key={r.id}>
            <button
              onClick={() => setSelectedId(r.id)}
              className={`flex w-full items-center gap-3 px-4 py-3 text-left transition-colors ${
                r.id === selectedId ? "bg-blue-50" : ""
              }`}
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-gray-50 text-xs font-bold text-gray-500">
                {r.provider.name.slice(0, 3).toUpperCase()}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">{r.name}</p>
                <p className="text-xs text-gray-500">
                  {r.type} · {r.distance_metres}m
                </p>
              </div>
              <div className="shrink-0 text-right">
                <p className="text-sm font-bold">
                  £{(r.tariff.price_per_hour_pence / 100).toFixed(2)}
                </p>
                <p className="text-xs text-gray-400">/hr</p>
              </div>
            </button>
          </li>
        ))}
      </ul>

      {/* At-car shortcut */}
      <div className="border-t border-gray-100 p-3">
        <Link
          href="/identify"
          className="flex items-center justify-center gap-2 rounded-2xl bg-[oklch(0.55_0.15_250)] py-3 text-sm font-bold text-white"
        >
          Already parked? Identify my provider
        </Link>
      </div>
    </main>
  );
}

export default function ResultsPage() {
  return (
    <Suspense>
      <ResultsContent />
    </Suspense>
  );
}

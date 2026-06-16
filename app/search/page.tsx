"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Brand } from "@/components/Brand";

interface NominatimResult {
  place_id: number;
  display_name: string;
  lat: string;
  lon: string;
  address: {
    road?: string;
    suburb?: string;
    city?: string;
    town?: string;
    postcode?: string;
  };
}

const FAVOURITES = [
  { label: "Home", sub: "Camberwell · SE5", icon: "home", lat: 51.4741, lng: -0.0936 },
  { label: "Work", sub: "More London · SE1", icon: "work", lat: 51.5041, lng: -0.0848 },
  { label: "Tate Modern", sub: "Bankside · SE1 9TG", icon: "star", lat: 51.5076, lng: -0.0994 },
];

function shortLabel(r: NominatimResult): { main: string; secondary: string } {
  const addr = r.address;
  const main = addr.road ?? r.display_name.split(",")[0];
  const parts = [addr.suburb, addr.city ?? addr.town, addr.postcode].filter(Boolean);
  return { main, secondary: parts.join(", ") || r.display_name };
}

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<NominatimResult[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (query.length < 3) {
      setSuggestions([]);
      return;
    }

    const timer = setTimeout(async () => {
      abortRef.current?.abort();
      abortRef.current = new AbortController();
      setLoading(true);
      try {
        const res = await fetch(
          `/api/geocode?q=${encodeURIComponent(query)}`,
          { signal: abortRef.current.signal },
        );
        const data = await res.json();
        setSuggestions(data.results ?? []);
      } catch {
        // aborted — ignore
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  function handleSelect(lat: string, lng: string, label: string) {
    router.push(`/results?lat=${lat}&lng=${lng}&label=${encodeURIComponent(label)}`);
  }

  return (
    <main className="flex h-dvh flex-col bg-white">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3">
        <button
          onClick={() => router.back()}
          className="rounded-xl bg-gray-100 p-2"
          aria-label="Back"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path d="M15 5l-7 7 7 7" />
          </svg>
        </button>
        <span className="font-mono text-xs tracking-widest text-gray-400">PLAN A JOURNEY</span>
        <Brand />
      </div>

      {/* Search input */}
      <div className="px-4 pb-3">
        <div className="flex items-center gap-3 rounded-xl border-2 border-[oklch(0.55_0.15_250)] bg-gray-50 px-4 py-3">
          <svg
            className="h-5 w-5 shrink-0 text-[oklch(0.55_0.15_250)]"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-3.5-3.5" />
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Postcode, place or venue"
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-gray-400"
            type="search"
          />
          {query && (
            <button onClick={() => setQuery("")} className="text-gray-400">
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="flex-1 overflow-y-auto">
        {query.length >= 3 ? (
          loading ? (
            <p className="px-4 py-3 text-sm text-gray-400">Searching…</p>
          ) : suggestions.length > 0 ? (
            <ul>
              {suggestions.map((s) => {
                const { main, secondary } = shortLabel(s);
                return (
                  <li key={s.place_id}>
                    <button
                      onClick={() => handleSelect(s.lat, s.lon, main)}
                      className="flex w-full items-center gap-3 border-b border-gray-100 px-4 py-3 text-left"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-gray-50">
                        <svg
                          className="h-4 w-4 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 21s7-6.4 7-11a7 7 0 1 0-14 0c0 4.6 7 11 7 11z" />
                          <circle cx="12" cy="10" r="2.4" />
                        </svg>
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold">{main}</p>
                        <p className="truncate text-xs text-gray-500">{secondary}</p>
                      </div>
                      <svg
                        className="h-4 w-4 shrink-0 text-gray-300"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                      >
                        <path d="M9 6l6 6-6 6" />
                      </svg>
                    </button>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="px-4 py-3 text-sm text-gray-400">No results found.</p>
          )
        ) : (
          <>
            <p className="px-4 py-2 font-mono text-xs tracking-widest text-gray-400">
              SAVED &amp; RECENT
            </p>
            <ul>
              {FAVOURITES.map((f) => (
                <li key={f.label}>
                  <button
                    onClick={() => handleSelect(String(f.lat), String(f.lng), f.label)}
                    className="flex w-full items-center gap-3 border-b border-gray-100 px-4 py-3 text-left"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-gray-50 text-gray-400">
                      {f.icon === "home" ? "🏠" : f.icon === "work" ? "💼" : "⭐"}
                    </span>
                    <div className="flex-1">
                      <p className="text-sm font-semibold">{f.label}</p>
                      <p className="text-xs text-gray-500">{f.sub}</p>
                    </div>
                    <svg
                      className="h-4 w-4 text-gray-300"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 4l2.4 4.9 5.4.8-3.9 3.8.9 5.4-4.8-2.5-4.8 2.5.9-5.4L4.2 9.7l5.4-.8z" />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </main>
  );
}

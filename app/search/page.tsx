"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Brand } from "@/components/Brand";

const FAVOURITES = [
  { label: "Home", sub: "Camberwell · SE5", icon: "home" },
  { label: "Work", sub: "More London · SE1", icon: "work" },
  { label: "Tate Modern", sub: "Bankside · SE1 9TG", icon: "star" },
];

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<google.maps.places.AutocompletePrediction[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const autocompleteService =
    useRef<google.maps.places.AutocompleteService | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!query || query.length < 3) {
      setSuggestions([]);
      return;
    }
    const timer = setTimeout(() => {
      if (!autocompleteService.current && window.google?.maps?.places) {
        autocompleteService.current = new google.maps.places.AutocompleteService();
      }
      autocompleteService.current?.getPlacePredictions(
        { input: query, componentRestrictions: { country: "gb" } },
        (results) => setSuggestions(results ?? []),
      );
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  function handleSelect(placeId: string, description: string) {
    router.push(`/results?placeId=${placeId}&label=${encodeURIComponent(description)}`);
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
        {query.length >= 3 && suggestions.length > 0 ? (
          <ul>
            {suggestions.map((s) => (
              <li key={s.place_id}>
                <button
                  onClick={() => handleSelect(s.place_id, s.description)}
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
                    <p className="truncate text-sm font-semibold">
                      {s.structured_formatting.main_text}
                    </p>
                    <p className="truncate text-xs text-gray-500">
                      {s.structured_formatting.secondary_text}
                    </p>
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
            ))}
          </ul>
        ) : (
          <>
            <p className="px-4 py-2 font-mono text-xs tracking-widest text-gray-400">
              SAVED &amp; RECENT
            </p>
            <ul>
              {FAVOURITES.map((f) => (
                <li key={f.label}>
                  <button className="flex w-full items-center gap-3 border-b border-gray-100 px-4 py-3 text-left">
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

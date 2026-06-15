"use client";

import Link from "next/link";
import { Brand } from "@/components/Brand";
import { MapPlaceholder } from "@/components/MapPlaceholder";

export default function HomePage() {
  return (
    <main className="relative flex h-dvh flex-col overflow-hidden">
      {/* Map fills the background */}
      <MapPlaceholder className="absolute inset-0" />

      {/* Top bar: brand + recenter */}
      <header className="pointer-events-none relative z-10 flex items-start justify-between p-3">
        <div className="pointer-events-auto rounded-2xl bg-white/90 px-3 py-2 shadow-lg backdrop-blur-sm">
          <Brand />
        </div>
      </header>

      {/* Search bar */}
      <div className="relative z-10 px-3">
        <Link
          href="/search"
          className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-lg"
        >
          <svg
            className="h-5 w-5 shrink-0 text-gray-400"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-3.5-3.5" />
          </svg>
          <span className="text-gray-500">Where are you headed?</span>
        </Link>
      </div>

      {/* At-car CTA — bottom */}
      <div className="relative z-10 mt-auto p-3">
        <Link
          href="/identify"
          className="flex w-full flex-col gap-1 rounded-3xl bg-[oklch(0.55_0.15_250)] px-5 py-4 text-white shadow-xl"
        >
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-base font-bold">
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path d="M3 13l1.6-4.4A2 2 0 0 1 6.5 7h11a2 2 0 0 1 1.9 1.6L21 13" />
                <path d="M3 13h18v4a1 1 0 0 1-1 1h-1.5M3 13v4a1 1 0 0 0 1 1h1.5" />
                <circle cx="7" cy="15.5" r="1" />
                <circle cx="17" cy="15.5" r="1" />
              </svg>
              I&apos;m parked — how do I pay?
            </span>
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path d="M9 6l6 6-6 6" />
            </svg>
          </div>
          <span className="font-mono text-xs tracking-wide text-white/85">
            Uses GPS to find your provider &amp; zone in two taps
          </span>
        </Link>
      </div>

      {/* iOS home bar spacer */}
      <div className="h-5 shrink-0" />
    </main>
  );
}

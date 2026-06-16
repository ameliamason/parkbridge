"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import type { RpcIdentifyRow } from "@/lib/types";
import { buildDeepLink } from "@/lib/providers";

function platformDeepLink(row: RpcIdentifyRow): string {
  const ua = typeof navigator !== "undefined" ? navigator.userAgent : "";
  const template = /android/i.test(ua) ? row.deeplink_android : row.deeplink_ios;
  return buildDeepLink(template, row.zone_code, row.location_id);
}

const LOADING_FALLBACK = (
  <main className="flex h-dvh items-center justify-center">
    <p className="text-sm text-gray-400">Loading…</p>
  </main>
);

function LocatedContent() {
  const params = useSearchParams();
  const router = useRouter();
  const [result, setResult] = useState<RpcIdentifyRow | null>(null);
  const [loading, setLoading] = useState(true);
  const [elapsed, setElapsed] = useState(0);

  const lat = params.get("lat");
  const lng = params.get("lng");

  useEffect(() => {
    if (!lat || !lng) {
      router.replace("/fallback");
      return;
    }

    const start = Date.now();

    fetch(`/api/identify?lat=${lat}&lng=${lng}`)
      .then((r) => r.json())
      .then((data) => {
        setElapsed(Math.round((Date.now() - start) / 1000));
        setResult(data.results?.[0] ?? null);
        setLoading(false);
      })
      .catch(() => router.replace("/fallback"));
  }, [lat, lng, router]);

  if (loading) {
    return (
      <main className="flex h-dvh items-center justify-center">
        <p className="text-sm text-gray-400">Identifying…</p>
      </main>
    );
  }

  if (!result) {
    return (
      <main className="flex h-dvh flex-col items-center justify-center gap-4 px-6">
        <p className="text-center text-sm text-gray-500">
          We couldn&apos;t identify your location. Try entering manually.
        </p>
        <Link
          href="/fallback"
          className="rounded-xl bg-[oklch(0.55_0.15_250)] px-6 py-3 text-sm font-bold text-white"
        >
          Enter zone manually
        </Link>
      </main>
    );
  }

  const deepLink = platformDeepLink(result);

  return (
    <main className="flex h-dvh flex-col overflow-y-auto bg-white">
      {/* Mini map */}
      <div className="flex h-36 items-center justify-center bg-gray-100 shrink-0">
        <span className="text-xs text-gray-400">Map · parked location</span>
      </div>

      <div className="flex-1 space-y-4 px-4 py-4">
        {/* Meta row */}
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs tracking-widest text-gray-400">
            IDENTIFIED IN {elapsed}s · GPS ±8m
          </span>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold">{result.confidence_score}%</span>
            <div className="h-2 w-16 overflow-hidden rounded-full bg-gray-100">
              <div
                className="h-full rounded-full bg-[oklch(0.55_0.15_250)]"
                style={{ width: `${result.confidence_score}%` }}
              />
            </div>
          </div>
        </div>

        {/* Provider + zone card */}
        <div className="space-y-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-gray-50 text-xs font-bold">
              {result.provider_name.slice(0, 3).toUpperCase()}
            </span>
            <div>
              <p className="text-base font-bold">{result.provider_name}</p>
              <p className="text-xs text-gray-500">{result.name}</p>
            </div>
          </div>

          <div className="rounded-xl bg-gray-50 px-4 py-3">
            <p className="font-mono text-xs tracking-widest text-gray-400">ZONE / LOCATION CODE</p>
            <p className="mt-1 font-mono text-2xl font-bold tracking-wide">{result.zone_code}</p>
          </div>

          <div className="flex items-end justify-between">
            <div>
              <p className="font-mono text-xs tracking-widest text-gray-400">TARIFF</p>
              <p className="text-xl font-bold">
                £{(result.price_per_hour_pence / 100).toFixed(2)}
                <span className="ml-1 text-sm font-normal text-gray-400">per hour</span>
              </p>
            </div>
            {result.daily_max_pence && (
              <div className="text-right">
                <p className="font-mono text-xs tracking-widest text-gray-400">CAP</p>
                <p className="text-sm font-bold">
                  £{(result.daily_max_pence / 100).toFixed(0)} daily
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Pay CTA */}
        <a
          href={deepLink}
          className="flex w-full flex-col items-center gap-1 rounded-2xl bg-[oklch(0.58_0.13_150)] py-4 text-white"
        >
          <span className="text-base font-bold">Pay with {result.provider_name} →</span>
          <span className="font-mono text-xs opacity-90">
            OPENS {result.provider_name.toUpperCase()} AT THE PAYMENT SCREEN
          </span>
        </a>

        {/* Warning + wrong? */}
        <div className="flex items-center justify-between text-xs">
          <span className="flex items-center gap-1 rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-amber-700">
            ⚠ Always check the sign on street
          </span>
          <Link
            href={`/correct?location=${result.location_id}`}
            className="rounded-full border border-dashed border-gray-300 px-3 py-1.5 text-gray-500"
          >
            Not right? ⓘ
          </Link>
        </div>
      </div>
    </main>
  );
}

export default function LocatedPage() {
  return (
    <Suspense fallback={LOADING_FALLBACK}>
      <LocatedContent />
    </Suspense>
  );
}

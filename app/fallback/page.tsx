"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Mode = "choose" | "manual";

export default function FallbackPage() {
  const [mode, setMode] = useState<Mode>("choose");
  const [zoneCode, setZoneCode] = useState("");
  const [postcode, setPostcode] = useState("");
  const router = useRouter();

  function handleManualLookup() {
    const q = zoneCode || postcode;
    if (q) router.push(`/located?manual=${encodeURIComponent(q)}`);
  }

  return (
    <main className="flex h-dvh flex-col bg-white">
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => (mode === "choose" ? router.back() : setMode("choose"))}
            className="rounded-xl bg-gray-100 p-2"
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
          <span className="font-mono text-xs tracking-widest text-gray-400">SIGNAL LOST</span>
          <div className="w-9" />
        </div>

        {/* Warning banner */}
        <div className="rounded-xl border border-amber-300 bg-amber-50 px-4 py-3">
          <p className="text-sm font-semibold text-amber-800">
            ⚠ No GPS — likely a multi-storey or underground
          </p>
          <p className="mt-1 text-xs text-amber-700">
            GPS often fails above level 2 and underground. Identify your zone another way:
          </p>
        </div>

        {mode === "choose" && (
          <div className="space-y-3">
            {/* Manual entry option */}
            <button
              onClick={() => setMode("manual")}
              className="flex w-full items-center gap-4 rounded-2xl border border-gray-200 bg-gray-50 p-4 text-left"
            >
              <svg
                className="h-7 w-7 shrink-0 text-gray-400"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
                viewBox="0 0 24 24"
              >
                <circle cx="7" cy="7" r="1.1" />
                <circle cx="12" cy="7" r="1.1" />
                <circle cx="17" cy="7" r="1.1" />
                <circle cx="7" cy="12" r="1.1" />
                <circle cx="12" cy="12" r="1.1" />
                <circle cx="17" cy="12" r="1.1" />
                <circle cx="12" cy="17" r="1.1" />
              </svg>
              <div>
                <p className="text-sm font-semibold">Enter zone or postcode</p>
                <p className="text-xs text-gray-500">Type the code shown on the sign</p>
              </div>
            </button>

            {/* QR note (Phase 2) */}
            <div className="flex items-center gap-3 rounded-xl border border-dashed border-gray-200 p-4 opacity-50">
              <svg
                className="h-7 w-7 shrink-0 text-gray-400"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
                viewBox="0 0 24 24"
              >
                <path d="M4 4h5v5H4zM15 4h5v5h-5zM4 15h5v5H4z" />
                <path d="M15 15h2v2M20 15v5h-5M17 20h3" />
              </svg>
              <div>
                <p className="text-sm font-semibold text-gray-400">Scan a QR code</p>
                <p className="text-xs text-gray-400">Coming in Phase 2</p>
              </div>
            </div>

            {/* Nearby list */}
            <p className="font-mono text-xs tracking-widest text-gray-400">OR PICK FROM NEARBY</p>
            <p className="text-xs text-gray-400">
              Connect to Supabase to see nearby providers.
            </p>
          </div>
        )}

        {mode === "manual" && (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="font-mono text-xs tracking-widest text-gray-400">
                ZONE / LOCATION CODE
              </label>
              <div className="flex items-center gap-3 rounded-xl border-2 border-[oklch(0.55_0.15_250)] bg-gray-50 px-4 py-3">
                <input
                  autoFocus
                  value={zoneCode}
                  onChange={(e) => setZoneCode(e.target.value)}
                  placeholder="e.g. 36417"
                  inputMode="numeric"
                  className="flex-1 bg-transparent text-sm outline-none placeholder:text-gray-400"
                />
              </div>
              <p className="text-xs text-gray-400">
                Printed on every RingGo / PayByPhone sign.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex-1 border-t border-gray-200" />
              <span className="font-mono text-xs text-gray-400">OR</span>
              <div className="flex-1 border-t border-gray-200" />
            </div>

            <div className="space-y-2">
              <label className="font-mono text-xs tracking-widest text-gray-400">POSTCODE</label>
              <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
                <input
                  value={postcode}
                  onChange={(e) => setPostcode(e.target.value)}
                  placeholder="SE1 9RT"
                  className="flex-1 bg-transparent text-sm outline-none placeholder:text-gray-400"
                />
              </div>
            </div>

            <button
              onClick={handleManualLookup}
              disabled={!zoneCode && !postcode}
              className="w-full rounded-2xl bg-[oklch(0.55_0.15_250)] py-4 text-sm font-bold text-white disabled:opacity-40 mt-4"
            >
              Find this zone
            </button>
          </div>
        )}
      </div>

      <div className="border-t border-gray-100 p-4">
        <Link
          href="/"
          className="block text-center text-sm text-gray-400"
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}

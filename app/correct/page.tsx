"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { getOrCreateSessionToken } from "@/lib/session";
import type { UserCorrection } from "@/lib/types";

const CORRECTION_TYPES: { value: UserCorrection["correction_type"]; label: string }[] = [
  { value: "wrong_provider", label: "Wrong provider" },
  { value: "wrong_zone_code", label: "Wrong zone code" },
  { value: "wrong_price", label: "Wrong price" },
  { value: "space_gone", label: "Space no longer exists" },
];

function CorrectContent() {
  const params = useSearchParams();
  const router = useRouter();
  const locationId = params.get("location") ?? "";

  const [type, setType] = useState<UserCorrection["correction_type"]>("wrong_provider");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  async function submit() {
    setSubmitting(true);
    await fetch("/api/corrections", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        location_id: locationId,
        correction_type: type,
        reported_value: "",
        expected_value: notes,
        notes,
        session_token: getOrCreateSessionToken(),
      }),
    });
    setDone(true);
    setSubmitting(false);
  }

  if (done) {
    return (
      <main className="flex h-dvh flex-col items-center justify-center gap-4 px-6 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-50">
          <svg className="h-7 w-7 text-green-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path d="M5 12.5l4.5 4.5L19 6.5" />
          </svg>
        </div>
        <h2 className="text-lg font-bold">Thanks for the correction</h2>
        <p className="text-sm text-gray-500">
          We&apos;ll review it within 48 hours and update the database.
        </p>
        <button onClick={() => router.push("/")} className="mt-2 text-sm text-[oklch(0.55_0.15_250)]">
          Back to home
        </button>
      </main>
    );
  }

  return (
    <main className="flex h-dvh flex-col bg-white">
      <div className="flex items-center gap-4 border-b border-gray-100 px-4 py-3">
        <button onClick={() => router.back()} className="rounded-xl bg-gray-100 p-2">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path d="M15 5l-7 7 7 7" />
          </svg>
        </button>
        <h1 className="text-base font-bold">Report an issue</h1>
      </div>

      <div className="flex-1 space-y-5 overflow-y-auto px-4 py-5">
        <div className="space-y-2">
          <p className="font-mono text-xs tracking-widest text-gray-400">WHAT&apos;S WRONG?</p>
          <div className="space-y-2">
            {CORRECTION_TYPES.map((c) => (
              <button
                key={c.value}
                onClick={() => setType(c.value)}
                className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm font-medium transition-colors ${
                  type === c.value
                    ? "border-[oklch(0.55_0.15_250)] bg-[oklch(0.55_0.15_250)]/5 text-[oklch(0.55_0.15_250)]"
                    : "border-gray-200 text-gray-700"
                }`}
              >
                {type === c.value && (
                  <svg className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path d="M5 12.5l4.5 4.5L19 6.5" />
                  </svg>
                )}
                <span className={type === c.value ? "" : "ml-7"}>{c.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="font-mono text-xs tracking-widest text-gray-400">
            ADDITIONAL NOTES (OPTIONAL)
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="e.g. The actual zone code is 36418"
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-[oklch(0.55_0.15_250)] placeholder:text-gray-400"
            rows={3}
          />
        </div>

        <p className="text-xs text-gray-400">
          No account needed. Corrections are reviewed before going live.
        </p>
      </div>

      <div className="border-t border-gray-100 p-4">
        <button
          onClick={submit}
          disabled={submitting}
          className="w-full rounded-2xl bg-[oklch(0.55_0.15_250)] py-4 text-sm font-bold text-white disabled:opacity-50"
        >
          {submitting ? "Submitting…" : "Submit correction"}
        </button>
      </div>
    </main>
  );
}

export default function CorrectPage() {
  return (
    <Suspense>
      <CorrectContent />
    </Suspense>
  );
}

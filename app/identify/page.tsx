"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type State = "prompt" | "locating" | "error";

export default function IdentifyPage() {
  const [state, setState] = useState<State>("prompt");
  const [progress, setProgress] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();
  const cancelledRef = useRef(false);

  useEffect(() => {
    if (state !== "locating") return;
    cancelledRef.current = false;

    const interval = setInterval(() => setProgress((p) => Math.min(95, p + 5)), 150);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        clearInterval(interval);
        if (cancelledRef.current) return;
        setProgress(100);
        const { latitude: lat, longitude: lng } = pos.coords;
        router.push(`/located?lat=${lat}&lng=${lng}`);
      },
      (err) => {
        clearInterval(interval);
        if (cancelledRef.current) return;
        if (err.code === err.TIMEOUT || err.code === err.POSITION_UNAVAILABLE) {
          router.push("/fallback");
        } else {
          setErrorMsg("Location access denied. Please enable it in your browser settings.");
          setState("error");
        }
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 },
    );

    return () => {
      cancelledRef.current = true;
      clearInterval(interval);
    };
  }, [state, router]);

  if (state === "prompt") {
    return (
      <main className="flex h-dvh flex-col items-center justify-center gap-6 bg-white px-6">
        <div className="w-full max-w-xs space-y-4 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[oklch(0.55_0.15_250)]/10">
            <svg
              className="h-8 w-8 text-[oklch(0.55_0.15_250)]"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="8" />
              <circle cx="12" cy="12" r="2.2" />
              <path d="M12 2v2M12 20v2M2 12h2M20 12h2" />
            </svg>
          </div>
          <h1 className="text-xl font-bold">Find my parking provider</h1>
          <p className="text-sm text-gray-500">
            ParkBridge will use your GPS location to identify the correct provider and zone code.
            Your location is not stored.
          </p>
          <button
            onClick={() => setState("locating")}
            className="w-full rounded-2xl bg-[oklch(0.55_0.15_250)] py-4 text-base font-bold text-white"
          >
            I am parked here
          </button>
          <Link href="/" className="block text-sm text-gray-400">
            Cancel
          </Link>
        </div>
      </main>
    );
  }

  if (state === "error") {
    return (
      <main className="flex h-dvh flex-col items-center justify-center gap-4 bg-white px-6">
        <p className="text-center text-sm text-gray-500">{errorMsg}</p>
        <Link
          href="/fallback"
          className="rounded-xl bg-[oklch(0.55_0.15_250)] px-6 py-3 text-sm font-bold text-white"
        >
          Enter zone manually instead
        </Link>
        <Link href="/" className="text-sm text-gray-400">
          Back to home
        </Link>
      </main>
    );
  }

  return (
    <main className="flex h-dvh flex-col items-center justify-center gap-6 bg-white px-6">
      <div className="w-full max-w-xs space-y-4">
        <p className="font-mono text-xs tracking-widest text-gray-400">
          AT-CAR MODE · IDENTIFYING
        </p>
        <h1 className="text-lg font-bold">Finding your parking location…</h1>

        {/* GPS progress */}
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-400">GPS lock</span>
          <div className="flex-1 overflow-hidden rounded-full bg-gray-100 h-2">
            <div
              className="h-full rounded-full bg-[oklch(0.55_0.15_250)] transition-all duration-150"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-xs text-gray-400">±8m</span>
        </div>

        <p className="text-xs text-gray-400">
          Matching your position to a parking zone polygon.
        </p>

        <button
          onClick={() => router.push("/fallback")}
          className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 py-3 text-sm font-semibold text-gray-600"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path d="M12 3.5L21 19H3z" />
            <path d="M12 9.5v4M12 16.4v.3" />
          </svg>
          Weak signal? Enter manually
        </button>
      </div>
    </main>
  );
}

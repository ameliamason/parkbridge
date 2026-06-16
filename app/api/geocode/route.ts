import { NextRequest, NextResponse } from "next/server";

const NOMINATIM = "https://nominatim.openstreetmap.org";

// Nominatim requires a descriptive User-Agent identifying the application.
const UA = "ParkBridge/0.1 (parkbridge.vercel.app)";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q");
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  // Search by text query (autocomplete)
  if (q) {
    const url = new URL(`${NOMINATIM}/search`);
    url.searchParams.set("q", q);
    url.searchParams.set("format", "json");
    url.searchParams.set("addressdetails", "1");
    url.searchParams.set("limit", "6");
    url.searchParams.set("countrycodes", "gb");

    const res = await fetch(url, { headers: { "User-Agent": UA } });
    if (!res.ok) return NextResponse.json({ results: [] });
    const data = await res.json();
    return NextResponse.json({ results: data });
  }

  // Reverse geocode: lat/lng → address
  if (lat && lng) {
    const url = new URL(`${NOMINATIM}/reverse`);
    url.searchParams.set("lat", lat);
    url.searchParams.set("lon", lng);
    url.searchParams.set("format", "json");

    const res = await fetch(url, { headers: { "User-Agent": UA } });
    if (!res.ok) return NextResponse.json({ result: null });
    const data = await res.json();
    return NextResponse.json({ result: data });
  }

  return NextResponse.json({ error: "provide q or lat+lng" }, { status: 400 });
}

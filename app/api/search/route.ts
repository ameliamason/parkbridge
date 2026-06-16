import { NextRequest, NextResponse } from "next/server";
import { getServiceClient } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const radius = Math.min(parseInt(searchParams.get("radius") ?? "400"), 2000);

  if (!lat || !lng) {
    return NextResponse.json({ error: "lat and lng are required" }, { status: 400 });
  }

  const supabase = getServiceClient();

  const { data, error } = await supabase.rpc("search_parking_locations", {
    lat: parseFloat(lat),
    lng: parseFloat(lng),
    radius_metres: radius,
  });

  if (error) {
    console.error("search rpc error", error);
    return NextResponse.json({ error: "search failed" }, { status: 500 });
  }

  return NextResponse.json({ results: data });
}

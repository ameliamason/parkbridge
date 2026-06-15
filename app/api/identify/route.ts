import { NextRequest, NextResponse } from "next/server";
import { getServiceClient } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  if (!lat || !lng) {
    return NextResponse.json({ error: "lat and lng are required" }, { status: 400 });
  }

  const supabase = getServiceClient();

  const { data, error } = await supabase.rpc("identify_parking_location", {
    lat: parseFloat(lat),
    lng: parseFloat(lng),
  });

  if (error) {
    console.error("identify rpc error", error);
    return NextResponse.json({ error: "identification failed" }, { status: 500 });
  }

  return NextResponse.json({ results: data });
}

import { NextRequest, NextResponse } from "next/server";
import { getServiceClient } from "@/lib/supabase";
import type { UserCorrection } from "@/lib/types";

export async function POST(req: NextRequest) {
  const body = (await req.json()) as UserCorrection & { session_token: string };
  const { location_id, correction_type, reported_value, expected_value, notes, session_token } =
    body;

  if (!location_id || !correction_type || !session_token) {
    return NextResponse.json({ error: "missing required fields" }, { status: 400 });
  }

  const supabase = getServiceClient();

  const { error } = await supabase.from("user_corrections").insert({
    location_id,
    correction_type,
    reported_value,
    expected_value,
    notes,
    session_token,
    status: "pending",
  });

  if (error) {
    console.error("correction insert error", error);
    return NextResponse.json({ error: "submission failed" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

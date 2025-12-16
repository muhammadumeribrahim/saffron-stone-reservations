import { NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase/admin";
import { buildTimeSlotOptions, BOOKING_RULES } from "@/lib/booking/slots";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const date = (searchParams.get("date") || "").trim();      // YYYY-MM-DD
  const partySizeRaw = searchParams.get("partySize") || "2";
  const partySize = Math.max(1, Math.min(BOOKING_RULES.maxPartySize, Number(partySizeRaw) || 2));

  const restaurantId = process.env.NEXT_PUBLIC_RESTAURANT_ID;
  if (!restaurantId) {
    return NextResponse.json({ error: "Missing NEXT_PUBLIC_RESTAURANT_ID" }, { status: 500 });
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json({ error: "Invalid date" }, { status: 400 });
  }

  const supabase = createSupabaseAdmin();

  // Read max covers per slot from restaurants (fallback to env/rule)
  const { data: rest } = await supabase
    .from("restaurants")
    .select("max_covers_per_slot")
    .eq("id", restaurantId)
    .maybeSingle();

  const maxCovers = Number(rest?.max_covers_per_slot ?? 20);

  // Sum used covers per requested_time for that day (PENDING + APPROVED hold capacity)
  const { data: rows, error } = await supabase
    .from("reservation_requests")
    .select("requested_time, party_size, status")
    .eq("restaurant_id", restaurantId)
    .eq("requested_date", date)
    .in("status", ["PENDING", "APPROVED"]);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const usedByTime = new Map<string, number>();
  for (const r of rows ?? []) {
    const hhmm = String(r.requested_time).slice(0, 5);
    usedByTime.set(hhmm, (usedByTime.get(hhmm) ?? 0) + Number(r.party_size ?? 0));
  }

  const options = buildTimeSlotOptions().map((opt) => {
    const used = usedByTime.get(opt.value) ?? 0;
    const remaining = Math.max(0, maxCovers - used);
    const canBook = remaining >= partySize;
    return { ...opt, remaining, canBook };
  });

  return NextResponse.json({
    date,
    partySize,
    maxCovers,
    slots: options,
  });
}

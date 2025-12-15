"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { createSupabaseServer } from "@/lib/supabase/server";

const reservationSchema = z.object({
  customerName: z.string().min(2, "Name must be at least 2 characters."),
  customerEmail: z.string().email("Please enter a valid email."),
  customerPhone: z.string().optional().default(""),
  partySize: z.coerce.number().int().min(1).max(20),
  requestedDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format."),
  requestedTime: z.string().regex(/^\d{2}:\d{2}$/, "Invalid time format."),
});

export type ReserveFormState = {
  ok: boolean;
  message?: string;
  fieldErrors?: Record<string, string>;
};

export async function submitReservation(
  prevState: ReserveFormState,
  formData: FormData
): Promise<ReserveFormState> {
  const parsed = reservationSchema.safeParse({
    customerName: formData.get("customerName"),
    customerEmail: formData.get("customerEmail"),
    customerPhone: formData.get("customerPhone"),
    partySize: formData.get("partySize"),
    requestedDate: formData.get("requestedDate"),
    requestedTime: formData.get("requestedTime"),
  });

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const fieldName = String(issue.path[0] ?? "form");
      if (!fieldErrors[fieldName]) fieldErrors[fieldName] = issue.message;
    }
    return { ok: false, message: "Please fix the highlighted fields.", fieldErrors };
  }

  const restaurantId = process.env.NEXT_PUBLIC_RESTAURANT_ID;
  if (!restaurantId) {
    return { ok: false, message: "Missing NEXT_PUBLIC_RESTAURANT_ID in .env.local" };
  }

  const supabase = await createSupabaseServer();

  const { data, error } = await supabase.rpc("create_reservation_request", {
    p_restaurant_id: restaurantId,
    p_customer_name: parsed.data.customerName,
    p_customer_email: parsed.data.customerEmail,
    p_customer_phone: parsed.data.customerPhone ?? "",
    p_party_size: parsed.data.partySize,
    p_requested_date: parsed.data.requestedDate,
    p_requested_time: parsed.data.requestedTime,
  });

  if (error || !data) {
    return { ok: false, message: error?.message ?? "Failed to create reservation request." };
  }

  redirect(`/reserve/success?code=${encodeURIComponent(String(data))}`);
}

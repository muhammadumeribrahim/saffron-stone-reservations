"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { createSupabaseServer } from "@/lib/supabase/server";
import { sendEmail } from "@/lib/email/mailer";
import { isValidSlot, BOOKING_RULES } from "@/lib/booking/slots";

function normalizeTimeToHHMM(value: unknown) {
  const raw = String(value ?? "").trim();
  const match = raw.match(/^(\d{2}:\d{2})/);
  return match ? match[1] : raw;
}

const reservationSchema = z.object({
  customerName: z.string().min(2, "Name must be at least 2 characters."),
  customerEmail: z.string().email("Please enter a valid email."),
  customerPhone: z.string().optional().default(""),
  partySize: z.coerce.number().int().min(1).max(BOOKING_RULES.maxPartySize),
  requestedDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format."),
  requestedTime: z
    .string()
    .transform((t) => normalizeTimeToHHMM(t))
    .refine((t) => isValidSlot(t), "Please pick a valid time slot."),
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
    const msg = error?.message ?? "Failed to create reservation request.";

    // Friendly message when DB rejects the slot
    if (msg.includes("SLOT_FULL")) {
      return {
        ok: false,
        message: "That time slot is fully booked. Please pick another time.",
        fieldErrors: {
          requestedTime: "That time slot is fully booked. Please pick another time.",
        },
      };
    }

    return { ok: false, message: msg };
  }

  const code = String(data);

  const baseUrl = process.env.APP_BASE_URL || "http://localhost:3000";
  const statusUrl = `${baseUrl}/reservation/${encodeURIComponent(code)}`;

  try {
    await sendEmail({
      to: parsed.data.customerEmail,
      subject: "We received your reservation request",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.5">
          <h2>Reservation request received</h2>
          <p>Hi ${parsed.data.customerName},</p>
          <p>We received your request for:</p>
          <ul>
            <li><b>Date:</b> ${parsed.data.requestedDate}</li>
            <li><b>Time:</b> ${parsed.data.requestedTime}</li>
            <li><b>Party size:</b> ${parsed.data.partySize}</li>
          </ul>
          <p><b>Confirmation code:</b> <code>${code}</code></p>
          <p>You can check status here:</p>
          <p><a href="${statusUrl}">${statusUrl}</a></p>
        </div>
      `,
      text: `We received your reservation request. Code: ${code}. Status: ${statusUrl}`,
    });
  } catch (e) {
    console.error("Reservation email failed:", e);
  }

  redirect(`/reserve/success?code=${encodeURIComponent(code)}`);
}

"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServer } from "@/lib/supabase/server";
import { sendEmail } from "@/lib/email/mailer";
import { formatTime12h } from "@/lib/booking/slots";

export async function setReservationStatus(formData: FormData) {
  const id = String(formData.get("id") || "");
  const status = String(formData.get("status") || "");

  if (!id) throw new Error("Missing reservation id.");
  if (status !== "APPROVED" && status !== "DENIED") throw new Error("Invalid status.");

  const supabase = await createSupabaseServer();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Not signed in.");

  // Extra safety check (RLS should also protect)
  const { data: adminRow, error: adminErr } = await supabase
    .from("admin_users")
    .select("user_id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (adminErr) throw new Error(adminErr.message);
  if (!adminRow) throw new Error("Not an admin.");

  // Read row first (so we can email customer even after update)
  const { data: row, error: readErr } = await supabase
    .from("reservation_requests")
    .select(
      "confirmation_code, customer_name, customer_email, requested_date, requested_time, party_size"
    )
    .eq("id", id)
    .maybeSingle();

  if (readErr) throw new Error(readErr.message);
  if (!row) throw new Error("Reservation not found.");

  // Update status
  const { error: updateErr } = await supabase
    .from("reservation_requests")
    .update({ status })
    .eq("id", id);

  if (updateErr) throw new Error(updateErr.message);

  // Email customer (should NOT break admin flow)
  if (row.customer_email) {
    const baseUrl = process.env.APP_BASE_URL || "http://localhost:3000";
    const statusUrl = `${baseUrl}/reservation/${encodeURIComponent(row.confirmation_code)}`;

    const timeHHMM = String(row.requested_time).slice(0, 5);
    const time12 = formatTime12h(timeHHMM);

    const subject =
      status === "APPROVED"
        ? "Your reservation is approved"
        : "Your reservation request was declined";

    const headline =
      status === "APPROVED"
        ? "Good news — your reservation is approved ✅"
        : "Update — your reservation was declined ❌";

    try {
      await sendEmail({
        to: row.customer_email,
        subject,
        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.5">
            <h2>${headline}</h2>
            <p>Hi ${row.customer_name},</p>
            <p>Your reservation request has been <b>${status}</b>.</p>

            <ul>
              <li><b>Date:</b> ${row.requested_date}</li>
              <li><b>Time:</b> ${time12}</li>
              <li><b>Party size:</b> ${row.party_size}</li>
            </ul>

            <p><b>Confirmation code:</b> <code>${row.confirmation_code}</code></p>

            <p>You can check status anytime here:</p>
            <p><a href="${statusUrl}">${statusUrl}</a></p>
          </div>
        `,
        text: `Decision: ${status}. Code: ${row.confirmation_code}. Date: ${row.requested_date}. Time: ${time12}. Status link: ${statusUrl}`,
      });
    } catch (e) {
      console.error("Status email failed:", e);
    }
  }

  // Refresh list + detail page
  revalidatePath("/admin/reservations");
  revalidatePath(`/admin/reservations/${id}`);
}

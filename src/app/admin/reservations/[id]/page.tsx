import { createSupabaseServer } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { setReservationStatus } from "../actions";

export default async function AdminReservationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createSupabaseServer();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-2xl font-semibold">Not signed in</h1>
        <p className="mt-2 text-sm text-gray-600">
          Go to <a className="underline" href="/admin/login">/admin/login</a>
        </p>
      </main>
    );
  }

  const restaurantId = process.env.NEXT_PUBLIC_RESTAURANT_ID;
  if (!restaurantId) notFound();

  const { data, error } = await supabase
    .from("reservation_requests")
    .select(
      "id, confirmation_code, customer_name, customer_email, customer_phone, party_size, requested_date, requested_time, status, created_at"
    )
    .eq("restaurant_id", restaurantId)
    .eq("id", id)
    .maybeSingle();

  if (error) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-2xl font-semibold">Error</h1>
        <p className="mt-2 text-sm text-gray-600">{error.message}</p>
      </main>
    );
  }

  if (!data) notFound();

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Reservation</h1>
        <Link href="/admin/reservations" className="rounded-md border px-3 py-2 text-sm hover:bg-gray-50">
          Back
        </Link>
      </div>

      <div className="mt-6 rounded-xl border p-6">
        <p className="text-sm text-gray-600">Confirmation Code</p>
        <p className="mt-2 text-2xl font-mono">{data.confirmation_code}</p>

        <div className="mt-6 space-y-2 text-sm">
          <p><span className="font-medium">Status:</span> {data.status}</p>
          <p><span className="font-medium">Customer:</span> {data.customer_name}</p>
          <p><span className="font-medium">Email:</span> {data.customer_email}</p>
          <p><span className="font-medium">Phone:</span> {data.customer_phone || "—"}</p>
          <p><span className="font-medium">Party Size:</span> {data.party_size}</p>
          <p><span className="font-medium">Date:</span> {data.requested_date}</p>
          <p><span className="font-medium">Time:</span> {String(data.requested_time).slice(0, 5)}</p>
        </div>

        {data.status === "PENDING" ? (
          <div className="mt-6 flex gap-2">
            <form action={setReservationStatus}>
              <input type="hidden" name="id" value={data.id} />
              <input type="hidden" name="status" value="APPROVED" />
              <button className="rounded-md border px-3 py-2 text-sm hover:bg-gray-50">Approve</button>
            </form>

            <form action={setReservationStatus}>
              <input type="hidden" name="id" value={data.id} />
              <input type="hidden" name="status" value="DENIED" />
              <button className="rounded-md border px-3 py-2 text-sm hover:bg-gray-50">Deny</button>
            </form>
          </div>
        ) : null}
      </div>
    </main>
  );
}

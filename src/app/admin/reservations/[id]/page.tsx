import { createSupabaseServer } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { setReservationStatus } from "../actions";
import { formatTime12h } from "@/lib/booking/slots";

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
      <section className="mx-auto max-w-3xl">
        <div className="glass p-8 md:p-12">
          <h1 className="text-2xl font-semibold">Not signed in</h1>
          <p className="mt-2 text-sm text-zinc-600">
            Go to <a className="underline" href="/admin/login">/admin/login</a>
          </p>
        </div>
      </section>
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
      <section className="mx-auto max-w-3xl">
        <div className="glass p-8 md:p-12">
          <h1 className="text-2xl font-semibold">Error</h1>
          <p className="mt-2 text-sm text-zinc-600">{error.message}</p>
        </div>
      </section>
    );
  }

  if (!data) notFound();

  const timeHHMM = String(data.requested_time).slice(0, 5);

  const badge =
    data.status === "APPROVED"
      ? "border-emerald-300/60 bg-emerald-500/10 text-emerald-800"
      : data.status === "DENIED"
      ? "border-rose-300/60 bg-rose-500/10 text-rose-800"
      : "border-amber-300/60 bg-amber-500/10 text-amber-800";

  return (
    <section className="mx-auto max-w-4xl">
      <div className="glass p-8 md:p-12">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-900/10 bg-white/60 px-3 py-1 text-xs text-zinc-700">
              Admin • Reservation
            </div>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight">Reservation</h1>
          </div>

          <Link href="/admin/reservations" className="btn-ghost rounded-xl px-4 py-2 text-sm font-semibold">
            Back
          </Link>
        </div>

        <div className="mt-8 rounded-3xl border border-zinc-900/10 bg-white/60 p-6">
          <p className="text-sm text-zinc-600">Confirmation Code</p>
          <p className="mt-2 text-3xl font-mono">{data.confirmation_code}</p>

          <div className="mt-6 grid gap-3 text-sm md:grid-cols-2">
            <div className={`rounded-2xl border px-4 py-3 ${badge}`}>
              <div className="text-xs opacity-70">Status</div>
              <div className="mt-1 font-semibold">{data.status}</div>
            </div>

            <div className="rounded-2xl border border-zinc-900/10 bg-white/70 px-4 py-3">
              <div className="text-xs text-zinc-500">When</div>
              <div className="mt-1 font-semibold">
                {data.requested_date} • {formatTime12h(timeHHMM)}
              </div>
              <div className="mt-2 text-xs text-zinc-500">Party size: {data.party_size}</div>
            </div>

            <div className="rounded-2xl border border-zinc-900/10 bg-white/70 px-4 py-3">
              <div className="text-xs text-zinc-500">Customer</div>
              <div className="mt-1 font-semibold">{data.customer_name}</div>
              <div className="mt-2 text-xs text-zinc-600">{data.customer_email}</div>
              <div className="mt-1 text-xs text-zinc-600">{data.customer_phone || "—"}</div>
            </div>
          </div>

          {data.status === "PENDING" ? (
            <div className="mt-6 flex flex-wrap gap-2">
              <form action={setReservationStatus}>
                <input type="hidden" name="id" value={data.id} />
                <input type="hidden" name="status" value="APPROVED" />
                <button className="btn-primary rounded-xl px-5 py-3 text-sm font-semibold">
                  Approve
                </button>
              </form>

              <form action={setReservationStatus}>
                <input type="hidden" name="id" value={data.id} />
                <input type="hidden" name="status" value="DENIED" />
                <button className="btn-ghost rounded-xl px-5 py-3 text-sm font-semibold">
                  Deny
                </button>
              </form>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

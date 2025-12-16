import { createSupabaseServer } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { formatTime12h } from "@/lib/booking/slots";
import Link from "next/link";

export default async function ReservationStatusPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code: rawCode } = await params;
  const code = (rawCode || "").toUpperCase();

  const supabase = await createSupabaseServer();

  const { data, error } = await supabase.rpc("lookup_reservation_status", {
    p_code: code,
  });

  if (error) {
    return (
      <section className="mx-auto max-w-3xl">
        <div className="glass p-8 md:p-12">
          <h1 className="text-2xl font-semibold">Something went wrong</h1>
          <p className="mt-2 text-sm text-zinc-600">{error.message}</p>
          <div className="mt-6">
            <Link className="btn-ghost rounded-xl px-5 py-3 text-sm font-semibold" href="/status">
              Back to status
            </Link>
          </div>
        </div>
      </section>
    );
  }

  if (!data || data.length === 0) notFound();

  const row = data[0];
  const timeHHMM = String(row.requested_time).slice(0, 5);

  const badge =
    row.status === "APPROVED"
      ? "bg-emerald-500/15 text-emerald-800 border-emerald-300/60"
      : row.status === "DENIED"
      ? "bg-rose-500/15 text-rose-800 border-rose-300/60"
      : "bg-amber-500/15 text-amber-800 border-amber-300/60";

  return (
    <section className="mx-auto max-w-3xl">
      <div className="glass p-8 md:p-12">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-900/10 bg-white/60 px-3 py-1 text-xs text-zinc-700">
              Saffron & Stone • Reservation Status
            </div>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight">Your update</h1>
            <p className="mt-3 text-zinc-600">
              Keep this code for later — you can check anytime.
            </p>
          </div>

          <Link href="/status" className="btn-ghost rounded-xl px-4 py-2 text-sm font-semibold">
            Back
          </Link>
        </div>

        <div className="mt-8 rounded-3xl border border-zinc-900/10 bg-white/60 p-6">
          <p className="text-sm text-zinc-600">Confirmation Code</p>
          <p className="mt-2 text-3xl font-mono">{code}</p>

          <div className="mt-6 grid gap-3 text-sm md:grid-cols-2">
            <div className={`rounded-2xl border px-4 py-3 ${badge}`}>
              <div className="text-xs opacity-70">Status</div>
              <div className="mt-1 text-sm font-semibold">{row.status}</div>
            </div>

            <div className="rounded-2xl border border-zinc-900/10 bg-white/70 px-4 py-3">
              <div className="text-xs text-zinc-500">When</div>
              <div className="mt-1 text-sm font-semibold">
                {row.requested_date} • {formatTime12h(timeHHMM)}
              </div>
              <div className="mt-2 text-xs text-zinc-500">Party size: {row.party_size}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

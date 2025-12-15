import { createSupabaseServer } from "@/lib/supabase/server";
import { notFound } from "next/navigation";

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
      <main className="mx-auto max-w-2xl px-4 py-10">
        <h1 className="text-2xl font-semibold">Something went wrong</h1>
        <p className="mt-2 text-sm text-gray-600">{error.message}</p>
      </main>
    );
  }

  if (!data || data.length === 0) {
    notFound();
  }

  const row = data[0];

  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-3xl font-semibold">Reservation Status</h1>

      <div className="mt-6 rounded-xl border p-6">
        <p className="text-sm text-gray-600">Confirmation Code</p>
        <p className="mt-2 text-2xl font-mono">{code}</p>

        <div className="mt-6 space-y-2 text-sm">
          <p>
            <span className="font-medium">Status:</span> {row.status}
          </p>
          <p>
            <span className="font-medium">Date:</span> {row.requested_date}
          </p>
          <p>
            <span className="font-medium">Time:</span> {String(row.requested_time).slice(0, 5)}
          </p>
          <p>
            <span className="font-medium">Party Size:</span> {row.party_size}
          </p>
        </div>
      </div>
    </main>
  );
}

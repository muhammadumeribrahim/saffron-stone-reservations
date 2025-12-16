import { createSupabaseServer } from "@/lib/supabase/server";
import { adminLogout } from "../login/actions";
import { setReservationStatus } from "./actions";
import Link from "next/link";
import { formatTime12h } from "@/lib/booking/slots";

type SearchParams = Record<string, string | string[] | undefined>;

function pickFirst(v: string | string[] | undefined) {
  return Array.isArray(v) ? v[0] : v;
}

function buildHref(status: string, q: string) {
  const sp = new URLSearchParams();
  if (status && status !== "PENDING") sp.set("status", status);
  if (q) sp.set("q", q);
  const qs = sp.toString();
  return qs ? `/admin/reservations?${qs}` : `/admin/reservations`;
}

function StatusPill({ status }: { status: string }) {
  const cls =
    status === "APPROVED"
      ? "border-emerald-300/60 bg-emerald-500/10 text-emerald-800"
      : status === "DENIED"
      ? "border-rose-300/60 bg-rose-500/10 text-rose-800"
      : "border-amber-300/60 bg-amber-500/10 text-amber-800";

  return (
    <span className={`inline-flex items-center rounded-full border px-2 py-1 text-xs font-semibold ${cls}`}>
      {status}
    </span>
  );
}

export default async function AdminReservationsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = await searchParams;

  const status = (pickFirst(sp.status) || "PENDING").toUpperCase();
  const q = (pickFirst(sp.q) || "").trim();

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
  if (!restaurantId) {
    return (
      <section className="mx-auto max-w-3xl">
        <div className="glass p-8 md:p-12">
          <h1 className="text-2xl font-semibold">Missing config</h1>
          <p className="mt-2 text-sm text-zinc-600">Restaurant id is missing in env.</p>
        </div>
      </section>
    );
  }

  let query = supabase
    .from("reservation_requests")
    .select(
      "id, confirmation_code, customer_name, customer_email, party_size, requested_date, requested_time, status, created_at"
    )
    .eq("restaurant_id", restaurantId)
    .order("created_at", { ascending: false });

  if (status !== "ALL" && ["PENDING", "APPROVED", "DENIED"].includes(status)) {
    query = query.eq("status", status);
  }

  if (q) {
    const safe = q.replace(/%/g, "\\%").replace(/,/g, "\\,");
    query = query.or(
      `confirmation_code.ilike.%${safe}%,customer_email.ilike.%${safe}%,customer_name.ilike.%${safe}%`
    );
  }

  const { data, error } = await query;
  const tabs = ["PENDING", "APPROVED", "DENIED", "ALL"];

  return (
    <section className="mx-auto max-w-6xl">
      <div className="glass p-6 md:p-8">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-900/10 bg-white/60 px-3 py-1 text-xs text-zinc-700">
              Admin • Saffron & Stone
            </div>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight">Reservations</h1>
          </div>

          <form action={adminLogout}>
            <button className="btn-ghost rounded-xl px-4 py-2 text-sm font-semibold">Logout</button>
          </form>
        </div>

        <div className="mt-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2">
            {tabs.map((t) => {
              const active = t === status;
              return (
                <Link
                  key={t}
                  href={buildHref(t, q)}
                  className={
                    active
                      ? "btn-primary rounded-xl px-3 py-2 text-xs font-semibold"
                      : "btn-ghost rounded-xl px-3 py-2 text-xs font-semibold"
                  }
                >
                  {t}
                </Link>
              );
            })}
          </div>

          <form method="GET" action="/admin/reservations" className="flex gap-2">
            <input type="hidden" name="status" value={status} />
            <input
              name="q"
              defaultValue={q}
              placeholder="Search code, name, email..."
              className="w-full rounded-xl border border-zinc-900/10 bg-white/70 px-4 py-2 text-sm outline-none md:w-80"
            />
            <button className="btn-ghost rounded-xl px-4 py-2 text-sm font-semibold">Search</button>
          </form>
        </div>

        {error ? (
          <div className="mt-6 rounded-2xl border border-rose-300/60 bg-rose-500/10 p-5">
            <p className="text-sm text-rose-700">{error.message}</p>
          </div>
        ) : (data ?? []).length === 0 ? (
          <div className="mt-6 rounded-2xl border border-zinc-900/10 bg-white/60 p-6 text-sm text-zinc-600">
            No reservation requests found.
          </div>
        ) : (
          <div className="mt-6 overflow-x-auto rounded-3xl border border-zinc-900/10 bg-white/60">
            <table className="w-full text-sm">
              <thead className="text-left text-xs text-zinc-600">
                <tr className="border-b border-zinc-900/10">
                  <th className="p-4">Code</th>
                  <th className="p-4">Customer</th>
                  <th className="p-4">Party</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Time</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>

              <tbody>
                {(data ?? []).map((r) => {
                  const timeHHMM = String(r.requested_time).slice(0, 5);
                  return (
                    <tr key={r.id} className="border-b border-zinc-900/10 last:border-b-0">
                      <td className="p-4 font-mono">
                        <Link className="underline decoration-zinc-400 hover:decoration-zinc-900" href={`/admin/reservations/${r.id}`}>
                          {r.confirmation_code}
                        </Link>
                      </td>

                      <td className="p-4">
                        <div className="font-semibold">{r.customer_name}</div>
                        <div className="text-xs text-zinc-600">{r.customer_email}</div>
                      </td>

                      <td className="p-4">{r.party_size}</td>
                      <td className="p-4">{r.requested_date}</td>
                      <td className="p-4">{formatTime12h(timeHHMM)}</td>
                      <td className="p-4"><StatusPill status={r.status} /></td>

                      <td className="p-4">
                        {r.status === "PENDING" ? (
                          <div className="flex gap-2">
                            <form action={setReservationStatus}>
                              <input type="hidden" name="id" value={r.id} />
                              <input type="hidden" name="status" value="APPROVED" />
                              <button className="btn-ghost rounded-xl px-3 py-2 text-xs font-semibold">
                                Approve
                              </button>
                            </form>

                            <form action={setReservationStatus}>
                              <input type="hidden" name="id" value={r.id} />
                              <input type="hidden" name="status" value="DENIED" />
                              <button className="btn-ghost rounded-xl px-3 py-2 text-xs font-semibold">
                                Deny
                              </button>
                            </form>
                          </div>
                        ) : (
                          <span className="text-xs text-zinc-500">—</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}

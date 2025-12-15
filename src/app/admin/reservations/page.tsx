import { createSupabaseServer } from "@/lib/supabase/server";
import { adminLogout } from "../login/actions";
import { setReservationStatus } from "./actions";
import Link from "next/link";

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
      <main className="mx-auto max-w-4xl px-4 py-10">
        <h1 className="text-2xl font-semibold">Not signed in</h1>
        <p className="mt-2 text-sm text-gray-600">
          Go to{" "}
          <a className="underline" href="/admin/login">
            /admin/login
          </a>
        </p>
      </main>
    );
  }

  const restaurantId = process.env.NEXT_PUBLIC_RESTAURANT_ID;
  if (!restaurantId) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-10">
        <h1 className="text-2xl font-semibold">Missing config</h1>
        <p className="mt-2 text-sm text-gray-600">
          NEXT_PUBLIC_RESTAURANT_ID is missing in .env.local
        </p>
      </main>
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
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-3xl font-semibold">Reservations</h1>
        <form action={adminLogout}>
          <button className="rounded-md border px-3 py-2 text-sm hover:bg-gray-50">
            Logout
          </button>
        </form>
      </div>

      {/* Tabs + Search */}
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
                    ? "rounded-md bg-black px-3 py-2 text-xs text-white"
                    : "rounded-md border px-3 py-2 text-xs hover:bg-gray-50"
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
            className="w-full rounded-md border px-3 py-2 text-sm md:w-72"
          />
          <button className="rounded-md border px-3 py-2 text-sm hover:bg-gray-50">
            Search
          </button>
        </form>
      </div>

      {error ? (
        <div className="mt-6 rounded-xl border p-6">
          <p className="text-sm text-red-600">{error.message}</p>
        </div>
      ) : (data ?? []).length === 0 ? (
        <div className="mt-6 rounded-xl border p-6 text-sm text-gray-600">
          No reservation requests found.
        </div>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-xl border">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left">
              <tr>
                <th className="p-3">Code</th>
                <th className="p-3">Customer</th>
                <th className="p-3">Party</th>
                <th className="p-3">Date</th>
                <th className="p-3">Time</th>
                <th className="p-3">Status</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {(data ?? []).map((r) => (
                <tr key={r.id} className="border-t">
                  <td className="p-3 font-mono">
                    <Link className="underline" href={`/admin/reservations/${r.id}`}>
                      {r.confirmation_code}
                    </Link>
                  </td>

                  <td className="p-3">
                    <div className="font-medium">{r.customer_name}</div>
                    <div className="text-gray-600">{r.customer_email}</div>
                  </td>

                  <td className="p-3">{r.party_size}</td>
                  <td className="p-3">{r.requested_date}</td>
                  <td className="p-3">{String(r.requested_time).slice(0, 5)}</td>
                  <td className="p-3">{r.status}</td>

                  <td className="p-3">
                    {r.status === "PENDING" ? (
                      <div className="flex gap-2">
                        <form action={setReservationStatus}>
                          <input type="hidden" name="id" value={r.id} />
                          <input type="hidden" name="status" value="APPROVED" />
                          <button className="rounded-md border px-3 py-1 text-xs hover:bg-gray-50">
                            Approve
                          </button>
                        </form>

                        <form action={setReservationStatus}>
                          <input type="hidden" name="id" value={r.id} />
                          <input type="hidden" name="status" value="DENIED" />
                          <button className="rounded-md border px-3 py-1 text-xs hover:bg-gray-50">
                            Deny
                          </button>
                        </form>
                      </div>
                    ) : (
                      <span className="text-xs text-gray-600">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}

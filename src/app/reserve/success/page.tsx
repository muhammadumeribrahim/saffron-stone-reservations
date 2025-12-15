import Link from "next/link";

type SearchParams = Record<string, string | string[] | undefined>;

export default async function ReserveSuccessPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = await searchParams;

  const raw = sp?.code;
  const code = Array.isArray(raw) ? raw[0] : raw ?? "";

  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-3xl font-semibold">Request Received</h1>
      <p className="mt-2 text-gray-600">Your reservation request is pending review.</p>

      <div className="mt-6 rounded-xl border p-6">
        <p className="text-sm text-gray-600">Confirmation Code</p>
        <p className="mt-2 text-2xl font-mono">{code || "—"}</p>

        {code ? (
          <Link
            href={`/reservation/${encodeURIComponent(code)}`}
            className="mt-4 inline-block rounded-md border px-4 py-2 text-sm hover:bg-gray-50"
          >
            Check status
          </Link>
        ) : null}
      </div>
    </main>
  );
}

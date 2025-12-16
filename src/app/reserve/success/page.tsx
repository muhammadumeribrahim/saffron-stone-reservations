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
    <section className="mx-auto max-w-3xl">
      <div className="glass p-8 md:p-12">
        <h1 className="text-4xl font-semibold tracking-tight">Request received</h1>
        <p className="mt-3 text-zinc-600">
          Your reservation request is now pending review.
        </p>

        <div className="mt-8 rounded-3xl border border-zinc-900/10 bg-white/60 p-6">
          <p className="text-sm text-zinc-600">Confirmation Code</p>
          <p className="mt-2 text-3xl font-mono">{code || "—"}</p>

          <div className="mt-6 flex flex-wrap gap-3">
            {code ? (
              <Link
                href={`/reservation/${encodeURIComponent(code)}`}
                className="btn-primary rounded-xl px-5 py-3 text-sm font-semibold"
              >
                View status
              </Link>
            ) : null}

            <Link
              href="/reserve"
              className="btn-ghost rounded-xl px-5 py-3 text-sm font-semibold"
            >
              Book another
            </Link>

            <Link
              href="/"
              className="btn-ghost rounded-xl px-5 py-3 text-sm font-semibold"
            >
              Back home
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

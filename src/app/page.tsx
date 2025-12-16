import Link from "next/link";

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="rounded-3xl border border-white/50 bg-white/60 p-10 shadow-[0_20px_60px_rgba(0,0,0,0.08)] backdrop-blur-xl">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/70 px-3 py-1 text-xs text-neutral-700">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Saffron &amp; Stone • Modern Mediterranean • River North
            </div>

            <h1 className="mt-6 text-5xl font-extrabold tracking-tight text-neutral-900">
              Reserve your table <span className="text-neutral-500">in seconds.</span>
            </h1>

            <p className="mt-4 max-w-xl text-base leading-7 text-neutral-700">
              Pick a date, choose a time, and get a confirmation code instantly.
              We’ll send updates by email.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/reserve"
                className="rounded-full bg-gradient-to-r from-amber-400 to-rose-400 px-6 py-3 text-sm font-semibold text-neutral-900 shadow-sm hover:opacity-95"
              >
                Book a table
              </Link>

              <Link
                href="/status"
                className="rounded-full border border-white/70 bg-white/70 px-6 py-3 text-sm font-semibold text-neutral-800 hover:bg-white"
              >
                Check status
              </Link>
            </div>

            <div className="mt-6 flex flex-wrap gap-2 text-xs text-neutral-700">
              <span className="rounded-full border border-white/60 bg-white/60 px-3 py-1">
                Open 12 PM – 12 AM
              </span>
              <span className="rounded-full border border-white/60 bg-white/60 px-3 py-1">
                Instant confirmation code
              </span>
              <span className="rounded-full border border-white/60 bg-white/60 px-3 py-1">
                Email updates
              </span>
              <span className="rounded-full border border-white/60 bg-white/60 px-3 py-1">
                Elegant dining
              </span>
            </div>
          </div>

          <div className="rounded-3xl border border-white/60 bg-white/70 p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-neutral-900">Tonight’s vibe</h3>
            <p className="mt-2 text-sm text-neutral-700">
              Warm lighting, seasonal plates, and a reservation experience that feels premium.
            </p>

            <div className="mt-5 grid gap-3">
              <div className="rounded-2xl border border-white/60 bg-white/70 p-4">
                <div className="text-xs text-neutral-500">Signature</div>
                <div className="mt-1 text-sm font-semibold text-neutral-900">
                  Saffron citrus branzino
                </div>
              </div>

              <div className="rounded-2xl border border-white/60 bg-white/70 p-4">
                <div className="text-xs text-neutral-500">Popular</div>
                <div className="mt-1 text-sm font-semibold text-neutral-900">
                  Truffle mezze board
                </div>
              </div>

              <div className="rounded-2xl border border-white/60 bg-white/70 p-4">
                <div className="text-xs text-neutral-500">Dessert</div>
                <div className="mt-1 text-sm font-semibold text-neutral-900">
                  Rose pistachio gelato
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick tiles */}
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-white/60 bg-white/60 p-5">
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold text-neutral-900">Reserve</div>
              <span className="rounded-full border border-white/70 bg-white/70 px-3 py-1 text-xs text-neutral-700">
                Open
              </span>
            </div>
            <p className="mt-2 text-sm text-neutral-700">
              Pick a date + time and request your table.
            </p>
          </div>

          <div className="rounded-2xl border border-white/60 bg-white/60 p-5">
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold text-neutral-900">Status</div>
              <span className="rounded-full border border-white/70 bg-white/70 px-3 py-1 text-xs text-neutral-700">
                Open
              </span>
            </div>
            <p className="mt-2 text-sm text-neutral-700">
              Check your reservation using your confirmation code.
            </p>
          </div>

          <div className="rounded-2xl border border-white/60 bg-white/60 p-5">
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold text-neutral-900">Admin</div>
              <span className="rounded-full border border-white/70 bg-white/70 px-3 py-1 text-xs text-neutral-700">
                Staff
              </span>
            </div>
            <p className="mt-2 text-sm text-neutral-700">
              Dashboard to approve/deny reservation requests.
            </p>
          </div>
        </div>
      </div>

      <footer className="mt-10 flex items-center justify-between text-xs text-neutral-600">
        <div>© 2025 Saffron &amp; Stone</div>
        <div className="flex gap-4">
          <Link className="hover:underline" href="/reserve">Book</Link>
          <Link className="hover:underline" href="/status">Check Status</Link>
          <Link className="hover:underline" href="/admin/login">Admin</Link>
        </div>
      </footer>
    </div>
  );
}

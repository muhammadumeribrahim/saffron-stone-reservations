import Link from "next/link";

export default function CaseStudyPage() {
  return (
    <main className="min-h-[calc(100vh-64px)]">
      {/* Same colorful vibe as your theme */}
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 -left-32 h-[520px] w-[520px] rounded-full bg-pink-200/60 blur-3xl" />
          <div className="absolute -top-24 right-[-140px] h-[520px] w-[520px] rounded-full bg-amber-200/60 blur-3xl" />
          <div className="absolute bottom-[-180px] left-[30%] h-[560px] w-[560px] rounded-full bg-sky-200/60 blur-3xl" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/70 to-white" />
        </div>

        <div className="relative mx-auto max-w-5xl px-4 py-12">
          <div className="rounded-3xl border bg-white/70 p-8 shadow-[0_20px_80px_rgba(0,0,0,0.10)] backdrop-blur">
            <p className="inline-flex items-center gap-2 rounded-full border bg-white px-3 py-1 text-xs text-neutral-700">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Case Study • Saffron &amp; Stone Reservations
            </p>

            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-neutral-900 sm:text-5xl">
              Building a reservation workflow for{" "}
              <span className="bg-gradient-to-r from-amber-600 to-pink-600 bg-clip-text text-transparent">
                Saffron &amp; Stone
              </span>
            </h1>

            <p className="mt-4 max-w-3xl text-lg leading-8 text-neutral-700">
              I built a reservation request system for a busy restaurant where bookings were
              coming from calls, walk-ins, and DMs. The main goal was to reduce missed requests,
              standardize the information staff receives, and give guests a simple way to track
              their reservation status without calling again.
            </p>

            {/* Problem / Approach / Outcome */}
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border bg-white p-5">
                <p className="text-sm font-medium text-neutral-900">The problem</p>
                <p className="mt-2 text-sm leading-6 text-neutral-700">
                  Staff were manually tracking requests across different channels. This caused
                  missing details, slow responses, and guests repeatedly asking for updates.
                </p>
              </div>

              <div className="rounded-2xl border bg-white p-5">
                <p className="text-sm font-medium text-neutral-900">My approach</p>
                <p className="mt-2 text-sm leading-6 text-neutral-700">
                  I designed a single workflow: guest submits → staff reviews → guest gets notified.
                  I focused on clear UX, validation, and a clean admin view for quick decisions.
                </p>
              </div>

              <div className="rounded-2xl border bg-white p-5">
                <p className="text-sm font-medium text-neutral-900">The outcome</p>
                <p className="mt-2 text-sm leading-6 text-neutral-700">
                  Guests receive a confirmation code instantly and can check status anytime. Staff
                  see all requests in one dashboard and approve/deny in one click.
                </p>
              </div>
            </div>

            {/* What I built */}
            <div className="mt-8 rounded-2xl border bg-white p-6">
              <h2 className="text-xl font-semibold text-neutral-900">What I built</h2>
              <div className="mt-3 grid gap-3 text-sm text-neutral-700 md:grid-cols-2">
                <div className="rounded-xl border bg-white p-4">
                  <p className="font-medium text-neutral-900">Guest booking flow</p>
                  <p className="mt-1 leading-6">
                    A reservation form with required details (date, time slot, party size, contact),
                    plus validation so staff always receive clean and consistent requests.
                  </p>
                </div>

                <div className="rounded-xl border bg-white p-4">
                  <p className="font-medium text-neutral-900">Time slot UX</p>
                  <p className="mt-1 leading-6">
                    I replaced free-text time entry with a controlled dropdown of valid slots, so
                    guests can’t request random times outside restaurant hours.
                  </p>
                </div>

                <div className="rounded-xl border bg-white p-4">
                  <p className="font-medium text-neutral-900">Confirmation code + status tracking</p>
                  <p className="mt-1 leading-6">
                    After submitting, guests get a confirmation code and a status page to track the
                    request. This reduces inbound calls and “any update?” messages.
                  </p>
                </div>

                <div className="rounded-xl border bg-white p-4">
                  <p className="font-medium text-neutral-900">Admin dashboard</p>
                  <p className="mt-1 leading-6">
                    A staff-only dashboard to review requests, search quickly, filter by status,
                    and approve/deny without leaving the page.
                  </p>
                </div>

                <div className="rounded-xl border bg-white p-4">
                  <p className="font-medium text-neutral-900">Email notifications</p>
                  <p className="mt-1 leading-6">
                    Guests receive an email after requesting, and another email when staff approves
                    or denies. The email includes the confirmation code and status link.
                  </p>
                </div>

                <div className="rounded-xl border bg-white p-4">
                  <p className="font-medium text-neutral-900">Secure access for staff</p>
                  <p className="mt-1 leading-6">
                    I protected admin actions so only authorized staff can make decisions. This
                    prevents random users from approving/denying reservations.
                  </p>
                </div>
              </div>
            </div>

            {/* Why this matters */}
            <div className="mt-6 rounded-2xl border bg-white p-6">
              <h2 className="text-xl font-semibold text-neutral-900">
                Why this matters for the restaurant
              </h2>
              <ul className="mt-3 space-y-2 text-sm text-neutral-700">
                <li>• Fewer missed requests because everything is stored in one system.</li>
                <li>• Faster staff decisions with a simple approve/deny workflow.</li>
                <li>• Fewer guest follow-ups because status is self-serve with a confirmation code.</li>
                <li>• Better guest experience through clean UI, time slot controls, and email updates.</li>
              </ul>
            </div>

            {/* CTA */}
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                href="/reserve"
                className="rounded-full bg-gradient-to-r from-amber-500 to-pink-500 px-5 py-3 text-sm font-medium text-white shadow hover:opacity-95"
              >
                Book a table
              </Link>
              <Link
                href="/status"
                className="rounded-full border bg-white px-5 py-3 text-sm font-medium text-neutral-900 hover:bg-neutral-50"
              >
                Check status
              </Link>
              <Link
                href="/"
                className="rounded-full border bg-white px-5 py-3 text-sm font-medium text-neutral-900 hover:bg-neutral-50"
              >
                Back to home
              </Link>
            </div>
          </div>

          <p className="mt-6 text-center text-xs text-neutral-600">
            Saffron &amp; Stone reservations experience — built to simplify restaurant operations and
            improve guest communication.
          </p>
        </div>
      </div>
    </main>
  );
}

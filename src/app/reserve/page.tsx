import ReserveForm from "./ReserveForm";

export default function ReservePage() {
  return (
    <section className="mx-auto max-w-3xl">
      <div className="glass p-8 md:p-12">
        <div className="inline-flex items-center gap-2 rounded-full border border-zinc-900/10 bg-white/60 px-3 py-1 text-xs text-zinc-700">
          Saffron & Stone • Book
        </div>

        <h1 className="mt-4 text-4xl font-semibold tracking-tight">Reserve a table</h1>
        <p className="mt-3 text-zinc-600">
          Submit your request. We’ll review it and confirm by email.
        </p>

        <div className="mt-8 rounded-3xl border border-zinc-900/10 bg-white/60 p-6">
          <ReserveForm />
        </div>
      </div>
    </section>
  );
}

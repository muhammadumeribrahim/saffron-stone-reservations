import ReserveForm from "./ReserveForm";

export default function ReservePage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-3xl font-semibold">Reserve a Table</h1>
      <p className="mt-2 text-gray-600">
        Submit your request. We’ll review it and confirm later.
      </p>

      <div className="mt-8 rounded-xl border p-6">
        <ReserveForm />
      </div>
    </main>
  );
}

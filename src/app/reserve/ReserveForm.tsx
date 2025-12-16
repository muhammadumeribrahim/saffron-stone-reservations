"use client";

import { useActionState } from "react";
import { submitReservation, type ReserveFormState } from "./actions";
import { buildTimeSlots, formatTime12h } from "@/lib/booking/slots";

const initialState: ReserveFormState = { ok: true };

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1 text-sm text-rose-600">{message}</p>;
}

function todayISODate() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

export default function ReserveForm() {
  const [state, formAction, isPending] = useActionState(submitReservation, initialState);

  const slots = buildTimeSlots();
  const minDate = todayISODate();

  return (
    <form action={formAction} className="space-y-5">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium">Full Name</label>
          <input
            name="customerName"
            required
            className="mt-1 w-full rounded-2xl border border-zinc-900/10 bg-white/70 px-4 py-3 text-sm outline-none"
          />
          <FieldError message={state.fieldErrors?.customerName} />
        </div>

        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            name="customerEmail"
            type="email"
            required
            className="mt-1 w-full rounded-2xl border border-zinc-900/10 bg-white/70 px-4 py-3 text-sm outline-none"
          />
          <FieldError message={state.fieldErrors?.customerEmail} />
        </div>

        <div>
          <label className="block text-sm font-medium">Phone (optional)</label>
          <input
            name="customerPhone"
            className="mt-1 w-full rounded-2xl border border-zinc-900/10 bg-white/70 px-4 py-3 text-sm outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Party Size</label>
          <input
            name="partySize"
            type="number"
            min={1}
            max={20}
            defaultValue={2}
            required
            className="mt-1 w-full rounded-2xl border border-zinc-900/10 bg-white/70 px-4 py-3 text-sm outline-none"
          />
          <FieldError message={state.fieldErrors?.partySize} />
        </div>

        <div>
          <label className="block text-sm font-medium">Date</label>
          <input
            name="requestedDate"
            type="date"
            min={minDate}
            required
            className="mt-1 w-full rounded-2xl border border-zinc-900/10 bg-white/70 px-4 py-3 text-sm outline-none"
          />
          <FieldError message={state.fieldErrors?.requestedDate} />
        </div>

        <div>
          <label className="block text-sm font-medium">Time</label>
          <select
            name="requestedTime"
            required
            defaultValue=""
            className="mt-1 w-full rounded-2xl border border-zinc-900/10 bg-white/70 px-4 py-3 text-sm outline-none"
          >
            <option value="" disabled>
              Select a time
            </option>
            {slots.map((t) => (
              <option key={t} value={t}>
                {formatTime12h(t)}
              </option>
            ))}
          </select>
          <FieldError message={state.fieldErrors?.requestedTime} />
        </div>
      </div>

      {state.message ? (
        <p className={state.ok ? "text-sm text-zinc-600" : "text-sm text-rose-600"}>
          {state.message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isPending}
        className="btn-primary rounded-2xl px-5 py-3 text-sm font-semibold disabled:opacity-60"
      >
        {isPending ? "Submitting..." : "Request Reservation"}
      </button>
    </form>
  );
}

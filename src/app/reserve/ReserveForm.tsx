"use client";

import { useActionState } from "react";
import { submitReservation, type ReserveFormState } from "./actions";

const initialState: ReserveFormState = { ok: true };

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1 text-sm text-red-600">{message}</p>;
}

export default function ReserveForm() {
  const [state, formAction, isPending] = useActionState(submitReservation, initialState);

  return (
    <form action={formAction} className="space-y-5">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium">Full Name</label>
          <input
            name="customerName"
            required
            className="mt-1 w-full rounded-md border px-3 py-2"
          />
          <FieldError message={state.fieldErrors?.customerName} />
        </div>

        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            name="customerEmail"
            type="email"
            required
            className="mt-1 w-full rounded-md border px-3 py-2"
          />
          <FieldError message={state.fieldErrors?.customerEmail} />
        </div>

        <div>
          <label className="block text-sm font-medium">Phone (optional)</label>
          <input
            name="customerPhone"
            className="mt-1 w-full rounded-md border px-3 py-2"
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
            className="mt-1 w-full rounded-md border px-3 py-2"
          />
          <FieldError message={state.fieldErrors?.partySize} />
        </div>

        <div>
          <label className="block text-sm font-medium">Date</label>
          <input
            name="requestedDate"
            type="date"
            required
            className="mt-1 w-full rounded-md border px-3 py-2"
          />
          <FieldError message={state.fieldErrors?.requestedDate} />
        </div>

        <div>
          <label className="block text-sm font-medium">Time</label>
          <input
            name="requestedTime"
            type="time"
            required
            className="mt-1 w-full rounded-md border px-3 py-2"
          />
          <FieldError message={state.fieldErrors?.requestedTime} />
        </div>
      </div>

      {state.message ? (
        <p className={state.ok ? "text-sm text-gray-600" : "text-sm text-red-600"}>
          {state.message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isPending}
        className="rounded-md bg-black px-4 py-2 text-white hover:opacity-90 disabled:opacity-60"
      >
        {isPending ? "Submitting..." : "Request Reservation"}
      </button>
    </form>
  );
}

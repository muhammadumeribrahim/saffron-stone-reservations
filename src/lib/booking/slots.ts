export const BOOKING_RULES = {
  slotMinutes: 30,
  openHour: 12,           // 12 PM
  closeHour: 24,          // 12 AM (midnight)
  maxPartySize: 20,
};

export function isValidSlot(hhmm: string) {
  return buildTimeSlots().includes(hhmm);
}

export function buildTimeSlots() {
  const out: string[] = [];
  for (let h = BOOKING_RULES.openHour; h < BOOKING_RULES.closeHour; h++) {
    for (let m = 0; m < 60; m += BOOKING_RULES.slotMinutes) {
      const hh = String(h % 24).padStart(2, "0");
      const mm = String(m).padStart(2, "0");
      out.push(`${hh}:${mm}`);
    }
  }
  return out; // values are HH:MM (24h) for DB consistency
}

export function formatTime12h(hhmm: string) {
  const m = String(hhmm).match(/^(\d{2}):(\d{2})$/);
  if (!m) return hhmm;

  let h = Number(m[1]);
  const min = m[2];
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12;
  if (h === 0) h = 12;
  return `${h}:${min} ${ampm}`;
}

export function buildTimeSlotOptions() {
  return buildTimeSlots().map((value) => ({
    value,
    label: formatTime12h(value),
  }));
}

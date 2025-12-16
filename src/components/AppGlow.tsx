export default function AppGlow() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* base wash */}
      <div className="absolute inset-0 bg-gradient-to-b from-rose-50 via-amber-50 to-sky-50" />

      {/* big soft blobs (the “backlight”) */}
      <div className="absolute -top-24 -left-24 h-[520px] w-[520px] rounded-full bg-pink-300/35 blur-3xl" />
      <div className="absolute -top-28 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-amber-200/35 blur-3xl" />
      <div className="absolute -bottom-32 -right-32 h-[560px] w-[560px] rounded-full bg-sky-300/30 blur-3xl" />

      {/* a subtle vignette so content pops */}
      <div className="absolute inset-0 bg-white/40" />
    </div>
  );
}

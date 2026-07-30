const items = [
  "Verified Drivers",
  "Fixed Fares",
  "24×7 Support",
  "GPS Tracked",
  "Free Cancellation",
  "Clean Vehicles",
  "500+ Routes",
  "Zero Advance",
];

export default function Marquee() {
  const row = [...items, ...items];
  return (
    <div className="overflow-hidden bg-ink py-4">
      <div className="marquee-track animate-marquee">
        {row.map((t, i) => (
          <span
            key={i}
            className="mx-6 flex shrink-0 items-center gap-3 font-display text-xl uppercase tracking-wide text-white"
          >
            {t}
            <span className="h-2 w-2 shrink-0 rotate-45 bg-taxi" />
          </span>
        ))}
      </div>
    </div>
  );
}

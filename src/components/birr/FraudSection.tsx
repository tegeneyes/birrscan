import { BatteryFull, ChevronLeft, Signal, Wifi } from "lucide-react";
import { Corners } from "./Corners";
import { BankLogo } from "./BankLogo";
import { LogoMark } from "./Logo";

const rows: [string, string, string?][] = [
  ["Amount", "ETB 1,500.00", "text-alert font-semibold"],
  ["Transaction Ref", "CHQ0FJ403O", "font-mono"],
  ["First scanned", "Today, 09:12"],
  ["Scanned again", "Today, 14:32"],
];

/** Realistic phone showing the app's real "Duplicate receipt" screen. */
function PhoneMock() {
  return (
    <div className="relative mx-auto w-[264px] sm:w-[284px]">
      {/* Side buttons */}
      <span aria-hidden className="absolute -left-[3px] top-[92px] h-7 w-[3px] rounded-l bg-device-edge" />
      <span aria-hidden className="absolute -left-[3px] top-[138px] h-12 w-[3px] rounded-l bg-device-edge" />
      <span aria-hidden className="absolute -left-[3px] top-[198px] h-12 w-[3px] rounded-l bg-device-edge" />
      <span aria-hidden className="absolute -right-[3px] top-[160px] h-20 w-[3px] rounded-r bg-device-edge" />

      {/* Metal frame + black bezel */}
      <div className="bg-device-frame-metal rounded-[3.1rem] p-[3px] shadow-device">
        <div className="rounded-[2.95rem] bg-device-island p-[9px]">
          {/* Screen */}
          <div className="relative flex aspect-[9/19.5] flex-col overflow-hidden rounded-[2.35rem] bg-alert-screen text-ink-foreground">
            {/* Status bar + Dynamic Island */}
            <div className="relative z-20 flex h-11 shrink-0 items-center justify-between px-6 pt-1 text-[12px] font-semibold">
              <span>14:32</span>
              <span className="absolute left-1/2 top-2.5 h-[26px] w-[86px] -translate-x-1/2 rounded-full bg-device-island" />
              <span className="flex items-center gap-1">
                <Signal className="size-3.5" strokeWidth={2.5} />
                <Wifi className="size-3.5" strokeWidth={2.5} />
                <BatteryFull className="size-[18px]" strokeWidth={2} />
              </span>
            </div>

            {/* Notification banner */}
            <div className="animate-notif-drop absolute inset-x-2 top-2 z-30 flex items-start gap-2.5 rounded-[1.1rem] border border-ink-border bg-ink-raised/95 p-2.5 shadow-float backdrop-blur-md">
              <LogoMark className="size-8 shrink-0" />
              <div className="min-w-0 flex-1 leading-tight">
                <div className="flex items-center justify-between text-[10px] text-ink-muted">
                  <span className="font-semibold uppercase tracking-wide">BirrScan</span>
                  <span>now</span>
                </div>
                <p className="mt-0.5 text-[12px] font-semibold">⚠ Scanned before</p>
                <p className="text-[10.5px] text-ink-muted">First seen today, 09:12 — same reference.</p>
              </div>
            </div>

            {/* App content */}
            <div className="flex flex-1 flex-col px-4 pb-2">
              <ChevronLeft className="size-5" />

              <div className="relative mx-auto mt-3 grid size-24 place-items-center">
                <span className="absolute inset-0 animate-ping rounded-full bg-alert/10 [animation-duration:2.4s]" />
                <span className="absolute inset-0 rounded-full bg-alert/10" />
                <span className="absolute inset-3 rounded-full bg-alert/15" />
                <span className="relative grid size-12 place-items-center rounded-full bg-alert font-display text-2xl font-bold text-alert-screen shadow-orange-glow">
                  !
                </span>
              </div>

              <p className="mt-3 text-center font-display text-xl font-bold text-alert">Duplicate receipt</p>
              <p className="mt-1 text-center text-[11px] text-alert/85">
                This receipt has already been submitted.
              </p>

              <div className="mt-4 rounded-2xl border border-ink-border bg-ink-card px-3 py-1">
                <div className="flex items-center gap-2.5 border-b border-ink-border py-2.5">
                  <span className="grid size-9 place-items-center rounded-xl bg-card">
                    <BankLogo bank="telebirr" className="size-6" />
                  </span>
                  <div className="leading-tight">
                    <p className="text-[13px] font-semibold">Telebirr</p>
                    <p className="text-[10px] text-ink-muted">Payment Method</p>
                  </div>
                </div>
                {rows.map(([k, v, cls], i) => (
                  <div
                    key={k}
                    className={`flex items-center justify-between py-2 text-[11px] ${i < rows.length - 1 ? "border-b border-ink-border" : ""}`}
                  >
                    <span className="text-ink-muted">{k}</span>
                    <span className={cls ?? "font-medium"}>{v}</span>
                  </div>
                ))}
              </div>

              <div className="mt-auto rounded-full bg-alert py-2.5 text-center text-[13px] font-semibold text-alert-screen">
                View Details
              </div>
              {/* Home indicator */}
              <span className="mx-auto mt-2.5 h-[4px] w-24 rounded-full bg-ink-foreground/80" />
            </div>

            <span aria-hidden className="bg-screen-glare pointer-events-none absolute inset-0 z-40" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function FraudSection() {
  return (
    <section id="fraud" className="mx-auto max-w-6xl px-5 py-16">
      <div className="relative grid items-center gap-14 px-6 py-14 md:grid-cols-2">
        <Corners />
        <div className="max-w-md">
          <h2 className="text-3xl font-bold sm:text-4xl">Built-in reused receipt detection</h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            The most common trick is showing the same payment twice. BirrScan remembers every
            reference you've scanned and flags a repeat instantly — with the time it
            was first used.
          </p>
        </div>
        <PhoneMock />
      </div>
    </section>
  );
}

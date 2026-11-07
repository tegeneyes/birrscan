import type { HistoryEntry } from "@/lib/scan";
import { AppHomeMock } from "./AppHomeMock";

/** Illustrative example day for the home-screen mock (not real customer data). */
const EXAMPLE_HISTORY: HistoryEntry[] = [
  { reference: "EX1", bank: "telebirr", amount: 1500, at: "2026-11-06T11:32:00Z", status: "valid" },
  { reference: "EX2", bank: "cbe", amount: 2750, at: "2026-11-06T10:05:00Z", status: "valid" },
  { reference: "EX1", bank: "telebirr", amount: 1500, at: "2026-11-06T09:40:00Z", status: "seen_before" },
  { reference: null, bank: "awash", amount: null, at: "2026-11-06T09:12:00Z", status: "not_found" },
];

const goToScreens = () => document.getElementById("screens")?.scrollIntoView({ behavior: "smooth" });

export function AppSection() {
  return (
    <section id="app" className="relative overflow-hidden bg-ink text-ink-foreground">
      <div className="pointer-events-none absolute inset-0 bg-ink-glow" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 py-24 md:grid-cols-2">
        <div className="max-w-md">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">Your shop, at a glance</p>
          <h2 className="mt-3 text-3xl font-bold leading-tight sm:text-5xl">
            Every scan lands on your BirrScan home.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-ink-muted">
            Total verified Birr, plus what was verified, flagged as a repeat, or failed — the same
            home screen you get in the BirrScan app. Example numbers shown.
          </p>
          <ul className="mt-8 space-y-3 text-sm">
            {[
              ["Verified", "First-time payments with a readable reference", "bg-success"],
              ["Unverified", "A receipt you've already scanned before", "bg-gold"],
              ["Failed", "No reference could be found", "bg-destructive"],
            ].map(([t, d, c]) => (
              <li key={t} className="flex items-start gap-3">
                <span className={`mt-1.5 size-2 shrink-0 rounded-full ${c}`} />
                <span>
                  <span className="font-semibold">{t}</span>
                  <span className="text-ink-muted"> — {d}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
        <AppHomeMock history={EXAMPLE_HISTORY} onScan={goToScreens} />
      </div>
    </section>
  );
}

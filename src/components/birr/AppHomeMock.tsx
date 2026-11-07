import { AlertTriangle, Check, ChevronRight, House, QrCode, ReceiptText, ScanLine, User, X } from "lucide-react";
import { summarize, type HistoryEntry } from "@/lib/scan";
import { cn } from "@/lib/utils";
import { LogoMark } from "./Logo";
import { squareLogo } from "./BankLogo";

const money = (n: number) =>
  n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

function greeting(d: Date) {
  const h = d.getHours();
  return h < 12 ? "Good morning," : h < 18 ? "Good afternoon," : "Good evening,";
}

const statusIcon = {
  valid: { Icon: Check, cls: "bg-success text-ink-foreground", label: "Verified" },
  seen_before: { Icon: AlertTriangle, cls: "bg-gold text-ink", label: "Unverified" },
  not_found: { Icon: X, cls: "bg-destructive text-ink-foreground", label: "Failed" },
} as const;

/** Live recreation of the BirrScan app home screen, fed by this browser's scan history. */
export function AppHomeMock({ history, onScan }: { history: HistoryEntry[]; onScan: () => void }) {
  const now = new Date();
  const s = summarize(history);
  const recent = history.slice(0, 3);

  return (
    <div className="relative mx-auto w-[300px] rounded-[2.75rem] border-[7px] border-ink-raised bg-ink p-4 pb-5 text-ink-foreground shadow-float sm:w-[330px]">
      <div className="mx-auto mb-3 h-5 w-24 rounded-full bg-ink-raised" />

      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <LogoMark className="size-11 drop-shadow-lg" />
          <div className="leading-tight">
            <p className="text-xs text-ink-muted">{greeting(now)}</p>
            <p className="font-display text-xl font-bold">BirrScan</p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-ink-border px-3 py-1.5 text-xs font-semibold">
          <ScanLine className="size-3.5 text-primary" /> Free
        </span>
      </div>

      <div className="relative mt-4 overflow-hidden rounded-3xl border border-ink-border bg-ink-card p-4">
        <div className="pointer-events-none absolute inset-0 bg-app-card" />
        <div className="relative">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="font-display text-base font-bold">Receipt overview</p>
              <p className="text-[10px] text-ink-muted">Total Receipt Amount (Verified)</p>
            </div>
            <span className="rounded-full border border-ink-border px-2 py-1 text-[10px]">
              {now.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })}
            </span>
          </div>
          <div className="mt-3 flex items-end justify-between">
            <p className="font-display text-3xl font-extrabold tracking-tight">ETB {money(s.verifiedAmount)}</p>
            <span className="mb-1 inline-flex items-center gap-1 text-[10px] text-ink-muted">
              <ScanLine className="size-3" /> {s.total} Scans
            </span>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {(
              [
                ["valid", s.verified],
                ["seen_before", s.unverified],
                ["not_found", s.failed],
              ] as const
            ).map(([k, n]) => {
              const { Icon, cls, label } = statusIcon[k];
              return (
                <div key={k} className="rounded-2xl border border-ink-border bg-ink py-2 text-center">
                  <div className="flex items-center justify-center gap-1.5">
                    <span className={cn("grid size-4 place-items-center rounded-full", cls)}>
                      <Icon className="size-2.5" strokeWidth={3} />
                    </span>
                    <span className="font-display text-base font-bold">{n}</span>
                  </div>
                  <p className="text-[10px] text-ink-muted">{label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <p className="font-display text-base font-bold">Recent Verifications</p>
        <span className="inline-flex items-center text-xs font-semibold text-primary">
          View all <ChevronRight className="size-3.5" />
        </span>
      </div>

      <div className="mt-3 h-[170px]">
        {recent.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <div className="grid size-12 place-items-center rounded-full bg-ink-raised">
              <ReceiptText className="size-5 text-ink-muted" />
            </div>
            <p className="mt-3 text-sm font-semibold">No verifications yet</p>
            <p className="mt-1 text-[10px] text-ink-muted">Scan your first receipt to see your history here.</p>
          </div>
        ) : (
          <ul className="space-y-2">
            {recent.map((h, i) => {
              const { Icon, cls, label } = statusIcon[h.status ?? "valid"];
              const logo = squareLogo(h.bank);
              return (
                <li key={`${h.at}-${i}`} className="flex items-center gap-3 rounded-2xl border border-ink-border bg-ink-card px-3 py-2.5 animate-rise">
                  <span className="relative shrink-0">
                    {logo ? (
                      <span className="grid size-8 place-items-center rounded-full bg-card p-1">
                        <img src={logo} alt="" width={24} height={24} loading="lazy" decoding="async" className="size-full object-contain" />
                      </span>
                    ) : (
                      <span className={cn("grid size-8 place-items-center rounded-full", cls)}>
                        <Icon className="size-3.5" strokeWidth={3} />
                      </span>
                    )}
                    {logo && (
                      <span className={cn("absolute -bottom-0.5 -right-0.5 grid size-3.5 place-items-center rounded-full ring-2 ring-ink-card", cls)}>
                        <Icon className="size-2" strokeWidth={3.5} />
                      </span>
                    )}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-mono text-[11px]">{h.reference ?? "No reference"}</p>
                    <p className="text-[10px] text-ink-muted">
                      {h.bank === "unknown" ? label : `${h.bank === "cbe" ? "CBE" : h.bank} · ${label}`}
                    </p>
                  </div>
                  <p className="text-xs font-semibold">{h.amount !== null ? `${money(h.amount)}` : "—"}</p>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <div className="relative mt-4 flex items-center justify-between rounded-full border border-ink-border bg-ink-card px-8 py-2.5">
        <span className="flex flex-col items-center text-[10px] font-semibold text-primary">
          <House className="size-4" /> Home
        </span>
        <button
          type="button"
          onClick={onScan}
          aria-label="Scan a receipt"
          className="absolute left-1/2 top-1/2 grid size-14 -translate-x-1/2 -translate-y-1/2 cursor-pointer place-items-center rounded-full border-4 border-ink bg-primary text-primary-foreground shadow-orange-glow transition-transform hover:scale-105"
        >
          <QrCode className="size-6" />
        </button>
        <span className="flex flex-col items-center text-[10px] text-ink-muted">
          <User className="size-4" /> Profile
        </span>
      </div>
    </div>
  );
}

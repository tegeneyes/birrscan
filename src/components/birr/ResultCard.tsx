import { AlertTriangle, CheckCircle2, ExternalLink, SearchX } from "lucide-react";
import type { ScanResult } from "@/lib/scan";
import { cn } from "@/lib/utils";
import { BankLogo } from "./BankLogo";

const fmt = (n: number) =>
  n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export function ResultCard({
  result,
  elapsedMs,
  onClearHistory,
}: {
  result: ScanResult;
  elapsedMs: number;
  onClearHistory: () => void;
}) {
  const tone = {
    valid: {
      icon: CheckCircle2,
      title: "Payment details look valid",
      sub: "First time this reference is scanned on this device.",
      wrap: "border-success/30 bg-success-soft",
      iconCls: "text-success",
    },
    seen_before: {
      icon: AlertTriangle,
      title: "Scanned before — possible reused receipt",
      sub: result.firstSeenAt
        ? `This reference was first scanned ${new Date(result.firstSeenAt).toLocaleString()}.`
        : "This reference was scanned earlier on this device.",
      wrap: "border-warning/40 bg-warning-soft",
      iconCls: "text-warning",
    },
    not_found: {
      icon: SearchX,
      title: "No transaction reference found",
      sub: "Paste the full bank SMS, the receipt link, or the reference number.",
      wrap: "border-destructive/25 bg-destructive-soft",
      iconCls: "text-destructive",
    },
  }[result.status];
  const Icon = tone.icon;

  const rows: [string, string | null][] = [
    ["Bank", result.bank === "unknown" ? null : result.bankName],
    ["Reference", result.reference],
    ["Amount", result.amount !== null ? `${fmt(result.amount)} ETB` : null],
    ["From", result.payer],
    ["Date", result.date],
  ];

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn("animate-rise rounded-2xl border p-5 text-left shadow-card", tone.wrap)}
    >
      <div className="flex items-start gap-3">
        <Icon className={cn("mt-0.5 size-6 shrink-0", tone.iconCls)} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <p className="font-display text-lg font-semibold leading-tight">{tone.title}</p>
            <span className="font-mono text-[11px] text-muted-foreground">
              read in {elapsedMs < 1 ? "<1" : Math.round(elapsedMs)} ms
            </span>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">{tone.sub}</p>
        </div>
      </div>

      {result.status !== "not_found" && (
        <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 rounded-xl bg-card p-4 sm:grid-cols-3">
          {rows.map(([k, v]) => (
            <div key={k} className={cn("min-w-0", k === "Bank" && "col-span-2")}>
              <dt className="text-[11px] uppercase tracking-wider text-muted-foreground">{k}</dt>
              <dd className={cn("flex min-w-0 items-center gap-1.5 text-sm font-medium", k === "Reference" && "font-mono")}>
                {k === "Bank" && v && <BankLogo bank={result.bank} className="size-5" />}
                <span className="truncate">{v ?? <span className="text-muted-foreground">—</span>}</span>
              </dd>
            </div>
          ))}
        </dl>
      )}

      {result.notes.length > 0 && (
        <ul className="mt-3 space-y-1 text-xs text-muted-foreground">
          {result.notes.map((n) => (
            <li key={n}>• {n}</li>
          ))}
        </ul>
      )}

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs">
        {result.receiptUrl ? (
          <a
            href={result.receiptUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 font-medium text-primary hover:underline"
          >
            Confirm on the official receipt <ExternalLink className="size-3.5" />
          </a>
        ) : (
          <span className="text-muted-foreground">
            Tip: confirm the amount in your own bank app before handing over goods.
          </span>
        )}
        <button
          type="button"
          onClick={onClearHistory}
          className="cursor-pointer text-muted-foreground underline-offset-2 hover:underline"
        >
          Clear scan history
        </button>
      </div>
    </div>
  );
}

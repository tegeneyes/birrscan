import type { ScanResult } from "@/lib/scan";
import { Corners } from "./Corners";

function JsonLine({ line }: { line: string }) {
  const m = line.match(/^(\s*)"([^"]+)":\s(.*)$/);
  if (!m) return <div>{line}</div>;
  const [, indent = "", key = "", rest = ""] = m;
  const isString = rest.startsWith('"');
  return (
    <div>
      {indent}
      <span className="text-terminal-key">"{key}"</span>:{" "}
      <span className={isString ? "text-terminal-string" : "text-terminal-foreground"}>{rest}</span>
    </div>
  );
}

export function OutputSection({ result }: { result: ScanResult }) {
  const shown = {
    status: result.status,
    bank: result.bank,
    reference: result.reference,
    amount: result.amount,
    currency: result.currency,
    payer: result.payer,
    date: result.date,
    receiptUrl: result.receiptUrl,
  };
  const lines = JSON.stringify(shown, null, 2).split("\n");

  return (
    <section className="mx-auto max-w-6xl px-5 py-16">
      <div className="relative grid items-center gap-10 px-6 py-14 md:grid-cols-[1fr_1.4fr]">
        <Corners />
        <div className="max-w-sm">
          <h2 className="text-3xl font-bold sm:text-4xl">See exactly what we read</h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Every scan turns a messy SMS into clean, structured details — bank, reference, amount,
            payer and date — so you can see exactly what was paid, and by whom.
          </p>
        </div>
        <div className="overflow-hidden rounded-2xl bg-terminal shadow-float">
          <div className="flex items-center gap-1.5 bg-terminal-bar px-4 py-3">
            <span className="size-2.5 rounded-full bg-destructive" />
            <span className="size-2.5 rounded-full bg-gold" />
            <span className="size-2.5 rounded-full bg-primary" />
            <span className="ml-3 font-mono text-[11px] text-terminal-muted">birr-scan · latest result</span>
          </div>
          <pre className="overflow-x-auto p-5 font-mono text-[12px] leading-relaxed text-terminal-foreground">
            <div className="text-terminal-muted">$ birr-scan read</div>
            {lines.map((l, i) => (
              <JsonLine key={i} line={l} />
            ))}
          </pre>
        </div>
      </div>
    </section>
  );
}

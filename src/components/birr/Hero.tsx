import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { BankId } from "@/lib/scan";
import { BankLogo } from "./BankLogo";
import { LogoMark } from "./Logo";

const bankNodes: { x: number; bank: BankId }[] = [
  { x: 160, bank: "telebirr" },
  { x: 280, bank: "cbe" },
  { x: 400, bank: "awash" },
  { x: 520, bank: "dashen" },
  { x: 640, bank: "boa" },
];
const W = 800;
const H = 250;
const pos = (x: number, y: number) => ({ left: `${(x / W) * 100}%`, top: `${(y / H) * 100}%` });

function Diagram() {
  return (
    <div className="relative mx-auto aspect-[800/250] w-full max-w-3xl" aria-hidden="true">
      <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 size-full">
        {bankNodes.map((b) => (
          <path
            key={b.x}
            d={`M${b.x} 52 C ${b.x} 120, 400 110, 400 172`}
            className="stroke-primary/35 animate-flow"
            strokeWidth="1.2"
            strokeDasharray="4 8"
            fill="none"
          />
        ))}
        <path d="M215 195 H350" className="stroke-foreground/20" strokeWidth="1.2" fill="none" />
        <path d="M450 195 H585" className="stroke-primary/50 animate-flow" strokeWidth="1.2" strokeDasharray="4 8" fill="none" />
      </svg>
      {bankNodes.map((b) => (
        <div key={b.x} className="absolute -translate-x-1/2 -translate-y-1/2" style={pos(b.x, 34)}>
          <div className="grid size-11 place-items-center rounded-full border border-border bg-card shadow-card sm:size-14">
            <BankLogo bank={b.bank} className="size-6 sm:size-8" />
          </div>
        </div>
      ))}
      <div className="absolute hidden -translate-x-1/2 -translate-y-1/2 sm:block" style={pos(150, 195)}>
        <div className="whitespace-nowrap rounded-lg border border-border bg-card px-2.5 py-1.5 text-[10px] text-muted-foreground shadow-card sm:text-xs">
          SMS · link · reference
        </div>
      </div>
      <div className="absolute -translate-x-1/2 -translate-y-1/2" style={pos(400, 195)}>
        <div className="flex items-center gap-1.5 rounded-xl border border-primary/30 bg-card px-3 py-2 text-xs font-semibold shadow-float animate-pulse-ring">
          <LogoMark className="size-5" /> BirrScan
        </div>
      </div>
      <div className="absolute hidden -translate-x-1/2 -translate-y-1/2 sm:block" style={pos(650, 195)}>
        <div className="whitespace-nowrap rounded-lg border border-border bg-card px-2.5 py-1.5 text-[10px] text-muted-foreground shadow-card sm:text-xs">
          ✓ Result in about 10 s
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-grid">
      <div className="pointer-events-none absolute inset-0 bg-hero-glow" />
      <div className="relative mx-auto max-w-6xl px-5 pb-16 pt-10 sm:pt-14">
        <Diagram />
        <div className="mx-auto mt-6 max-w-2xl text-center">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground shadow-card">
            <span className="size-1.5 rounded-full bg-primary" /> Free to start · No login
          </p>
          <h1 className="text-4xl font-bold leading-[1.05] sm:text-6xl">
            Scan any Birr payment.
            <br />
            <span className="text-primary">Know in seconds.</span>
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-base text-muted-foreground">
            Scan a telebirr or bank SMS, a receipt link, or a reference number. BirrScan checks it in
            about 10 seconds and warns you if the same receipt shows up twice.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button asChild variant="hero" size="xl">
              <a href="#app">
                Get the app <ArrowRight />
              </a>
            </Button>
            <Button asChild variant="outline" size="xl" className="rounded-full">
              <a href="#screens">See it in action</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

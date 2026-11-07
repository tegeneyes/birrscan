import type { BankId } from "@/lib/scan";
import { BANK_LOGOS, BankLogo } from "./BankLogo";

const banks: [BankId, string][] = [
  ["telebirr", "telebirr"],
  ["cbe", "CBE"],
  ["boa", "Bank of Abyssinia"],
  ["awash", "Awash Bank"],
  ["dashen", "Dashen Bank"],
  ["coopbank", "Coopbank"],
];

function BankList({ hidden }: { hidden?: boolean }) {
  return (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center gap-12 pr-12">
      {banks.map(([id, label]) => (
        <li
          key={id}
          className="flex shrink-0 items-center gap-2 whitespace-nowrap font-display text-base font-semibold text-foreground/60 transition-colors hover:text-primary"
        >
          <BankLogo bank={id} className="size-7" />
          <span className={BANK_LOGOS[id]?.wide ? "sr-only" : undefined}>{label}</span>
        </li>
      ))}
    </ul>
  );
}

export function BankStrip() {
  return (
    <section className="border-y border-border bg-card/60">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-5 py-6 md:flex-row md:gap-8">
        <p className="shrink-0 text-xs leading-snug text-muted-foreground md:w-40">
          Reads payment messages from
        </p>
        <div className="marquee-mask w-full min-w-0 overflow-hidden">
          {/* Two identical copies slide left together so the loop never shows a gap */}
          <div className="marquee-track flex w-max">
            <BankList />
            <BankList hidden />
          </div>
        </div>
      </div>
    </section>
  );
}

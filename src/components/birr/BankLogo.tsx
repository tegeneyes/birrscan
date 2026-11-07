import { BANKS, type BankId } from "@/lib/scan";
import { cn } from "@/lib/utils";
import cbeLogo from "@/assets/banks/cbe-logo.svg.asset.json";
import boaLogo from "@/assets/banks/boa-logo.svg.asset.json";
import telebirrLogo from "@/assets/banks/telebirr-logo.svg.asset.json";
import awashLogo from "@/assets/banks/awash-logo.svg.asset.json";
import dashenLogo from "@/assets/banks/dashen-logo.svg.asset.json";
import coopbankLogo from "@/assets/banks/coopbank-logo.webp.asset.json";

/**
 * Bank logos (owner-supplied + EthiopianLogos, MIT). `wide` logos are wordmarks that
 * read the bank name themselves; banks without a logo fall back to a short-name badge.
 */
export const BANK_LOGOS: Partial<Record<BankId, { src: string; wide?: boolean }>> = {
  telebirr: { src: telebirrLogo.url },
  cbe: { src: cbeLogo.url },
  boa: { src: boaLogo.url },
  awash: { src: awashLogo.url },
  dashen: { src: dashenLogo.url },
  coopbank: { src: coopbankLogo.url, wide: true },
};

/** Square logo URL only — for round avatar spots where a wordmark wouldn't fit. */
export const squareLogo = (bank: BankId) => {
  const l = BANK_LOGOS[bank];
  return l && !l.wide ? l.src : null;
};

export function BankLogo({ bank, className }: { bank: BankId; className?: string }) {
  const logo = BANK_LOGOS[bank];
  if (logo) {
    return (
      <img
        src={logo.src}
        alt={`${BANKS[bank].name} logo`}
        loading="lazy"
        decoding="async"
        width={logo.wide ? 72 : 24}
        height={logo.wide ? 29 : 24}
        className={cn(
          "size-6 shrink-0 object-contain",
          className,
          logo.wide && "w-auto max-w-[4.5rem]",
        )}
      />
    );
  }
  return (
    <span
      aria-hidden
      className={cn(
        "grid size-6 shrink-0 place-items-center rounded-full bg-muted font-display text-[9px] font-bold text-muted-foreground",
        className,
      )}
    >
      {BANKS[bank].short}
    </span>
  );
}

import type { CSSProperties } from "react";

/**
 * Odometer-style number: rolls through `values` and lands on the last one when its
 * section (an ancestor with data-inview) scrolls into view. Server HTML shows the final value.
 */
export function RollingNumber({ values, delay = 0 }: { values: (string | number)[]; delay?: number }) {
  const final = values[values.length - 1];
  const end = `-${((values.length - 1) / values.length) * 100}%`;
  return (
    <span className="relative inline-block h-[1em] overflow-hidden align-top leading-none">
      <span
        aria-hidden
        className="odometer-strip flex flex-col items-center"
        style={{ "--roll-delay": `${delay}ms`, "--roll-end": end } as CSSProperties}
      >
        {values.map((v, i) => (
          <span key={i} className="h-[1em] whitespace-nowrap">
            {v}
          </span>
        ))}
      </span>
      <span className="sr-only">{final}</span>
    </span>
  );
}

import confirmed from "@/assets/screens/app-payment-confirmed.webp.asset.json";
import duplicate from "@/assets/screens/app-duplicate-receipt.webp.asset.json";
import failed from "@/assets/screens/app-verification-failed.webp.asset.json";
import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";
import { useScrollStep } from "./useScrollStep";

const screens = [
  {
    src: confirmed.url,
    tag: "Verified",
    dot: "bg-success",
    tone: "text-success",
    title: "Payment confirmed",
    text: "Amount, reference, date, sender and receiver — read from the real receipt.",
    alt: "BirrScan app showing Payment Confirmed for a telebirr payment",
  },
  {
    src: duplicate.url,
    tag: "Duplicate",
    dot: "bg-gold",
    tone: "text-gold",
    title: "Same receipt twice",
    text: "A receipt that was already used is stopped before you hand over the goods.",
    alt: "BirrScan app showing Duplicate receipt warning",
  },
  {
    src: failed.url,
    tag: "Wrong receiver",
    dot: "bg-destructive",
    tone: "text-destructive",
    title: "Paid to someone else",
    text: "If the money went to an account that isn't yours, the app tells you who got it.",
    alt: "BirrScan app showing Verification failed because the receiver does not match",
  },
];

/**
 * Pinned while you scroll: the three answers appear one by one, then the page moves on.
 * Phone: one screen at a time, sliding in. Desktop: screens join the row one by one.
 */
export function AppScreens() {
  const { ref, step, hydrated } = useScrollStep<HTMLElement>(screens.length);

  return (
    <section
      ref={ref}
      id="screens"
      data-inview={hydrated ? "in" : "pending"}
      className="relative h-[calc(300svh-57px)]"
    >
      <div
        data-stage
        className="sticky top-[57px] flex h-[calc(100svh-57px)] flex-col overflow-hidden"
      >
        <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-5 pb-6 pt-6 md:pt-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
                Straight from the app
              </p>
              <h2 className="mt-2 text-2xl font-bold leading-tight sm:text-4xl">
                Three answers, one glance.
              </h2>
              <p className="mt-2 hidden text-sm text-muted-foreground sm:block">
                Real screens from the BirrScan app. Names and reference numbers are blurred.
              </p>
            </div>

            {/* Progress: one segment per answer, fills as you scroll */}
            <ol className="flex gap-2 md:w-80" aria-label="Answers">
              {screens.map((s, i) => (
                <li key={s.tag} className="flex-1">
                  <div className="h-1 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full origin-left rounded-full bg-primary"
                      style={
                        {
                          transform: hydrated
                            ? `scaleX(clamp(0, calc(var(--progress, 0) * ${screens.length} - ${i}), 1))`
                            : "scaleX(1)",
                        } as CSSProperties
                      }
                    />
                  </div>
                  <p
                    className={cn(
                      "mt-1.5 text-[10px] font-semibold uppercase tracking-wider transition-colors duration-500",
                      i <= step || !hydrated ? "text-foreground" : "text-muted-foreground",
                    )}
                  >
                    {s.tag}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          <div className="relative mt-5 grid flex-1 place-items-center md:mt-8 md:grid-cols-3 md:items-start md:gap-8">
            {screens.map((s, i) => {
              const active = i === step;
              const shownDesktop = !hydrated || i <= step;
              return (
                <figure
                  key={s.tag}
                  aria-hidden={hydrated && !active ? true : undefined}
                  className={cn(
                    "col-start-1 row-start-1 flex flex-col items-center transition-all duration-700 ease-soft md:col-start-auto md:row-start-auto",
                    // Phone: one at a time, previous slides out left, next waits right
                    active
                      ? "translate-x-0 scale-100 opacity-100"
                      : i < step
                        ? "pointer-events-none -translate-x-[70%] scale-90 opacity-0"
                        : "pointer-events-none translate-x-[70%] scale-90 opacity-0",
                    // Desktop: each answer joins the row and stays
                    shownDesktop
                      ? "md:pointer-events-auto md:translate-x-0 md:translate-y-0 md:opacity-100"
                      : "md:translate-x-0 md:translate-y-12 md:opacity-0",
                    shownDesktop && (active || !hydrated ? "md:scale-100" : "md:scale-95"),
                  )}
                >
                  <div
                    className={cn(
                      "relative overflow-hidden rounded-[2rem] border-[5px] border-foreground bg-ink shadow-float transition-shadow duration-700",
                      s.tone,
                      active && hydrated && "md:shadow-orange-glow",
                    )}
                  >
                    {active && hydrated && (
                      <span key={step} aria-hidden className="screen-sweep screen-sweep-play" />
                    )}
                    <img
                      src={s.src}
                      alt={s.alt}
                      width={540}
                      height={1076}
                      loading={i === 0 ? "eager" : "lazy"}
                      decoding="async"
                      sizes="(min-width: 768px) 280px, 50vw"
                      className="block h-[min(46svh,440px)] w-auto md:h-[min(50svh,520px)]"
                    />
                  </div>
                  <figcaption className="mt-4 max-w-xs px-1 text-center md:text-left">
                    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-2.5 py-1 text-[11px] font-semibold shadow-card">
                      <span className={`relative flex size-1.5 ${s.tone}`}>
                        <span className="dot-ping absolute inset-0 rounded-full bg-current" />
                        <span className={`relative size-1.5 rounded-full ${s.dot}`} />
                      </span>
                      {s.tag}
                    </span>
                    <p className="mt-2 font-display text-lg font-bold">{s.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{s.text}</p>
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

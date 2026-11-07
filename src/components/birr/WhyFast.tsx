import type { CSSProperties } from "react";
import { ArrowRight, Gift, LogIn, Zap } from "lucide-react";
import { RollingNumber } from "./RollingNumber";
import { useInView } from "./useInView";

const countdown = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0];

const cards = [
  {
    icon: Zap,
    title: "Instant",
    body: "Scan the SMS, link or reference and get a clear answer while the customer is still at the counter.",
    prefix: "~",
    values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    suffix: " s",
    note: "to a result",
  },
  {
    icon: Gift,
    title: "Free to start",
    body: "Use BirrScan free. When your shop needs more, unlock unlimited scans for an affordable price.",
    prefix: "",
    values: countdown,
    suffix: " Br",
    note: "to start",
  },
  {
    icon: LogIn,
    title: "No login",
    body: "Open the app and scan. Nothing to register and no password to forget at the counter.",
    prefix: "",
    values: countdown,
    suffix: " steps",
    note: "to sign up",
  },
];

const steps = ["Scan", "Check", "Decide"];

export function WhyFast() {
  const { ref, state } = useInView<HTMLElement>(0.25);
  return (
    <section ref={ref} id="how" data-inview={state} className="border-y border-border bg-grid">
      <div className="mx-auto max-w-6xl px-5 py-20">
        <h2 className="reveal text-center text-3xl font-bold sm:text-4xl">The same check, minus the friction</h2>

        <ol className="mt-5 flex flex-wrap items-center justify-center gap-2 text-xs font-semibold">
          {steps.map((s, i) => (
            <li
              key={s}
              className="reveal flex items-center gap-2"
              style={{ "--reveal-delay": `${120 + i * 140}ms` } as CSSProperties}
            >
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 shadow-card">
                <span className="grid size-4 place-items-center rounded-full bg-primary text-[9px] text-primary-foreground">
                  {i + 1}
                </span>
                {s}
              </span>
              {i < steps.length - 1 && <ArrowRight className="size-3.5 text-primary" />}
            </li>
          ))}
        </ol>
        <p
          className="reveal mx-auto mt-3 max-w-lg text-center text-sm text-muted-foreground"
          style={{ "--reveal-delay": "500ms" } as CSSProperties}
        >
          Three steps, one screen, zero setup.
        </p>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {cards.map((c, i) => {
            const delay = 450 + i * 160;
            return (
              <div key={c.title} className="reveal" style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}>
                <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card p-7 shadow-card transition duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-float">
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -right-3 -top-8 font-display text-[7.5rem] font-bold leading-none text-primary/5 transition-colors duration-300 group-hover:text-primary/10"
                  >
                    0{i + 1}
                  </span>
                  <div className="relative flex items-center justify-between">
                    <div className="grid size-11 place-items-center rounded-xl bg-primary-soft text-primary transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110">
                      <c.icon className="size-5" />
                    </div>
                    <span className="font-mono text-[11px] text-muted-foreground">0{i + 1}</span>
                  </div>
                  <h3 className="relative mt-5 text-xl font-semibold">{c.title}</h3>
                  <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">{c.body}</p>

                  <div className="relative mt-auto pt-7">
                    <p className="flex items-baseline gap-2">
                      <span className="font-display text-3xl font-bold leading-none text-primary">
                        {c.prefix}
                        <RollingNumber values={c.values} delay={delay + 400} />
                        {c.suffix}
                      </span>
                      <span className="text-xs text-muted-foreground">{c.note}</span>
                    </p>
                    <div className="mt-4 h-1 overflow-hidden rounded-full bg-muted">
                      <div
                        className="fill-bar h-full rounded-full bg-primary"
                        style={{ "--roll-delay": `${delay + 400}ms` } as CSSProperties}
                      />
                    </div>
                  </div>
                </article>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

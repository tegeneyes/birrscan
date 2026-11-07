import type { CSSProperties } from "react";
import { EyeOff, Lock, Smartphone, UserX } from "lucide-react";
import shield from "@/assets/shield-orange-512.webp";
import { Corners } from "./Corners";
import { useInView } from "./useInView";
import { RollingNumber } from "./RollingNumber";

const stats: [string, string][] = [
  ["", "accounts"],
  ["", "sign-ups"],
  [" Br", "to start"],
];

const facts = [
  { Icon: UserX, text: "No account, no password" },
  { Icon: Smartphone, text: "Scans are read on your phone" },
  { Icon: EyeOff, text: "Scan history never leaves your device" },
];

const orbit = [Lock, EyeOff, UserX];

const countdown = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0];

export function PrivacySection() {
  const { ref, state } = useInView<HTMLElement>(0.3);
  return (
    <section ref={ref} id="privacy" data-inview={state} className="mx-auto max-w-6xl overflow-x-clip px-5 py-16">
      <div className="relative grid items-center gap-12 px-6 py-14 md:grid-cols-2">
        <Corners />
        <div className="max-w-md">
          <p className="reveal text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
            Nothing to sign up for
          </p>
          <h2 className="reveal mt-3 text-3xl font-bold sm:text-4xl" style={{ "--reveal-delay": "80ms" } as CSSProperties}>
            Private by design
          </h2>
          <p className="reveal mt-4 text-sm leading-relaxed text-muted-foreground" style={{ "--reveal-delay": "160ms" } as CSSProperties}>
            No account and no sign-up. Open BirrScan, scan the payment and move on — there's no
            profile to fill in and no password to remember.
          </p>

          <ul className="mt-7 grid grid-cols-3 gap-3 text-center">
            {stats.map(([suffix, label], i) => (
              <li
                key={label}
                className="reveal group rounded-2xl border border-border bg-card px-3 py-4 shadow-card transition-transform hover:-translate-y-1"
                style={{ "--reveal-delay": `${260 + i * 120}ms` } as CSSProperties}
              >
                <p className="font-display text-3xl font-bold leading-none text-primary">
                  <RollingNumber values={countdown} delay={500 + i * 180} />
                  {suffix}
                </p>
                <p className="mt-1.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                  {label}
                </p>
              </li>
            ))}
          </ul>

          <ul className="mt-6 space-y-2.5">
            {facts.map(({ Icon, text }, i) => (
              <li
                key={text}
                className="reveal flex items-center gap-3 text-sm"
                style={{ "--reveal-delay": `${700 + i * 120}ms` } as CSSProperties}
              >
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground">
                  <Icon className="size-4" />
                </span>
                {text}
              </li>
            ))}
          </ul>
        </div>

        <div className="reveal relative mx-auto grid size-72 place-items-center sm:size-80" style={{ "--reveal-delay": "200ms" } as CSSProperties}>
          <div className="absolute inset-0 rounded-full bg-shield-glow" />
          {/* Orbit ring with privacy icons */}
          <div aria-hidden className="privacy-orbit absolute inset-2 rounded-full border border-dashed border-primary/30">
            {orbit.map((Icon, i) => (
              <span key={i} className="absolute inset-0" style={{ transform: `rotate(${i * 120}deg)` }}>
                <span
                  className="privacy-orbit-icon absolute left-1/2 top-0 grid size-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-border bg-card text-primary shadow-card"
                  style={{ transform: `rotate(${-i * 120}deg)` }}
                >
                  <Icon className="size-4" />
                </span>
              </span>
            ))}
          </div>
          <img
            src={shield}
            alt=""
            width={512}
            height={512}
            loading="lazy"
            decoding="async"
            className="privacy-shield relative w-56 drop-shadow-xl sm:w-64"
          />
        </div>
      </div>
    </section>
  );
}

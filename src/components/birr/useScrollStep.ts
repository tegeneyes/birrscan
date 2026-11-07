import { useEffect, useRef, useState } from "react";

/**
 * Scroll-pinned storytelling: tracks how far the user has scrolled through a tall
 * section (0 → 1), writes it to the `--progress` CSS variable on that section and
 * returns the current step. `hydrated` stays false on the server so markup can show
 * its full, final state before JS runs.
 */
export function useScrollStep<T extends HTMLElement>(steps: number) {
  const ref = useRef<T>(null);
  const [step, setStep] = useState(0);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    setHydrated(true);
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const stage = el.querySelector<HTMLElement>("[data-stage]");
      const travel = rect.height - (stage?.offsetHeight ?? window.innerHeight);
      const p = travel > 0 ? Math.min(1, Math.max(0, -rect.top / travel)) : 1;
      el.style.setProperty("--progress", p.toFixed(4));
      setStep(Math.min(steps - 1, Math.floor(p * steps)));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [steps]);

  return { ref, step, hydrated };
}

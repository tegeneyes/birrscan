import { useEffect, useRef, useState } from "react";

/**
 * Reports "pending" until mounted, then "out" / "in" as the element scrolls into view.
 * Server HTML stays fully visible; animations only arm once the browser takes over.
 */
export function useInView<T extends Element>(threshold = 0.2) {
  const ref = useRef<T>(null);
  const [state, setState] = useState<"pending" | "out" | "in">("pending");

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setState("in");
      return;
    }
    setState("out");
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setState("in");
          io.disconnect();
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return { ref, state };
}

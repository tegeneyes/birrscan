import { useCallback, useEffect, useState } from "react";
import type { HistoryEntry } from "@/lib/scan";

const KEY = "birrscan:history:v1";

/** Scan history lives only in this browser — no account, no server. */
export function useScanHistory() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  useEffect(() => {
    try {
      setHistory(JSON.parse(localStorage.getItem(KEY) ?? "[]"));
    } catch {
      setHistory([]);
    }
  }, []);

  const add = useCallback((entry: HistoryEntry) => {
    setHistory((prev) => {
      const next = [entry, ...prev].slice(0, 500);
      localStorage.setItem(KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const clear = useCallback(() => {
    localStorage.removeItem(KEY);
    setHistory([]);
  }, []);

  return { history, add, clear };
}

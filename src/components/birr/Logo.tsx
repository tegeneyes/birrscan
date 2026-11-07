import { cn } from "@/lib/utils";

/** BirrScan app icon: receipt inside scan corners with a verified check. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={cn("size-8", className)} aria-hidden="true">
      <rect width="64" height="64" rx="18" className="fill-primary" />
      <g className="stroke-primary-foreground" strokeWidth="3.6" strokeLinecap="round" fill="none">
        <path d="M13 21v-6a2 2 0 0 1 2-2h6M43 13h6a2 2 0 0 1 2 2v6M51 43v6a2 2 0 0 1-2 2h-6M21 51h-6a2 2 0 0 1-2-2v-6" />
      </g>
      <path
        d="M22 18h20v28l-3.3-3-3.4 3-3.3-3-3.3 3-3.4-3L22 46z"
        className="fill-primary-foreground"
      />
      <path d="M26 25h12M26 30h12" className="stroke-primary" strokeWidth="2.6" strokeLinecap="round" />
      <circle cx="41" cy="39" r="7" className="fill-foreground stroke-primary" strokeWidth="1.5" />
      <path
        d="m37.8 39.2 2.2 2.2 4.2-4.4"
        className="stroke-primary-foreground"
        strokeWidth="2.2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2 font-display text-lg font-bold tracking-tight", className)}>
      <LogoMark />
      BirrScan
    </span>
  );
}

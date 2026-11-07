import highlands from "@/assets/highlands-strip-1920.webp";
import highlandsSmall from "@/assets/highlands-strip-960.webp";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="mt-10 border-t border-border">
      <div className="mx-auto max-w-6xl px-5 pt-10">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <Logo />
          <nav className="flex flex-wrap gap-6 text-sm text-muted-foreground">
            <a href="#app" className="hover:text-foreground">App</a>
            <a href="#fraud" className="hover:text-foreground">Fraud check</a>
            <a href="#privacy" className="hover:text-foreground">Privacy</a>
            <a href="#faq" className="hover:text-foreground">FAQ</a>
          </nav>
        </div>
        <p
          aria-hidden="true"
          className="mt-8 select-none whitespace-nowrap font-display text-[23vw] font-extrabold leading-[0.85] tracking-[-0.06em] lg:text-[18.5rem]"
        >
          BirrScan
        </p>
        <div className="flex flex-col justify-between gap-2 py-6 text-xs text-muted-foreground sm:flex-row">
          <span>© {new Date().getFullYear()} BirrScan. Free to start, no login.</span>
          <span>Your data stays on your device.</span>
        </div>
      </div>
      <div className="relative h-32 overflow-hidden sm:h-40">
        <img src={highlands} srcSet={`${highlandsSmall} 960w, ${highlands} 1920w`} sizes="100vw" alt="" width={1920} height={640} loading="lazy" decoding="async" className="absolute inset-0 size-full object-cover" />
        <div className="absolute inset-0 bg-strip-fade" />
        <p className="relative flex h-full items-center justify-center gap-2 font-display text-sm font-semibold text-primary-foreground sm:text-base">
          <span className="text-gold">✦</span> Made for Ethiopian merchants
        </p>
      </div>
    </footer>
  );
}

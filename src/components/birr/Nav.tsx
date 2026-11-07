import { Button } from "@/components/ui/button";
import { Logo } from "./Logo";

const links = [
  { href: "#how", label: "How it works" },
  { href: "#app", label: "App" },
  { href: "#fraud", label: "Fraud check" },
  { href: "#privacy", label: "Privacy" },
  { href: "#faq", label: "FAQ" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5">
        <a href="#top" aria-label="BirrScan home">
          <Logo />
        </a>
        <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition-colors hover:text-foreground">
              {l.label}
            </a>
          ))}
        </nav>
        <Button asChild variant="hero" size="sm" className="px-4">
          <a href="#app">Get the app</a>
        </Button>
      </div>
    </header>
  );
}

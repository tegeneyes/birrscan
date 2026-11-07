import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import merchant from "@/assets/merchant-verify-1600.webp";
import merchantSmall from "@/assets/merchant-verify-800.webp";

export function MerchantBanner() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20">
      <div className="relative overflow-hidden rounded-3xl border border-border bg-ink shadow-float md:bg-transparent">
        <img
          src={merchant}
          srcSet={`${merchantSmall} 800w, ${merchant} 1600w`}
          sizes="(min-width: 1152px) 1152px, 100vw"
          alt="Café owner showing a verified payment on her phone"
          width={1600}
          height={912}
          loading="lazy"
          decoding="async"
          className="h-[440px] w-full object-cover object-[68%_50%] md:h-[460px] md:object-right"
        />
        {/* Phone: dark fade from the bottom so text sits under the photo. Desktop: paper fade from the left. */}
        <div className="absolute inset-x-0 top-0 h-[440px] bg-photo-fade-up md:hidden" />
        <div className="absolute inset-0 hidden bg-photo-fade md:block" />
        <div className="relative -mt-28 flex flex-col p-6 pt-0 md:absolute md:inset-y-0 md:left-0 md:mt-0 md:max-w-md md:justify-center md:p-12">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary-soft md:text-primary">
            Fast · Free · Private
          </p>
          <h2 className="mt-3 text-[2rem] font-bold leading-[1.08] text-ink-foreground md:text-4xl md:leading-tight md:text-foreground">
            Confirm payments before customers walk away.
          </h2>
          <Button asChild variant="hero" size="xl" className="mt-6 w-fit md:order-last">
            <a href="#app">
              Get the app <ArrowRight />
            </a>
          </Button>
          <p className="mt-5 text-sm text-ink-muted md:mt-3 md:text-muted-foreground">
            Built for cafés, shops and sellers who take telebirr and bank transfers all day and
            can't afford a fake screenshot.
          </p>
        </div>
      </div>
    </section>
  );
}

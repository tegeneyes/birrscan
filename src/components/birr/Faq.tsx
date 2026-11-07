import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    q: "Does BirrScan check with the bank directly?",
    a: "BirrScan reads the SMS, link or reference and checks its format and whether you've seen it before. For telebirr and CBE links it gives you a one-tap link to the official receipt so you can confirm the final details at the source.",
  },
  {
    q: "Do I need an account?",
    a: "No. There is no sign-up and no login. Open the app and start scanning.",
  },
  {
    q: "Is it free?",
    a: "Yes, you can start free. If you need unlimited scans, there is a paid option at an affordable price.",
  },
  {
    q: "How long does a check take?",
    a: "About 10 seconds — fast enough to confirm the payment before the customer leaves.",
  },
  {
    q: "What can I scan?",
    a: "A full payment SMS from telebirr or your bank, a receipt link, or just the transaction reference (for example an FT number from CBE).",
  },
];

export function Faq() {
  return (
    <section id="faq" className="mx-auto max-w-3xl px-5 py-20">
      <h2 className="text-center text-3xl font-bold sm:text-4xl">Questions</h2>
      <Accordion type="single" collapsible className="mt-10 rounded-2xl border border-border bg-card px-6 shadow-card">
        {faqs.map((f) => (
          <AccordionItem key={f.q} value={f.q} className="last:border-b-0">
            <AccordionTrigger className="font-display text-base hover:no-underline">{f.q}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}

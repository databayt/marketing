"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { COPY } from "./copy";
import { ContractSheet, InvoiceSheet } from "./sheets";
import { type Deal, PRESETS, formatDate, schedule, usd } from "./terms";

type Lang = "ar" | "en";

// Print: only the sheet portal reaches the paper, one A4 page.
const PRINT_CSS = `
@media print {
  @page { size: A4; margin: 0; }
  html, body { margin: 0 !important; padding: 0 !important; background: #fff !important; }
  body > *:not([data-slot="billing-print-sheet"]) { display: none !important; }
  [data-slot="billing-print-sheet"] { display: block !important; }
}
`;

const today = () => new Date().toISOString().slice(0, 10);

export default function BillingStudio({ kind, lang }: { kind: "contract" | "invoice"; lang: Lang }) {
  const f = COPY[lang].form;
  const [presetId, setPresetId] = useState(PRESETS[0].id);
  const [deal, setDeal] = useState<Deal>(PRESETS[0].deal[lang]);
  const [n, setN] = useState(1);
  const [issued, setIssued] = useState(today);
  const [mounted, setMounted] = useState(false);

  // ?school=kingfahd opens straight on that school.
  useEffect(() => {
    setMounted(true);
    const id = new URLSearchParams(window.location.search).get("school");
    const preset = PRESETS.find((p) => p.id === id);
    if (preset) pick(preset.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function pick(id: string) {
    const preset = PRESETS.find((p) => p.id === id)!;
    setPresetId(id);
    setDeal(preset.deal[lang]);
    setN(1);
    const url = new URL(window.location.href);
    url.searchParams.set("school", id);
    window.history.replaceState(null, "", url);
  }

  const set = <K extends keyof Deal>(key: K, value: Deal[K]) => setDeal((d) => ({ ...d, [key]: value }));
  const sheet =
    kind === "contract" ? (
      <ContractSheet deal={deal} lang={lang} />
    ) : (
      <InvoiceSheet deal={deal} lang={lang} n={n} issued={issued} />
    );

  const field = (label: string, input: React.ReactNode) => (
    <div className="grid gap-1.5">
      <Label className="text-xs text-muted-foreground">{label}</Label>
      {input}
    </div>
  );

  return (
    <section className="container-content flex flex-col gap-8 py-24 md:py-32 lg:flex-row lg:items-start">
      <style>{PRINT_CSS}</style>

      <aside className="flex w-full flex-col gap-4 lg:sticky lg:top-24 lg:w-80 lg:shrink-0">
        <h1 className="text-2xl font-semibold tracking-tight">{COPY[lang][kind].title}</h1>

        {field(
          f.school,
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((p) => (
              <Button key={p.id} size="sm" variant={p.id === presetId ? "default" : "outline"} onClick={() => pick(p.id)}>
                {p.label[lang]}
              </Button>
            ))}
          </div>,
        )}
        {field(f.schoolName, <Input value={deal.school} onChange={(e) => set("school", e.target.value)} />)}
        {field(f.signatory, <Input value={deal.signatory} onChange={(e) => set("signatory", e.target.value)} />)}
        <div className="grid grid-cols-2 gap-3">
          {field(f.subdomain, <Input dir="ltr" value={deal.subdomain} onChange={(e) => set("subdomain", e.target.value.trim().toLowerCase())} />)}
          {field(f.students, <Input type="number" min={0} value={deal.students} onChange={(e) => set("students", Number(e.target.value) || 0)} />)}
          {field(f.start, <Input type="date" value={deal.start} onChange={(e) => e.target.value && set("start", e.target.value)} />)}
          {field(f.freeMonths, <Input type="number" min={0} max={12} value={deal.freeMonths} onChange={(e) => set("freeMonths", Number(e.target.value) || 0)} />)}
        </div>

        {kind === "invoice" && (
          <>
            {field(
              f.instalment,
              <div className="grid grid-cols-5 gap-1.5">
                {schedule(deal).map((p) => (
                  <Button
                    key={p.n}
                    size="sm"
                    variant={p.n === n ? "default" : "outline"}
                    onClick={() => setN(p.n)}
                    title={`${formatDate(p.date, lang)} · ${usd(p.amount)}`}
                  >
                    {p.n}
                  </Button>
                ))}
              </div>,
            )}
            <div className="grid grid-cols-2 gap-3">
              {field(f.issued, <Input type="date" value={issued} onChange={(e) => e.target.value && setIssued(e.target.value)} />)}
              {field(f.bankAccount, <Input dir="ltr" value={deal.bankAccount} onChange={(e) => set("bankAccount", e.target.value)} />)}
            </div>
          </>
        )}

        <Button size="lg" onClick={() => window.print()} className="mt-2">
          <Download />
          {f.download}
        </Button>
      </aside>

      {/* Real A4 markup, zoomed down to fit narrow screens. */}
      <div className="flex min-w-0 flex-1 justify-center">
        <div className={cn("shadow-xl ring-1 ring-black/5", "[zoom:0.42] sm:[zoom:0.75] lg:[zoom:0.62] xl:[zoom:0.75] 2xl:[zoom:0.9]")}>{sheet}</div>
      </div>

      {mounted &&
        createPortal(
          <div data-slot="billing-print-sheet" className="hidden" aria-hidden="true">
            {sheet}
          </div>,
          document.body,
        )}
    </section>
  );
}

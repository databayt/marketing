"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Download, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardBack, CardFront } from "./card-face";

// Print: only the sheet below reaches the paper — one 85 × 55 mm page per face.
const PRINT_CSS = `
@media print {
  @page { size: 85mm 55mm; margin: 0; }
  html, body { margin: 0 !important; padding: 0 !important; background: #fff !important; }
  body > *:not([data-slot="card-print-sheet"]) { display: none !important; }
  [data-slot="card-print-sheet"] { display: block !important; }
  [data-slot="card-print-sheet"] > * { break-after: page; page-break-after: always; }
  [data-slot="card-print-sheet"] > *:last-child { break-after: auto; page-break-after: auto; }
}
`;

export default function CardContent() {
  // The print sheet lives directly under <body> so print CSS can drop everything else.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section className="container-content flex flex-col items-center gap-10 py-24 md:py-32">
      <style>{PRINT_CSS}</style>

      <div className="flex max-w-xl flex-col items-center gap-3 text-center">
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">Business card</h1>
        <p className="text-muted-foreground">
          Standard 85 × 55 mm, front and back. Download the print-ready PDF or save us to your contacts.
        </p>
      </div>

      <div className="flex w-full flex-col items-center justify-center gap-8 xl:flex-row">
        {[CardFront, CardBack].map((Face, i) => (
          <div
            key={i}
            className="flex h-[55mm] w-[85mm] items-center justify-center sm:h-[calc(55mm*1.35)] sm:w-[calc(85mm*1.35)]"
          >
            <Face className="origin-center rounded-[2mm] shadow-xl ring-1 ring-black/5 sm:scale-[1.35]" />
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button onClick={() => window.print()} size="lg">
          <Download />
          Download PDF
        </Button>
        <Button asChild variant="outline" size="lg">
          <a href="/databayt.vcf" download="databayt.vcf">
            <UserPlus />
            Save contact
          </a>
        </Button>
      </div>

      {mounted &&
        createPortal(
          <div data-slot="card-print-sheet" className="hidden" aria-hidden="true">
            <CardFront />
            <CardBack />
          </div>,
          document.body,
        )}
    </section>
  );
}

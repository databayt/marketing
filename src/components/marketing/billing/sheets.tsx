// The Balqalam A4 template (Figma «A4 — بالقلم», the school-requirements doc):
// black feather square + contact block, «بالقلم — <title>», numbered section
// headings, open tables with a dark head rule and hairline rows, a grey running
// header on later pages and «١ من ٢» bottom-left. Everything is sized in mm so
// the screen preview and the printed PDF are the same markup.

import { cn } from "@/lib/utils";
import { BRAND, COPY } from "./copy";
import { type Deal, type Lang, USD_PER_STUDENT_YEAR, annualUSD, formatDate, money, num, pct, schedule } from "./terms";

const FONT = { fontFamily: '"thmanyah sans", var(--font-rubik), system-ui, sans-serif' };

function Page({
  lang,
  n,
  of,
  running,
  children,
}: {
  lang: Lang;
  n: number;
  of: number;
  running?: string; // grey title line on pages after the first
  children: React.ReactNode;
}) {
  return (
    <article
      dir={lang === "ar" ? "rtl" : "ltr"}
      lang={lang}
      data-doc=""
      style={FONT}
      className="relative flex h-[297mm] w-[210mm] flex-col overflow-hidden bg-white px-[13mm] pb-[16mm] pt-[11mm] text-[11pt] leading-[1.9] text-black"
    >
      {running && (
        <header className="-mt-[1mm] border-b border-neutral-300 pb-[4mm] pt-[4mm] text-[10pt] text-neutral-500">{running}</header>
      )}
      {children}
      <footer className="absolute bottom-[13mm] end-[13mm] text-[9pt] text-neutral-500">{COPY[lang].page(n, of)}</footer>
    </article>
  );
}

function Letterhead({ lang }: { lang: Lang }) {
  return (
    <header className="flex items-center gap-[7mm]">
      <div className="flex size-[27mm] shrink-0 items-center justify-center bg-black">
        {/* eslint-disable-next-line @next/next/no-img-element -- must print crisp */}
        <img src="/marketing/feather.png" alt="" className="size-[15mm] invert" />
      </div>
      <div className="text-[12pt] leading-[1.45]">
        <p className="text-[15pt] font-bold">{BRAND[lang].name}</p>
        <p>{BRAND[lang].tagline}</p>
        <p><bdi>{BRAND.email}</bdi></p>
        <p><bdi dir="ltr">{BRAND.phone}</bdi></p>
      </div>
    </header>
  );
}

const Title = ({ children }: { children: React.ReactNode }) => (
  <h1 className="mt-[16mm] text-[15pt] font-bold leading-tight">{children}</h1>
);

function Section({ lang, n, title, first, children }: { lang: Lang; n: number; title: string; first?: boolean; children: React.ReactNode }) {
  return (
    <section className={first ? "mt-[9mm]" : "mt-[10mm]"}>
      <h2 className="text-[15pt] font-bold leading-tight">
        {num(n, lang)}. {title}
      </h2>
      <div className="mt-[4mm]">{children}</div>
    </section>
  );
}

// Open table: medium head, dark rule under it, hairline rows.
function Table({
  head,
  rows,
  widths,
  bold = 1,
  numeric = [],
}: {
  head: readonly string[];
  rows: React.ReactNode[][];
  widths: string[];
  bold?: number; // the column set in bold (the row's label)
  numeric?: number[];
}) {
  return (
    <table className="w-full table-fixed border-collapse text-[10.5pt] leading-[1.75]">
      <colgroup>
        {widths.map((w, i) => (
          <col key={i} style={{ width: w }} />
        ))}
      </colgroup>
      <thead>
        <tr className="border-b border-black">
          {head.map((h, i) => (
            <th key={i} className={cn("pb-[2.5mm] pe-[4mm] text-start align-bottom font-medium", numeric.includes(i) && "tabular-nums")}>
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((r, ri) => (
          <tr key={ri} className="border-b border-neutral-300">
            {r.map((c, i) => (
              <td key={i} className={cn("py-[3.2mm] pe-[4mm] align-top", i === bold && "font-bold", numeric.includes(i) && "tabular-nums")}>
                {c}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const blank = "____________________";
const host = (d: Deal) => (d.subdomain ? `${d.subdomain}.balqalam.com` : "________.balqalam.com");

export function ContractSheet({ deal, lang }: { deal: Deal; lang: Lang }) {
  const t = COPY[lang].contract;
  const pay = schedule(deal);
  const school = deal.school || blank;
  const clauses = t.clauses({
    start: formatDate(deal.start, lang),
    trialEnd: formatDate(pay[0].date, lang),
    freeMonths: t.months(deal.freeMonths),
    rate: money(USD_PER_STUDENT_YEAR, lang),
    students: num(deal.students, lang),
    total: money(annualUSD(deal.students), lang),
  });
  const termRows = clauses.map(([head, body], i) => [num(i + 1, lang), head, body]);
  const widths = ["7%", "22%", "71%"];

  return (
    <>
      <Page lang={lang} n={1} of={2}>
        <Letterhead lang={lang} />
        <Title>{t.title}</Title>
        <Section lang={lang} n={1} title={t.parties} first>
          <Table
            head={lang === "ar" ? ["#", "الطرف", "البيانات"] : ["#", "Party", "Details"]}
            widths={widths}
            rows={[
              [num(1, lang), t.first, <>{t.provider}<br /><bdi className="text-neutral-600">hi@databayt.org</bdi></>],
              [num(2, lang), t.second, <>{school}{deal.signatory && <> — {deal.signatory}</>}<br /><bdi className="text-neutral-600">{host(deal)}</bdi></>],
            ]}
          />
        </Section>
        <Section lang={lang} n={2} title={t.terms}>
          <Table head={t.termCols} widths={widths} rows={termRows.slice(0, 6)} />
        </Section>
      </Page>

      <Page lang={lang} n={2} of={2} running={t.title}>
        <div className="mt-[10mm]">
          <Table head={t.termCols} widths={widths} rows={termRows.slice(6)} />
        </div>
        <Section lang={lang} n={3} title={t.schedule}>
          <Table
            head={t.scheduleCols}
            widths={["7%", "40%", "20%", "33%"]}
            bold={-1}
            numeric={[3]}
            rows={pay.map((p) => [num(p.n, lang), formatDate(p.date, lang), pct(p.share, lang), money(p.amount, lang)])}
          />
          <p className="mt-[2.5mm] text-[9.5pt] text-neutral-500">{t.estimate}</p>
        </Section>
        <Section lang={lang} n={4} title={t.signatures}>
          <div className="grid grid-cols-2 gap-[12mm] text-[10.5pt]">
            {[
              { who: t.signFor(t.providerShort), name: lang === "ar" ? "عثمان عبدوت" : "Osman Abdout", signed: true },
              { who: t.signFor(school), name: deal.signatory, signed: false },
            ].map(({ who, name, signed }) => (
              <div key={who} className="space-y-[3.5mm]">
                <p className="font-bold">{who}</p>
                <p className="border-b border-neutral-300 pb-[1mm]">{t.name}: {name}</p>
                <p className="relative border-b border-neutral-300 pb-[1mm]">
                  {t.signature}:
                  {signed && (
                    // eslint-disable-next-line @next/next/no-img-element -- must print crisp
                    <img
                      src="/marketing/signature.png"
                      alt=""
                      className="absolute -bottom-[1.5mm] start-[20mm] h-[14mm] w-auto"
                    />
                  )}
                </p>
                <p className="border-b border-neutral-300 pb-[1mm]">{t.date}:</p>
              </div>
            ))}
          </div>
        </Section>
      </Page>
    </>
  );
}

export function invoiceNumber(deal: Deal, n: number) {
  return `DB-${deal.start.slice(0, 4)}-${(deal.subdomain || "SCHOOL").toUpperCase()}-${n}`;
}

export function InvoiceSheet({ deal, lang, n, issued }: { deal: Deal; lang: Lang; n: number; issued: string }) {
  const t = COPY[lang].invoice;
  const p = schedule(deal)[n - 1];
  const no = invoiceNumber(deal, n);

  return (
    <Page lang={lang} n={1} of={1}>
      <Letterhead lang={lang} />
      <Title>{t.title}</Title>

      <Section lang={lang} n={1} title={t.details} first>
        <Table
          head={lang === "ar" ? ["#", "البند", "القيمة"] : ["#", "Item", "Value"]}
          widths={["7%", "28%", "65%"]}
          rows={[
            [num(1, lang), t.number, <bdi key="no">{no}</bdi>],
            [num(2, lang), t.issued, formatDate(issued, lang)],
            [num(3, lang), t.due, formatDate(p.date, lang)],
            [num(4, lang), t.to, <>{deal.school || blank}{deal.signatory && <> — {deal.signatory}</>}<br /><bdi className="text-neutral-600">{host(deal)}</bdi></>],
          ]}
        />
      </Section>

      <Section lang={lang} n={2} title={t.items}>
        <Table
          head={t.cols}
          widths={["7%", "38%", "25%", "10%", "20%"]}
          numeric={[4]}
          rows={[[num(1, lang), t.line(n), t.basis(num(deal.students, lang), money(USD_PER_STUDENT_YEAR, lang)), pct(p.share, lang), money(p.amount, lang)]]}
        />
        <div className="flex items-baseline justify-between border-b-2 border-black py-[3mm]">
          <span className="text-[12pt] font-bold">{t.total}</span>
          <span className="text-[15pt] font-bold tabular-nums">{money(p.amount, lang)}</span>
        </div>
      </Section>

      <Section lang={lang} n={3} title={t.payment}>
        <p>{t.pay}</p>
        <p className="mt-[2mm] text-[13pt] font-bold tabular-nums">
          {deal.bankAccount ? <bdi dir="ltr">{deal.bankAccount}</bdi> : <span className="text-[10.5pt] font-normal text-neutral-500">{t.noAccount}</span>}
        </p>
        <p className="mt-[2mm] text-[9.5pt] text-neutral-500">{t.ref(no)}</p>
      </Section>
    </Page>
  );
}

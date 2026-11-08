import { cn } from "@/lib/utils";
import { COPY } from "./copy";
import { type Deal, USD_PER_STUDENT_YEAR, annualUSD, formatDate, schedule, usd } from "./terms";

type Lang = "ar" | "en";

// One A4 page; sized in mm so the screen preview and the PDF are the same markup.
const page = "relative flex h-[297mm] w-[210mm] flex-col bg-white overflow-hidden px-[18mm] py-[14mm] text-[10pt] leading-relaxed text-black";

function Letterhead({ lang, right }: { lang: Lang; right: React.ReactNode }) {
  return (
    <header className="flex items-start justify-between border-b border-black pb-[5mm]">
      <div className="flex items-center gap-[3mm]">
        {/* eslint-disable-next-line @next/next/no-img-element -- must print crisp */}
        <img src="/logo.png" alt="" className="size-[11mm]" />
        <div>
          <p className="text-[15pt] font-bold leading-none tracking-tight">Databayt</p>
          <p className="mt-[1.5mm] text-[8pt] text-neutral-600">
            {lang === "ar" ? "منصة بالقلم لإدارة المدارس" : "Balqalam school platform"}
          </p>
        </div>
      </div>
      <div className="text-end text-[8.5pt] leading-snug text-neutral-700">{right}</div>
    </header>
  );
}

const th = "border-b border-black py-[2mm] text-start text-[8.5pt] font-semibold";
const td = "border-b border-neutral-300 py-[1.4mm] text-[9pt]";

export function ContractSheet({ deal, lang, className }: { deal: Deal; lang: Lang; className?: string }) {
  const t = COPY[lang].contract;
  const pay = schedule(deal);
  const host = deal.subdomain ? `${deal.subdomain}.balqalam.com` : "________.balqalam.com";
  const school = deal.school || "____________________";
  const clauses = t.clauses({
    host,
    start: formatDate(deal.start, lang),
    trialEnd: formatDate(pay[0].date, lang),
    freeMonths: t.months(deal.freeMonths),
    rate: usd(USD_PER_STUDENT_YEAR),
    students: deal.students,
    total: usd(annualUSD(deal.students)),
  });

  return (
    <article dir={lang === "ar" ? "rtl" : "ltr"} lang={lang} className={cn(page, className)}>
      <Letterhead lang={lang} right={<><p>hi@databayt.org</p><p dir="ltr">databayt.org</p></>} />

      <h1 className="mt-[6mm] text-center text-[16pt] font-bold">{t.title}</h1>
      <p className="mt-[4mm]">{t.intro}</p>
      <div className="mt-[2mm] grid grid-cols-2 gap-[6mm] text-[9.5pt]">
        <p><span className="font-semibold">{t.party1}:</span> {t.provider}<br /><span className="text-[8pt] text-neutral-600">{t.providerNote}</span></p>
        <p><span className="font-semibold">{t.party2}:</span> {school}<br /><span dir="ltr" className="text-[8pt] text-neutral-600">{host}</span></p>
      </div>

      <ol className="mt-[4mm] space-y-[1.4mm]">
        {clauses.map(([head, body], i) => (
          <li key={head} className="flex gap-[2mm]">
            <span className="w-[5mm] shrink-0 font-semibold">{i + 1}.</span>
            <p><span className="font-semibold">{head}: </span>{body}</p>
          </li>
        ))}
      </ol>

      <h2 className="mt-[4mm] text-[11pt] font-bold">{t.scheduleTitle}</h2>
      <table className="mt-[1.5mm] w-full border-collapse tabular-nums">
        <thead><tr>{t.cols.map((c) => <th key={c} className={th}>{c}</th>)}</tr></thead>
        <tbody>
          {pay.map((p) => (
            <tr key={p.n}>
              <td className={td}>{p.n}</td>
              <td className={td}>{formatDate(p.date, lang)}</td>
              <td className={td} dir="ltr">{p.share * 100}%</td>
              <td className={td} dir="ltr">{usd(p.amount)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-[1.5mm] text-[8pt] text-neutral-600">{t.estimate}</p>

      <footer className="mt-auto grid grid-cols-2 gap-[10mm] pt-[4mm] text-[9.5pt]">
        {[
          [t.signFor(t.provider), "Osman Abdout"],
          [t.signFor(school), deal.signatory],
        ].map(([who, name]) => (
          <div key={who} className="space-y-[3mm]">
            <p className="font-semibold">{who}</p>
            <p>{t.name}: {name || "______________________"}</p>
            <p>{t.signature}: ______________________</p>
            <p>{t.date}: ______________________</p>
          </div>
        ))}
      </footer>
    </article>
  );
}

export function invoiceNumber(deal: Deal, n: number) {
  return `DB-${deal.start.slice(0, 4)}-${(deal.subdomain || "SCHOOL").toUpperCase()}-${n}`;
}

export function InvoiceSheet({
  deal,
  lang,
  n,
  issued,
  className,
}: {
  deal: Deal;
  lang: Lang;
  n: number;
  issued: string;
  className?: string;
}) {
  const t = COPY[lang].invoice;
  const p = schedule(deal)[n - 1];
  const no = invoiceNumber(deal, n);
  const host = deal.subdomain ? `${deal.subdomain}.balqalam.com` : "";
  const due = p.date;

  return (
    <article dir={lang === "ar" ? "rtl" : "ltr"} lang={lang} className={cn(page, className)}>
      <Letterhead
        lang={lang}
        right={<p className="text-[20pt] font-bold leading-none tracking-tight text-black">{t.title}</p>}
      />

      <div className="mt-[8mm] grid grid-cols-2 gap-[8mm]">
        <div className="space-y-[5mm]">
          <div>
            <p className="text-[8pt] font-semibold uppercase text-neutral-500">{t.from}</p>
            <p className="font-semibold">Databayt</p>
            <p>hi@databayt.org</p>
            <p><bdi>databayt.org</bdi></p>
          </div>
          <div>
            <p className="text-[8pt] font-semibold uppercase text-neutral-500">{t.to}</p>
            <p className="font-semibold">{deal.school || "____________________"}</p>
            {deal.signatory && <p>{deal.signatory}</p>}
            {host && <p><bdi>{host}</bdi></p>}
          </div>
        </div>
        <dl className="grid h-fit grid-cols-[auto_1fr] gap-x-[5mm] gap-y-[1.5mm]">
          <dt className="text-neutral-600">{t.number}</dt><dd dir="ltr" className="text-end font-semibold">{no}</dd>
          <dt className="text-neutral-600">{t.issued}</dt><dd className="text-end">{formatDate(issued, lang)}</dd>
          <dt className="text-neutral-600">{t.due}</dt><dd className="text-end font-semibold">{formatDate(due, lang)}</dd>
        </dl>
      </div>

      <table className="mt-[10mm] w-full border-collapse tabular-nums">
        <thead><tr>{t.cols.map((c, i) => <th key={c} className={cn(th, i > 0 && "text-end")}>{c}</th>)}</tr></thead>
        <tbody>
          <tr>
            <td className={td}>{t.line(n)}</td>
            <td className={cn(td, "text-end")}>{deal.students}</td>
            <td className={cn(td, "text-end")} dir="ltr">{usd(annualUSD(deal.students))}</td>
            <td className={cn(td, "text-end")} dir="ltr">{p.share * 100}%</td>
            <td className={cn(td, "text-end")} dir="ltr">{usd(p.amount)}</td>
          </tr>
        </tbody>
      </table>
      <div className="mt-[4mm] flex justify-end">
        <div className="flex w-[80mm] items-baseline justify-between border-t-2 border-black pt-[2mm]">
          <span className="font-semibold">{t.total}</span>
          <span dir="ltr" className="text-[15pt] font-bold tabular-nums">{usd(p.amount)}</span>
        </div>
      </div>
      <p className="mt-[1mm] text-end text-[8pt] text-neutral-600">
        {deal.students} × {usd(USD_PER_STUDENT_YEAR)} × {p.share * 100}%
      </p>

      <section className="mt-[10mm] rounded-[2mm] border border-neutral-300 p-[5mm]">
        <p className="font-semibold">{t.payTitle}</p>
        <p className="mt-[1mm]">{t.pay}</p>
        <p dir="ltr" className="mt-[2mm] text-start text-[12pt] font-bold tabular-nums">
          {deal.bankAccount || <span className="text-[9pt] font-normal text-neutral-500">{t.noAccount}</span>}
        </p>
        <p className="mt-[2mm] text-[8.5pt] text-neutral-600">{t.ref(no)}</p>
      </section>

      <p className="mt-auto border-t border-neutral-300 pt-[4mm] text-center text-[8.5pt] text-neutral-600">{t.thanks}</p>
    </article>
  );
}

// Per-student pricing and the schools already on Balqalam. Mirrors kun decision
// D-20261117-pricing-proportional-sar (supersedes D-20261108): 24 SAR per student a
// year, every student, all-in, no VAT line (6,000 SAR at 250 students). 50% when billing
// starts (the end of the free period, or signing if there is none), then
// 4 x 12.5% spread evenly between that date and the end of the school year.

export interface Tier {
  upTo: number; // students up to here (inclusive) cost `rate` each
  rate: number; // SAR a student a year
}

// One rate for every student: 24 SAR a year (6,000 SAR ÷ 250 students). Kept as a
// one-tier table so the invoice basis reads "48 × 24".
export const SAR_PER_STUDENT_YEAR = 24;
export const TIERS: readonly Tier[] = [{ upTo: Infinity, rate: SAR_PER_STUDENT_YEAR }];
export const OWN_CONTRACT_OVER = 1000; // above this a school gets its own contract (customSAR may override)
export const FIRST_SHARE = 0.5;
export const INSTALMENT_SHARE = 0.125;
export const INSTALMENTS = 4;

// Live-class fair use, hours a month, by school size.
export const LIVE_HOURS = [
  { upTo: 250, hours: 100 },
  { upTo: 500, hours: 200 },
  { upTo: Infinity, hours: 400 },
] as const;
export const liveHours = (students: number) => LIVE_HOURS.find((l) => students <= l.upTo)!.hours;

export type PayIn = "sar-bank" | "sdg-bankak";

export interface Deal {
  school: string; // the school's legal name, in the document's language
  signatory: string; // who signs for the school
  subdomain: string; // <subdomain>.balqalam.com
  students: number;
  start: string; // setup day, YYYY-MM-DD
  freeMonths: number;
  yearEnd: string; // last day of the school year, YYYY-MM-DD
  payIn: PayIn;
  customSAR?: number; // the agreed annual amount when the school is over 1,000 students
  bankAccount: string; // the account payments go to (bank IBAN, or Bankak)
}

const YEAR_END = "2027-06-30";

type Preset = { id: string; label: { ar: string; en: string }; deal: { ar: Deal; en: Deal } };

const both = (base: Omit<Deal, "school" | "signatory">, ar: [string, string], en: [string, string]) => ({
  ar: { ...base, school: ar[0], signatory: ar[1] },
  en: { ...base, school: en[0], signatory: en[1] },
});

export const PRESETS: Preset[] = [
  {
    // Dammam, KSA. No free period: billing starts 2026-11-20, paid in riyals by bank transfer.
    id: "alabidae",
    label: { ar: "مدارس الإبداع", en: "Al-Ibda Schools" },
    deal: both(
      { subdomain: "alabidae", students: 48, start: "2026-11-20", freeMonths: 0, yearEnd: YEAR_END, payIn: "sar-bank", bankAccount: "" },
      ["مدارس الإبداع أونلاين", ""],
      ["Al-Ibda Online Schools", ""],
    ),
  },
  {
    id: "kingfahd",
    label: { ar: "مدارس الملك فهد", en: "King Fahd Schools" },
    deal: both(
      { subdomain: "kingfahd", students: 14, start: "2026-11-08", freeMonths: 1, yearEnd: YEAR_END, payIn: "sdg-bankak", bankAccount: "" },
      ["مدارس الملك فهد", "أحمد بهاء"],
      ["King Fahd Schools", "Ahmed Baha"],
    ),
  },
  {
    id: "new",
    label: { ar: "مدرسة جديدة", en: "New school" },
    deal: both(
      { subdomain: "", students: 100, start: new Date().toISOString().slice(0, 10), freeMonths: 1, yearEnd: YEAR_END, payIn: "sar-bank", bankAccount: "" },
      ["", ""],
      ["", ""],
    ),
  },
];

export function addMonths(iso: string, months: number): string {
  const [y, m, d] = iso.split("-").map(Number);
  const date = new Date(Date.UTC(y, m - 1 + months, 1));
  const last = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + 1, 0)).getUTCDate();
  date.setUTCDate(Math.min(d, last));
  return date.toISOString().slice(0, 10);
}

export interface Payment {
  n: number; // 1-based
  date: string;
  share: number;
  amount: number; // SAR
}

export const isCustom = (deal: Deal) => deal.students > OWN_CONTRACT_OVER;

export function annualSAR(deal: Deal): number {
  if (isCustom(deal) && deal.customSAR) return round2(deal.customSAR);
  let total = 0;
  let from = 0;
  for (const { upTo, rate } of TIERS) {
    total += Math.max(0, Math.min(deal.students, upTo) - from) * rate;
    from = upTo;
  }
  return round2(total);
}

const DAY = 86_400_000;
const dayMs = (iso: string) => Date.parse(`${iso}T00:00:00Z`);
const addDays = (iso: string, days: number) => new Date(dayMs(iso) + days * DAY).toISOString().slice(0, 10);

// Billing starts when the free period ends; four instalments then fall evenly
// across the days up to the end of the school year, the last one on yearEnd.
export function schedule(deal: Deal): Payment[] {
  const first = addMonths(deal.start, deal.freeMonths);
  const span = Math.max(0, Math.round((dayMs(deal.yearEnd) - dayMs(first)) / DAY));
  const total = annualSAR(deal);
  return [
    { n: 1, date: first, share: FIRST_SHARE, amount: round2(total * FIRST_SHARE) },
    ...Array.from({ length: INSTALMENTS }, (_, i) => ({
      n: i + 2,
      date: addDays(first, Math.floor((span * (i + 1)) / INSTALMENTS)),
      share: INSTALMENT_SHARE,
      amount: round2(total * INSTALMENT_SHARE),
    })),
  ];
}

const round2 = (n: number) => Math.round(n * 100) / 100;

export type Lang = "ar" | "en";

// The Figma template sets Arabic in Arabic-Indic digits; English keeps Latin ones.
const locale = (lang: Lang) => (lang === "ar" ? "ar-u-nu-arab" : "en-US");

export const num = (n: number, lang: Lang, decimals = 0) =>
  n.toLocaleString(locale(lang), { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

// Whole riyals print bare; a fraction keeps two decimals.
export const sar = (n: number, lang: Lang) => {
  const d = n % 1 ? 2 : 0;
  return lang === "ar" ? `${num(n, lang, d)} ريال` : `${num(n, lang, d)} SAR`;
};

export const pct = (share: number, lang: Lang) => {
  const v = share * 100;
  return lang === "ar" ? `${num(v, lang, v % 1 ? 1 : 0)}٪` : `${v}%`;
};

export const formatDate = (iso: string, lang: Lang) =>
  iso
    ? new Date(`${iso}T00:00:00Z`).toLocaleDateString(lang === "ar" ? "ar-u-nu-arab" : "en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "UTC",
      })
    : "";

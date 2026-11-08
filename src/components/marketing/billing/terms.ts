// The one price and the schools already on Balqalam. Mirrors hogwarts
// `saas-marketing/pricing/rates.ts` and kun decision D-20261108-pricing-one-month-trial:
// $6.40 per student a year from student 1, half when the free period ends,
// then 12.5% at months 3, 6, 9 and 12, paid in SDG at the bank rate on the day.

export const USD_PER_STUDENT_YEAR = 6.4;
export const FIRST_SHARE = 0.5;
export const INSTALMENT_SHARE = 0.125;
export const INSTALMENT_MONTHS = [3, 6, 9, 12] as const;

export interface Deal {
  school: string; // the school's legal name, in the document's language
  signatory: string; // who signs for the school
  subdomain: string; // <subdomain>.balqalam.com
  students: number;
  start: string; // setup day, YYYY-MM-DD
  freeMonths: number;
  bankAccount: string; // the Bankak account payments go to
}

type Preset = { id: string; label: { ar: string; en: string }; deal: { ar: Deal; en: Deal } };

const both = (base: Omit<Deal, "school" | "signatory">, ar: [string, string], en: [string, string]) => ({
  ar: { ...base, school: ar[0], signatory: ar[1] },
  en: { ...base, school: en[0], signatory: en[1] },
});

export const PRESETS: Preset[] = [
  {
    // Joined 2026-09-19 under the 3-month pilot, which the reset honours: first bill 12-19.
    id: "alabidae",
    label: { ar: "مدارس الإبداع", en: "Al-Ibda Schools" },
    deal: both(
      { subdomain: "alabidae", students: 48, start: "2026-09-19", freeMonths: 3, bankAccount: "" },
      ["مدارس الإبداع أونلاين", ""],
      ["Al-Ibda Online Schools", ""],
    ),
  },
  {
    id: "kingfahd",
    label: { ar: "مدارس الملك فهد", en: "King Fahd Schools" },
    deal: both(
      { subdomain: "kingfahd", students: 14, start: "2026-11-08", freeMonths: 1, bankAccount: "" },
      ["مدارس الملك فهد", "أحمد بهاء"],
      ["King Fahd Schools", "Ahmed Baha"],
    ),
  },
  {
    id: "new",
    label: { ar: "مدرسة جديدة", en: "New school" },
    deal: both(
      { subdomain: "", students: 100, start: new Date().toISOString().slice(0, 10), freeMonths: 1, bankAccount: "" },
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
  amount: number; // USD, for the student count in the deal
}

export function annualUSD(students: number): number {
  return round2(Math.max(0, students) * USD_PER_STUDENT_YEAR);
}

export function schedule(deal: Deal): Payment[] {
  const first = addMonths(deal.start, deal.freeMonths);
  const total = annualUSD(deal.students);
  return [
    { n: 1, date: first, share: FIRST_SHARE, amount: round2(total * FIRST_SHARE) },
    ...INSTALMENT_MONTHS.map((m, i) => ({
      n: i + 2,
      date: addMonths(first, m),
      share: INSTALMENT_SHARE,
      amount: round2(total * INSTALMENT_SHARE),
    })),
  ];
}

const round2 = (n: number) => Math.round(n * 100) / 100;

export const usd = (n: number) =>
  `$${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export type Lang = "ar" | "en";

// The Figma template sets Arabic in Arabic-Indic digits; English keeps Latin ones.
const locale = (lang: Lang) => (lang === "ar" ? "ar-u-nu-arab" : "en-US");

export const num = (n: number, lang: Lang, decimals = 0) =>
  n.toLocaleString(locale(lang), { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

export const money = (n: number, lang: Lang) => (lang === "ar" ? `${num(n, lang, 2)} دولار` : `$${num(n, lang, 2)}`);

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

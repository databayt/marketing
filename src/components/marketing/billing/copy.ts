// Contract and invoice wording, Arabic first. The clauses are the one-page
// contract in hogwarts content/docs-*/contract.mdx — change them there first.

import type { Lang } from "./terms";

export interface Clause {
  start: string;
  trialEnd: string;
  freeMonths: string;
  rate: string;
  students: string;
  total: string;
}

// The letterhead of the Balqalam A4 template (Figma «A4 — بالقلم»).
export const BRAND = {
  ar: { name: "بالقلم", tagline: "نظام ادارة المدارس" },
  en: { name: "Balqalam", tagline: "School management system" },
  email: "sales@balqalam.com",
  phone: "+249963144047",
} as const;

const ar = (n: number) => n.toLocaleString("ar-u-nu-arab");

export const COPY = {
  ar: {
    page: (n: number, of: number) => `${ar(n)} من ${ar(of)}`,
    contract: {
      title: "بالقلم — عقد اشتراك",
      parties: "الطرفان",
      first: "الطرف الأول",
      second: "الطرف الثاني",
      provider: "داتابيت (Databayt)، مزوّد منصة بالقلم",
      terms: "البنود",
      termCols: ["#", "البند", "النص"],
      clauses: (c: Clause) => [
        ["الخدمة", "منصة بالقلم كاملة على عنوان المدرسة الخاص، مع الدعم الفني والتحديثات طوال مدة العقد."],
        ["الفترة المجانية", `من ${c.start} حتى ${c.trialEnd} (${c.freeMonths}) دون أي مقابل.`],
        ["السعر", `${c.rate} للطالب في السنة، بعدد الطلاب المسجّلين في تاريخ كل دفعة. عند ${c.students} طالبًا تكون قيمة السنة ${c.total}.`],
        ["الدفع", "٥٠٪ عند انتهاء الفترة المجانية، ثم ١٢٫٥٪ كل ثلاثة أشهر، حسب جدول الدفعات."],
        ["طريقة الدفع", "السعر محدد بالدولار ويُدفع بالجنيه السوداني بسعر البنك يوم الدفع، عبر بنكك، إلى الحساب المذكور في الفاتورة."],
        ["البيانات", "بيانات المدرسة ملك للمدرسة، ويمكنها تصديرها في أي وقت. نحافظ على سريتها ولا نشاركها مع أي جهة."],
        ["المدة", "سنة تبدأ بنهاية الفترة المجانية، وتتجدد تلقائيًا ما لم يُخطر أحد الطرفين الآخر كتابيًا قبل ٣٠ يومًا من نهايتها."],
        ["التأخر في الدفع", "إذا تأخرت دفعة أكثر من ٣٠ يومًا وبعد إشعار كتابي، يجوز إيقاف الوصول مؤقتًا. تبقى البيانات محفوظة كاملة."],
      ],
      months: (n: number) => (n === 1 ? "شهر واحد" : n === 2 ? "شهران" : n <= 10 ? `${ar(n)} أشهر` : `${ar(n)} شهرًا`),
      schedule: "جدول الدفعات",
      scheduleCols: ["#", "التاريخ", "النسبة", "المبلغ"],
      estimate: "المبالغ تقديرية بعدد الطلاب الحالي، وتُحسب كل دفعة بعدد الطلاب يوم استحقاقها.",
      signatures: "التوقيع",
      signFor: (who: string) => `عن ${who}`,
      providerShort: "داتابيت",
      name: "الاسم",
      signature: "التوقيع",
      date: "التاريخ",
    },
    invoice: {
      title: "بالقلم — فاتورة",
      details: "بيانات الفاتورة",
      number: "رقم الفاتورة",
      issued: "تاريخ الإصدار",
      due: "تاريخ الاستحقاق",
      to: "إلى",
      items: "التفاصيل",
      cols: ["#", "البيان", "الأساس", "النسبة", "المبلغ"],
      line: (n: number) =>
        n === 1 ? "اشتراك بالقلم — الدفعة الأولى، عند انتهاء الفترة المجانية" : `اشتراك بالقلم — القسط ${ar(n - 1)} من ٤`,
      basis: (students: string, rate: string) => `${students} طالبًا × ${rate}`,
      total: "الإجمالي المستحق",
      payment: "طريقة الدفع",
      pay: "يُدفع المبلغ بالجنيه السوداني بسعر البنك يوم الدفع، عبر بنكك، إلى الحساب:",
      noAccount: "يُرسل رقم الحساب مع الفاتورة",
      ref: (no: string) => `اكتب رقم الفاتورة ${no} في خانة التعليق عند التحويل.`,
    },
    form: {
      school: "المدرسة",
      schoolName: "اسم المدرسة",
      signatory: "يوقّع عن المدرسة",
      subdomain: "العنوان (balqalam.com.)",
      students: "عدد الطلاب",
      start: "بداية الاشتراك",
      freeMonths: "أشهر مجانية",
      bankAccount: "حساب بنكك",
      instalment: "الدفعة",
      issued: "تاريخ الفاتورة",
      download: "تنزيل PDF",
      heading: { contract: "العقد", invoice: "الفاتورة" },
    },
  },
  en: {
    page: (n: number, of: number) => `${n} of ${of}`,
    contract: {
      title: "Balqalam — Subscription Agreement",
      parties: "Parties",
      first: "First party",
      second: "Second party",
      provider: "Databayt, provider of the Balqalam platform",
      terms: "Terms",
      termCols: ["#", "Term", "Text"],
      clauses: (c: Clause) => [
        ["Service", "The whole Balqalam platform at the school's own address, with support and updates for the length of the agreement."],
        ["Free period", `From ${c.start} to ${c.trialEnd} (${c.freeMonths}), at no cost.`],
        ["Price", `${c.rate} per student a year, counting the students enrolled on each payment date. At ${c.students} students the year comes to ${c.total}.`],
        ["Payment", "50% when the free period ends, then 12.5% every three months, as in the payment schedule."],
        ["How to pay", "The price is fixed in US dollars and paid in Sudanese pounds at the bank rate on the day, by Bankak, to the account on the invoice."],
        ["Data", "The school owns its data and can export it at any time. We keep it private and share it with no one."],
        ["Length", "One year from the end of the free period, renewed automatically unless either side gives written notice 30 days before it ends."],
        ["Late payment", "If a payment is more than 30 days late, after written notice, access may be paused. The data is kept in full."],
      ],
      months: (n: number) => (n === 1 ? "one month" : `${n} months`),
      schedule: "Payment schedule",
      scheduleCols: ["#", "Date", "Share", "Amount"],
      estimate: "Amounts are estimated on today's student count; each payment counts the students enrolled on its date.",
      signatures: "Signatures",
      signFor: (who: string) => `For ${who}`,
      providerShort: "Databayt",
      name: "Name",
      signature: "Signature",
      date: "Date",
    },
    invoice: {
      title: "Balqalam — Invoice",
      details: "Invoice details",
      number: "Invoice no.",
      issued: "Issued",
      due: "Due",
      to: "Bill to",
      items: "Details",
      cols: ["#", "Description", "Basis", "Share", "Amount"],
      line: (n: number) =>
        n === 1 ? "Balqalam subscription — first payment, at the end of the free period" : `Balqalam subscription — instalment ${n - 1} of 4`,
      basis: (students: string, rate: string) => `${students} students × ${rate}`,
      total: "Total due",
      payment: "How to pay",
      pay: "Pay in Sudanese pounds at the bank rate on the day, by Bankak, to the account:",
      noAccount: "Account number sent with this invoice",
      ref: (no: string) => `Write the invoice number ${no} in the transfer note.`,
    },
    form: {
      school: "School",
      schoolName: "School name",
      signatory: "Signs for the school",
      subdomain: "Address (.balqalam.com)",
      students: "Students",
      start: "Subscription start",
      freeMonths: "Free months",
      bankAccount: "Bankak account",
      instalment: "Payment",
      issued: "Invoice date",
      download: "Download PDF",
      heading: { contract: "Contract", invoice: "Invoice" },
    },
  },
};

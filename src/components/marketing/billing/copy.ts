// Contract and invoice wording, Arabic first. The clauses are the one-page
// contract in hogwarts content/docs-*/contract.mdx — change them there first.
// Price: kun D-20261117-pricing-proportional-sar.

import type { Lang, PayIn } from "./terms";

export interface Clause {
  start: string;
  trialEnd: string; // the day billing starts
  freeMonths: string;
  hasFree: boolean;
  rate: string; // SAR a student a year
  students: string;
  total: string;
  custom: boolean; // over 1,000 students: its own contract
  yearEnd: string;
  payIn: PayIn;
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
      clauses: (c: Clause) =>
        [
          ["الخدمة", "منصة بالقلم كاملة على عنوان المدرسة الخاص، مع الاستضافة والدعم الفني والتحديثات طوال مدة العقد. التفاصيل في الملحق الفني."],
          c.hasFree && ["الفترة المجانية", `من ${c.start} حتى ${c.trialEnd} (${c.freeMonths}) دون أي مقابل.`],
          [
            "السعر",
            `${c.rate} ريالًا لكل طالب في السنة، شاملة كل شيء. ` +
              (c.custom
                ? `فوق ١٬٠٠٠ طالب يكون لها عقد خاص: عند ${c.students} طالبًا تكون قيمة السنة ${c.total}. `
                : `عند ${c.students} طالبًا تكون قيمة السنة ${c.total}. `) +
              "تُحسب كل دفعة بعدد الطلاب المسجّلين يوم استحقاقها.",
          ],
          ["الدفع", `٥٠٪ عند بدء الفوترة في ${c.trialEnd}، ثم أربع دفعات متساوية، كل واحدة ١٢٫٥٪، وآخرها بنهاية العام الدراسي، حسب جدول الدفعات.`],
          [
            "طريقة الدفع",
            c.payIn === "sar-bank"
              ? "بالريال السعودي، بتحويل بنكي إلى الحساب المذكور في الفاتورة."
              : "السعر بالريال السعودي ويُدفع بالجنيه السوداني بسعر البنك يوم الدفع، عبر بنكك، إلى الحساب المذكور في الفاتورة.",
          ],
          ["المدة", `يتبع العقد السنة الدراسية: يسري حتى ${c.yearEnd}، ويتجدد لكل سنة دراسية تالية ما لم يُخطر أحد الطرفين الآخر كتابيًا قبل ٣٠ يومًا من نهايتها.`],
          ["انتهاء العقد", "ينتهي العقد بعدم التجديد، أو بإخطار كتابي من أحد الطرفين، أو إذا تأخرت دفعة أكثر من ٦٠ يومًا بعد إخطار كتابي."],
          ["التأخر في الدفع", "إذا تأخرت دفعة أكثر من ٣٠ يومًا وبعد إخطار كتابي، يجوز إيقاف الوصول مؤقتًا. تبقى البيانات محفوظة."],
          [
            "البيانات",
            "بيانات المدرسة ملك للمدرسة، ويمكنها تصديرها في أي وقت. نحافظ على سريتها ولا نشاركها مع أي جهة. تبقى محفوظة طوال سريان العقد، وثلاثة أشهر بعد انتهائه لتصدّرها المدرسة، ثم تُحذف تلقائيًا ولا تتحمل بالقلم مسؤوليتها.",
          ],
          ["الملحق الفني", "الملحق الفني جزء من هذا العقد. ما ليس فيه يُسعَّر على حدة."],
        ].filter(Boolean) as string[][],
      months: (n: number) => (n === 1 ? "شهر واحد" : n === 2 ? "شهران" : n <= 10 ? `${ar(n)} أشهر` : `${ar(n)} شهرًا`),
      schedule: "جدول الدفعات",
      scheduleCols: ["#", "التاريخ", "النسبة", "المبلغ"],
      estimate: "المبالغ تقديرية بعدد الطلاب الحالي، وتُحسب كل دفعة بعدد الطلاب المسجّلين يوم استحقاقها.",
      annex: {
        title: "الملحق الفني",
        included: "ما يشمله الاشتراك",
        includedRows: [
          ["المنصة", "الطلاب والقبول، الحضور، الجدول الدراسي، الدرجات والامتحانات، الرسوم والفواتير، بوابة وتطبيق أولياء الأمور، الإعلانات والرسائل، التعلّم والحصص المباشرة، التقارير."],
          ["العنوان", "عنوان خاص بالمدرسة على balqalam.com."],
          ["الاستضافة", "الاستضافة والنسخ الاحتياطي والمراقبة."],
          ["التحديثات", "التحديثات وإصلاحات الأمان."],
          ["التطبيق", "تطبيق الجوال."],
        ],
        support: "الدعم الفني",
        supportText: "عبر واتساب والبريد الإلكتروني، في ساعات العمل من الأحد إلى الخميس.",
        supportCols: ["الأولوية", "الرد الأول", "الحل"],
        supportRows: [
          ["حرجة: المنصة متوقفة", "ساعتان", "٢٤ ساعة"],
          ["كبيرة: ميزة أساسية لا تعمل", "يوم عمل", "٣ أيام عمل"],
          ["صغيرة: خطأ في العرض أو سؤال", "يومان", "التحديث المجدول التالي"],
        ],
        fair: "الاستخدام العادل للحصص المباشرة",
        fairText: "ساعات الحصص المباشرة في الشهر حسب حجم المدرسة:",
        fairCols: ["حجم المدرسة", "الساعات في الشهر"],
        fairSizes: ["حتى ٢٥٠ طالبًا", "حتى ٥٠٠ طالب", "أكثر من ٥٠٠ طالب"],
        hours: (h: string) => `${h} ساعة`,
        fairMore: "الساعات الزائدة تُسعَّر على حدة.",
        paid: "ما يُدفع على حدة",
        paidRows: [
          ["ميزات خاصة بمدرسة واحدة"],
          ["ساعات حصص مباشرة إضافية"],
          ["استيراد بيانات أكثر من ملفات الطلاب والمعلمين المعتمدة"],
          ["التدريب في المدرسة"],
        ],
      },
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
      line: (n: number) => (n === 1 ? "اشتراك بالقلم — الدفعة الأولى، عند بدء الفوترة" : `اشتراك بالقلم — القسط ${ar(n - 1)} من ٤`),
      basis: (students: string, parts: string) => `${students} طالبًا: ${parts}`,
      custom: "عقد خاص",
      total: "الإجمالي المستحق",
      payment: "طريقة الدفع",
      pay: (p: PayIn) =>
        p === "sar-bank"
          ? "يُدفع المبلغ بالريال السعودي، بتحويل بنكي إلى الحساب:"
          : "يُدفع المبلغ بالجنيه السوداني بسعر البنك يوم الدفع، عبر بنكك، إلى الحساب:",
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
      yearEnd: "نهاية العام الدراسي",
      payIn: "طريقة الدفع",
      payOptions: { "sar-bank": "ريال سعودي — تحويل بنكي", "sdg-bankak": "جنيه سوداني — بنكك" },
      customSAR: "المبلغ المتفق عليه (ريال)",
      bankAccount: "حساب التحويل",
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
      clauses: (c: Clause) =>
        [
          ["Service", "The whole Balqalam platform at the school's own address, with hosting, support and updates for the length of the agreement. Full details are in the Technical Annex."],
          c.hasFree && ["Free period", `From ${c.start} to ${c.trialEnd} (${c.freeMonths}), at no cost.`],
          [
            "Price",
            `${c.rate} SAR per student a year, all-in. ` +
              (c.custom
                ? `Above 1,000 students the school has its own contract: at ${c.students} students the year comes to ${c.total}. `
                : `At ${c.students} students the year comes to ${c.total}. `) +
              "Each payment counts the students enrolled on its date.",
          ],
          ["Payment", `50% when billing starts on ${c.trialEnd}, then 4 equal instalments of 12.5%, the last by the end of the school year, as in the payment schedule.`],
          [
            "How to pay",
            c.payIn === "sar-bank"
              ? "In Saudi riyals, by bank transfer to the account on the invoice."
              : "The price is in Saudi riyals and paid in Sudanese pounds at the bank rate on the day, by Bankak, to the account on the invoice.",
          ],
          ["Length", `The agreement follows the school year: it runs to ${c.yearEnd} and renews for each following school year unless either side gives written notice 30 days before it ends.`],
          ["Ending", "The agreement ends at non-renewal, by written notice from either side, or if a payment is more than 60 days late after written notice."],
          ["Late payment", "If a payment is more than 30 days late, after written notice, access may be paused. The data is kept."],
          [
            "Data",
            "The school owns its data and can export it at any time. We keep it private and share it with no one. It is kept while the agreement is in force and for 3 months after it ends so the school can export it; then it is deleted automatically and Balqalam is not responsible for it.",
          ],
          ["Annex", "The Technical Annex is part of this agreement. Anything not in it is quoted separately."],
        ].filter(Boolean) as string[][],
      months: (n: number) => (n === 1 ? "one month" : `${n} months`),
      schedule: "Payment schedule",
      scheduleCols: ["#", "Date", "Share", "Amount"],
      estimate: "Amounts are estimated on today's student count; each payment counts the students enrolled on its date.",
      annex: {
        title: "Technical Annex",
        included: "What is included",
        includedRows: [
          ["Platform", "Students and admission, attendance, timetable, grades and exams, fees and invoices, parents' app and portal, announcements and messages, LMS and live classes, reports."],
          ["Address", "A subdomain for the school on balqalam.com."],
          ["Hosting", "Hosting, backups and monitoring."],
          ["Updates", "Updates and security fixes."],
          ["App", "The mobile app."],
        ],
        support: "Support",
        supportText: "By WhatsApp and email, during working hours Sunday to Thursday.",
        supportCols: ["Priority", "First response", "Fix"],
        supportRows: [
          ["Critical: the platform is down", "2 hours", "24 hours"],
          ["Major: a core feature is failing", "1 working day", "3 working days"],
          ["Minor: a display error or a question", "2 working days", "Next scheduled update"],
        ],
        fair: "Live classes, fair use",
        fairText: "Live-class hours a month, by school size:",
        fairCols: ["School size", "Hours a month"],
        fairSizes: ["Up to 250 students", "Up to 500 students", "Above 500 students"],
        hours: (h: string) => `${h} hours`,
        fairMore: "Extra hours are quoted separately.",
        paid: "Paid separately",
        paidRows: [
          ["Custom features for one school"],
          ["Extra live-class hours"],
          ["Importing data beyond the standard student and teacher sheets"],
          ["On-site training"],
        ],
      },
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
      line: (n: number) => (n === 1 ? "Balqalam subscription — first payment, when billing starts" : `Balqalam subscription — instalment ${n - 1} of 4`),
      basis: (students: string, parts: string) => `${students} students: ${parts}`,
      custom: "Own contract",
      total: "Total due",
      payment: "How to pay",
      pay: (p: PayIn) =>
        p === "sar-bank"
          ? "Pay in Saudi riyals, by bank transfer to the account:"
          : "Pay in Sudanese pounds at the bank rate on the day, by Bankak, to the account:",
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
      yearEnd: "School year ends",
      payIn: "Payment method",
      payOptions: { "sar-bank": "Saudi riyals — bank transfer", "sdg-bankak": "Sudanese pounds — Bankak" },
      customSAR: "Agreed amount (SAR)",
      bankAccount: "Transfer account",
      instalment: "Payment",
      issued: "Invoice date",
      download: "Download PDF",
      heading: { contract: "Contract", invoice: "Invoice" },
    },
  },
};

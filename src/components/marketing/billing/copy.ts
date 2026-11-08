// The contract and invoice wording, Arabic first. The clauses are the one-page
// contract in hogwarts content/docs-*/contract.mdx — change them there first.

export const COPY = {
  ar: {
    contract: {
      title: "عقد اشتراك منصة بالقلم",
      intro: "أُبرم هذا العقد بين:",
      provider: "داتابيت (Databayt)",
      providerNote: "مزوّد منصة بالقلم — hi@databayt.org — databayt.org",
      party1: "الطرف الأول",
      party2: "الطرف الثاني",
      clauses: (c: Clause) => [
        ["الخدمة", `منصة بالقلم كاملة على عنوان المدرسة الخاص ${c.host}، مع الدعم الفني والتحديثات طوال مدة العقد.`],
        ["الفترة المجانية", `من ${c.start} حتى ${c.trialEnd} (${c.freeMonths}) دون أي مقابل.`],
        ["السعر", `${c.rate} للطالب في السنة. يُحسب عدد الطلاب المسجّلين في تاريخ كل دفعة. عند ${c.students} طالبًا تكون قيمة السنة ${c.total}.`],
        ["الدفع", "50% عند انتهاء الفترة المجانية، ثم 12.5% كل ثلاثة أشهر، حسب الجدول أدناه."],
        ["طريقة الدفع", "السعر محدد بالدولار ويُدفع بالجنيه السوداني بسعر البنك يوم الدفع، عبر تطبيق بنكك، إلى الحساب المذكور في الفاتورة."],
        ["البيانات", "بيانات المدرسة ملك للمدرسة، ويمكنها تصديرها في أي وقت. نحافظ على سريتها ولا نشاركها مع أي جهة."],
        ["المدة", "سنة واحدة تبدأ بنهاية الفترة المجانية، وتتجدد تلقائيًا ما لم يُخطر أحد الطرفين الآخر كتابيًا قبل 30 يومًا من نهايتها."],
        ["التأخر في الدفع", "إذا تأخرت دفعة أكثر من 30 يومًا وبعد إشعار كتابي، يجوز إيقاف الوصول مؤقتًا. تبقى البيانات محفوظة كاملة."],
      ],
      months: (n: number) => (n === 1 ? "شهر واحد" : n === 2 ? "شهران" : n <= 10 ? `${n} أشهر` : `${n} شهرًا`),
      scheduleTitle: "جدول الدفعات",
      cols: ["الدفعة", "التاريخ", "النسبة", "المبلغ"],
      estimate: "المبالغ تقديرية بعدد الطلاب الحالي، وتُحسب كل دفعة بعدد الطلاب يوم استحقاقها.",
      signFor: (who: string) => `عن ${who}`,
      name: "الاسم",
      signature: "التوقيع",
      date: "التاريخ",
    },
    invoice: {
      title: "فاتورة",
      number: "رقم الفاتورة",
      issued: "تاريخ الإصدار",
      due: "تاريخ الاستحقاق",
      from: "من",
      to: "إلى",
      cols: ["البيان", "الطلاب", "السعر السنوي", "النسبة", "المبلغ"],
      line: (n: number) =>
        n === 1 ? "اشتراك منصة بالقلم — الدفعة الأولى (عند انتهاء الفترة المجانية)" : `اشتراك منصة بالقلم — القسط ${n - 1} من 4`,
      total: "الإجمالي المستحق",
      payTitle: "طريقة الدفع",
      pay: "يُدفع المبلغ بالجنيه السوداني بسعر البنك يوم الدفع، عبر تطبيق بنكك، إلى الحساب:",
      noAccount: "يُرسل رقم الحساب مع الفاتورة",
      ref: (no: string) => `اكتب رقم الفاتورة ${no} في خانة التعليق عند التحويل.`,
      thanks: "شكرًا لثقتكم في بالقلم.",
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
    },
  },
  en: {
    contract: {
      title: "Balqalam Subscription Agreement",
      intro: "This agreement is made between:",
      provider: "Databayt",
      providerNote: "Provider of the Balqalam platform — hi@databayt.org — databayt.org",
      party1: "First party",
      party2: "Second party",
      clauses: (c: Clause) => [
        ["Service", `The whole Balqalam platform at the school's own address, ${c.host}, with support and updates for the length of the agreement.`],
        ["Free period", `From ${c.start} to ${c.trialEnd} (${c.freeMonths}), at no cost.`],
        ["Price", `${c.rate} per student a year, counting the students enrolled on each payment date. At ${c.students} students the year comes to ${c.total}.`],
        ["Payment", "50% when the free period ends, then 12.5% every three months, as in the schedule below."],
        ["How to pay", "The price is fixed in US dollars and paid in Sudanese pounds at the bank rate on the day, by Bankak, to the account on the invoice."],
        ["Data", "The school owns its data and can export it at any time. We keep it private and share it with no one."],
        ["Length", "One year from the end of the free period, renewed automatically unless either side gives written notice 30 days before it ends."],
        ["Late payment", "If a payment is more than 30 days late, after written notice, access may be paused. The data is kept in full."],
      ],
      months: (n: number) => (n === 1 ? "one month" : `${n} months`),
      scheduleTitle: "Payment schedule",
      cols: ["Payment", "Date", "Share", "Amount"],
      estimate: "Amounts are estimated on today's student count; each payment counts the students enrolled on its date.",
      signFor: (who: string) => `For ${who}`,
      name: "Name",
      signature: "Signature",
      date: "Date",
    },
    invoice: {
      title: "Invoice",
      number: "Invoice no.",
      issued: "Issued",
      due: "Due",
      from: "From",
      to: "Bill to",
      cols: ["Description", "Students", "Annual rate", "Share", "Amount"],
      line: (n: number) =>
        n === 1 ? "Balqalam subscription — first payment (end of the free period)" : `Balqalam subscription — instalment ${n - 1} of 4`,
      total: "Total due",
      payTitle: "How to pay",
      pay: "Pay in Sudanese pounds at the bank rate on the day, by Bankak, to the account:",
      noAccount: "Account number sent with this invoice",
      ref: (no: string) => `Write the invoice number ${no} in the transfer note.`,
      thanks: "Thank you for trusting Balqalam.",
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
    },
  },
} as const;

export interface Clause {
  host: string;
  start: string;
  trialEnd: string;
  freeMonths: string;
  rate: string;
  students: number;
  total: string;
}

import { GeistSans } from "geist/font/sans";
import { Github, Globe, Mail, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

// Type matches the English hero (hero.tsx H1_STYLE_EN): Geist 700, -0.04em on the wordmark.
// Physical card: 85 × 55 mm. Sized in mm so the preview and the print share one markup.
const face =
  "relative flex h-[55mm] w-[85mm] shrink-0 overflow-hidden [print-color-adjust:exact] [-webkit-print-color-adjust:exact]";

export const CARD_CONTACTS = [
  { icon: Mail, label: "hi@databayt.org", href: "mailto:hi@databayt.org" },
  { icon: Globe, label: "databayt.org", href: "https://databayt.org" },
  { icon: Github, label: "github.com/databayt", href: "https://github.com/databayt" },
  { icon: MessageCircle, label: "WhatsApp @databayt", href: "https://wa.me/966557721603" },
];

/** The rounded black hexagon from /logo.png, as vector so it prints sharp. */
export function Hexagon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <polygon
        points="50,8 86.4,29 86.4,71 50,92 13.6,71 13.6,29"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="12"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CardFront({ className }: { className?: string }) {
  return (
    <div
      dir="ltr"
      style={{ fontFamily: GeistSans.style.fontFamily }}
      className={cn(face, "flex-col items-center justify-center gap-[3mm] bg-white text-black", className)}
    >
      <Hexagon className="size-[13mm]" />
      <div className="flex flex-col items-center gap-[1mm]">
        <span className="text-[16pt] font-bold leading-none tracking-[-0.04em]">Databayt</span>
        <span className="text-[6.5pt] uppercase leading-none tracking-[0.25em] text-neutral-500">
          Automate the boring
        </span>
      </div>
    </div>
  );
}

export function CardBack({ className }: { className?: string }) {
  return (
    <div
      dir="ltr"
      style={{ fontFamily: GeistSans.style.fontFamily }}
      className={cn(face, "items-center justify-between bg-white px-[7mm] text-black", className)}
    >
      {/* The list spans exactly the QR's height: first line flush with its top, last with its bottom. */}
      <ul className="flex h-[22mm] flex-col justify-between">
        {CARD_CONTACTS.map(({ icon: Icon, label, href }) => (
          <li key={label}>
            <a href={href} className="flex items-center gap-[2mm] text-[8pt] font-medium leading-none !text-black no-underline">
              <Icon className="size-[3.2mm] shrink-0" strokeWidth={1.75} />
              {label}
            </a>
          </li>
        ))}
      </ul>
      {/* eslint-disable-next-line @next/next/no-img-element -- static SVG, must print crisp */}
      <img src="/card/qr.svg" alt="QR code to databayt.org" className="size-[22mm]" />
    </div>
  );
}

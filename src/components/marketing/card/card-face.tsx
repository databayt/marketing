import { GeistSans } from "geist/font/sans";
import { Github, Globe, Linkedin, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

// Physical card: 85 × 55 mm. Sized in mm so the preview and the print share one markup.
const face =
  "relative flex h-[55mm] w-[85mm] shrink-0 overflow-hidden [print-color-adjust:exact] [-webkit-print-color-adjust:exact]";

export const CARD_CONTACTS = [
  { icon: Mail, label: "support@databayt.org", href: "mailto:support@databayt.org" },
  { icon: Globe, label: "databayt.org", href: "https://databayt.org" },
  { icon: Github, label: "github.com/databayt", href: "https://github.com/databayt" },
  { icon: Linkedin, label: "in/databayt-auto", href: "https://www.linkedin.com/company/databayt-auto" },
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
        <span className="text-[15pt] font-semibold leading-none tracking-tight">Databayt</span>
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
      className={cn(face, "items-center justify-between bg-black px-[7mm] text-white", className)}
    >
      <div className="flex flex-col gap-[4mm]">
        <div className="flex items-center gap-[1.5mm]">
          <Hexagon className="size-[4.5mm]" />
          <span className="text-[9pt] font-semibold leading-none tracking-tight">Databayt</span>
        </div>
        <ul className="flex flex-col gap-[1.8mm]">
          {CARD_CONTACTS.map(({ icon: Icon, label, href }) => (
            <li key={label}>
              <a href={href} className="flex items-center gap-[1.8mm] text-[7pt] leading-none !text-white no-underline">
                <Icon className="size-[2.8mm] shrink-0" strokeWidth={1.75} />
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col items-center gap-[1.2mm]">
        {/* eslint-disable-next-line @next/next/no-img-element -- static SVG, must print crisp */}
        <img src="/card/qr.svg" alt="QR code to databayt.org" className="size-[22mm] rounded-[1mm] bg-white" />
        <span className="text-[5.5pt] uppercase leading-none tracking-[0.2em] text-neutral-400">Scan</span>
      </div>
    </div>
  );
}

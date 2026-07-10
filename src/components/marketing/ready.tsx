"use client";

import React, { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
  useReducedMotion,
} from "framer-motion";
import { GradientAnimation } from "@/components/atom/gradient-animation";
import { Button } from "../ui/button";
import type { getDictionary } from "@/components/internationalization/dictionaries";
import type { Locale } from "@/components/internationalization/config";
import { localeConfig } from "@/components/internationalization/config";
import { AppointmentModal } from "./appointment-modal";
import { useRouter } from "next/navigation";

interface ReadyProps {
  dictionary: Awaited<ReturnType<typeof getDictionary>>["marketing"]["ready"];
  params: { lang: Locale };
}

export function Ready({ dictionary, params }: ReadyProps) {
  const t = dictionary;
  const isRTL = localeConfig[params.lang]?.dir === "rtl";
  const [appointmentModalOpen, setAppointmentModalOpen] = useState(false);
  const router = useRouter();

  // Apple education-hero scroll effect: the section sits full-edge (100vw) while
  // it's the focus, then gains horizontal padding + rounded corners — revealing
  // the page background on the sides — as it scrolls up and away. Driven by a
  // clip-path inset() linked to scroll progress, mirroring Apple's sticky hero.
  const sectionRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  // Hold full-bleed through entry + centered, then inset on the way out. The
  // inset is a % of width so it scales across breakpoints (RTL-safe: symmetric).
  const insetX = useTransform(
    scrollYProgress,
    [0, 0.45, 1],
    prefersReducedMotion ? ["0%", "0%", "0%"] : ["0%", "0%", "6%"],
  );
  const radius = useTransform(
    scrollYProgress,
    [0, 0.45, 1],
    prefersReducedMotion ? [0, 0, 0] : [0, 0, 28],
  );
  const clipPath = useMotionTemplate`inset(0px ${insetX} round ${radius}px)`;

  return (
    <motion.div
      ref={sectionRef}
      className="full-bleed-enhanced"
      data-section="ready"
      style={{ clipPath, willChange: "clip-path" }}
    >
      <GradientAnimation height="h-[70vh]">
        <div className="absolute z-50 inset-0 flex items-center justify-center padding-mobile-only py-8 md:py-0">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-primary-foreground dark:invert">
              {t.title}
            </h1>
            <p className="py-4 max-w-2xl mx-auto text-primary-foreground/80 dark:invert">
              {t.description}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4 max-w-xs md:max-w-2xl mx-auto">
              <Button
                size="lg"
                className="bg-background text-primary dark:invert hover:bg-background/80"
                onClick={() => router.push(`/${params.lang}/wizard`)}
              >
                {t.startJourney}
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="bg-transparent text-background border-background dark:invert hover:bg-transparent hover:border-background/70 hover:text-background/70 transition-all"
                onClick={() => setAppointmentModalOpen(true)}
              >
                {t.scheduleMeeting}
              </Button>
            </div>
            {/* <p className="flex items-center justify-center gap-2 text-primary-foreground/80 pt-4">
              <AlertTriangle className="h-4 w-4" />
              Application deadline: March 31st • Rolling admissions available
            </p> */}
          </div>
        </div>
      </GradientAnimation>

      <AppointmentModal
        isOpen={appointmentModalOpen}
        onClose={() => setAppointmentModalOpen(false)}
      />
    </motion.div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { CHATBOT_POSITIONS } from './constant';
import type { ChatButtonProps } from './type';

export function ChatButton({ 
  onClick, 
  isOpen, 
  position = 'bottom-right',
  dictionary 
}: ChatButtonProps) {
  const [shouldInvert, setShouldInvert] = useState(false);

  useEffect(() => {
    const checkSections = () => {
      const button = document.querySelector('[data-chat-button]');
      if (!button) return;

      const buttonRect = button.getBoundingClientRect();
      const buttonCenterY = buttonRect.top + buttonRect.height / 2;

      // Check if button overlaps with dark sections (footer and blue sections)
      const darkSections = document.querySelectorAll(
        '[data-slot="site-footer"], [data-section="sales"], [data-section="ready"], [data-section="ready-to-build"], [data-section="enterprise"]'
      );

      let isOverDarkSection = false;
      darkSections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (buttonCenterY >= rect.top && buttonCenterY <= rect.bottom) {
          isOverDarkSection = true;
        }
      });

      setShouldInvert(isOverDarkSection);
    };

    // Check on mount
    checkSections();

    // Check on scroll
    window.addEventListener('scroll', checkSections);
    window.addEventListener('resize', checkSections);

    return () => {
      window.removeEventListener('scroll', checkSections);
      window.removeEventListener('resize', checkSections);
    };
  }, []);
  
  return (
    <>
      {!isOpen && (
        <Button
          onClick={onClick}
          data-chat-button
          className={cn(
            CHATBOT_POSITIONS[position],
            'hidden md:block z-[9999] transition-all duration-700 ease-in-out',
            'h-12 w-12 md:h-14 md:w-14 p-2 rounded-full',
            'bg-transparent hover:bg-transparent shadow-none border-none',
            'hover:scale-105'
          )}
          aria-label={dictionary.openChat}
          size="icon"
          variant="ghost"
        >
          <Image
            src="/robot.png"
            alt="Chatbot"
            width={56}
            height={56}
            className={cn(
              "h-full w-full object-contain transition-all duration-500",
              shouldInvert && "invert"
            )}
          />
        </Button>
      )}
    </>
  );
}
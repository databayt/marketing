'use client';

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
  
  return (
    <>
      {!isOpen && (
        <Button
          onClick={onClick}
          className={cn(
            CHATBOT_POSITIONS[position],
            'z-50 transition-all duration-300 ease-out',
            'h-16 w-16 p-3 rounded-full',
            'bg-transparent hover:bg-transparent shadow-none border-none',
            'hover:scale-110 active:scale-95'
          )}
          aria-label={dictionary.openChat}
          size="icon"
          variant="ghost"
        >
          <Image
            src="/robot.png"
            alt="Chatbot"
            width={64}
            height={64}
            className="h-full w-full object-contain"
          />
        </Button>
      )}
    </>
  );
}
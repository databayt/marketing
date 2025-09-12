'use client';

import { useState, useRef, useEffect, useCallback, memo } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { CHAT_WINDOW_POSITIONS, CHAT_WINDOW_SIZE } from './constant';
import type { ChatWindowProps } from './type';
import { SendIcon, PriceIcon, TimeIcon, ServicesIcon, InfoIcon, VoiceIcon } from './icons';

export const ChatWindow = memo(function ChatWindow({
  isOpen,
  onClose,
  messages,
  onSendMessage,
  isLoading,
  error,
  locale,
}: ChatWindowProps) {
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const chatWindowRef = useRef<HTMLDivElement>(null);
  const isRTL = locale === 'ar';
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (scrollAreaRef.current) {
      // Use smooth scrolling for better UX
      const scrollElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollElement) {
        scrollElement.scrollTo({
          top: scrollElement.scrollHeight,
          behavior: 'smooth'
        });
      }
    }
  }, [messages]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (chatWindowRef.current && !chatWindowRef.current.contains(event.target as Node) && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input.trim());
      setInput('');
    }
  }, [input, isLoading, onSendMessage]);


  const handleVoiceInput = useCallback(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Speech recognition is not supported in your browser.');
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const SpeechRecognition = (window as unknown as any).webkitSpeechRecognition || (window as unknown as any).SpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.lang = locale === 'ar' ? 'ar-SA' : 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    if (isListening) {
      recognition.stop();
      setIsListening(false);
      return;
    }

    recognition.start();
    setIsListening(true);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recognition.onresult = (event: any) => {
      const speechResult = event.results[0][0].transcript;
      setInput(speechResult);
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
      alert('Speech recognition error. Please try again.');
    };

    recognition.onend = () => {
      setIsListening(false);
    };
  }, [isListening, locale]);

  return (
    <div
      ref={chatWindowRef}
      className={cn(
        CHAT_WINDOW_POSITIONS['bottom-right'],
        CHAT_WINDOW_SIZE.width,
        CHAT_WINDOW_SIZE.height,
        'z-[9999] bg-background border rounded-lg shadow-2xl flex flex-col',
        'transform transition-all duration-700 ease-in-out',
        'sm:origin-bottom-right',
        'max-h-[80vh]',
        isOpen 
          ? 'opacity-100 scale-100 visible' 
          : 'opacity-0 scale-0 invisible pointer-events-none'
      )}
      style={{
        transformOrigin: isMobile ? 'center' : 'bottom right',
        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
      }}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <ScrollArea className="flex-1 px-4 pt-2 pb-1 overflow-y-auto" ref={scrollAreaRef}>
        <div className="h-full flex flex-col">
            {messages.length === 0 ? (
              <div className="flex flex-col h-full">
                <div className="flex-1 flex flex-col items-center justify-center">
                  <p className="mb-6 text-center text-muted-foreground text-sm font-medium">
                    <span className="block">Choose a question</span>
                    <span className="block">or type your message</span>
                  </p>
                  <div className="grid grid-cols-2 gap-2 w-full px-2 max-w-sm">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => onSendMessage("What are your pricing options?")}
                      className="text-xs h-auto py-2.5 px-3 flex items-center gap-2 bg-muted hover:bg-muted/80 border-0"
                    >
                      <PriceIcon size={16} />
                      <span>Pricing</span>
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => onSendMessage("What services do you offer?")}
                      className="text-xs h-auto py-2.5 px-3 flex items-center gap-2 bg-muted hover:bg-muted/80 border-0"
                    >
                      <ServicesIcon size={16} />
                      <span>Services</span>
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => onSendMessage("How long does a project take?")}
                      className="text-xs h-auto py-2.5 px-3 flex items-center gap-2 bg-muted hover:bg-muted/80 border-0"
                    >
                      <TimeIcon size={16} />
                      <span>Timeline</span>
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => onSendMessage("Tell me more about your company")}
                      className="text-xs h-auto py-2.5 px-3 flex items-center gap-2 bg-muted hover:bg-muted/80 border-0"
                    >
                      <InfoIcon size={16} />
                      <span>About Us</span>
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4 pb-2">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={cn(
                      'flex gap-2',
                      message.role === 'user' ? (isRTL ? 'flex-row' : 'flex-row-reverse') : ''
                    )}
                  >
                    {message.role === 'assistant' && (
                      <Avatar className="h-7 w-7 shrink-0">
                        <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                          AI
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <div
                      className={cn(
                        'rounded-lg px-3 py-2 max-w-[80%] break-words',
                        message.role === 'user'
                          ? 'bg-primary text-white ml-auto'
                          : 'bg-muted'
                      )}
                    >
                      <p className={cn("text-sm whitespace-pre-wrap", message.role === 'user' && "text-white")}>{message.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
        </div>
      </ScrollArea>

      {error && (
        <div className="px-4 py-2 bg-destructive/10 text-destructive text-sm">
          {error}
        </div>
      )}

      <div className="px-3 pb-2 pt-1">
          <form onSubmit={handleSubmit} className="flex items-center gap-1">
            <div className="flex-1 flex items-center border rounded-lg px-3 py-1 bg-background">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
                className="flex-1 bg-transparent border-none outline-none text-sm"
                dir={isRTL ? 'rtl' : 'ltr'}
                autoFocus
              />
            </div>
            
            <Button
              type="submit"
              size="icon"
              disabled={!input.trim() || isLoading}
              className="h-14 w-14 p-0 hover:scale-110 transition-transform"
              variant="link"
              title="Send message"
            >
              <SendIcon size={48} className={cn(isRTL && "scale-x-[-1]")} />
            </Button>
            
            <Button
              type="button"
              onClick={handleVoiceInput}
              size="icon"
              variant="link"
              className={cn(
                "h-14 w-14 p-0 -ml-10 hover:scale-110 transition-transform",
                isListening && "text-red-500 animate-pulse"
              )}
              title="Voice input"
            >
              <VoiceIcon size={48} />
            </Button>
          </form>
      </div>
    </div>
  );
});
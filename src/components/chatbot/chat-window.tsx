'use client';

import { useState, useRef, useEffect, useCallback, useMemo, memo } from 'react';
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
  dictionary,
}: ChatWindowProps) {
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const chatWindowRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const isRTL = locale === 'ar';

  // Preconfigured questions — driven by the dictionary so labels and the
  // questions they send are localized (Arabic/RTL aware) instead of hardcoded.
  const quickAskButtons = useMemo(
    () => [
      { label: dictionary.qaPricing, question: dictionary.qaPricingQuestion, icon: PriceIcon },
      { label: dictionary.qaServices, question: dictionary.qaServicesQuestion, icon: ServicesIcon },
      { label: dictionary.qaTimeline, question: dictionary.qaTimelineQuestion, icon: TimeIcon },
      { label: dictionary.qaAbout, question: dictionary.qaAboutQuestion, icon: InfoIcon },
    ],
    [dictionary]
  );

  // Auto focus input when chat opens on desktop
  useEffect(() => {
    if (isOpen && !isMobile && inputRef.current) {
      // Small delay to ensure the window is fully rendered
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen, isMobile]);
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle keyboard visibility on mobile
  useEffect(() => {
    if (!isMobile) return;

    let initialViewportHeight = window.visualViewport?.height || window.innerHeight;
    
    const handleViewportChange = () => {
      const currentHeight = window.visualViewport?.height || window.innerHeight;
      const heightDifference = initialViewportHeight - currentHeight;
      setKeyboardOpen(heightDifference > 150);
    };

    const handleFocus = () => {
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }, 300);
    };

    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleViewportChange);
    } else {
      window.addEventListener('resize', handleViewportChange);
    }

    const inputElement = inputRef.current;
    if (inputElement) {
      inputElement.addEventListener('focus', handleFocus);
    }

    return () => {
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', handleViewportChange);
      } else {
        window.removeEventListener('resize', handleViewportChange);
      }
      if (inputElement) {
        inputElement.removeEventListener('focus', handleFocus);
      }
    };
  }, [isMobile]);

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
      alert(dictionary.speechNotSupported);
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
      alert(dictionary.speechError);
    };

    recognition.onend = () => {
      setIsListening(false);
    };
  }, [isListening, locale, dictionary]);

  return (
    <div
      ref={chatWindowRef}
      className={cn(
        // Mobile: Full screen overlay, Desktop: Bottom right position
        isMobile 
          ? 'fixed inset-0 z-[10000] bg-background flex flex-col'
          : cn(
              CHAT_WINDOW_POSITIONS['bottom-right'],
              CHAT_WINDOW_SIZE.width,
              CHAT_WINDOW_SIZE.height,
              'z-[9999] bg-background border rounded-lg shadow-2xl flex flex-col',
              'max-h-[80vh]'
            ),
        'transform transition-all duration-700 ease-in-out',
        'sm:origin-bottom-right',
        isOpen 
          ? 'opacity-100 scale-100 visible' 
          : 'opacity-0 scale-0 invisible pointer-events-none'
      )}
      style={{
        transformOrigin: isMobile ? 'center' : 'bottom right',
        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
        ...(isMobile && isOpen ? {
          height: keyboardOpen ? '100vh' : '100dvh',
          minHeight: '100vh'
        } : {})
      }}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Mobile Back Arrow Header */}
      {isMobile && (
        <div className="flex items-center justify-start p-4">
          <button
            onClick={onClose}
            className="flex items-center justify-center h-10 w-10 rounded-full hover:bg-accent transition-colors"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className={cn(isRTL && "rotate-180")}
            >
              <path d="m15 18-6-6 6-6"/>
            </svg>
          </button>
        </div>
      )}
      
      <ScrollArea className={cn(
        "flex-1 overflow-y-auto overflow-x-hidden",
        isMobile ? "px-4 pt-2 pb-1" : "px-4 pt-2 pb-1"
      )} ref={scrollAreaRef}>
        <div className="h-full flex flex-col">
            {messages.length === 0 ? (
              <div className="flex flex-col h-full">
                {isMobile ? (
                  <div className="flex-1 flex flex-col items-center justify-end pb-8">
                    <p className="mb-2 text-center text-sm font-medium">
                      {dictionary.welcome}
                    </p>
                    <p className="mb-6 text-center text-muted-foreground text-xs">
                      {dictionary.chooseQuestion}
                    </p>
                    <div className="grid grid-cols-2 gap-2 w-full px-2 max-w-sm">
                      {quickAskButtons.map((btn, i) => (
                        <Button
                          key={i}
                          variant="secondary"
                          size="sm"
                          onClick={() => onSendMessage(btn.question)}
                          className="text-xs h-auto py-2.5 px-3 flex items-center gap-2 bg-muted hover:bg-muted/80 border-0"
                        >
                          <btn.icon size={16} />
                          <span>{btn.label}</span>
                        </Button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-end px-4 pb-8 text-center">
                    <p className="mb-1 text-sm font-medium">{dictionary.welcome}</p>
                    <p className="text-muted-foreground text-xs">
                      {dictionary.chooseQuestion}
                    </p>
                  </div>
                )}
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

      <div 
        className={cn(
          "bg-background",
          isMobile ? "px-3 py-3" : "px-3 pb-2 pt-2",
          isMobile && keyboardOpen && "pb-1"
        )}
        style={{
          ...(isMobile && keyboardOpen ? {
            position: 'fixed',
            bottom: '0',
            left: '0',
            right: '0',
            zIndex: 10001
          } : {})
        }}
      >
          {/* Desktop preconfigured questions */}
          {!isMobile && messages.length === 0 && (
            <div className="mb-3">
              <div className="grid grid-cols-2 gap-2 w-full">
                {quickAskButtons.map((btn, i) => (
                  <Button
                    key={i}
                    variant="secondary"
                    size="sm"
                    onClick={() => onSendMessage(btn.question)}
                    className="text-xs h-auto py-2 px-3 flex items-center gap-2 bg-muted hover:bg-muted/80 border-0"
                  >
                    <btn.icon size={14} />
                    <span>{btn.label}</span>
                  </Button>
                ))}
              </div>
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            {/* Single rounded pill — input with inline voice + send */}
            <div
              className={cn(
                "flex items-center gap-1 rounded-full border border-muted-foreground bg-background",
                isMobile ? "py-1.5 ps-4 pe-1.5" : "py-1 ps-4 pe-1"
              )}
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
                placeholder={dictionary.placeholder}
                className={cn(
                  "min-w-0 flex-1 border-none bg-transparent outline-none placeholder:text-muted-foreground/60",
                  isMobile ? "h-9 text-[16px]" : "h-7 text-sm"
                )}
                dir={isRTL ? 'rtl' : 'ltr'}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                inputMode="text"
              />

              {/* Send — primary filled command button */}
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                aria-label={dictionary.sendMessage}
                title={dictionary.sendMessage}
                className={cn(
                  "flex shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform hover:scale-105 disabled:opacity-40 disabled:hover:scale-100",
                  isMobile ? "h-9 w-9" : "h-7 w-7"
                )}
              >
                <SendIcon size={isMobile ? 18 : 15} className={cn(isRTL && "scale-x-[-1]")} />
              </button>
            </div>
          </form>
      </div>
    </div>
  );
});
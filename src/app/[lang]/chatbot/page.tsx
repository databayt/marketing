"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Send, Mic, DollarSign, Briefcase, Clock, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from '@/lib/use-translations';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { sendMessage as sendMessageAction } from '@/components/chatbot/actions';
import type { CoreMessage } from 'ai';

export default function ChatbotPage() {
  const { t, isRTL } = useTranslations();
  const router = useRouter();
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean }>>([]);
  const [inputValue, setInputValue] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus input on mount
    inputRef.current?.focus();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (text?: string) => {
    const messageText = text || inputValue.trim();
    if (messageText && !isLoading) {
      // Add user message
      const newUserMessage = { text: messageText, isUser: true };
      const updatedMessages = [...messages, newUserMessage];
      setMessages(updatedMessages);
      setInputValue("");
      setIsLoading(true);
      
      try {
        // Convert messages to CoreMessage format for the server action
        const coreMessages: CoreMessage[] = updatedMessages.map(msg => ({
          role: msg.isUser ? 'user' : 'assistant',
          content: msg.text
        }));

        // Call the server action (same as laptop version)
        const result = await sendMessageAction(coreMessages);
        
        if (!result.success) {
          throw new Error(result.error || 'Failed to send message');
        }

        // Add assistant message with actual response
        setMessages(prev => [...prev, { 
          text: result.content || "I couldn't process that request. Please try again.", 
          isUser: false 
        }]);
      } catch (error) {
        console.error('Chat error:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        
        // Add error message
        setMessages(prev => [...prev, { 
          text: `Sorry, there was an error: ${errorMessage}`, 
          isUser: false 
        }]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleVoiceInput = useCallback(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Speech recognition is not supported in your browser.');
      return;
    }

    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.lang = isRTL ? 'ar-SA' : 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    if (isListening) {
      recognition.stop();
      setIsListening(false);
      return;
    }

    recognition.start();
    setIsListening(true);

    recognition.onresult = (event: any) => {
      const speechResult = event.results[0][0].transcript;
      setInputValue(speechResult);
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
      alert('Speech recognition error. Please try again.');
    };

    recognition.onend = () => {
      setIsListening(false);
    };
  }, [isListening, isRTL]);

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="fixed inset-0 bg-background h-screen w-screen overflow-hidden flex flex-col">
      {/* Simple Header with Arrow and Back text */}
      <div className="flex items-center gap-2 p-4 border-b border-border bg-background">
        <button
          onClick={handleGoBack}
          className="flex items-center gap-2 hover:opacity-70 transition-opacity"
        >
          <ArrowLeft className={cn("h-5 w-5", isRTL && "rotate-180")} />
          <span className="text-base font-medium">{t?.common?.back || "Back"}</span>
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4">
        {messages.length === 0 ? (
          <div className="flex flex-col h-full">
            <div className="flex-1 flex flex-col items-center justify-center">
              <p className="mb-6 text-center text-muted-foreground text-sm font-medium">
                Choose a question or type your message
              </p>
              {/* Preconfigured Questions */}
              <div className="grid grid-cols-2 gap-2 w-full px-2 max-w-sm">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleSend("What are your pricing options?")}
                  className="text-xs h-auto py-2.5 px-3 flex items-center gap-2 bg-muted hover:bg-muted/80 border-0"
                >
                  <DollarSign className="h-4 w-4" />
                  <span>Pricing</span>
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleSend("What services do you offer?")}
                  className="text-xs h-auto py-2.5 px-3 flex items-center gap-2 bg-muted hover:bg-muted/80 border-0"
                >
                  <Briefcase className="h-4 w-4" />
                  <span>Services</span>
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleSend("How long does a project take?")}
                  className="text-xs h-auto py-2.5 px-3 flex items-center gap-2 bg-muted hover:bg-muted/80 border-0"
                >
                  <Clock className="h-4 w-4" />
                  <span>Timeline</span>
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleSend("Tell me more about your company")}
                  className="text-xs h-auto py-2.5 px-3 flex items-center gap-2 bg-muted hover:bg-muted/80 border-0"
                >
                  <Info className="h-4 w-4" />
                  <span>About Us</span>
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "flex gap-2",
                  message.isUser ? (isRTL ? "flex-row" : "flex-row-reverse") : ""
                )}
              >
                {!message.isUser && (
                  <Avatar className="h-7 w-7 shrink-0">
                    <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                      AI
                    </AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={cn(
                    "rounded-lg px-3 py-2 max-w-[80%] break-words",
                    message.isUser
                      ? "bg-primary text-primary-foreground ml-auto"
                      : "bg-muted"
                  )}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Area - Always visible at bottom */}
      <div className="border-t border-border bg-background p-3 pb-20">
        <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex items-center gap-2">
          <div className="flex items-center border rounded-lg px-3 bg-background relative flex-1">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isLoading}
              className="w-full bg-transparent border-none outline-none text-[16px] h-10 py-2"
              dir={isRTL ? 'rtl' : 'ltr'}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              inputMode="text"
            />
            {/* Blinking cursor when no input */}
            {!inputValue && (
              <div className="absolute left-3 pointer-events-none">
                <div className="w-0.5 h-5 bg-foreground/60 animate-pulse" 
                     style={{ animation: 'blink 1s infinite' }} />
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-1">
            <Button
              type="submit"
              size="icon"
              disabled={!inputValue.trim() || isLoading}
              className="h-12 w-12 p-0 hover:scale-110 transition-transform shrink-0"
              variant="link"
              title="Send message"
            >
              <Send className={cn("h-6 w-6", isRTL && "scale-x-[-1]")} />
            </Button>
            
            <Button
              type="button"
              onClick={handleVoiceInput}
              size="icon"
              variant="link"
              className={cn(
                "h-12 w-12 p-0 hover:scale-110 transition-transform shrink-0",
                isListening && "text-red-500 animate-pulse"
              )}
              title="Voice input"
            >
              <Mic className="h-6 w-6" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
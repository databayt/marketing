"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Send, Mic } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from '@/lib/use-translations';

export default function ChatbotPage() {
  const { t, isRTL } = useTranslations();
  const router = useRouter();
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean }>>([]);
  const [inputValue, setInputValue] = useState("");
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus input on mount
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    // Detect keyboard open/close using Visual Viewport API
    const handleViewportChange = () => {
      if (window.visualViewport) {
        const keyboardHeight = window.innerHeight - window.visualViewport.height;
        setIsKeyboardOpen(keyboardHeight > 100);
      }
    };

    window.visualViewport?.addEventListener('resize', handleViewportChange);
    return () => {
      window.visualViewport?.removeEventListener('resize', handleViewportChange);
    };
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (inputValue.trim()) {
      setMessages([...messages, { text: inputValue, isUser: true }]);
      setInputValue("");
      // Simulate response
      setTimeout(() => {
        setMessages(prev => [...prev, { text: t?.chatbot?.thinking || "I'm thinking...", isUser: false }]);
      }, 1000);
    }
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="fixed inset-0 bg-background h-screen overflow-hidden flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-background">
        <button
          onClick={handleGoBack}
          className="p-2 hover:bg-accent rounded-lg transition-colors"
        >
          <ArrowLeft className={cn("h-5 w-5", isRTL && "rotate-180")} />
        </button>
        <h1 className="text-lg font-semibold">{t?.chatbot?.title || "Chat Assistant"}</h1>
        <div className="w-9" /> {/* Spacer for centering */}
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 pb-safe">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            <p>{t?.chatbot?.startMessage || "Start a conversation..."}</p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "flex",
                  message.isUser ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "max-w-[80%] px-4 py-2 rounded-2xl",
                    message.isUser
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  )}
                >
                  <p className="text-sm">{message.text}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="border-t border-border bg-background p-4 pb-safe">
        <div className="flex items-center gap-2">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            className="flex-1 bg-muted rounded-full px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            placeholder=""
          />
          {inputValue.trim() ? (
            <button
              onClick={handleSend}
              className="p-3 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors"
            >
              <Send className="h-5 w-5" />
            </button>
          ) : (
            <button className="p-3 bg-muted rounded-full hover:bg-muted/80 transition-colors">
              <Mic className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

'use client';

import { useRef } from 'react';
import SiteHeader from "@/components/template/site-header/content";
import SiteFooter from "@/components/template/site-footer/content";
import { ChatbotContent } from "@/components/chatbot";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const chatbotRef = useRef<{ openChat: () => void }>(null);

  const handleChatClick = () => {
    // This will be called from the mobile header button
    if (chatbotRef.current?.openChat) {
      chatbotRef.current.openChat();
    }
  };

  return (
    <div data-slot="site-layout" className="min-h-screen flex flex-col">
      <SiteHeader onChatClick={handleChatClick} />
      <main 
        data-slot="main-content"
        role="main"
        className="flex-1"
      >
        {children}
      </main>
      <SiteFooter />
      <ChatbotContent ref={chatbotRef} />
    </div>
  );
}
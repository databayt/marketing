'use client';

import { useRef } from 'react';
import { usePathname } from 'next/navigation';
import SiteHeader from "@/components/template/site-header/content";
import SiteFooter from "@/components/template/site-footer/content";
import ReadyToBuildSection from "@/components/marketing/ready-to-build";
import { ChatbotContent } from "@/components/chatbot";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const chatbotRef = useRef<{ openChat: () => void }>(null);
  const pathname = usePathname();
  // Home is just the locale segment (e.g. /en, /ar) — show the testimonial band
  // above the footer there only; other marketing pages get the footer alone.
  const isHome = pathname.split('/').filter(Boolean).length === 1;

  const handleChatClick = () => {
    // This will be called from the mobile header button
    console.log('handleChatClick called', { chatbotRef: chatbotRef.current });
    if (chatbotRef.current?.openChat) {
      console.log('Opening chat...');
      chatbotRef.current.openChat();
    } else {
      console.warn('Chat ref or openChat method not available');
    }
  };

  return (
    <div data-slot="site-layout" className="min-h-screen flex flex-col">
      <SiteHeader onChatClick={handleChatClick} />
      <main 
        data-slot="main-content"
        role="main"
        className="flex-1"
        style={{
          WebkitOverflowScrolling: 'touch',
          overscrollBehavior: 'none'
        }}
      >
        {children}
      </main>
      <SiteFooter prefooter={isHome ? <ReadyToBuildSection /> : null} />
      <ChatbotContent ref={chatbotRef} />
    </div>
  );
}
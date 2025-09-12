import SiteHeader from "@/components/template/site-header/content";
import SiteFooter from "@/components/template/site-footer/content";
import { ChatbotContent } from "@/components/chatbot";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div data-slot="site-layout" className="min-h-screen flex flex-col">
      <SiteHeader />
      <main 
        data-slot="main-content"
        role="main"
        className="flex-1"
      >
        {children}
      </main>
      <SiteFooter />
      <ChatbotContent />
    </div>
  );
}
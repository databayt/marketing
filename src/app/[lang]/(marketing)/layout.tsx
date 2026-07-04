import SiteHeader from "@/components/template/site-header/content";
import SiteFooter from "@/components/template/site-footer/content";
import { LazyChatbot } from "@/components/chatbot/lazy";

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
        style={{
          WebkitOverflowScrolling: "touch",
          overscrollBehavior: "none",
        }}
      >
        {children}
      </main>
      <SiteFooter />
      <LazyChatbot />
    </div>
  );
}

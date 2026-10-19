import type { Metadata } from "next";

// The full-screen chat is an app surface, not a landing page.
export const metadata: Metadata = {
  title: "Chat",
  robots: { index: false, follow: true },
};

export default function ChatbotLayout({ children }: { children: React.ReactNode }) {
  return children;
}

"use client";

import dynamic from "next/dynamic";

const ChatbotContent = dynamic(
  () => import("./content").then((m) => ({ default: m.ChatbotContent })),
  {
    ssr: false,
    loading: () => null,
  }
);

export function LazyChatbot() {
  return <ChatbotContent />;
}

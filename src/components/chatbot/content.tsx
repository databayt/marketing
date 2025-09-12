'use client';

import { useEffect } from 'react';
import { useChatbot } from './use-chatbot';
import { ChatButton } from './chat-button';
import { ChatWindow } from './chat-window';
import { DEFAULT_CONFIG, DEFAULT_DICTIONARY } from './constant';
import type { ChatbotProps, ChatbotDictionary } from './type';
import { useLocale } from '@/components/internationalization/use-locale';

interface ChatbotContentProps extends ChatbotProps {
  dictionary: Partial<ChatbotDictionary>;
}

export function ChatbotContent({ 
  config = DEFAULT_CONFIG,
  onMessageSend,
  onChatOpen,
  onChatClose,
  dictionary = {},
}: ChatbotContentProps) {
  const { locale } = useLocale();
  const chatbotConfig = { ...DEFAULT_CONFIG, ...config, locale: locale as 'en' | 'ar' };
  const fullDictionary = { ...DEFAULT_DICTIONARY, ...dictionary } as ChatbotDictionary;
  
  const {
    state,
    toggleChat,
    closeChat,
    sendMessage,
  } = useChatbot();

  useEffect(() => {
    if (state.isOpen && onChatOpen) {
      onChatOpen();
    } else if (!state.isOpen && onChatClose) {
      onChatClose();
    }
  }, [state.isOpen, onChatOpen, onChatClose]);

  const handleSendMessage = async (message: string) => {
    await sendMessage(message);
    if (onMessageSend) {
      onMessageSend(message);
    }
  };


  return (
    <>
      <ChatButton
        onClick={toggleChat}
        isOpen={state.isOpen}
        position={chatbotConfig.position}
        locale={chatbotConfig.locale}
        dictionary={fullDictionary}
      />
      
      <ChatWindow
        isOpen={state.isOpen}
        onClose={closeChat}
        messages={state.messages}
        onSendMessage={handleSendMessage}
        isLoading={state.isLoading}
        error={state.error}
        placeholder={chatbotConfig.placeholder}
        locale={chatbotConfig.locale}
        dictionary={fullDictionary}
      />
    </>
  );
}
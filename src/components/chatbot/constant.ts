import type { ChatbotConfig, ChatbotDictionary, ChatbotTheme } from './type';

export const CHATBOT_POSITIONS = {
  'bottom-right': 'fixed bottom-1 right-1 sm:bottom-2 sm:right-2',
  'bottom-left': 'fixed bottom-1 left-1 sm:bottom-2 sm:left-2',
  'top-right': 'fixed top-1 right-1 sm:top-2 sm:right-2',
  'top-left': 'fixed top-1 left-1 sm:top-2 sm:left-2',
} as const;

export const CHAT_WINDOW_POSITIONS = {
  'bottom-right': 'fixed inset-x-4 top-1/2 -translate-y-1/2 sm:inset-x-auto sm:translate-y-0 sm:bottom-4 sm:right-2 sm:top-auto',
  'bottom-left': 'fixed inset-x-4 top-1/2 -translate-y-1/2 sm:inset-x-auto sm:translate-y-0 sm:bottom-4 sm:left-2 sm:top-auto',
  'top-right': 'fixed inset-x-4 top-1/2 -translate-y-1/2 sm:inset-x-auto sm:translate-y-0 sm:top-20 sm:right-2',
  'top-left': 'fixed inset-x-4 top-1/2 -translate-y-1/2 sm:inset-x-auto sm:translate-y-0 sm:top-20 sm:left-2',
} as const;

export const CHAT_WINDOW_SIZE = {
  width: 'w-auto sm:w-80',
  height: 'h-[400px] sm:h-[450px]',
  maxHeight: 'max-h-[80vh] sm:max-h-[80vh]',
} as const;

export const DEFAULT_DICTIONARY: ChatbotDictionary = {
  openChat: 'Open chat',
  closeChat: 'Close chat',
  placeholder: 'Type your message...',
  welcomeMessage: 'Hello! How can I help you today?',
  noMessages: 'No messages yet. Start a conversation!',
  errorMessage: 'Sorry, something went wrong. Please try again.',
  typing: 'Typing...',
  send: 'Send',
  retry: 'Retry',

  // Empty-state welcome + command-area labels
  welcome: 'Welcome to databayt',
  chooseQuestion: 'A great journey is about to begin.',
  sendMessage: 'Send message',
  voiceInput: 'Voice input',
  speechNotSupported: 'Speech recognition is not supported in your browser.',
  speechError: 'Speech recognition error. Please try again.',

  // Quick-ask buttons (label + the question each one sends)
  qaPricing: 'Pricing',
  qaPricingQuestion: 'What are your pricing options?',
  qaServices: 'Services',
  qaServicesQuestion: 'What services do you offer?',
  qaTimeline: 'Timeline',
  qaTimelineQuestion: 'How long does a project take?',
  qaAbout: 'About Us',
  qaAboutQuestion: 'Tell me more about your company',
};

/**
 * Arabic overrides. The chatbot is mounted as a self-contained client
 * component (see (marketing)/layout.tsx) without the server i18n dictionary,
 * so it carries its own en/ar strings rather than importing the full ~70KB
 * site dictionaries into the client bundle. `content.tsx` merges these over
 * DEFAULT_DICTIONARY when the active locale is Arabic.
 */
export const DICTIONARY_AR: Partial<ChatbotDictionary> = {
  openChat: 'افتح المحادثة',
  closeChat: 'إغلاق المحادثة',
  placeholder: 'اكتب رسالتك...',
  welcome: 'مرحباً بك في databayt',
  chooseQuestion: 'رحلة عظيمة على وشك أن تبدأ.',
  sendMessage: 'إرسال',
  voiceInput: 'إدخال صوتي',
  speechNotSupported: 'التعرف على الصوت غير مدعوم في متصفحك.',
  speechError: 'حدث خطأ في التعرف على الصوت. حاول مرة أخرى.',
  qaPricing: 'الأسعار',
  qaPricingQuestion: 'ما هي خيارات الأسعار لديكم؟',
  qaServices: 'الخدمات',
  qaServicesQuestion: 'ما الخدمات التي تقدمونها؟',
  qaTimeline: 'المدة',
  qaTimelineQuestion: 'كم يستغرق المشروع؟',
  qaAbout: 'عن الشركة',
  qaAboutQuestion: 'أخبرني المزيد عن شركتكم',
};

export const DEFAULT_THEME: ChatbotTheme = {
  primaryColor: 'hsl(var(--primary))',
  backgroundColor: 'hsl(var(--background))',
  textColor: 'hsl(var(--foreground))',
  borderRadius: '0.5rem',
  fontFamily: 'inherit',
  buttonSize: 'lg',
  windowWidth: 'w-full sm:w-96',
  windowHeight: 'h-[400px] sm:h-[450px]',
  shadowLevel: 'xl',
};

export const DEFAULT_CONFIG: Required<ChatbotConfig> = {
  position: 'bottom-right',
  welcomeMessage: 'Hello! How can I help you today?',
  placeholder: 'Type your message...',
  title: 'Chat Support',
  subtitle: 'We\'re here to help',
  locale: 'en',
  dictionary: DEFAULT_DICTIONARY,
  theme: DEFAULT_THEME,
  avatar: '/robot.png',
  api: {
    endpoint: '/api/chat',
    model: 'llama-3.1-8b-instant',
    systemPrompt: 'You are a helpful assistant.',
    maxTokens: 1000,
    temperature: 0.7,
    headers: {},
  },
  enableTypingIndicator: true,
  enableTimestamps: false,
  enableSounds: false,
  enablePersistence: false,
  autoOpen: false,
  autoOpenDelay: 3000,
  maxMessages: 100,
  storageKey: 'chatbot-messages',
};

export const BUTTON_SIZES = {
  sm: 'h-12 w-12 p-2',
  md: 'h-14 w-14 p-3',
  lg: 'h-16 w-16 p-3',
} as const;

export const ICON_SIZES = {
  sm: 'h-6 w-6',
  md: 'h-7 w-7',
  lg: 'h-8 w-8',
} as const;

export const SHADOW_LEVELS = {
  none: 'shadow-none',
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
  xl: 'shadow-2xl',
} as const;

export const ANIMATION_DURATION = 200;
export const MAX_MESSAGE_LENGTH = 1000;
export const TYPING_INDICATOR_DELAY = 1000;
// Centralized icon exports for better tree shaking and bundle optimization
// Only the icons actually used in the app are imported and re-exported

export {
  // Navigation & UI
  ArrowLeft,
  ArrowRight,
  ChevronDownIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  X,
  XIcon,
  
  // Forms & Interaction
  CheckIcon,
  CircleIcon,
  Send,
  Mic,
  
  // Theme & Settings
  MoonIcon,
  SunIcon,
  Languages,
  
  // Business & Content
  DollarSign,
  Briefcase,
  Clock,
  Info,
  Check,
  CircleCheck,
  VideoIcon,
  Play,
  
  // Alerts & Status
  Lightbulb,
} from "lucide-react";

// Re-export the Icon type for TypeScript
export type { Icon } from "lucide-react";
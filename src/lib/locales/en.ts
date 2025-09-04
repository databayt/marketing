export const en = {
  common: {
    loading: "Loading...",
    error: "Something went wrong",
    success: "Success",
    cancel: "Cancel",
    save: "Save",
    edit: "Edit",
    delete: "Delete",
    confirm: "Confirm",
    back: "Back",
    next: "Next",
    previous: "Previous",
    home: "Home",
    about: "About",
    contact: "Contact",
    services: "Services",
    pricing: "Pricing",
    login: "Login",
    register: "Register",
    logout: "Logout",
    profile: "Profile",
    settings: "Settings",
    search: "Search",
    language: "Language",
    theme: "Theme",
    light: "Light",
    dark: "Dark",
    system: "System",
    platform: "Platform",
    brandName: "Databayt",
  },
  navigation: {
    menu: "Menu",
    close: "Close",
    toggleMenu: "Toggle menu",
  },
  auth: {
    signIn: "Sign In",
    signUp: "Sign Up",
    signOut: "Sign Out",
    email: "Email",
    password: "Password",
    confirmPassword: "Confirm Password",
    forgotPassword: "Forgot Password?",
    resetPassword: "Reset Password",
    createAccount: "Create Account",
    alreadyHaveAccount: "Already have an account?",
    dontHaveAccount: "Don't have an account?",
    enterEmail: "Enter your email",
    enterPassword: "Enter your password",
    welcomeBack: "Welcome back",
    createNewAccount: "Create a new account",
  },
  marketing: {
    hero: {
      title: "Automate the boring,\nelevate the wondrous",
      titleMobile: "Automate the boring,\nelevate the wondrous",
      subtitle: "Every great brand grows from the right design. We craft elegant, functional, and impactful experiences that connect with people and inspire lasting engagement.",
      appointment: "Appointment",
      services: "Services",
    },
    features: {
      title: "Features",
      subtitle: "Everything you need to build your next project",
    },
    pricing: {
      title: "Pricing",
      subtitle: "Choose the plan that works for you",
      monthly: "Monthly",
      yearly: "Yearly",
      free: "Free",
      pro: "Pro",
      enterprise: "Enterprise",
    },
    logoCloud: {
      trustedBy: "Trusted by amazing clients",
    },
    parallax: {
      design: "Design",
      automate: "Automate", 
      analytics: "Analytics",
      efficient: "Efficient"
    },
    ready: {
      title: "Ready to begin a journey of wonder?",
      description: "Every great brand started with a single step. Take yours today and join hundreds of brands who have wrote their story in our magical world of design.",
      startJourney: "Let the journey begin",
      scheduleMeeting: "Schedule a Meeting"
    },
    projects: {
      mkan: {
        title: "Mkan",
        description: "Airbnb like Real estate, diversity of properties and hotels",
        category: "Real Estate Platform"
      },
      hogwarts: {
        title: "Hogwarts",
        description: "Organization automation, attendance, exams, grades and more",
        category: "Education System"
      },
      nmbd: {
        title: "NMBD",
        description: "National movement for building & development",
        category: "Development Organization"
      }
    },
    featureCards: {
      discovery: {
        title: "Discovery",
        subtitle: "& Research"
      },
      design: {
        title: "Design",
        subtitle: "& Prototyping"
      },
      development: {
        title: "Development",
        subtitle: "& Testing"
      },
      launch: {
        title: "Launch",
        subtitle: "& Support"
      }
    },
    content: {
      storyTeller: {
        logo: "Story TELLER",
        title: "AI Story Generation",
        description: "Transform your ideas into compelling stories with our talented storytelling team. Create engaging narratives, scripts, and content that captivates your audience.",
        ctaText: "Start Writing",
        secondaryCtaText: "Learn More"
      },
      dreamMachine: {
        logo: "Dream MACHINE",
        title: "AI-Powered Video Creation",
        description: "Bring your ideas to life — ideate, visualize, and design unique themes with ease. Share your dreams with the world using our intuitive wizard.",
        ctaText: "Try Now",
        secondaryCtaText: "Get Expert"
      },
      codebase: {
        logo: "CODEBASE",
        title: "AI Story Generation",
        description: "Automate the boring. at Databayt we're building codebase for business automation.",
        ctaText: "Databayt",
        secondaryCtaText: "Codebase"
      },
      acme: {
        logo: "ACME",
        title: "AI-Powered Video Creation",
        description: "Company automation. managing projects, auto-generate reports, calculations, and docs",
        ctaText: "Live Preview",
        secondaryCtaText: "Get App"
      }
    },
  },
  footer: {
    copyright: "All rights reserved",
    poweredBy: "Powered by",
  },
  errors: {
    notFound: "Page Not Found",
    serverError: "Something went wrong",
    unauthorized: "You are not authorized to access this page",
  },
} as const;

export type TranslationKeys = typeof en;
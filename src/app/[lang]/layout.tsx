import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Rubik } from "next/font/google";
import "../globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/atom/theme-provider";
import { ImageKitProvider } from "@/components/ui/imagekit-provider";
import { Toaster } from "sonner";
import { getDictionary } from "@/components/internationalization/dictionaries";
import { i18n, type Locale, localeConfig } from "@/components/internationalization/config";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

function resolveLocale(rawLang: string): Locale {
  return (i18n.locales as readonly string[]).includes(rawLang)
    ? (rawLang as Locale)
    : i18n.defaultLocale;
}

// Configure Rubik font for Arabic
const rubik = Rubik({
  subsets: ['arabic', 'latin'],
  display: 'swap',
  variable: '--font-rubik',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = resolveLocale(rawLang);
  const dict = await getDictionary(lang);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://databayt.org';

  return {
    title: dict.metadata.title,
    description: dict.metadata.description,
    icons: {
      icon: '/logo.png',
      shortcut: '/logo.png',
      apple: '/logo.png',
    },
    openGraph: {
      title: dict.metadata.title,
      description: dict.metadata.description,
      locale: lang,
      alternateLocale: lang === 'en' ? 'ar' : 'en',
      images: [
        {
          url: `${baseUrl}/logo.png`,
          width: 512,
          height: 512,
          alt: 'Databayt',
        },
      ],
    },
    twitter: {
      card: 'summary',
      title: dict.metadata.title,
      description: dict.metadata.description,
      images: [`${baseUrl}/logo.png`],
    },
    alternates: {
      languages: {
        en: `${baseUrl}/en`,
        ar: `${baseUrl}/ar`,
        'x-default': `${baseUrl}/en`,
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const [{ lang: rawLang }, session] = await Promise.all([params, auth()]);
  const lang = resolveLocale(rawLang);
  const config = localeConfig[lang];
  const isRTL = config.dir === 'rtl';

  return (
    <html lang={lang} dir={config.dir}>
      <body
        className={cn(
          "font-sans antialiased",
          isRTL ? rubik.className : GeistSans.className,
          GeistMono.variable,
          rubik.variable
        )}
      >
        <SessionProvider session={session}>
          <ThemeProvider>
            <ImageKitProvider>
              <div className="layout-container">
                <Toaster position={isRTL ? "bottom-left" : "bottom-right"} />
                {children}
              </div>
            </ImageKitProvider>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}

// Generate static params for all supported locales
export function generateStaticParams() {
  return Object.keys(localeConfig).map((lang) => ({ lang }));
}
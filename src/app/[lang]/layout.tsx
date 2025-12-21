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
import { type Locale, localeConfig } from "@/components/internationalization/config";
// import { SessionProvider } from "next-auth/react";
// import { auth } from "@/auth";

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
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3001';

  return {
    title: dict.metadata.title,
    description: dict.metadata.description,
    openGraph: {
      title: dict.metadata.title,
      description: dict.metadata.description,
      locale: lang,
      alternateLocale: lang === 'en' ? 'ar' : 'en',
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
  params: Promise<{ lang: Locale }>;
}>) {
  // const session = await auth();
  const { lang } = await params;
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
        {/* <SessionProvider session={session}> */}
         
            <ThemeProvider>
              <ImageKitProvider>
                <div className="layout-container">
                  <Toaster position={isRTL ? "bottom-left" : "bottom-right"} />
                  
                  {children}
                </div>
              </ImageKitProvider>
            </ThemeProvider>
          
        {/* </SessionProvider> */}
      </body>
    </html>
  );
}

// Generate static params for all supported locales
export function generateStaticParams() {
  return Object.keys(localeConfig).map((lang) => ({ lang }));
}
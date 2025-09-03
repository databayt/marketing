import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "../globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/atom/theme-provider";
import { ImageKitProvider } from "@/components/ui/imagekit-provider";
import { Toaster } from "sonner";
import { getTranslations, type Locale } from "@/lib/locales";
import { getDictionary } from "@/lib/dictionaries";
// import { SessionProvider } from "next-auth/react";
// import { auth } from "@/auth";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3001';
  
  return {
    title: dict.metadata.title,
    description: dict.metadata.description,
    openGraph: {
      title: dict.metadata.title,
      description: dict.metadata.description,
      locale: locale,
      alternateLocale: locale === 'en' ? 'ar' : 'en',
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
  params: Promise<{ locale: Locale }>;
}>) {
  // const session = await auth();
  const { locale } = await params;
  const isRTL = locale === 'ar';
  
  return (
    <html lang={locale} dir={isRTL ? 'rtl' : 'ltr'}>
      <body
        className={cn(
          "font-sans antialiased",
          GeistSans.className,
          GeistMono.variable
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
  return [
    { locale: 'en' },
    { locale: 'ar' },
  ];
}
import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import localFont from "next/font/local";
import { Rubik, Source_Serif_4 } from "next/font/google";
import "../globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/atom/theme-provider";
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

// Source Serif 4 powers the Medium-style reading experience on the blog (LTR).
// Not preloaded: no first-paint text uses it, so it shouldn't compete with the
// critical path on every page.
const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-serif',
  preload: false,
});

// Geist Mono as `geist/font/mono` declares it, minus the preload: only code
// snippets and coupon codes use it.
const geistMono = localFont({
  src: "../../../node_modules/geist/dist/fonts/geist-mono/GeistMono-Variable.woff2",
  variable: "--font-geist-mono",
  adjustFontFallback: false,
  fallback: ["ui-monospace", "SFMono-Regular", "Roboto Mono", "Menlo", "Monaco", "Liberation Mono", "DejaVu Sans Mono", "Courier New", "monospace"],
  weight: "100 900",
  preload: false,
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
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://databayt.org';

  return {
    title: dict.metadata.title,
    description: dict.metadata.description,
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: 'any' },
        { url: '/logo.png', type: 'image/png', sizes: '256x256' },
      ],
      shortcut: '/favicon.ico',
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
          geistMono.variable,
          rubik.variable,
          sourceSerif.variable
        )}
      >
        {/* <SessionProvider session={session}> */}
         
            <ThemeProvider>
              <div className="layout-container">
                <Toaster position={isRTL ? "bottom-left" : "bottom-right"} />

                {children}
              </div>
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
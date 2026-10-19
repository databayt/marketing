import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Rubik, Source_Serif_4 } from "next/font/google";
import "../globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/atom/theme-provider";
import { ImageKitProvider } from "@/components/ui/imagekit-provider";
import { Toaster } from "sonner";
import { getDictionary } from "@/components/internationalization/dictionaries";
import { type Locale, localeConfig } from "@/components/internationalization/config";
import { LoadingWrapper } from "@/components/marketing/loading";
import { OG_LOCALE, ogImages, SITE_NAME, SITE_URL } from "@/lib/seo";
import { JsonLd, organizationJsonLd, websiteJsonLd } from "@/components/atom/json-ld";
// import { SessionProvider } from "next-auth/react";
// import { auth } from "@/auth";

// Configure Rubik font for Arabic
const rubik = Rubik({
  subsets: ['arabic', 'latin'],
  display: 'swap',
  variable: '--font-rubik',
});

// Source Serif 4 powers the Medium-style reading experience on the blog (LTR)
const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-serif',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#00bc6d',
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const { title, titleTemplate, description } = dict.metadata;

  // Site-wide defaults only. Canonical, hreflang and og:url are per page
  // (lib/seo pageMetadata) so a page without them never inherits the home URL.
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: title, template: titleTemplate },
    description,
    applicationName: SITE_NAME,
    robots: { index: true, follow: true },
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: 'any' },
        { url: '/logo.png', type: 'image/png', sizes: '256x256' },
      ],
      shortcut: '/favicon.ico',
      apple: '/logo.png',
    },
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      locale: OG_LOCALE[lang],
      title,
      description,
      images: ogImages(lang),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ogImages(lang).map((i) => i.url),
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
          rubik.variable,
          sourceSerif.variable
        )}
      >
        <JsonLd data={[organizationJsonLd(), websiteJsonLd(lang)]} />
        {/* <SessionProvider session={session}> */}
         
            <ThemeProvider>
              <ImageKitProvider>
                <div className="layout-container">
                  <Toaster position={isRTL ? "bottom-left" : "bottom-right"} />

                  <LoadingWrapper>{children}</LoadingWrapper>
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
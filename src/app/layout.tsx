import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/atom/theme-provider";
import { ImageKitProvider } from "@/components/ui/imagekit-provider";
import { Toaster } from "sonner";
// import { SessionProvider } from "next-auth/react";
// import { auth } from "@/auth";



export const metadata: Metadata = {
  title: "Databayt",
  description: "Web design ",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const session = await auth();
  
  return (
    <html lang="en">
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
                  <Toaster position="bottom-right" />
                  
                  {children}
                </div>
              </ImageKitProvider>
            </ThemeProvider>
          
        {/* </SessionProvider> */}
      </body>
    </html>
  );
}

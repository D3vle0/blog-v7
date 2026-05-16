import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Devleo's Blog",
  description: "A premium tech blog built with Next.js and Shadcn UI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="flex-1 w-full max-w-screen-xl mx-auto px-4 sm:px-8 py-8 md:py-12">
            {children}
          </main>
          <footer className="border-t border-border/40 py-6">
            <div className="container flex items-center justify-center mx-auto px-4 sm:px-8">
              <p className="text-center text-sm leading-loose text-muted-foreground">
                © 2026 Devleo's Blog · made by @D3vle0 with ❤️
              </p>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}

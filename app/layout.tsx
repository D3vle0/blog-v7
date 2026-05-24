import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";
import { ListTracker } from "@/components/ListTracker";

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
  description: "정보보안, AI, 블록체인, 프로그래밍을 공부하는 학생입니다.\n현재 U.S. 8th Army에서 KATUSA로 군복무 중입니다.",
  openGraph: {
    title: "Devleo's Blog",
    description: "정보보안, AI, 블록체인, 프로그래밍을 공부하는 학생입니다.\n현재 U.S. 8th Army에서 KATUSA로 군복무 중입니다.",
    url: "https://devleo.us",
    siteName: "Devleo's Blog",
    images: [
      {
        url: "/icon.jpg",
        width: 800,
        height: 800,
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Devleo's Blog",
    description: "정보보안, AI, 블록체인, 프로그래밍을 공부하는 학생입니다.\n현재 U.S. 8th Army에서 KATUSA로 군복무 중입니다.",
    images: ["/icon.jpg"],
  },
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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Google+Sans+Flex:opsz,wght@6..144,1..1000&display=swap" rel="stylesheet" />
      </head>
      <body suppressHydrationWarning className="min-h-full flex flex-col bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <ListTracker />
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

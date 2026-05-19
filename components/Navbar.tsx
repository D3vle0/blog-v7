import Link from "next/link";
import Image from "next/image";
import { Tag } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { ScrollProgressBar } from "./ScrollProgressBar";
import NavbarSearch from "./NavbarSearch";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40">
      <div className="absolute inset-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 -z-10"></div>
      <div className="container relative z-10 flex h-14 max-w-screen-2xl items-center mx-auto px-4 sm:px-8">
        <div className="mr-4 flex items-center gap-6">
          <Link href="/" className="mr-2 flex items-center space-x-2 shrink-0">
            <Image
              src="/icon.jpg"
              alt="Logo"
              width={32}
              height={32}
              sizes="32px"
              className="w-8 h-8 rounded-full object-cover"
              loading="eager"
            />
            <span className="site-title font-bold inline-block text-xl">Devleo's Blog</span>
          </Link>
          <nav className="flex items-center space-x-4 text-base font-medium">
            <Link href="/" className="hidden sm:inline-block transition-colors hover:text-foreground/80 text-foreground/60">Home</Link>
            <Link href="/tags" className="hidden sm:inline-block transition-colors hover:text-foreground/80 text-foreground/60">Tags</Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end">
          <div className="flex items-center gap-2 sm:gap-4">
            <Button
              asChild
              variant="ghost"
              size="icon"
              className="sm:hidden text-muted-foreground hover:text-foreground"
              title="Tags"
            >
              <Link href="/tags" aria-label="Tags">
                <Tag className="h-[22px] w-[22px]" />
              </Link>
            </Button>
            <NavbarSearch />
            <ThemeToggle />
          </div>
        </div>
      </div>
      <ScrollProgressBar />
    </header>
  );
}

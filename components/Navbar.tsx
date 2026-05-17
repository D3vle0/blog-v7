import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { ScrollProgressBar } from "./ScrollProgressBar";
import NavbarSearch from "./NavbarSearch";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40">
      <div className="absolute inset-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 -z-10"></div>
      <div className="container relative z-10 flex h-14 max-w-screen-2xl items-center mx-auto px-4 sm:px-8">
        <div className="mr-4 flex items-center gap-6">
          <Link href="/" className="mr-2 flex items-center space-x-2 shrink-0">
            <img src="/icon.jpg" alt="Logo" className="w-8 h-8 rounded-full object-cover" />
            <span className="site-title font-bold inline-block text-xl">Devleo's Blog</span>
          </Link>
          <nav className="flex items-center space-x-4 text-base font-medium">
            <Link href="/" className="transition-colors hover:text-foreground/80 text-foreground/60">Home</Link>
            <Link href="/tags" className="transition-colors hover:text-foreground/80 text-foreground/60">Tags</Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <NavbarSearch />
          <nav className="flex items-center space-x-2">
            <ThemeToggle />
          </nav>
        </div>
      </div>
      <ScrollProgressBar />
    </header>
  );
}

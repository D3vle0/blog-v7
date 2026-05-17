import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { ScrollProgressBar } from "./ScrollProgressBar";
import { Search } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center mx-auto px-4 sm:px-8">
        <div className="mr-4 flex items-center gap-6">
          <Link href="/" className="mr-2 flex items-center space-x-2 shrink-0">
            <img src="/icon.jpg" alt="Logo" className="w-8 h-8 rounded-full object-cover" />
            <span className="font-bold inline-block text-xl">Devleo's Blog</span>
          </Link>
          <nav className="flex items-center space-x-4 text-base font-medium">
            <Link href="/" className="transition-colors hover:text-foreground/80 text-foreground/60">Home</Link>
            <Link href="/tags" className="transition-colors hover:text-foreground/80 text-foreground/60">Tags</Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <form action="/search" method="GET" className="relative w-full max-w-[160px] sm:max-w-[220px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              name="q"
              placeholder="검색..."
              className="w-full rounded-full border border-border/50 bg-muted/40 py-1.5 pl-9 pr-4 text-sm outline-none transition-all placeholder:text-muted-foreground/75 focus:border-foreground/40 focus:bg-background focus:ring-1 focus:ring-foreground/20"
            />
          </form>
          <nav className="flex items-center space-x-2">
            <ThemeToggle />
          </nav>
        </div>
      </div>
      <ScrollProgressBar />
    </header>
  );
}

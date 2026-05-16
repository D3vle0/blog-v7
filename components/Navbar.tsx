import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { ScrollProgressBar } from "./ScrollProgressBar";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center mx-auto px-4 sm:px-8">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <img src="/icon.jpg" alt="Logo" className="w-8 h-8 rounded-full object-cover" />
            <span className="font-bold sm:inline-block text-xl">Devleo's Blog</span>
          </Link>
          <nav className="flex items-center space-x-6 text-base font-medium">
            <Link href="/" className="transition-colors hover:text-foreground/80 text-foreground/60">Home</Link>
            <Link href="https://github.com/D3vle0" className="transition-colors hover:text-foreground/80 text-foreground/60">Github</Link>
            <Link href="https://huggingface.co/d3vle0" className="transition-colors hover:text-foreground/80 text-foreground/60">Huggingface</Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
          </div>
          <nav className="flex items-center space-x-2">
            <ThemeToggle />
          </nav>
        </div>
      </div>
      <ScrollProgressBar />
    </header>
  );
}

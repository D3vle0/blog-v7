"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Post } from "@/lib/posts";
import { Search, Loader2, X, Calendar, ArrowRight } from "lucide-react";

export default function NavbarSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Lazy load posts when search is focused
  const handleFocus = async () => {
    setIsOpen(true);
    if (!hasFetched && !loading) {
      setLoading(true);
      try {
        const res = await fetch("/api/search");
        if (res.ok) {
          const data = await res.json();
          setPosts(data);
          setHasFetched(true);
        }
      } catch (err) {
        console.error("Failed to load search index:", err);
      } finally {
        setLoading(false);
      }
    }
  };

  // Close search dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Keyboard shortcut listener (ESC to close, Cmd+K / Ctrl+K to focus search)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        inputRef.current?.blur();
      }
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Filter posts dynamically based on search query
  const searchResults = !query.trim()
    ? []
    : posts.filter((post) => {
      const lowerQuery = query.toLowerCase();
      const titleMatch = post.metadata.title.toLowerCase().includes(lowerQuery);
      const contentMatch = post.content.toLowerCase().includes(lowerQuery);
      const descMatch = post.metadata.description?.toLowerCase().includes(lowerQuery) || false;
      const catMatch = post.metadata.categories?.some(cat => cat.toLowerCase().includes(lowerQuery)) || false;
      const tagMatch = post.metadata.tags?.some(tag => tag.toLowerCase().includes(lowerQuery)) || false;

      return titleMatch || contentMatch || descMatch || catMatch || tagMatch;
    });

  const handleResultClick = (slug: string) => {
    setIsOpen(false);
    setQuery("");
    router.push(`/blog/${slug}`);
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-[200px] sm:max-w-[280px]">
      <div className="relative flex items-center">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-foreground" />
        <input
          ref={inputRef}
          type="search"
          placeholder="검색... (Cmd+K)"
          value={query}
          onFocus={handleFocus}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-full border border-border/60 bg-muted/40 py-1.5 pl-9 pr-8 text-sm outline-none transition-all placeholder:text-muted-foreground/75 focus:border-foreground/30 focus:bg-background focus:ring-1 focus:ring-foreground/10"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {/* Floating Overlay Dropdown */}
      {isOpen && (query.trim() || loading) && (
        <div className="fixed left-4 right-4 top-[58px] md:absolute md:left-auto md:right-0 md:top-full md:mt-3 w-auto md:w-[480px] lg:w-[560px] bg-background/95 backdrop-blur-md border border-border/80 rounded-2xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="p-3 border-b border-border/40 bg-muted/20 flex items-center justify-between text-xs text-muted-foreground font-medium">
            <span>검색 결과</span>
            {loading ? (
              <span className="flex items-center gap-1">
                <Loader2 className="h-3 w-3 animate-spin text-primary" />
                인덱싱 중...
              </span>
            ) : (
              <span>총 {searchResults.length}개 발견</span>
            )}
          </div>

          <div className="max-h-[360px] overflow-y-auto divide-y divide-border/30">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-10 text-center text-muted-foreground text-sm gap-2">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground/60" />
                <span>검색 인덱스를 구성하고 있습니다...</span>
              </div>
            ) : searchResults.length > 0 ? (
              searchResults.map((post) => (
                <div
                  key={post.metadata.slug}
                  onClick={() => handleResultClick(post.metadata.slug)}
                  className="flex gap-4 p-3.5 hover:bg-muted/50 transition-colors cursor-pointer group"
                >
                  {post.metadata.coverImage ? (
                    <div className="w-16 h-16 shrink-0 rounded-lg overflow-hidden border border-border/40 bg-muted">
                      <img
                        src={post.metadata.coverImage}
                        alt=""
                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                      />
                    </div>
                  ) : (
                    <div className="w-16 h-16 shrink-0 rounded-lg bg-muted border border-border/40 flex items-center justify-center text-[10px] font-semibold text-muted-foreground">
                      Blog
                    </div>
                  )}

                  <div className="flex-1 min-w-0 flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-1">
                      {post.metadata.categories?.[0] && (
                        <span className="text-[10px] font-semibold text-pink-500 uppercase tracking-wider">
                          {post.metadata.categories[0]}
                        </span>
                      )}
                      <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-2.5 w-2.5" />
                        {new Date(post.metadata.date).toLocaleDateString("ko-KR", {
                          month: "numeric",
                          day: "numeric",
                        })}
                      </span>
                    </div>

                    <h4 className="font-bold text-sm leading-tight text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                      {post.metadata.title}
                    </h4>

                    {post.metadata.description && (
                      <p className="text-xs text-muted-foreground/90 line-clamp-1 mt-0.5">
                        {post.metadata.description}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
                <Search className="h-8 w-8 text-muted-foreground/30 mb-2.5" />
                <span className="text-sm font-semibold">검색 결과가 없습니다</span>
                <span className="text-xs text-muted-foreground/75 mt-0.5">
                  다른 키워드를 입력해 보세요.
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

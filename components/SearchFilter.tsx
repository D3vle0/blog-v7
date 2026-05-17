"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Post } from "@/lib/posts";
import { PostCard } from "./PostCard";
import { Search } from "lucide-react";

export default function SearchFilter({ posts }: { posts: Post[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // Initialize query from URL search params
  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);

  // Update query state if the URL param changes
  useEffect(() => {
    setQuery(searchParams.get("q") || "");
  }, [searchParams]);

  // Handle local query change and update URL search params silently
  const handleQueryChange = (val: string) => {
    setQuery(val);
    const params = new URLSearchParams(window.location.search);
    if (val) {
      params.set("q", val);
    } else {
      params.delete("q");
    }
    router.replace(`/search?${params.toString()}`);
  };

  // Perform search filtering
  const filteredPosts = posts.filter((post) => {
    if (!query.trim()) return true; // Show all if search is empty
    const lowerQuery = query.toLowerCase();
    
    const titleMatch = post.metadata.title.toLowerCase().includes(lowerQuery);
    const contentMatch = post.content.toLowerCase().includes(lowerQuery);
    const descMatch = post.metadata.description?.toLowerCase().includes(lowerQuery) || false;
    const catMatch = post.metadata.categories?.some(cat => cat.toLowerCase().includes(lowerQuery)) || false;
    const tagMatch = post.metadata.tags?.some(tag => tag.toLowerCase().includes(lowerQuery)) || false;

    return titleMatch || contentMatch || descMatch || catMatch || tagMatch;
  });

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/75">
          블로그 검색
        </h1>
        <p className="text-muted-foreground">
          제목, 카테고리, 태그 및 본문 내용을 전체 검색합니다.
        </p>
      </div>

      <div className="relative w-full max-w-2xl">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <input
          type="search"
          placeholder="검색어를 입력하세요..."
          value={query}
          onChange={(e) => handleQueryChange(e.target.value)}
          className="w-full rounded-2xl border border-border/80 bg-muted/20 py-3.5 pl-12 pr-6 text-base outline-none transition-all placeholder:text-muted-foreground/70 focus:border-foreground/50 focus:bg-background focus:ring-2 focus:ring-foreground/10"
        />
      </div>

      <div className="pt-4">
        {query && (
          <div className="mb-6 text-muted-foreground text-sm">
            &ldquo;<span className="font-semibold text-foreground">{query}</span>&rdquo; 검색 결과 :{" "}
            <span className="font-semibold text-foreground">{filteredPosts.length}</span>개의 게시물
          </div>
        )}

        {filteredPosts.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post) => (
              <PostCard key={post.metadata.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed rounded-2xl border-border/60 bg-muted/10">
            <Search className="h-12 w-12 text-muted-foreground/45 mb-4" />
            <h3 className="text-lg font-semibold text-muted-foreground">검색 결과가 없습니다</h3>
            <p className="text-sm text-muted-foreground/70 mt-1 max-w-[280px]">
              다른 키워드로 다시 검색해 보세요.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

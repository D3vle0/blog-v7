"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Post } from "@/lib/posts";
import { PostCard } from "./PostCard";

function CategoryFilterContent({ posts }: { posts: Post[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Retrieve selected category from query param (?category=Name) or default to "All"
  const urlCategory = searchParams.get("category") || "All";
  const [selectedCategory, setSelectedCategory] = useState<string>(urlCategory);

  // Synchronize state with URL query parameters
  useEffect(() => {
    setSelectedCategory(searchParams.get("category") || "All");
  }, [searchParams]);

  const categoryCounts: Record<string, number> = { All: posts.length };
  
  posts.forEach((post) => {
    const cats = post.metadata.categories && post.metadata.categories.length > 0 
      ? post.metadata.categories 
      : ["Uncategorized"];
      
    cats.forEach((cat) => {
      categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
    });
  });

  const categories = Object.keys(categoryCounts).sort((a, b) => {
    if (a === "All") return -1;
    if (b === "All") return 1;
    return categoryCounts[b] - categoryCounts[a]; // Sort by count descending
  });

  const filteredPosts = selectedCategory === "All" 
    ? posts 
    : posts.filter(post => {
        const cats = post.metadata.categories && post.metadata.categories.length > 0 
          ? post.metadata.categories 
          : ["Uncategorized"];
        return cats.includes(selectedCategory);
      });

  const handleCategorySelect = (cat: string) => {
    setSelectedCategory(cat);
    const params = new URLSearchParams(window.location.search);
    if (cat && cat !== "All") {
      params.set("category", cat);
    } else {
      params.delete("category");
    }
    router.replace(`/?${params.toString()}`, { scroll: false });
  };

  return (
    <section id="category-filter-section">
      <div className="flex flex-wrap items-center gap-2 mb-8">
        <span className="font-bold mr-2 text-lg">Category</span>
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => handleCategorySelect(cat)}
              className={`px-3.5 py-2 rounded-full text-sm font-medium transition-all border ${
                isSelected 
                  ? "bg-foreground text-background border-foreground shadow-sm scale-102" 
                  : "bg-muted/30 text-foreground/80 border-border/60 hover:bg-muted/70 hover:text-foreground hover:border-border"
              }`}
            >
              {cat} <span className={`text-xs ml-1 opacity-70 ${isSelected ? "text-background/80" : "text-muted-foreground"}`}>({categoryCounts[cat]})</span>
            </button>
          );
        })}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredPosts.map((post) => (
          <PostCard key={post.metadata.slug} post={post} />
        ))}
      </div>
    </section>
  );
}

export default function CategoryFilter({ posts }: { posts: Post[] }) {
  return (
    <Suspense fallback={<div className="text-center py-10 text-muted-foreground">카테고리 목록을 불러오는 중...</div>}>
      <CategoryFilterContent posts={posts} />
    </Suspense>
  );
}

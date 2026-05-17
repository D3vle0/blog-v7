"use client";

import { useState } from "react";
import { Post } from "@/lib/posts";
import { PostCard } from "./PostCard";

export default function CategoryFilter({ posts }: { posts: Post[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

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

  return (
    <section>
      <div className="flex flex-wrap items-center gap-2 mb-8">
        <span className="font-bold mr-2 text-lg">Category</span>
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors border ${
                isSelected 
                  ? "bg-foreground text-background border-foreground" 
                  : "bg-background text-foreground border-border hover:bg-muted"
              }`}
            >
              {cat} <span className="opacity-70 text-xs ml-1">({categoryCounts[cat]})</span>
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

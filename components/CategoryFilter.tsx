"use client";

import { useState } from "react";
import Link from "next/link";
import { Post } from "@/lib/posts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon } from "lucide-react";

import { Clock } from "lucide-react";

function PostCard({ post }: { post: Post }) {
  const wordCount = post.content.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200);

  return (
    <Link href={`/blog/${post.metadata.slug}`} className="block h-full">
      <Card className="h-full flex flex-col hover:bg-muted/50 transition-colors border-border/50 shadow-sm hover:shadow-md cursor-pointer overflow-hidden group p-0 gap-0">
        {post.metadata.coverImage ? (
          <div className="relative w-full h-36 overflow-hidden bg-white dark:bg-zinc-900 border-b">
            <img
              src={post.metadata.coverImage}
              alt={post.metadata.title}
              className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        ) : (
          <div className="relative w-full h-36 overflow-hidden bg-muted border-b flex items-center justify-center">
            <span className="text-muted-foreground text-xl font-medium">Devleo's Blog</span>
          </div>
        )}
        <div className="p-3.5 flex flex-col flex-1">
          <span className="text-sm font-medium text-pink-500 mb-1.5">
            {post.metadata.categories?.[0] || 'Uncategorized'}
          </span>
          <h3 className="font-bold text-lg leading-tight line-clamp-2 mb-1.5 group-hover:text-primary transition-colors">
            {post.metadata.title}
          </h3>
          <div className="flex items-center justify-between text-xs text-muted-foreground mt-auto pt-3 border-t border-border/30">
            <div className="flex items-center">
              <CalendarIcon className="mr-1.5 h-3 w-3" />
              {new Date(post.metadata.date).toLocaleDateString("ko-KR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
            <div className="flex items-center">
              <Clock className="mr-1.5 h-3 w-3" />
              {readingTime}분
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}

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

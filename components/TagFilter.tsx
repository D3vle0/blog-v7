"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Post } from "@/lib/posts";
import { PostCard } from "./PostCard";
import { Tag } from "lucide-react";

export default function TagFilter({ posts }: { posts: Post[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Initialize selected tag from URL query param (?tag=TagName) or default to "All"
  const urlTag = searchParams.get("tag") || "All";
  const [selectedTag, setSelectedTag] = useState<string>(urlTag);

  // Synchronize state if URL tag parameter changes (e.g. going back/forward)
  useEffect(() => {
    setSelectedTag(searchParams.get("tag") || "All");
  }, [searchParams]);

  // Compute tag counts
  const tagCounts: Record<string, number> = { All: posts.length };
  posts.forEach((post) => {
    const tags = post.metadata.tags || [];
    tags.forEach((tag) => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });

  // Sort tags by frequency (descending)
  const sortedTags = Object.keys(tagCounts).sort((a, b) => {
    if (a === "All") return -1;
    if (b === "All") return 1;
    return tagCounts[b] - tagCounts[a];
  });

  // Filter posts based on selected tag
  const filteredPosts = selectedTag === "All"
    ? posts
    : posts.filter((post) => {
        const tags = post.metadata.tags || [];
        return tags.includes(selectedTag);
      });

  // Update selected tag and sync with URL query parameters
  const handleTagSelect = (tag: string) => {
    setSelectedTag(tag);
    const params = new URLSearchParams(window.location.search);
    if (tag && tag !== "All") {
      params.set("tag", tag);
    } else {
      params.delete("tag");
    }
    router.replace(`/tags?${params.toString()}`);
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/75 flex items-center gap-3">
          <Tag className="h-9 w-9 text-pink-500 shrink-0" />
          태그별 게시물
        </h1>
        <p className="text-muted-foreground">
          관심 있는 태그를 선택하여 연관된 게시물들을 찾아보세요.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
          <span>인기 태그</span>
        </div>
        <div className="flex flex-wrap gap-2.5 max-w-4xl">
          {sortedTags.map((tag) => {
            const isSelected = selectedTag === tag;
            return (
              <button
                key={tag}
                onClick={() => handleTagSelect(tag)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                  isSelected
                    ? "bg-foreground text-background border-foreground shadow-sm scale-102"
                    : "bg-muted/30 text-foreground/80 border-border/60 hover:bg-muted/70 hover:text-foreground hover:border-border"
                }`}
              >
                #{tag}
                <span className={`text-xs ml-1.5 opacity-70 ${isSelected ? "text-background/80" : "text-muted-foreground"}`}>
                  ({tagCounts[tag]})
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="pt-6 border-t border-border/40">
        <h2 className="text-xl font-bold mb-6 text-foreground/90">
          {selectedTag === "All" ? "전체 게시물" : `#${selectedTag}`} (
          <span className="text-pink-500">{filteredPosts.length}</span>)
        </h2>

        {filteredPosts.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post) => (
              <PostCard key={post.metadata.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-muted-foreground border border-dashed rounded-2xl">
            태그에 해당하는 게시물이 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}

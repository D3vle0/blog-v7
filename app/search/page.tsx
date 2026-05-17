import { Suspense } from "react";
import { getAllPosts } from "@/lib/posts";
import SearchFilter from "@/components/SearchFilter";

export const metadata = {
  title: "Search | Devleo's Blog",
  description: "Devleo's Blog의 게시물을 검색해보세요.",
};

export default function SearchPage() {
  const posts = getAllPosts();

  return (
    <div className="container max-w-5xl mx-auto py-10 px-4 sm:px-8">
      <Suspense fallback={<div className="text-center py-20 text-muted-foreground">검색 기능을 불러오는 중...</div>}>
        <SearchFilter posts={posts} />
      </Suspense>
    </div>
  );
}

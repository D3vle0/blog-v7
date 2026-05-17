import { Suspense } from "react";
import { getAllPosts } from "@/lib/posts";
import TagFilter from "@/components/TagFilter";

export const metadata = {
  title: "Tags | Devleo's Blog",
  description: "Devleo's Blog의 태그별 게시물을 찾아보세요.",
};

export default function TagsPage() {
  const posts = getAllPosts();

  return (
    <div className="container max-w-5xl mx-auto py-10 px-4 sm:px-8">
      <Suspense fallback={<div className="text-center py-20 text-muted-foreground">태그 목록을 불러오는 중...</div>}>
        <TagFilter posts={posts} />
      </Suspense>
    </div>
  );
}

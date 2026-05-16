import Link from "next/link";
import { getAllPosts, Post } from "@/lib/posts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, Clock } from "lucide-react";
import CategoryFilter from "@/components/CategoryFilter";

function CompactPostCard({ post }: { post: Post }) {
  // Approximate reading time (roughly 200 words per minute)
  const wordCount = post.content.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200);

  return (
    <Link href={`/blog/${post.metadata.slug}`} className="block h-full">
      <Card className="flex flex-row h-full hover:bg-muted/50 transition-colors border-border/50 shadow-sm hover:shadow-md cursor-pointer overflow-hidden p-0 gap-0 group">
        {post.metadata.coverImage ? (
          <div className="relative w-1/3 shrink-0 overflow-hidden bg-white dark:bg-zinc-900 border-r">
            <img
              src={post.metadata.coverImage}
              alt={post.metadata.title}
              className="object-cover absolute inset-0 w-full h-full transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        ) : (
          <div className="relative w-1/3 shrink-0 overflow-hidden bg-muted border-r flex items-center justify-center">
            <span className="text-muted-foreground text-xs font-medium absolute inset-0 flex items-center justify-center">Devleo's Blog</span>
          </div>
        )}
        <div className="p-3 py-2 flex flex-col flex-1">
          <div className="flex justify-between items-start mb-1">
            <span className="text-sm font-medium text-pink-500">
              {post.metadata.categories?.[0] || 'Uncategorized'}
            </span>
          </div>
          <h3 className="font-bold text-lg leading-snug line-clamp-2 mb-1 group-hover:text-primary transition-colors">
            {post.metadata.title}
          </h3>
          <div className="flex items-center justify-between text-sm text-muted-foreground mt-auto pt-1">
            <div className="flex items-center">
              <CalendarIcon className="mr-1 h-3.5 w-3.5" />
              {new Date(post.metadata.date).toLocaleDateString("ko-KR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
            <div className="flex items-center">
              <Clock className="mr-1 h-3.5 w-3.5" />
              {readingTime}분
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}

function LargePostCard({ post }: { post: Post }) {
  const wordCount = post.content.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200);

  return (
    <Link href={`/blog/${post.metadata.slug}`} className="block h-full">
      <Card className="h-full flex flex-col hover:bg-muted/50 transition-colors border-border/50 shadow-sm hover:shadow-md cursor-pointer overflow-hidden group relative p-0 gap-0">
        {post.metadata.coverImage ? (
          <div className="relative w-full aspect-[2/1] overflow-hidden bg-white dark:bg-zinc-900 border-b">
            <img
              src={post.metadata.coverImage}
              alt={post.metadata.title}
              className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        ) : (
          <div className="relative w-full aspect-[2/1] overflow-hidden bg-muted border-b flex items-center justify-center">
            <span className="text-muted-foreground text-xl font-medium">Devleo's Blog</span>
          </div>
        )}
        <div className="p-3 flex flex-col flex-1">
          <span className="text-sm font-medium text-pink-500 mb-1">
            {post.metadata.categories?.[0] || 'Uncategorized'}
          </span>
          <h3 className="font-bold text-2xl line-clamp-2 mb-1.5 group-hover:text-primary transition-colors">
            {post.metadata.title}
          </h3>
          <div className="flex items-center justify-between text-sm text-muted-foreground mt-auto pt-2 border-t border-border/30">
            <div className="flex items-center">
              <CalendarIcon className="mr-1.5 h-4 w-4" />
              {new Date(post.metadata.date).toLocaleDateString("ko-KR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
            <div className="flex items-center">
              <Clock className="mr-1.5 h-4 w-4" />
              {readingTime}분
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}

export default async function Home() {
  const posts = getAllPosts();
  
  const recentPost = posts[0];
  const recommendedPosts = posts.slice(1, 5);

  return (
    <div className="flex flex-col gap-12">
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-16 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center mx-auto">
          <h1 className="font-heading text-5xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
            Devleo's Blog
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            👋 정보보안, AI, 블록체인, 프로그래밍을 공부하는 학생입니다. <br />
            현재 U.S. 8th Army에서 KATUSA로 군복무 중입니다.
          </p>
        </div>
      </section>

      <div className="container mx-auto space-y-16 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-150 fill-mode-both">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {recentPost && (
            <section className="flex flex-col">
              <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center">
                최신 게시물
              </h2>
              <div className="flex-1">
                <LargePostCard post={recentPost} />
              </div>
            </section>
          )}

          {recommendedPosts.length > 0 && (
            <section className="flex flex-col">
              <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center">
                추천 게시물 🔥
              </h2>
              <div className="flex flex-col gap-2 flex-1">
                {recommendedPosts.map((post) => (
                  <CompactPostCard key={post.metadata.slug} post={post} />
                ))}
              </div>
            </section>
          )}
        </div>

        <div className="pt-8 border-t">
          <CategoryFilter posts={posts} />
        </div>
      </div>
    </div>
  );
}

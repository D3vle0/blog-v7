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
      <section className="space-y-10 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-16 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center mx-auto">
          <h1 className="font-heading text-5xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
            Devleo's Blog
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            👋 정보보안, AI, 블록체인, 프로그래밍을 공부하는 학생입니다. <br />
            현재 U.S. 8th Army에서 KATUSA로 군복무 중입니다.
          </p>
          <div className="flex gap-5 mt-2">
            <a
              href="https://github.com/D3vle0"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors p-2 rounded-full bg-muted/50 hover:bg-muted flex items-center justify-center"
              aria-label="GitHub"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 496 512" 
                className="w-6 h-6 fill-current"
              >
                <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.5 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"/>
              </svg>
            </a>
            <a
              href="mailto:i@devleo.us"
              className="text-muted-foreground hover:text-foreground transition-colors p-2 rounded-full bg-muted/50 hover:bg-muted flex items-center justify-center"
              aria-label="Email"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 512 512" 
                className="w-6 h-6 fill-current"
              >
                <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"/>
              </svg>
            </a>
          </div>
        </div>

        <div className="container flex flex-col md:flex-row justify-center items-center gap-6 mx-auto px-4">
          <img
            alt="Spotify Recently Played"
            loading="lazy"
            src="https://spotify-recently-played-readme.vercel.app/api?user=85o05xl09h5de8ngv9im0txhx&count=3"
            className="h-auto md:h-[210px] w-full md:w-auto object-contain rounded-lg shadow-sm"
          />
          <img
            alt="ETS Counter"
            loading="lazy"
            src="https://ets-readme-counter.vercel.app/view?startdate=20250304&branch=army&lang=ko"
            className="h-auto md:h-[210px] w-full md:w-auto object-contain rounded-lg shadow-sm"
          />
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

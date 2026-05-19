import Link from "next/link";
import Image from "next/image";
import { Post } from "@/lib/posts";
import { Card } from "@/components/ui/card";
import { CalendarIcon, Clock } from "lucide-react";

export function PostCard({ post }: { post: Post }) {
  const wordCount = post.content.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200);

  return (
    <Link href={`/blog/${post.metadata.slug}`} className="block h-full animate-in fade-in duration-500">
      <Card className="h-full flex flex-row sm:flex-col hover:bg-muted/50 transition-colors border-border/50 shadow-sm hover:shadow-md cursor-pointer overflow-hidden group p-0 gap-0">
        {post.metadata.coverImage ? (
          <div className="relative w-1/3 sm:w-full shrink-0 sm:h-52 overflow-hidden bg-white dark:bg-zinc-900 border-r sm:border-r-0 sm:border-b">
            <Image
              src={post.metadata.coverImage}
              alt={post.metadata.title}
              fill
              sizes="(max-width: 640px) 100vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          </div>
        ) : (
          <div className="relative w-1/3 sm:w-full shrink-0 sm:h-52 overflow-hidden bg-muted border-r sm:border-r-0 sm:border-b flex items-center justify-center">
            <span className="text-muted-foreground text-xs sm:text-xl font-medium absolute inset-0 sm:static flex items-center justify-center">Devleo's Blog</span>
          </div>
        )}
        <div className="p-3.5 flex flex-col flex-1">
          <span className="text-xs sm:text-sm font-medium text-pink-500 mb-1.5">
            {post.metadata.categories?.[0] || 'Uncategorized'}
          </span>
          <h3 className="font-bold text-base sm:text-lg leading-tight line-clamp-2 mb-1.5 group-hover:text-primary transition-colors">
            {post.metadata.title}
          </h3>
          <div className="flex items-center justify-between text-xs sm:text-sm text-muted-foreground mt-auto pt-3 border-t border-border/30">
            <div className="flex items-center">
              <CalendarIcon className="mr-1.5 h-3 w-3 sm:h-3.5 sm:w-3.5" />
              {new Date(post.metadata.date).toLocaleDateString("ko-KR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
            <div className="flex items-center">
              <Clock className="mr-1.5 h-3 w-3 sm:h-3.5 sm:w-3.5" />
              {readingTime}분
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}

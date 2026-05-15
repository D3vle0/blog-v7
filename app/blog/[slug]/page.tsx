import { getPostBySlug, getPostSlugs } from "@/lib/posts";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CalendarIcon, ArrowLeft, Clock } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";

import { MarkdownRenderer } from "@/components/MarkdownRenderer";

export async function generateStaticParams() {
  const slugs = getPostSlugs();
  return slugs.map((slug) => ({
    slug: slug.replace(/\.md$/, ""),
  }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  
  let post;
  try {
    post = getPostBySlug(slug);
  } catch (e) {
    notFound();
  }

  const wordCount = post.content.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200);

  return (
    <article className="container mx-auto max-w-4xl py-6 lg:py-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <Link href="/">
        <Button variant="ghost" className="mb-6 -ml-4 text-muted-foreground">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to all posts
        </Button>
      </Link>
      
      <div className="space-y-4">
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-2">
            <CalendarIcon className="h-4 w-4" />
            <time dateTime={post.metadata.date}>
              {new Date(post.metadata.date).toLocaleDateString("ko-KR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4" />
            <span>{readingTime}분</span>
          </div>
        </div>
        
        <h1 className="inline-block font-heading text-4xl leading-tight lg:text-5xl font-bold">
          {post.metadata.title}
        </h1>
        
        <div className="flex gap-2 flex-wrap pt-2">
          {post.metadata.categories?.map((cat) => (
            <Badge key={cat} variant="secondary">
              {cat}
            </Badge>
          ))}
          {post.metadata.tags?.map((tag) => (
            <Badge key={tag} variant="outline">
              #{tag}
            </Badge>
          ))}
        </div>
      </div>

      {post.metadata.coverImage && (
        <div className="my-8 w-full overflow-hidden rounded-xl border border-border/50 shadow-sm">
          <img
            src={post.metadata.coverImage}
            alt={post.metadata.title}
            className="w-full h-auto object-cover max-h-[500px]"
          />
        </div>
      )}

      <Separator className="my-8" />

      <div className="prose prose-zinc dark:prose-invert max-w-none w-full
                      prose-headings:font-heading prose-headings:font-bold
                      prose-a:text-primary prose-a:underline-offset-4 hover:prose-a:text-primary/80">
        <MarkdownRenderer content={post.content} />
      </div>
    </article>
  );
}

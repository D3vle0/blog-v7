import { getPostBySlug, getPostSlugs } from "@/lib/posts";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CalendarIcon, ArrowLeft, Clock } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";

import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { TableOfContents } from "@/components/TableOfContents";

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

  return (
    <article className="container py-12 relative mx-auto">
      {/* Centered content wrapper */}
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Link href="/blog">
            <Button variant="ghost" className="mb-4 -ml-4 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Button>
          </Link>

          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-1">
              <CalendarIcon className="w-4 h-4" />
              <time dateTime={post.metadata.date}>
                {new Date(post.metadata.date).toLocaleDateString("ko-KR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{post.metadata.readingTime || Math.ceil(post.content.split(/\s+/).length / 200)}분</span>
            </div>
          </div>

          <h1 className="inline-block font-heading text-4xl leading-tight lg:text-5xl font-bold">
            {post.metadata.title}
          </h1>

          <div className="flex gap-2.5 flex-wrap pt-3">
            {post.metadata.categories?.map((cat) => (
              <Link key={cat} href={`/?category=${encodeURIComponent(cat)}#category-filter-section`}>
                <Badge variant="secondary" className="text-sm px-5 py-2 h-auto rounded-full font-medium cursor-pointer shadow-sm border border-transparent hover:bg-secondary/80 hover:scale-105 active:scale-98 transition-all duration-200">
                  {cat}
                </Badge>
              </Link>
            ))}
            {post.metadata.tags?.map((tag) => (
              <Link key={tag} href={`/tags?tag=${encodeURIComponent(tag)}`}>
                <Badge variant="outline" className="text-sm px-5 py-2 h-auto rounded-full font-medium cursor-pointer shadow-sm border border-border/60 hover:bg-muted hover:scale-105 active:scale-98 transition-all duration-200">
                  #{tag}
                </Badge>
              </Link>
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

        <div className="relative">
          <div className="prose prose-zinc dark:prose-invert max-w-none w-full
                          prose-headings:font-heading prose-headings:font-bold
                          prose-a:text-primary prose-a:underline-offset-4 prose-a:hover:text-primary/80">
            <MarkdownRenderer content={post.content} />
          </div>

          {/* TOC Sidebar placed outside the centered container */}
          <aside className="hidden xl:block absolute left-full top-0 ml-12 w-[250px] h-full">
            <div className="sticky top-24">
              <TableOfContents content={post.content} />
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}

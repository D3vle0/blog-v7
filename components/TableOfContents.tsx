"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import Slugger from "github-slugger";

interface TocItem {
  level: number;
  text: string;
  id: string;
}

export function TableOfContents({ content }: { content: string }) {
  const [toc, setToc] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    // Extract headers from markdown content
    const lines = content.split('\n');
    const headers: TocItem[] = [];
    const slugger = new Slugger();
    
    // Track code blocks to avoid extracting headers from inside code
    let inCodeBlock = false;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      if (line.startsWith('```')) {
        inCodeBlock = !inCodeBlock;
        continue;
      }
      
      if (!inCodeBlock) {
        const match = line.match(/^(#{2,3})\s+(.*)$/);
        if (match) {
          const level = match[1].length;
          const rawText = match[2].trim();
          
          // Clean markdown syntax (links, bold, italic, code) for the text display and slugger input
          const cleanText = rawText
            .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
            .replace(/[*_~`]/g, '');
            
          // Use github-slugger to match rehype-slug exactly
          const id = slugger.slug(cleanText);
            
          headers.push({ level, text: cleanText, id });
        }
      }
    }
    setToc(headers);
  }, [content]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "0% 0% -80% 0%" }
    );

    toc.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [toc]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // Offset for sticky header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setActiveId(id);
      window.history.pushState(null, "", `#${id}`);
    }
  };

  if (toc.length === 0) return null;

  return (
    <nav className="space-y-2">
      <p className="font-bold text-sm uppercase tracking-wider text-muted-foreground mb-4">
        On this page
      </p>
      <ul className="space-y-2.5 text-sm">
        {toc.map((item, index) => (
          <li
            key={`${item.id}-${index}`}
            style={{ paddingLeft: `${(item.level - 2) * 1.25}rem` }}
          >
            <a
              href={`#${item.id}`}
              onClick={(e) => handleClick(e, item.id)}
              className={cn(
                "block transition-colors hover:text-foreground",
                activeId === item.id
                  ? "text-primary font-medium"
                  : "text-muted-foreground"
              )}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

export default function GiscusComments() {
  const ref = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();

  // Determine theme string for giscus based on next-themes resolvedTheme
  const giscusTheme = resolvedTheme === "dark" ? "transparent_dark" : "light";

  useEffect(() => {
    if (!ref.current) return;

    // Clear previous Giscus iframe if any
    ref.current.innerHTML = "";

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.async = true;
    script.crossOrigin = "anonymous";

    // Set configuration from environment variables or sensible fallbacks
    script.setAttribute("data-repo", process.env.NEXT_PUBLIC_GISCUS_REPO || "D3vle0/blog-v7");
    script.setAttribute("data-repo-id", process.env.NEXT_PUBLIC_GISCUS_REPO_ID || "");
    script.setAttribute("data-category", process.env.NEXT_PUBLIC_GISCUS_CATEGORY || "General");
    script.setAttribute("data-category-id", process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID || "");
    script.setAttribute("data-mapping", "pathname");
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "1"); // Enables reactions ("공감")!
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "bottom");
    script.setAttribute("data-theme", giscusTheme);
    script.setAttribute("data-lang", "ko"); // Korean language comments!
    script.setAttribute("data-loading", "lazy");

    ref.current.appendChild(script);
  }, [giscusTheme]);

  return (
    <div className="w-full mt-16 pt-8 border-t border-border/60">
      <h2 className="text-xl font-bold mb-6 text-foreground">Comments</h2>
      <div ref={ref} className="giscus w-full" />
    </div>
  );
}

"use client";

import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function BackButton() {
  const router = useRouter();

  const handleBack = () => {
    const fallbackUrl = sessionStorage.getItem("lastListUrl") || "/";
    const prevPath = sessionStorage.getItem("prevPath") || "";
    
    if (prevPath.startsWith("/blog/")) {
      // Immediate previous page was another blog post.
      // Using router.back() would trap the user in a loop between posts.
      // In this case, we bypass the post history and jump directly to the last list page.
      router.push(fallbackUrl);
    } else if (prevPath) {
      // Previous page was within our app and NOT a post (e.g., list page or tags).
      // We safely go back in browser history to perfectly preserve scroll position.
      router.back();
    } else {
      // Direct load (new tab/external link). No internal history exists.
      router.push(fallbackUrl);
    }
  };

  return (
    <Button
      variant="ghost"
      onClick={handleBack}
      className="mb-4 -ml-4 text-muted-foreground hover:text-foreground"
    >
      <ArrowLeft className="mr-2 h-4 w-4" />
      Back to Blog
    </Button>
  );
}

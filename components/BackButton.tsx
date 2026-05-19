"use client";

import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function BackButton() {
  const router = useRouter();

  const handleBack = () => {
    const fallbackUrl = sessionStorage.getItem("lastListUrl") || "/";
    
    // If the referrer contains the current host and is not another blog post,
    // we can safely use router.back() to preserve scroll position.
    // Otherwise, we navigate to the fallbackUrl to maintain queries.
    if (
      window.history.length > 1 &&
      document.referrer.includes(window.location.host) &&
      !document.referrer.includes("/blog/")
    ) {
      router.back();
    } else {
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

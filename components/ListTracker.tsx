"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export function ListTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const qs = searchParams.toString();
    const url = pathname + (qs ? `?${qs}` : "");

    // Record last list url
    if (pathname === "/" || pathname === "/tags") {
      sessionStorage.setItem("lastListUrl", url);
    }

    // Keep track of the navigation path history to know if prev page was a post
    const current = sessionStorage.getItem("currentPath");
    if (current !== url) {
      sessionStorage.setItem("prevPath", current || "");
      sessionStorage.setItem("currentPath", url);
    }
  }, [pathname, searchParams]);

  return null;
}

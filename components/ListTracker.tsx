"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export function ListTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname === "/" || pathname === "/tags") {
      const qs = searchParams.toString();
      const url = pathname + (qs ? `?${qs}` : "");
      sessionStorage.setItem("lastListUrl", url);
    }
  }, [pathname, searchParams]);

  return null;
}

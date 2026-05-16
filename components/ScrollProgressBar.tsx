"use client"

import { useEffect, useState } from "react"

export function ScrollProgressBar() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0
      setScrollProgress(progress)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="absolute bottom-0 left-0 h-[2px] w-full overflow-hidden bg-transparent">
      <div 
        className="h-full bg-foreground transition-all duration-150 ease-out" 
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  )
}

import { NextResponse } from "next/server";
import { getAllPosts } from "@/lib/posts";

export async function GET() {
  try {
    const posts = getAllPosts();
    // Return all posts including content for full-text search
    return NextResponse.json(posts);
  } catch (error) {
    console.error("Failed to fetch posts for search:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
export const dynamic = "force-static"; // Statically optimize this endpoint!

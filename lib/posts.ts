import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');

export interface PostMetadata {
  slug: string;
  title: string;
  date: string;
  draft?: boolean;
  categories?: string[];
  tags?: string[];
  description?: string;
  coverImage?: string;
}

export interface Post {
  metadata: PostMetadata;
  content: string;
}

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory).filter(file => file.endsWith('.md'));
}

export function getPostBySlug(slug: string): Post {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = path.join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  let coverImage = data.coverImage || '';
  if (data.cover && data.cover.image) {
    coverImage = data.cover.image;
  }
  if (coverImage && !coverImage.startsWith('http') && !coverImage.startsWith('/')) {
    coverImage = `/${coverImage}`;
  }

  return {
    metadata: {
      ...data,
      slug: realSlug,
      title: data.title || realSlug,
      date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
      draft: data.draft || false,
      categories: data.categories || [],
      tags: data.tags || [],
      description: data.description || '',
      coverImage,
    },
    content,
  };
}

export function getAllPosts(): Post[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    // hide drafts
    .filter((post) => !post.metadata.draft)
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.metadata.date > post2.metadata.date ? -1 : 1));
  return posts;
}

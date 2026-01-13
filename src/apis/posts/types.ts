import type { POST_CATEGORIES } from "@/lib/constants";

export type PostCategory = (typeof POST_CATEGORIES)[number];

type PostDto = {
  id: string;
  userId: string;
  title: string;
  body: string;
  category: PostCategory;
  tags: string[];
  createdAt: string;
};

export type PostsResponseDto = {
  items: PostDto[];
  nextCursor?: string | null;
  prevCursor?: string | null;
};

export type Post = {
  id: string;
  title: string;
  body: string;
  category: PostCategory;
  tags: string[];
  createdAt: Date;
  authorId: string;
};

export type PostsPage = {
  items: Post[];
  nextCursor?: string | null;
  prevCursor?: string | null;
};

export const mapPost = (post: PostDto): Post => ({
  id: post.id,
  title: post.title,
  body: post.body,
  category: post.category,
  tags: post.tags,
  createdAt: new Date(post.createdAt),
  authorId: post.userId,
});

export const mapPostsPage = (page: PostsResponseDto): PostsPage => ({
  items: page.items.map(mapPost),
  nextCursor: page.nextCursor ?? null,
  prevCursor: page.prevCursor ?? null,
});

export type PostInput = {
  title: string;
  body: string;
  category: PostCategory;
  tags: string[];
};

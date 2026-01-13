import type { POST_CATEGORIES } from "@/lib/constants";

export type PostCategory = (typeof POST_CATEGORIES)[number];

export type PostDto = {
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

export type PostInput = {
  title: string;
  body: string;
  category: PostCategory;
  tags: string[];
};

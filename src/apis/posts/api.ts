import { requestJson } from "@/lib/http";
import type { PostInput, PostsResponseDto } from "./types";

export type PostsQueryParams = {
  limit?: number;
  nextCursor?: string;
  prevCursor?: string;
  sort?: "createdAt" | "title";
  order?: "asc" | "desc";
  category?: string;
  search?: string;
};

export const fetchPosts = (
  token: string,
  params: PostsQueryParams,
): Promise<PostsResponseDto> =>
  requestJson<PostsResponseDto>("/posts", {
    token,
    params,
  });

export const createPost = (token: string, payload: PostInput) =>
  requestJson("/posts", {
    token,
    method: "POST",
    body: payload,
  });

export const updatePost = (
  token: string,
  id: string,
  payload: Partial<PostInput>,
) =>
  requestJson(`/posts/${id}`, {
    token,
    method: "PATCH",
    body: payload,
  });

export const deletePost = (token: string, id: string) =>
  requestJson(`/posts/${id}`, {
    token,
    method: "DELETE",
  });

export const deleteAllPosts = (token: string) =>
  requestJson("/posts", {
    token,
    method: "DELETE",
  });

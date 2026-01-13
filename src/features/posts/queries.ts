import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type { PostsQueryParams } from "@/apis/posts/api";
import {
  createPost,
  deleteAllPosts,
  deletePost,
  fetchPosts,
  updatePost,
} from "@/apis/posts/api";
import type {
  PostInput,
  PostDto,
  Post,
  PostsResponseDto,
  PostsPage,
} from "@/apis/posts/types";
import { useAuthStore } from "@/features/auth/store";

const postsKeys = {
  all: ["posts"] as const,
  list: (token: string | null, params: PostsQueryParams) =>
    ["posts", "list", token, params] as const,
};

const mapPost = (post: PostDto): Post => ({
  id: post.id,
  title: post.title,
  body: post.body,
  category: post.category,
  tags: post.tags,
  createdAt: new Date(post.createdAt),
  authorId: post.userId,
});

const mapPostsPage = (page: PostsResponseDto): PostsPage => ({
  items: page.items.map(mapPost),
  nextCursor: page.nextCursor ?? null,
  prevCursor: page.prevCursor ?? null,
});

export const useInfinitePosts = (params: PostsQueryParams) => {
  const token = useAuthStore((state) => state.token);

  return useInfiniteQuery({
    queryKey: postsKeys.list(token, params),
    enabled: token != null,
    queryFn: async ({ pageParam }) => {
      if (!token) {
        throw new Error("Missing token");
      }
      return fetchPosts(token, { ...params, nextCursor: pageParam });
    },
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    initialPageParam: undefined as string | undefined,
    select: (data) => ({
      pages: data.pages.map(mapPostsPage),
      pageParams: data.pageParams,
    }),
  });
};

export const useCreatePostMutation = () => {
  const token = useAuthStore((state) => state.token);
  const client = useQueryClient();

  return useMutation({
    mutationFn: (payload: PostInput) => {
      if (!token) throw new Error("Missing token");
      return createPost(token, payload);
    },
    onSuccess: () => client.invalidateQueries({ queryKey: postsKeys.all }),
  });
};

export const useUpdatePostMutation = () => {
  const token = useAuthStore((state) => state.token);
  const client = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: Partial<PostInput>;
    }) => {
      if (!token) throw new Error("Missing token");
      return updatePost(token, id, payload);
    },
    onSuccess: () => client.invalidateQueries({ queryKey: postsKeys.all }),
  });
};

export const useDeletePostMutation = () => {
  const token = useAuthStore((state) => state.token);
  const client = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => {
      if (!token) throw new Error("Missing token");
      return deletePost(token, id);
    },
    onSuccess: () => client.invalidateQueries({ queryKey: postsKeys.all }),
  });
};

export const useDeleteAllPostsMutation = () => {
  const token = useAuthStore((state) => state.token);
  const client = useQueryClient();

  return useMutation({
    mutationFn: () => {
      if (!token) throw new Error("Missing token");
      return deleteAllPosts(token);
    },
    onSuccess: () => client.invalidateQueries({ queryKey: postsKeys.all }),
  });
};

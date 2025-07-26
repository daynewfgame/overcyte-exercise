'use client';

import { PostWithAuthor } from "@/lib/db/types";
import { useQuery } from "@tanstack/react-query";

type PostsResponse = {
  posts: PostWithAuthor[];
  total: number;
  page: number;
  totalPages: number;
}

export const usePosts = (page: number, search: string, sortBy: 'date' | 'likes') => {
  return useQuery<PostsResponse>({
    queryKey: ['posts', page, search, sortBy],
    queryFn: async ()  => {
      const params = new URLSearchParams({
        page: page.toString(),
        search,
        sortBy,
      });

      const response = await fetch(`/api/posts?${params.toString()}`);

      if(!response.ok) {
        throw new Error('Failed to fetch posts');
      }

      return response.json();
    },
    // keep the previous data when the query is refetched
    placeholderData: (previousData) => previousData,
  })
}
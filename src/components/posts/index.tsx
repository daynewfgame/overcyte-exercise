'use client';

import { usePosts } from "@/hooks/posts/usePosts";
import { Fragment, useState, useTransition } from "react";
import { LikeButton } from "../like-button";
import { PostWithAuthor } from "@/lib/db/types";
import Pagination from "../pagination";

type TSortBy = 'date' | 'likes';

const Posts = () => {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>('');
  const [sortBy, setSortBy] = useState<TSortBy>('date');

  const [_isSearchPending, startSearchTransition] = useTransition();
  const [_isSortPending, startSortTransition] = useTransition();

  const { data, isLoading, isError, error } = usePosts(page, search, sortBy);
  
  const onSearch = (value: string) => {
    startSearchTransition(() => {
      setSearch(value);
      setPage(1); // Reset page to 1 when search changes
    });
  }

  const onSort = (value: TSortBy) => {
    startSortTransition(() => {
      setSortBy(value);
    });
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        All Posts
      </h2>

      <div className="flex flex-col gap-6">
        <div className="space-y-4">
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Search posts..."
              value={search}
              onChange={(e) => onSearch(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <select
              value={sortBy}
              onChange={(e) => onSort(e.target.value as TSortBy)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="date">Sort by Date</option>
              <option value="likes">Sort by Likes</option>
            </select>
          </div>

          <Pagination
            page={page}
            totalPages={data?.totalPages || 1}
            setPage={setPage}
          />
        </div>

        <div className="space-y-4">
          {
            isError && (
              <div className="rounded-md bg-red-300 text-white p-4 mb-">
                <p>Error: { error?.message }</p>
              </div>
            )
          }


          { isLoading ? (
            <PostsItemsLoading />
          ) : (
            <Fragment>
              { Boolean(data?.posts.length) ? (
                data?.posts.map((post) => (
                  <PostItem key={post.id} post={post} />
                ))
              ) : (
                <p>No posts found</p>
              )}

              <Pagination
                page={page}
                totalPages={data?.totalPages || 1}
                setPage={setPage}
              />
            </Fragment>
          )}
        </div>
      </div>

    </div>
  )
}

export default Posts;

const PostItem = ({ post }: { post: PostWithAuthor }) => (
  <div key={post.id} className="bg-white shadow rounded-lg p-6">
    <div className="flex justify-between items-start">
      <div>
        <h3 className="text-lg font-semibold text-gray-900">
          {post.title}
        </h3>
        <p className="text-gray-600 mt-2">{post.content}</p>
        <div className="mt-4 flex items-center text-sm text-gray-500">
          <span>By {post.author?.username || "Unknown"}</span>
          <span className="mx-2">•</span>
          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
      <div className="flex items-center text-sm text-gray-500">
        <LikeButton
          postId={post.id}
          initialLikeCount={post.likeCount}
        />
      </div>
    </div>
  </div>
)

const PostsItemsLoading = () => (
  (Array.from({ length: 10 }).map((_, index) => (
    <div key={index} className="bg-gray-50 rounded-lg h-[144px] animate-pulse" />
  )))
)
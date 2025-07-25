import { getPostsWithAuthors } from "@/lib/data/posts";
import { Suspense } from "react";
import PostsList from "./posts-list";

const PostListSection = async () => {
  const posts = await getPostsWithAuthors();

  return <PostsList posts={posts || []} />
}

const Posts = () => {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        All Posts
      </h2>

      <Suspense fallback={<p>Loading...</p>}>
        <PostListSection />
      </Suspense>
    </div>
  )
}

export default Posts;
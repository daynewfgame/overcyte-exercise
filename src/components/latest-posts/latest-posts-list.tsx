import { getLatestPosts } from "@/lib/data/posts"

const LatestPostsList = async () => {
  const posts = await getLatestPosts();

  return (
    (posts || []).map(post => (
      <div key={post.id} className="p-3 bg-gray-50 rounded-md">
        <h4 className="font-medium text-gray-900">{post.title}</h4>
        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
          {post.content}
        </p>
        <div className="text-xs text-gray-500 mt-2">
          {post.likeCount} likes •{" "}
          {new Date(post.createdAt).toLocaleDateString()}
        </div>
      </div>
    ))
  )
}

export default LatestPostsList;
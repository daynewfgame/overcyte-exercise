import { db } from "@/lib/db";
import { posts } from "@/lib/db/schema";

const getTotalPosts = async () => {
  await new Promise(resolve => setTimeout(resolve, 600));
  const postCount = await db.select().from(posts);
  return postCount.length;
}

const PostsStatItem = async () => {
  const totalPosts = await getTotalPosts();

  return (
    <div className="bg-green-50 p-4 rounded-lg">
      <h3 className="text-lg font-semibold text-green-900">Posts</h3>
      <p className="text-2xl font-bold text-green-700">{ totalPosts }</p>
    </div>
  )
}

export default PostsStatItem;
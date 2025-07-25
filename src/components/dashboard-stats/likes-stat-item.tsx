import { db } from "@/lib/db";
import { posts } from "@/lib/db/schema";
import { sum } from "drizzle-orm";

const getTotalLikes = async () => {
  await new Promise(resolve => setTimeout(resolve, 400));
  const [result] = await db.select({ total: sum(posts.likeCount) }).from(posts);
  return parseInt(result?.total?.toString() || '0');
}

const LikesStatItem = async () => {
  const totalLikes = await getTotalLikes();

  return (
    <div className="p-4 rounded-lg bg-red-50">
      <h3 className="text-lg font-semibold text-red-900">Likes</h3>
      <p className="text-2xl font-bold text-red-700">{totalLikes}</p>
    </div>
  )
}

export default LikesStatItem;
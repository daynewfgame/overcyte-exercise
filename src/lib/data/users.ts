import { db } from "@/lib/db";
import { users, posts } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { SafeUser } from "../db/types";

export async function getUserById(userId: number): Promise<SafeUser | null> {
  const [user] = await db
    .select({
      username: users.username,
      createdAt: users.createdAt,
    })
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);
  return user;
}

/**
 * @deprecated Not used anymore, use getUserById() instead
 */
export async function getUserWithPosts(userId: number) {
  console.warn('getUserWithPosts is deprecated, use getUserById() instead');

  const user = await getUserById(userId);
  if (!user) return null;

  const userPosts = await db
    .select()
    .from(posts)
    .where(eq(posts.authorId, userId));

  return {
    ...user,
    posts: userPosts,
  };
}

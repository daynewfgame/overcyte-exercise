import { db } from "@/lib/db";
import { posts, users } from "@/lib/db/schema";
import { desc, eq } from "drizzle-orm";
import { Post, PostWithAuthor, SafeUser } from "../db/types";

/**
 * @deprecated Not used anymore, use getLatestPosts() instead
 */
export async function getAllPosts() {
  console.warn('getAllPosts is deprecated, use getLatestPosts() instead');

  return await db.select().from(posts);
}

export async function getLatestPosts() {
  return await db.select().from(posts).orderBy(desc(posts.createdAt)).limit(5);
}

export async function getPostsWithAuthors(): Promise<PostWithAuthor[]> {
  return await db.query.posts.findMany({
    with: {
      author: {
        columns: {
          id: false,
          hashedPassword: false,
        }
      },
    },
  });
}

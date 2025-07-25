import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-zod";
import { users, posts } from "./schema";
import z from "zod";

// User schemas
export const insertUserSchema = createInsertSchema(users);
export const selectUserSchema = createSelectSchema(users);
export const updateUserSchema = insertUserSchema.omit({
  id: true,
  createdAt: true,
  hashedPassword: true,
});

// Post schemas
export const insertPostSchema = createInsertSchema(posts, {
  title: z.string().min(1).max(100),
  content: z.string().min(1),
  authorId: z.number(),
});
export const selectPostSchema = createSelectSchema(posts);
export const updatePostSchema = createUpdateSchema(posts, {
  title: z.string().min(1).max(100).optional(),
  content: z.string().min(1).optional(),
});

// Types
export type User = typeof users.$inferSelect;
export type SafeUser = Omit<User, 'hashedPassword' | 'id'>;
export type NewUser = typeof users.$inferInsert;
export type Post = typeof posts.$inferSelect;
export type NewPost = typeof posts.$inferInsert;

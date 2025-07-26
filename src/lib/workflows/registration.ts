import { db } from "@/lib/db";
import { users, posts } from "@/lib/db/schema";
import { hashPassword } from "@/lib/auth/utils";
import { Effect } from "effect";

interface NotificationResult {
  sent: boolean;
  messageId: string;
}

interface RegistrationResult {
  success: boolean;
  user: typeof users.$inferSelect;
  welcomePost: typeof posts.$inferSelect;
  notification: NotificationResult;
}

// Convert hashPassword to an Effect
const hashPasswordEffect = (password: string) => Effect.tryPromise(
  {
    try: () => hashPassword(password),
    catch: (error) => new Error("Failed to process password")
  }
);

// Convert user creation to an Effect
const createUserEffect = (username: string, hashedPassword: string) => Effect.tryPromise(
  {
    try: async () => {
      const [newUser] = await db
        .insert(users)
        .values({
          username,
          hashedPassword,
          createdAt: new Date(),
        })
        .returning();
      return newUser;
    },
    catch: (error) => new Error("Failed to create user account")
  }
);

// Convert welcome post creation to an Effect
const createWelcomePostEffect = (username: string, userId: number) => Effect.tryPromise(
  {
    try: async () => {
      const [welcomePost] = await db
        .insert(posts)
        .values({
          title: `Welcome ${username}!`,
          content: `Welcome to our platform, ${username}! We're excited to have you here.`,
          authorId: userId,
          likeCount: 0,
          createdAt: new Date(),
        })
        .returning();
      return welcomePost;
    },
    catch: (error) => new Error("Failed to create welcome post")
  }
);

const sendWelcomeNotificationEffect = (username: string, userId: number) => Effect.async<NotificationResult, Error>((resume) => {
  const timer = setTimeout(() => {
    if (Math.random() > 0.1) {
      resume(Effect.succeed({
        sent: true,
        messageId: `msg_${userId}_${Date.now()}`
      }));
    } else {
      resume(Effect.fail(new Error("Notification service unavailable")));
    }
  }, 500);

  return Effect.sync(() => {
    clearTimeout(timer);
  });
}).pipe(
  Effect.tap(() => Effect.log(`Sent welcome notification to user ${username}`)),
  Effect.tapError((error) => Effect.log(`Failed to send notification: ${error.message}`)),
  Effect.timeout("1 second")
);

// Main registration workflow using Effect.gen
export const registerUser = (username: string, password: string): Effect.Effect<RegistrationResult, Error> => Effect.gen(function* (_) {
  const hashedPassword = yield* _(hashPasswordEffect(password));

  const user = yield* _(createUserEffect(username, hashedPassword));

  const welcomePost = yield* _(createWelcomePostEffect(username, user.id));

  const notification = yield* _(sendWelcomeNotificationEffect(username, user.id));

  return {
    success: true,
    user,
    welcomePost,
    notification,
  };
});
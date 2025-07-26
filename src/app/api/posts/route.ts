import { db } from "@/lib/db";
import { posts } from "@/lib/db/schema";
import { desc, count, sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

const PAGE_SIZE = 10

export const GET = async (request: NextRequest) => {
  const { searchParams } = request.nextUrl;

  const page = parseInt(searchParams.get('page') || '1');
  const search = searchParams.get('search') || '';
  const sortBy = searchParams.get('sortBy') || 'date';

  const offset = (page - 1) * PAGE_SIZE;

  const [data, total] = await Promise.all([
    db.query.posts.findMany({
      with: {
        author: {
          columns: {
            id: false,
            hashedPassword: false,
          }
        }
      },
      where: search ? (fields, { or, like }) =>
        or(
          like(fields.title, `%${search}%`),
          like(fields.content, `%${search}%`),
        ) : undefined,
      limit: PAGE_SIZE,
      offset,
      orderBy: sortBy === 'date' ? [desc(posts.createdAt)] : [desc(posts.likeCount)],
    }),
    db.select({ value: count() }).from(posts)
      .where(
        search 
          ? sql`${posts.title} LIKE ${`%${search}%`} OR ${posts.content} LIKE ${`%${search}%`}`
          : undefined
      ).then(result => result[0].value)
  ]);

  return NextResponse.json({
    success: true,
    posts: data || [],
    total,
    page,
    pageSize: PAGE_SIZE,
    totalPages: Math.ceil(total / PAGE_SIZE)
  });
}
import { Post, PostWithAuthor, SafeUser } from "@/lib/db/types"
import React from "react"

interface PostsListProps {
  posts: PostWithAuthor[]
}

const PostsList: React.FC<PostsListProps> = ({ posts }) => {
  console.log('posts', posts);

  return (
    <div>
      <h1>Posts List</h1>
    </div>
  )
}

export default PostsList;
import { Suspense } from "react"
import LatestPostsList from "./latest-posts-list";

const LatestPostItemsLoading = () => (
  (Array.from({ length: 5 }).map((_, index) => (
    <div key={index} className="bg-gray-50 rounded-md h-[96px] animate-pulse" />
  )))
)

const LatestPosts = () => (
  <div className="space-y-3">
    <h3 className="text-lg font-semibold text-gray-900">Latest Posts</h3>

    <Suspense fallback={<LatestPostItemsLoading />}>
      <LatestPostsList />
    </Suspense>
  </div>
)

export default LatestPosts;
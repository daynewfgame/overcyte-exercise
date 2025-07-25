import { Suspense } from "react";
import UsersStatItem from "./users-stat-item";
import PostsStatItem from "./posts-stat-item";
import LikesStatItem from "./likes-stat-item";

interface DashboardStatsLoadingProps {
  title: string;
  color: string;
}

const DashboardStatsLoading: React.FC<DashboardStatsLoadingProps> = props => {
  const { title, color } = props;

  return (
    <div className={`p-4 rounded-lg bg-${color}-50`}>
      <h3 className={`text-lg font-semibold text-${color}-900`}>
        {title}
      </h3>
      <p className={`text-2xl font-bold text-${color}-700`}>
        Loading...
      </p>
    </div>
  )
}

const DashboardStats = () => (
  <div className="grid grid-cols-3 gap-4 mb-6">
    <Suspense fallback={<DashboardStatsLoading title="Users" color="blue" />}>
      <UsersStatItem />
    </Suspense>

    <Suspense fallback={<DashboardStatsLoading title="Posts" color="green" />}>
      <PostsStatItem />
    </Suspense>

    <Suspense fallback={<DashboardStatsLoading title="Likes" color="red" />}>
      <LikesStatItem />
    </Suspense>
  </div>
)

export default DashboardStats;
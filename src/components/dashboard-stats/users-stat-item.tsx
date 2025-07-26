import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";

const getTotalUsers = async () => {
  await new Promise(resolve => setTimeout(resolve, 800));
  const userCount = await db.select().from(users);
  return userCount.length || 0;
}

const UsersStatItem = async () => {
  const totalUsers = await getTotalUsers();

  return (
    <div className="bg-blue-50 p-4 rounded-lg">
      <h3 className="text-lg font-semibold text-blue-900">Users</h3>
      <p className="text-2xl font-bold text-blue-700">{totalUsers ?? 0}</p>
    </div>
  )
}

export default UsersStatItem;
import { getUserById } from "@/lib/data/users";
import { redirect } from "next/navigation";

interface UserProfileProps {
  session: { userId: number, username: string };
}

const UserProfile: React.FC<UserProfileProps> = async ({ session }) => {

  const user = await getUserById(session.userId);

  if(!user) {
    redirect('/login');
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
            <span className="text-gray-600 font-medium">
              {user.username.charAt(0).toUpperCase()}
            </span>
          </div>
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-medium text-gray-900">{user.username}</h3>
          <p className="text-sm text-gray-500">
            Member since {new Date(user.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
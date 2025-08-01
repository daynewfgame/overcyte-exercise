import { getSession } from "@/lib/auth/utils";
import { CreatePostForm } from "@/components/create-post-form";
import { logoutAction } from "@/lib/auth/actions";
import { redirect } from "next/navigation";
import UserProfile from "@/components/user-profile";
import LatestPosts from "@/components/latest-posts";
import DashboardStats from "@/components/dashboard-stats";
import Link from "next/link";
import Posts from "@/components/posts";

export default async function DashboardPage() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <form action={logoutAction}>
              <button
                type="submit"
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Logout
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <DashboardStats />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1">
              <UserProfile session={session} />

              <div className="mt-6 bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Demo Pages</h3>
                <div className="space-y-2">
                  <Link
                    href="/performance-demo"
                    className="block px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                  >
                    Performance Demo
                  </Link>
                </div>
              </div>

              <div className="mt-6 bg-white shadow rounded-lg p-6">
                <LatestPosts />
              </div>
            </div>

            <div className="lg:col-span-3">
              <CreatePostForm />
              
              <Posts />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

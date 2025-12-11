import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getUserFromToken } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { LogoutButton } from '@/components/dashboard/LogoutButton';

export const metadata = {
  title: 'Dashboard',
  description: 'Your dashboard',
};

export default async function DashboardPage() {
  
  let user = null;

  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('civic_token');

    if (!token) {
      redirect('/login');
    }

    const userId = await getUserFromToken(token.value);

    if (!userId) {
      redirect('/login');
    }

    await connectDB();

    user = await User.findById(userId).select('-passwordHash').lean();

    if (!user) {
      redirect('/login');
    }

    user = {
      ...user,
      _id: user._id.toString(),
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    };

  } catch (err) {
    redirect('/login');
  }

  return (
    <>
      {/* Mobile View */}
      <div className="lg:hidden h-screen bg-white flex flex-col">
        <div className="flex-1 overflow-y-auto">
          <div className="px-5 pt-10 pb-4 min-h-full flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-[24px] font-bold">Dashboard</h1>
              <LogoutButton />
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h2 className="text-[18px] font-bold mb-1">Welcome Back!</h2>
              <p className="text-[11px] text-gray-600">
                Here's your account information
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="text-[15px] font-semibold mb-4">Profile Information</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-[11px] font-medium text-gray-600 mb-1">
                    Mobile Number
                  </label>
                  <div className="text-[13px] font-medium text-black">
                    +91 {user.mobile}
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-4">
                  <label className="block text-[11px] font-medium text-gray-600 mb-1">
                    Email Address
                  </label>
                  <div className="text-[13px] font-medium text-black break-all">
                    {user.email}
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-4">
                  <label className="block text-[11px] font-medium text-gray-600 mb-1">
                    Account Created
                  </label>
                  <div className="text-[13px] font-medium text-black">
                    {new Date(user.createdAt).toLocaleDateString('en-IN', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden lg:flex h-screen bg-white items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold">Dashboard</h1>
            <LogoutButton />
          </div>
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold mb-2">Welcome Back!</h2>
            <p className="text-base text-gray-600">
              Here's your account information
            </p>
          </div>
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-5">Profile Information</h3>
            
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Mobile Number
                </label>
                <div className="text-base font-medium text-black">
                  +91 {user.mobile}
                </div>
              </div>

              <div className="border-t border-gray-100 pt-5">
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Email Address
                </label>
                <div className="text-base font-medium text-black break-all">
                  {user.email}
                </div>
              </div>

              <div className="border-t border-gray-100 pt-5">
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Account Created
                </label>
                <div className="text-base font-medium text-black">
                  {new Date(user.createdAt).toLocaleDateString('en-IN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

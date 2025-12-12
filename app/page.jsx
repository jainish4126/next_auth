import Link from 'next/link';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verifyToken } from '@/lib/auth';

export default async function LandingPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('civic_token');
  
  if (token && verifyToken(token.value)) {
    redirect('/dashboard');
  }

  return (
    <>
      <div className="lg:hidden h-screen bg-white flex flex-col">
        <div className="flex-1 overflow-y-auto">
          <div className="px-5 pt-10 pb-4 min-h-full flex flex-col">
            <div className="text-center mb-8">
              <div className="text-3xl mb-6">🔐</div>
              <h1 className="text-[32px] font-bold mb-3">Welcome Back</h1>
              <p className="text-[13px] text-gray-600">
                Secure authentication system built with Next.js
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-8 py-6 border-y border-gray-100">
              <div className="text-center">
                <div className="text-[20px] font-bold text-black">Secure</div>
                <div className="text-[11px] text-gray-600">JWT Auth</div>
              </div>
              <div className="text-center">
                <div className="text-[20px] font-bold text-black">Fast</div>
                <div className="text-[11px] text-gray-600">Next.js 14</div>
              </div>
              <div className="text-center">
                <div className="text-[20px] font-bold text-black">Modern</div>
                <div className="text-[11px] text-gray-600">App Router</div>
              </div>
            </div>

            <div className="space-y-3.5 mb-6">
              <Link href="/login">
                <button className="w-full bg-black text-white font-semibold py-3.5 px-4 rounded-lg text-[13px] hover:bg-gray-900 transition-colors">
                  Login to Your Account
                </button>
              </Link>
              <Link href="/signup">
                <button className="w-full bg-white text-black font-semibold py-3.5 px-4 rounded-lg text-[13px] border border-gray-300 hover:bg-gray-50 transition-colors">
                  Create New Account
                </button>
              </Link>
            </div>

            <p className="text-center text-[11px] text-gray-600">
              Need help?{" "}
              <Link href="/forgot-password" className="font-semibold text-black hover:underline">
                Reset Password
              </Link>
            </p>
          </div>
        </div>

        <div className="flex justify-center pb-2 flex-shrink-0">
          <div className="w-32 h-1 bg-gray-900 rounded-full"></div>
        </div>
      </div>

      <div className="hidden lg:flex h-screen bg-white items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <div className="text-5xl mb-6">🔐</div>
            <h1 className="text-4xl font-bold mb-4">Welcome Back</h1>
            <p className="text-base text-gray-600">
              Secure authentication system built with Next.js
            </p>
          </div>

          <div className="grid grid-cols-3 gap-6 mb-10 py-8 border-y border-gray-100">
            <div className="text-center">
              <div className="text-2xl font-bold text-black">Secure</div>
              <div className="text-sm text-gray-600">JWT Auth</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-black">Fast</div>
              <div className="text-sm text-gray-600">Next.js 14</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-black">Modern</div>
              <div className="text-sm text-gray-600">App Router</div>
            </div>
          </div>

          <div className="space-y-4 mb-6">
            <Link href="/login">
              <button className="w-full bg-black text-white font-semibold py-4 px-6 rounded-lg text-base hover:bg-gray-900 transition-colors">
                Login to Your Account
              </button>
            </Link>
            <Link href="/signup">
              <button className="w-full bg-white text-black font-semibold py-4 px-6 rounded-lg text-base border border-gray-300 hover:bg-gray-50 transition-colors">
                Create New Account
              </button>
            </Link>
          </div>

          <p className="text-center text-sm text-gray-600">
            Need help?{" "}
            <Link href="/forgot-password" className="font-semibold text-black hover:underline">
              Reset Password
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

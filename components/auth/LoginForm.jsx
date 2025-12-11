"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { MobileInput } from "@/components/ui/MobileInput";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { useToast } from "@/components/ui/ToastProvider";
import { canSubmit, registerSubmit, getRetryAfter } from "@/lib/rateLimit";

export function LoginForm() {
  const router = useRouter();
  const { addToast } = useToast();
  
  const [formData, setFormData] = useState({
    mobile: "",
    password: "",
  });
  
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const [retryAfter, setRetryAfter] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    if (formError) setFormError("");
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.mobile) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = "Please enter a valid 10-digit mobile number";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setFormError("");

  if (!canSubmit("login")) {
    const seconds = getRetryAfter("login");
    setIsBlocked(true);
    setRetryAfter(seconds);
    setFormError(`Too many attempts. Wait ${seconds}s`);
    setTimeout(() => {
      setIsBlocked(false);
      setRetryAfter(0);
      setFormError("");
    }, seconds * 1000);
    return;
  }

  if (!validate()) return;

  setIsLoading(true);
  registerSubmit("login");

  try {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", 
      body: JSON.stringify({
        mobile: formData.mobile,
        password: formData.password,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      setFormError(data.message || "Login failed");
      setIsLoading(false);
      return;
    }

    addToast("Login successful!", "success");

    
    setTimeout(() => {
      window.location.href = "/dashboard";
    }, 500);

  } catch (error) {
    setFormError("An error occurred");
    setIsLoading(false);
  }
};

  return (
    <>
      {/* Mobile View */}
      <div className="lg:hidden h-screen bg-white flex flex-col">

        <div className="flex-1 overflow-y-auto">
          <div className="px-5 pt-10 pb-4 min-h-full flex flex-col">
            <h1 className="text-[24px] font-bold text-center mb-5">Login</h1>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              {formError && <ErrorMessage message={formError} />}

              <MobileInput
                label="Enter your mobile number"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="1762345678"
                error={errors.mobile}
                disabled={isLoading || isBlocked}
              />

              <Input
                label="Enter your password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••••••"
                error={errors.password}
                disabled={isLoading || isBlocked}
                showPasswordToggle
              />

              <div className="text-right">
                <Link 
                  href="/forgot-password" 
                  className="text-[11px] font-normal text-gray-600 hover:text-black"
                >
                  forget password?
                </Link>
              </div>

              <div className="pt-1">
                <Button type="submit" isLoading={isLoading} disabled={isBlocked}>
                  {isBlocked ? `Wait ${retryAfter}s` : "Login"}
                </Button>
              </div>

              <p className="text-center text-[11px] text-gray-600 pt-1">
                Don't have an account?{" "}
                <Link href="/signup" className="font-semibold text-black hover:underline">
                  Sign Up
                </Link>
              </p>

              <div className="relative my-3">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-3 bg-white text-gray-500 text-[11px]">or</span>
                </div>
              </div>

              <div className="space-y-2">
                <Button variant="secondary" type="button">
                  <div className="flex items-center justify-center gap-2">
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    <span className="text-[11px] font-medium">Continue with Google</span>
                  </div>
                </Button>

                <Button variant="secondary" type="button">
                  <div className="flex items-center justify-center gap-2">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                    </svg>
                    <span className="text-[11px] font-medium">Continue with Apple</span>
                  </div>
                </Button>
              </div>

              <div className="text-center pt-1">
                <button 
                  type="button" 
                  className="text-[11px] text-gray-500 hover:text-black"
                >
                  Continue as Guest
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="flex justify-center pb-2 flex-shrink-0">
          <div className="w-32 h-1 bg-gray-900 rounded-full"></div>
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden lg:flex h-screen bg-white items-center justify-center p-8">
        <div className="w-full max-w-md">
          <h1 className="text-4xl font-bold text-center mb-8">Login</h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            {formError && <ErrorMessage message={formError} />}

            <MobileInput
              label="Enter your mobile number"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="1762345678"
              error={errors.mobile}
              disabled={isLoading || isBlocked}
            />

            <Input
              label="Enter your password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••••••"
              error={errors.password}
              disabled={isLoading || isBlocked}
              showPasswordToggle
            />

            <div className="text-right">
              <Link 
                href="/forgot-password" 
                className="text-sm font-normal text-gray-600 hover:text-black"
              >
                forget password?
              </Link>
            </div>

            <Button type="submit" isLoading={isLoading} disabled={isBlocked}>
              {isBlocked ? `Wait ${retryAfter}s` : "Login"}
            </Button>

            <p className="text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <Link href="/signup" className="font-semibold text-black hover:underline">
                Sign Up
              </Link>
            </p>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">or</span>
              </div>
            </div>

            <div className="space-y-3">
              <Button variant="secondary" type="button">
                <div className="flex items-center justify-center gap-3">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span className="font-medium">Continue with Google</span>
                </div>
              </Button>

              <Button variant="secondary" type="button">
                <div className="flex items-center justify-center gap-3">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                  </svg>
                  <span className="font-medium">Continue with Apple</span>
                </div>
              </Button>
            </div>

            <div className="text-center pt-2">
              <button 
                type="button" 
                className="text-sm text-gray-500 hover:text-black"
              >
                Continue as Guest
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

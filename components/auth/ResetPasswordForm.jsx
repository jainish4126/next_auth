"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { useToast } from "@/components/ui/ToastProvider";

export function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [identifier, setIdentifier] = useState("");

  useEffect(() => {
    const emailFromUrl = searchParams.get("email");
    const mobileFromUrl = searchParams.get("mobile");
    const storedIdentifier = sessionStorage.getItem("reset_identifier");

    const id = emailFromUrl || mobileFromUrl || storedIdentifier;

    if (!id) {
      addToast("Invalid reset link. Please try again.", "error");
      router.push("/forgot-password");
      return;
    }

    setIdentifier(id);
  }, [searchParams, router, addToast]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    if (formError) setFormError("");
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/[a-z]/.test(formData.password)) {
      newErrors.password = "Must contain lowercase letter";
    } else if (!/[A-Z]/.test(formData.password)) {
      newErrors.password = "Must contain uppercase letter";
    } else if (!/[0-9]/.test(formData.password)) {
      newErrors.password = "Must contain a number";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords don't match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    if (!validate()) return;

    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          identifier,
          newPassword: formData.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setFormError(data.message || "Failed to reset password");
        addToast(data.message || "Failed to reset password", "error");
        return;
      }

      sessionStorage.removeItem("reset_identifier");
      sessionStorage.removeItem("forgot_mobile");
      sessionStorage.removeItem("forgot_showOtp");
      sessionStorage.removeItem("forgot_countdown");
      sessionStorage.removeItem("forgot_otp");

      addToast("Password reset successfully!", "success");

      setTimeout(() => {
        router.push("/login");
        router.refresh();
      }, 1000);
    } catch (error) {
      setFormError("An error occurred");
      addToast("An error occurred. Please try again", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Mobile View */}
      <div className="lg:hidden h-screen bg-white flex flex-col">
        <div className="flex-1 overflow-y-auto">
          <div className="px-5 pt-10 pb-4 min-h-full flex flex-col">
            <h1 className="text-[24px] font-bold text-center mb-5">Reset Password</h1>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              {formError && <ErrorMessage message={formError} />}

              <Input
                label="New Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••••••"
                error={errors.password}
                disabled={isLoading}
                showPasswordToggle
              />

              <Input
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••••••"
                error={errors.confirmPassword}
                disabled={isLoading}
                showPasswordToggle
              />

              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-[11px] font-semibold text-gray-700 mb-2">
                  Password must contain:
                </p>
                <ul className="text-[10px] text-gray-600 space-y-1">
                  <li className="flex items-center">
                    <span className={formData.password.length >= 8 ? "text-green-600 font-medium" : ""}>
                      • At least 8 characters
                    </span>
                  </li>
                  <li className="flex items-center">
                    <span className={/[a-z]/.test(formData.password) ? "text-green-600 font-medium" : ""}>
                      • One lowercase letter
                    </span>
                  </li>
                  <li className="flex items-center">
                    <span className={/[A-Z]/.test(formData.password) ? "text-green-600 font-medium" : ""}>
                      • One uppercase letter
                    </span>
                  </li>
                  <li className="flex items-center">
                    <span className={/[0-9]/.test(formData.password) ? "text-green-600 font-medium" : ""}>
                      • One number
                    </span>
                  </li>
                </ul>
              </div>

              <div className="pt-1">
                <Button type="submit" isLoading={isLoading} disabled={isLoading}>
                  {isLoading ? "Resetting..." : "Reset Password"}
                </Button>
              </div>

              <p className="text-center text-[11px] text-gray-600 pt-1">
                Remember your password?{" "}
                <Link href="/login" className="font-semibold text-black hover:underline">
                  Back to Login
                </Link>
              </p>
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
          <h1 className="text-4xl font-bold text-center mb-8">Reset Password</h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            {formError && <ErrorMessage message={formError} />}

            <Input
              label="New Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••••••"
              error={errors.password}
              disabled={isLoading}
              showPasswordToggle
            />

            <Input
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••••••"
              error={errors.confirmPassword}
              disabled={isLoading}
              showPasswordToggle
            />

            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm font-semibold text-gray-700 mb-2">
                Password must contain:
              </p>
              <ul className="text-xs text-gray-600 space-y-1">
                <li className="flex items-center">
                  <span className={formData.password.length >= 8 ? "text-green-600 font-medium" : ""}>
                    • At least 8 characters
                  </span>
                </li>
                <li className="flex items-center">
                  <span className={/[a-z]/.test(formData.password) ? "text-green-600 font-medium" : ""}>
                    • One lowercase letter
                  </span>
                </li>
                <li className="flex items-center">
                  <span className={/[A-Z]/.test(formData.password) ? "text-green-600 font-medium" : ""}>
                    • One uppercase letter
                  </span>
                </li>
                <li className="flex items-center">
                  <span className={/[0-9]/.test(formData.password) ? "text-green-600 font-medium" : ""}>
                    • One number
                  </span>
                </li>
              </ul>
            </div>

            <Button type="submit" isLoading={isLoading} disabled={isLoading}>
              {isLoading ? "Resetting..." : "Reset Password"}
            </Button>

            <p className="text-center text-sm text-gray-600">
              Remember your password?{" "}
              <Link href="/login" className="font-semibold text-black hover:underline">
                Back to Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

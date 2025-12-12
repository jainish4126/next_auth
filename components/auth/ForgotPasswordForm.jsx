"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { MobileInput } from "@/components/ui/MobileInput";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { useToast } from "@/components/ui/ToastProvider";
import { canSubmit, registerSubmit, getRetryAfter } from "@/lib/rateLimit";
import { ForgotIllustration } from "@/components/illustrations/ForgotIllustration";
import { VerifyIllustration } from "@/components/illustrations/VerifyIllustration";

export function ForgotPasswordForm() {
  const router = useRouter();
  const { addToast } = useToast();
  
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const [formError, setFormError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const [retryAfter, setRetryAfter] = useState(0);
  const [showOtpScreen, setShowOtpScreen] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [isClient, setIsClient] = useState(false);
  
  const hiddenOtpInputRef = useRef(null);

  useEffect(() => {
    setIsClient(true);
    const savedMobile = sessionStorage.getItem('forgot_mobile');
    const savedShowOtp = sessionStorage.getItem('forgot_showOtp');
    const savedCountdown = sessionStorage.getItem('forgot_countdown');
    const savedOtp = sessionStorage.getItem('forgot_otp');

    if (savedMobile) setMobile(savedMobile);
    if (savedShowOtp === 'true') setShowOtpScreen(true);
    if (savedCountdown) setCountdown(parseInt(savedCountdown));
    if (savedOtp) {
      try {
        const parsedOtp = JSON.parse(savedOtp);
        setOtp(parsedOtp);
      } catch (e) {
      }
    }
  }, []);

  useEffect(() => {
    if (!isClient) return;
    sessionStorage.setItem('forgot_mobile', mobile);
    sessionStorage.setItem('forgot_showOtp', showOtpScreen.toString());
    sessionStorage.setItem('forgot_countdown', countdown.toString());
    sessionStorage.setItem('forgot_otp', JSON.stringify(otp));
  }, [mobile, showOtpScreen, countdown, otp, isClient]);

  useEffect(() => {
    if (showOtpScreen && countdown > 0) {
      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [showOtpScreen]);

  useEffect(() => {
    if (showOtpScreen && isClient && hiddenOtpInputRef.current) {
      const focusInput = () => {
        if (hiddenOtpInputRef.current) {
          hiddenOtpInputRef.current.focus();
          hiddenOtpInputRef.current.click();
        }
      };

      setTimeout(focusInput, 200);
      setTimeout(focusInput, 400);
      setTimeout(focusInput, 600);
      setTimeout(focusInput, 800);
    }
  }, [showOtpScreen, isClient]);

  const clearSession = () => {
    sessionStorage.removeItem('forgot_mobile');
    sessionStorage.removeItem('forgot_showOtp');
    sessionStorage.removeItem('forgot_countdown');
    sessionStorage.removeItem('forgot_otp');
  };

  const handleChange = (e) => {
    setMobile(e.target.value);
    if (error) setError("");
    if (formError) setFormError("");
  };

  const handleHiddenOtpChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 4);
    
    const otpArray = [
      value[0] || "",
      value[1] || "",
      value[2] || "",
      value[3] || ""
    ];
    
    setOtp(otpArray);
  };

  const handleOtpContainerClick = (e) => {
    e.preventDefault();
    if (hiddenOtpInputRef.current) {
      hiddenOtpInputRef.current.focus();
      setTimeout(() => {
        if (hiddenOtpInputRef.current) {
          hiddenOtpInputRef.current.click();
        }
      }, 100);
    }
  };

  const validate = () => {
    if (!mobile) {
      setError("Mobile number is required");
      return false;
    }
    if (!/^\d{10}$/.test(mobile)) {
      setError("Enter valid 10-digit mobile number");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    if (!canSubmit("forgot-password")) {
      const seconds = getRetryAfter("forgot-password");
      setIsBlocked(true);
      setRetryAfter(seconds);
      setFormError(`Too many attempts. Wait ${seconds}s`);
      addToast(`Too many attempts. Please wait ${seconds} seconds`, "error");
      setTimeout(() => {
        setIsBlocked(false);
        setRetryAfter(0);
        setFormError("");
      }, seconds * 1000);
      return;
    }

    if (!validate()) return;

    setIsLoading(true);
    registerSubmit("forgot-password");

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile }),
      });

      const data = await res.json();

      if (!res.ok) {
        setFormError(data.message || "Failed to send OTP");
        addToast(data.message || "Failed to send OTP", "error");
        return;
      }

      addToast("OTP sent successfully!", "success");
      setShowOtpScreen(true);
      setOtp(["", "", "", ""]);
      
      setCountdown(60);
      sessionStorage.setItem('forgot_countdown', '60');
      sessionStorage.setItem('forgot_otp', JSON.stringify(["", "", "", ""]));
    } catch (error) {
      setFormError("An error occurred");
      addToast("An error occurred. Please try again", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const otpValue = otp.join("");

    if (otpValue.length !== 4) {
      setFormError("Please enter complete OTP");
      addToast("Please enter complete OTP", "error");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile, otp: otpValue }),
      });

      const data = await res.json();

      if (!res.ok) {
        setFormError(data.message || "Invalid OTP");
        addToast(data.message || "Invalid OTP", "error");
        setIsLoading(false);
        return;
      }

      sessionStorage.setItem("reset_identifier", data.identifier);
      
      addToast("OTP verified successfully!", "success");

      setTimeout(() => {
        clearSession();
        router.push(`/reset-password?email=${encodeURIComponent(data.identifier)}`);
        router.refresh();
      }, 1000);
    } catch (error) {
      setFormError("Verification failed");
      addToast("Verification failed. Please try again", "error");
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (countdown > 0) return;

    setIsLoading(true);
    
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile }),
      });

      const data = await res.json();

      if (!res.ok) {
        addToast(data.message || "Failed to resend OTP", "error");
        return;
      }

      addToast("OTP resent successfully!", "success");
      setCountdown(60);
      setOtp(["", "", "", ""]);
      sessionStorage.setItem('forgot_countdown', '60');
      sessionStorage.setItem('forgot_otp', JSON.stringify(["", "", "", ""]));
      
      setTimeout(() => {
        if (hiddenOtpInputRef.current) {
          hiddenOtpInputRef.current.focus();
        }
      }, 300);
    } catch (error) {
      addToast("Failed to resend OTP", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackClick = () => {
    setShowOtpScreen(false);
    clearSession();
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  if (!isClient) {
    return null;
  }

  if (showOtpScreen) {
    const currentOtpValue = otp.join("");

    return (
      <>
        <div className="lg:hidden h-screen bg-white flex flex-col overflow-hidden">
          <div className="flex-1 flex flex-col px-5 pt-8 pb-4">
            <div className="flex items-center mb-3">
              <button 
                onClick={handleBackClick} 
                className="mr-2"
                type="button"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h1 className="text-[24px] font-bold flex-1 text-center mr-6">Verify</h1>
            </div>

            <div className="flex justify-center" key="verify-illustration">
              <div className="w-60 h-48">
                <VerifyIllustration />
              </div>
            </div>

            <h2 className="text-[18px] font-bold text-center mt-14 mb-1.5">Enter OTP</h2>
            <p className="text-center text-[12px] text-gray-600 mb-1">An 4 digit OTP has been sent to</p>
            <p className="text-center text-[12px] font-semibold mb-4">{mobile.slice(0,3)}-{mobile.slice(3,6)}-{mobile.slice(6)}</p>

            <form onSubmit={handleVerifyOtp} className="w-full space-y-3">
              <div 
                className="w-full mt-3 cursor-text relative"
                onClick={handleOtpContainerClick}
                onTouchStart={handleOtpContainerClick}
              >
                <input
                  ref={hiddenOtpInputRef}
                  type="tel"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={4}
                  autoComplete="one-time-code"
                  value={currentOtpValue}
                  onChange={handleHiddenOtpChange}
                  className="absolute inset-0 w-full h-full opacity-0 z-10 cursor-text"
                  style={{ 
                    fontSize: '16px', 
                  }}
                />
                
                <div className="grid grid-cols-4 gap-6 mb-1">
                  {otp.map((digit, index) => (
                    <div
                      key={index}
                      className={`aspect-square flex items-center justify-center text-xl font-semibold border-2 rounded-xl transition-colors ${
                        digit ? 'border-black bg-gray-50' : 'border-gray-300'
                      } ${currentOtpValue.length === index ? 'border-black ring-2 ring-black ring-opacity-20' : ''}`}
                    >
                      {digit || ''}
                    </div>
                  ))}
                </div>
              </div>

              {formError && <ErrorMessage message={formError} />}

              <Button type="submit" isLoading={isLoading} disabled={currentOtpValue.length !== 4}>
                Verify
              </Button>

              <div className="text-center">
                {countdown > 0 ? (
                  <p className="text-[12px] text-gray-600">
                    Resend OTP <span className="text-gray-400">({formatTime(countdown)})</span>
                  </p>
                ) : (
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    disabled={isLoading}
                    className="text-[12px] font-semibold text-black hover:underline disabled:opacity-50"
                  >
                    Resend OTP
                  </button>
                )}
              </div>
            </form>
          </div>

          <div className="flex justify-center pb-2">
            <div className="w-32 h-1 bg-gray-900 rounded-full"></div>
          </div>
        </div>

        {/* Desktop View */}
        <div className="hidden lg:flex h-screen bg-white items-center justify-center p-8">
          <div className="max-w-6xl w-full flex items-center gap-12">
            <div className="flex-1" key="verify-illustration-desktop">
              <VerifyIllustration className="w-full h-auto max-h-[500px]" />
            </div>

            <div className="flex-1 max-w-md">
              <button 
                onClick={handleBackClick} 
                className="mb-4"
                type="button"
              >
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <h1 className="text-4xl font-bold text-center mb-6">Verify</h1>
              <h2 className="text-2xl font-bold text-center mb-3">Enter OTP</h2>
              <p className="text-center text-sm text-gray-600 mb-2">An 4 digit OTP has been sent to</p>
              <p className="text-center text-sm font-semibold mb-8">{mobile.slice(0,3)}-{mobile.slice(3,6)}-{mobile.slice(6)}</p>

              <form onSubmit={handleVerifyOtp} className="space-y-6">
                <div 
                  className="flex justify-center gap-5 mb-6 cursor-text relative"
                  onClick={handleOtpContainerClick}
                >
                  <input
                    ref={hiddenOtpInputRef}
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={4}
                    autoComplete="one-time-code"
                    value={currentOtpValue}
                    onChange={handleHiddenOtpChange}
                    className="absolute inset-0 w-full h-full opacity-0 z-10 cursor-text"
                  />
                  
                  {otp.map((digit, index) => (
                    <div
                      key={index}
                      className={`w-20 h-20 flex items-center justify-center text-3xl font-semibold border-2 rounded-lg transition-colors ${
                        digit ? 'border-black bg-gray-50' : 'border-gray-300'
                      } ${currentOtpValue.length === index ? 'border-black ring-2 ring-black ring-opacity-20' : ''}`}
                    >
                      {digit || ''}
                    </div>
                  ))}
                </div>

                {formError && <ErrorMessage message={formError} />}

                <Button type="submit" isLoading={isLoading} disabled={currentOtpValue.length !== 4}>
                  Verify
                </Button>

                <div className="text-center pt-2">
                  {countdown > 0 ? (
                    <p className="text-sm text-gray-600">
                      Resend OTP <span className="text-gray-400">({formatTime(countdown)})</span>
                    </p>
                  ) : (
                    <button
                      type="button"
                      onClick={handleResendOtp}
                      disabled={isLoading}
                      className="text-sm font-semibold text-black hover:underline disabled:opacity-50"
                    >
                      Resend OTP
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Forgot Password Screen
  return (
    <>
      <div className="lg:hidden h-screen bg-white flex flex-col overflow-hidden">
        <div className="flex-1 flex flex-col px-5 pt-8 pb-4">
          <div className="flex items-center mb-3">
            <Link href="/login" className="mr-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <h1 className="text-[24px] font-bold flex-1 text-center mr-6">Forgot</h1>
          </div>

          <div className="flex justify-center mb-3" key="forgot-illustration">
            <div className="w-56 h-48">
              <ForgotIllustration />
            </div>
          </div>

          <h2 className="text-[18px] font-bold text-center pt-10 mb-1.5">Forgot Password?</h2>
          <p className="text-center text-[12px] text-gray-600 mb-4 leading-relaxed px-2">
            Don&apos;t worry! it happens. Please enter phone<br />
            number associated with your account
          </p>

          <form onSubmit={handleSubmit} className="mt-5 space-y-3">
            {formError && <ErrorMessage message={formError} />}

            <MobileInput
              label="Enter your mobile number"
              name="mobile"
              value={mobile}
              onChange={handleChange}
              placeholder="+458-465-6466"
              error={error}
              disabled={isLoading || isBlocked}
            />

            <Button type="submit" isLoading={isLoading} disabled={isBlocked}>
              {isBlocked ? `Wait ${retryAfter}s` : "Get OTP"}
            </Button>
          </form>
        </div>

        <div className="flex justify-center pb-2">
          <div className="w-32 h-1 bg-gray-900 rounded-full"></div>
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden lg:flex h-screen bg-white items-center justify-center p-8">
        <div className="max-w-6xl w-full flex items-center gap-12">
          <div className="flex-1" key="forgot-illustration-desktop">
            <ForgotIllustration className="w-full h-auto max-h-[500px]" />
          </div>

          <div className="flex-1 max-w-md">
            <Link href="/login" className="inline-block mb-6">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>

            <h1 className="text-4xl font-bold text-center mb-8">Forgot</h1>
            <h2 className="text-2xl font-bold text-center mb-4">Forgot Password?</h2>
            <p className="text-center text-base text-gray-600 mb-8 leading-relaxed">
              Don&apos;t worry! it happens. Please enter phone<br />
              number associated with your account
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {formError && <ErrorMessage message={formError} />}

              <MobileInput
                label="Enter your mobile number"
                name="mobile"
                value={mobile}
                onChange={handleChange}
                placeholder="+458-465-6466"
                error={error}
                disabled={isLoading || isBlocked}
              />

              <Button type="submit" isLoading={isLoading} disabled={isBlocked}>
                {isBlocked ? `Wait ${retryAfter}s` : "Get OTP"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

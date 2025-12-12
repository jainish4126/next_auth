import Image from "next/image";

export function VerifyIllustration({ className = "" }) {
  return (
    <div
      className={`
        ${className}
        lg:mb-0
        lg:-mt-32      
        lg:scale-90
        xl:scale-95
      `}
    >
      <Image
        key="verify-otp-image"
        src="/image/verify-otp.png"
        alt="Verify Illustration"
        width={450}
        height={400}
        className="w-full h-auto object-contain"
        priority
        unoptimized
      />
    </div>
  );
}



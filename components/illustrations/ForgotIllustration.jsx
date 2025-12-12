import Image from "next/image";

export function ForgotIllustration({ className = "w-full h-auto" }) {
  const wrapperClasses = `
    w-full 
    flex justify-center 
    md:-mt-6 
    md:mb-0 
    mb-16 
    ${className}
  `;

  return (
    <div className={wrapperClasses}>
      <Image
        key="forgot-password-image"  
        src="/image/forgot-password.png"
        alt="Forgot Password Illustration"
        width={500}
        height={450}
        className="w-full h-auto object-contain"
        priority
        unoptimized 
      />
    </div>
  );
}

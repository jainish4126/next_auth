export function VerifyIllustration({ className = "w-full h-full" }) {
  return (
    <svg 
      viewBox="0 0 500 450" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Background dots decoration */}
      <circle cx="120" cy="100" r="3" fill="#E5E7EB" opacity="0.5"/>
      <circle cx="380" cy="120" r="3" fill="#E5E7EB" opacity="0.5"/>
      <circle cx="140" cy="150" r="2" fill="#E5E7EB" opacity="0.5"/>

      {/* Computer Screen - Center */}
      <g transform="translate(180, 80)">
        {/* Monitor Stand */}
        <rect x="65" y="200" width="8" height="30" fill="#9CA3AF"/>
        <rect x="50" y="230" width="38" height="8" rx="4" fill="#6B7280"/>
        
        {/* Monitor Frame */}
        <rect x="0" y="0" width="138" height="200" rx="12" fill="#E5E7EB"/>
        
        {/* Screen */}
        <rect x="8" y="8" width="122" height="184" rx="8" fill="white"/>
        
        {/* Top Bar */}
        <rect x="8" y="8" width="122" height="28" rx="8" fill="#1F2937"/>
        <circle cx="18" cy="22" r="3" fill="#EF4444"/>
        <circle cx="28" cy="22" r="3" fill="#F59E0B"/>
        <circle cx="38" cy="22" r="3" fill="#10B981"/>
        
        {/* Verification Text */}
        <text x="69" y="68" fontSize="14" fontWeight="700" fill="#111827" textAnchor="middle">Verification</text>
        <text x="69" y="85" fontSize="8" fill="#6B7280" textAnchor="middle">Please enter the OTP code sent to your number</text>
        
        {/* OTP Boxes */}
        <g transform="translate(27, 100)">
          <rect x="0" y="0" width="18" height="24" rx="4" fill="#F3F4F6" stroke="#E5E7EB" strokeWidth="2"/>
          <text x="9" y="18" fontSize="16" fontWeight="600" fill="#9CA3AF" textAnchor="middle">5</text>
          
          <rect x="25" y="0" width="18" height="24" rx="4" fill="#F3F4F6" stroke="#E5E7EB" strokeWidth="2"/>
          <text x="34" y="18" fontSize="16" fontWeight="600" fill="#9CA3AF" textAnchor="middle">3</text>
          
          <rect x="50" y="0" width="18" height="24" rx="4" fill="#F3F4F6" stroke="#E5E7EB" strokeWidth="2"/>
          <text x="59" y="18" fontSize="16" fontWeight="600" fill="#9CA3AF" textAnchor="middle">3</text>
          
          <rect x="75" y="0" width="18" height="24" rx="4" fill="#F3F4F6" stroke="#E5E7EB" strokeWidth="2"/>
          <text x="84" y="18" fontSize="16" fontWeight="600" fill="#9CA3AF" textAnchor="middle">8</text>
        </g>
        
        {/* Password dots */}
        <g transform="translate(35, 140)">
          <circle cx="10" cy="5" r="2" fill="#1F2937"/>
          <circle cx="20" cy="5" r="2" fill="#1F2937"/>
          <circle cx="30" cy="5" r="2" fill="#1F2937"/>
          <circle cx="40" cy="5" r="2" fill="#1F2937"/>
          <circle cx="50" cy="5" r="2" fill="#1F2937"/>
          <circle cx="60" cy="5" r="2" fill="#1F2937"/>
        </g>
        
        {/* Submit Button */}
        <rect x="35" y="158" width="68" height="18" rx="6" fill="#1F2937"/>
        <text x="69" y="171" fontSize="10" fontWeight="600" fill="white" textAnchor="middle">SUBMIT</text>
      </g>

      {/* Shield Icon - Top Right */}
      <g transform="translate(380, 100)">
        <path d="M30 0L0 12V30C0 46 12 60 30 72C48 60 60 46 60 30V12L30 0Z" fill="#1F2937"/>
        <path d="M30 10L10 20V35C10 45 18 54 30 62C42 54 50 45 50 35V20L30 10Z" fill="#3B82F6"/>
        <path d="M24 36L20 32L22 30L24 32L38 22L40 24L24 36Z" fill="white" strokeWidth="2"/>
        
        {/* Sparkle effects */}
        <circle cx="15" cy="15" r="2" fill="#60A5FA" opacity="0.6"/>
        <circle cx="50" cy="25" r="2" fill="#60A5FA" opacity="0.6"/>
        <circle cx="45" cy="50" r="2" fill="#60A5FA" opacity="0.6"/>
      </g>

      {/* Person in Modern Chair */}
      <g transform="translate(80, 220)">
        {/* Modern Chair Base */}
        <ellipse cx="35" cy="160" rx="30" ry="8" fill="#374151"/>
        <rect x="30" y="140" width="10" height="20" fill="#4B5563"/>
        
        {/* Chair Seat */}
        <path d="M10 140L60 140L55 160L15 160Z" fill="#1E3A8A"/>
        <path d="M5 110L10 140L60 140L65 110Z" fill="#2563EB"/>
        
        {/* Chair Back */}
        <path d="M5 70L5 110L15 110L15 75Z" fill="#1E3A8A"/>
        <path d="M55 75L55 110L65 110L65 70Z" fill="#1E3A8A"/>
        
        {/* Legs */}
        <ellipse cx="30" cy="135" rx="14" ry="35" fill="#1E3A8A"/>
        
        {/* Body */}
        <ellipse cx="32" cy="100" rx="20" ry="30" fill="#1F2937"/>
        
        {/* Left Arm */}
        <path d="M20 105Q10 110 8 125" stroke="#DC6B4A" strokeWidth="7" strokeLinecap="round"/>
        
        {/* Laptop */}
        <g transform="translate(15, 115)">
          <rect x="0" y="0" width="28" height="18" rx="2" fill="#9CA3AF"/>
          <rect x="2" y="2" width="24" height="14" rx="1" fill="#60A5FA"/>
          <rect x="4" y="4" width="20" height="10" fill="#3B82F6"/>
        </g>
        
        {/* Right Arm */}
        <path d="M44 105Q54 115 56 128" stroke="#DC6B4A" strokeWidth="7" strokeLinecap="round"/>
        <circle cx="58" cy="132" r="4" fill="#DC6B4A"/>
        
        {/* Head */}
        <circle cx="32" cy="68" r="16" fill="#DC6B4A"/>
        
        {/* Hair */}
        <path d="M20 58C20 54 24 50 32 50C40 50 44 54 44 58" fill="#1F2937"/>
        <ellipse cx="32" cy="53" rx="14" ry="10" fill="#1F2937"/>
        
        {/* Glasses */}
        <rect x="22" y="68" width="8" height="6" rx="3" fill="none" stroke="#1F2937" strokeWidth="2"/>
        <rect x="34" y="68" width="8" height="6" rx="3" fill="none" stroke="#1F2937" strokeWidth="2"/>
        <line x1="30" y1="71" x2="34" y2="71" stroke="#1F2937" strokeWidth="2"/>
        
        {/* Shoes */}
        <ellipse cx="25" cy="165" rx="10" ry="6" fill="#1F2937"/>
        <ellipse cx="45" cy="165" rx="10" ry="6" fill="#1F2937"/>
        
        {/* Shoe details */}
        <ellipse cx="23" cy="165" rx="3" ry="2" fill="white"/>
        <ellipse cx="43" cy="165" rx="3" ry="2" fill="white"/>
      </g>

      {/* Plant - Bottom Right */}
      <g transform="translate(420, 340)">
        <rect x="8" y="50" width="28" height="25" rx="4" fill="#6B7280"/>
        <rect x="10" y="52" width="24" height="20" fill="#8B92A0"/>
        
        {/* Leaves */}
        <ellipse cx="12" cy="38" rx="10" ry="18" fill="#1F2937"/>
        <ellipse cx="22" cy="32" rx="10" ry="18" fill="#1F2937"/>
        <ellipse cx="32" cy="38" rx="10" ry="18" fill="#1F2937"/>
        
        {/* Leaf highlights */}
        <ellipse cx="14" cy="38" rx="4" ry="8" fill="#374151" opacity="0.5"/>
        <ellipse cx="24" cy="32" rx="4" ry="8" fill="#374151" opacity="0.5"/>
      </g>

      {/* Floor shadow */}
      <ellipse cx="130" cy="390" rx="80" ry="12" fill="#E5E7EB" opacity="0.4"/>
    </svg>
  );
}

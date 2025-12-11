export function ForgotIllustration({ className = "w-full h-full" }) {
  return (
    <svg 
      viewBox="0 0 500 450" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Hanging Lamps - Top Left */}
      <g opacity="0.4">
        <line x1="100" y1="20" x2="100" y2="60" stroke="#E5E7EB" strokeWidth="2"/>
        <path d="M90 60L110 60L105 85L95 85Z" fill="#FDE68A" opacity="0.6"/>
        
        <line x1="180" y1="20" x2="180" y2="50" stroke="#E5E7EB" strokeWidth="2"/>
        <path d="M172 50L188 50L184 72L176 72Z" fill="#FDE68A" opacity="0.6"/>
      </g>

      {/* Phone Screen - Top Right */}
      <g transform="translate(320, 80)">
        {/* Phone */}
        <rect x="0" y="0" width="110" height="180" rx="15" fill="#1F2937"/>
        <rect x="8" y="25" width="94" height="145" rx="8" fill="white"/>
        
        {/* Notch */}
        <rect x="40" y="8" width="30" height="6" rx="3" fill="#374151"/>
        
        {/* Password Header */}
        <rect x="8" y="25" width="94" height="30" rx="8" fill="#111827"/>
        <text x="55" y="45" fontSize="10" fontWeight="600" fill="white" textAnchor="middle">PASSWORD</text>
        
        {/* Lock Icon */}
        <g transform="translate(35, 80)">
          <rect x="0" y="18" width="40" height="50" rx="6" fill="#E5E7EB"/>
          <rect x="5" y="22" width="30" height="40" rx="4" fill="#9CA3AF"/>
          <path d="M12 15C12 10 15 6 20 6C25 6 28 10 28 15V20H12V15Z" stroke="#6B7280" strokeWidth="3" fill="none"/>
          <circle cx="20" cy="45" r="4" fill="#374151"/>
        </g>
      </g>

      {/* Person Sitting on Chair */}
      <g transform="translate(120, 200)">
        {/* Chair */}
        <path d="M20 100L10 150H30L20 100Z" fill="#6B7280"/>
        <rect x="5" y="150" width="30" height="8" rx="4" fill="#4B5563"/>
        <line x1="12" y1="158" x2="8" y2="180" stroke="#374151" strokeWidth="4"/>
        <line x1="28" y1="158" x2="32" y2="180" stroke="#374151" strokeWidth="4"/>
        
        {/* Legs */}
        <ellipse cx="20" cy="115" rx="12" ry="40" fill="#1E3A8A"/>
        
        {/* Body/Torso */}
        <ellipse cx="20" cy="70" rx="18" ry="32" fill="#1F2937"/>
        
        {/* Left Arm with Phone */}
        <path d="M10 75Q-10 85 -15 100" stroke="#DC6B4A" strokeWidth="8" strokeLinecap="round"/>
        <rect x="-28" y="95" width="18" height="28" rx="3" fill="#374151"/>
        <rect x="-26" y="97" width="14" height="24" rx="2" fill="#60A5FA"/>
        
        {/* Right Arm - Pointing Up */}
        <path d="M30 75Q50 70 55 55" stroke="#DC6B4A" strokeWidth="8" strokeLinecap="round"/>
        <circle cx="58" cy="52" r="5" fill="#DC6B4A"/>
        
        {/* Head */}
        <circle cx="20" cy="42" r="16" fill="#DC6B4A"/>
        
        {/* Hair */}
        <path d="M12 32C12 28 14 25 20 25C26 25 28 28 28 32" fill="#1F2937"/>
        <ellipse cx="20" cy="28" rx="12" ry="8" fill="#1F2937"/>
        
        {/* Eyes */}
        <circle cx="16" cy="44" r="2" fill="#1F2937"/>
        <circle cx="24" cy="44" r="2" fill="#1F2937"/>
        
        {/* Smile */}
        <path d="M16 50C18 52 22 52 24 50" stroke="#1F2937" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      </g>

      {/* Question Mark Thought Bubble */}
      <g transform="translate(95, 135)">
        <circle cx="0" cy="35" r="4" fill="white" stroke="#E5E7EB" strokeWidth="2"/>
        <circle cx="8" cy="28" r="6" fill="white" stroke="#E5E7EB" strokeWidth="2"/>
        <ellipse cx="20" cy="12" rx="22" ry="28" fill="white" stroke="#E5E7EB" strokeWidth="3"/>
        <text x="20" y="22" fontSize="36" fontWeight="bold" fill="#1F2937" textAnchor="middle">¿?</text>
      </g>

      {/* Large Lock with Circle Background */}
      <g transform="translate(350, 240)">
        <circle cx="30" cy="30" r="42" fill="#E5E7EB" opacity="0.5"/>
        <circle cx="30" cy="30" r="32" fill="#6B7280"/>
        
        <rect x="18" y="35" width="24" height="28" rx="4" fill="#1F2937"/>
        <path d="M22 30C22 24 25 20 30 20C35 20 38 24 38 30V36H22V30Z" stroke="#1F2937" strokeWidth="3" fill="none"/>
      </g>

      {/* Plant - Bottom Right */}
      <g transform="translate(420, 340)">
        <rect x="8" y="50" width="28" height="25" rx="4" fill="#6B7280"/>
        <rect x="10" y="52" width="24" height="20" fill="#8B92A0"/>
        
        {/* Leaves */}
        <ellipse cx="12" cy="38" rx="10" ry="18" fill="#1F2937"/>
        <ellipse cx="22" cy="32" rx="10" ry="18" fill="#1F2937"/>
        <ellipse cx="32" cy="38" rx="10" ry="18" fill="#1F2937"/>
      </g>
    </svg>
  );
}

import React from 'react';

/**
 * Official mFilterIt Logo SVG Component
 * Pure white background directly behind the logo mark so it pops crisply
 */
export const MFilterItLogo: React.FC<{ className?: string; hideText?: boolean; size?: 'sm' | 'md' | 'lg' }> = ({
  className = '',
  hideText = false,
  size = 'md'
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-8 h-8',
    lg: 'w-10 h-10'
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl'
  };

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Pure White Background Box directly behind the logo icon */}
      <div className="bg-[#FFFFFF] p-1 rounded-lg border border-purple-100 shadow-2xs flex items-center justify-center shrink-0">
        <svg 
          viewBox="0 0 100 100" 
          className={`${iconSizes[size]} shrink-0`} 
          aria-label="mFilterIt Logo Icon"
        >
          <defs>
            <linearGradient id="mfGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7E1FA8" />
              <stop offset="50%" stopColor="#531199" />
              <stop offset="100%" stopColor="#300760" />
            </linearGradient>
          </defs>
          {/* Hexagon with smooth rounded corners */}
          <path 
            d="M 50,5 Q 85,25 90,30 Q 95,50 90,70 Q 85,75 50,95 Q 15,75 10,70 Q 5,50 10,30 Q 15,25 50,5 Z" 
            fill="url(#mfGradient)" 
          />
          {/* Filter / Funnel Icon */}
          <path 
            d="M 28,32 L 72,32 L 56,54 L 56,72 L 44,66 L 44,54 Z" 
            fill="#FFFFFF" 
            stroke="#FFFFFF" 
            strokeWidth="2" 
            strokeLinejoin="round" 
          />
        </svg>
      </div>

      {!hideText && (
        <div className={`font-extrabold tracking-tight ${textSizes[size]} flex items-center leading-none text-white select-none`}>
          <span>mF</span>
          <span className="relative inline-block">
            <span>ilter</span>
            {/* Gold Accent dot over the 'i' in Filter */}
            <span className="absolute -top-1.5 left-[3px] text-[8px] text-[#E3B624] font-bold">▼</span>
          </span>
          <span>It</span>
        </div>
      )}
    </div>
  );
};

/**
 * Minakshi Assistant Icon Component (Animated Girl Character)
 * Clean, minimal vector illustration style fitting a premium B2B SaaS dashboard.
 * Uses purple (#531199), white (#FFFFFF), and subtle gold (#E3B624) details.
 * Gentle blinking & sparkle animation with static fallback option.
 */
export const MinakshiAssistantIcon: React.FC<{ 
  size?: 'sm' | 'md' | 'lg' | 'xl'; 
  className?: string; 
  disableAnimation?: boolean;
}> = ({
  size = 'md',
  className = '',
  disableAnimation = false
}) => {
  const dimensions = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  return (
    <div className={`relative rounded-full overflow-hidden border-2 border-[#E3B624] bg-gradient-to-b from-[#531199] to-[#2D0C57] shadow-sm shrink-0 flex items-center justify-center ${dimensions[size]} ${className}`}>
      {/* Custom CSS Animation Keyframes injected in SVG style */}
      <svg viewBox="0 0 100 100" className="w-full h-full object-cover">
        <defs>
          <linearGradient id="girlHair" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2D0C57" />
            <stop offset="100%" stopColor="#1A0736" />
          </linearGradient>
          <linearGradient id="girlSuit" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#531199" />
            <stop offset="100%" stopColor="#3A0B6E" />
          </linearGradient>
          <linearGradient id="skinBase" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FAD6C0" />
            <stop offset="100%" stopColor="#E0B094" />
          </linearGradient>
          <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="1" stdDeviation="1" floodColor="#E3B624" floodOpacity="0.6" />
          </filter>
        </defs>

        <style>{`
          @keyframes minakshiBlink {
            0%, 90%, 100% { transform: scaleY(1); }
            95% { transform: scaleY(0.1); }
          }
          @keyframes subtleFloat {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-1.5px); }
          }
          @keyframes goldSparkle {
            0%, 100% { opacity: 0.4; transform: scale(0.9); }
            50% { opacity: 1; transform: scale(1.1); }
          }
          .animate-eye-blink {
            ${disableAnimation ? '' : 'animation: minakshiBlink 4s infinite; transform-origin: 50% 41px;'}
          }
          .animate-character-float {
            ${disableAnimation ? '' : 'animation: subtleFloat 3s ease-in-out infinite;'}
          }
          .animate-sparkle {
            ${disableAnimation ? '' : 'animation: goldSparkle 2s ease-in-out infinite;'}
          }
        `}</style>

        {/* Outer Background Glow */}
        <circle cx="50" cy="50" r="48" fill="#531199" />
        <circle cx="50" cy="50" r="44" fill="#2D0C57" />

        <g className="animate-character-float">
          {/* Back Long Hair */}
          <path d="M 26,45 Q 22,70 30,90 L 70,90 Q 78,70 74,45 Z" fill="url(#girlHair)" />

          {/* Shoulders & B2B Blazer (Purple + White Collar) */}
          <path d="M 20,95 Q 50,72 80,95 Z" fill="url(#girlSuit)" />
          {/* White Executive Shirt Collar */}
          <path d="M 40,78 L 50,90 L 60,78 L 54,76 L 50,82 L 46,76 Z" fill="#FFFFFF" />
          {/* Gold Pendant Accent */}
          <circle cx="50" cy="85" r="2.5" fill="#E3B624" filter="url(#goldGlow)" />

          {/* Neck */}
          <path d="M 44,62 Q 50,75 56,62 Z" fill="#D2A082" />
          <path d="M 43,60 L 57,60 L 55,68 L 45,68 Z" fill="url(#skinBase)" />

          {/* Face Base */}
          <ellipse cx="50" cy="46" rx="16" ry="19" fill="url(#skinBase)" />

          {/* Stylish Hair Front & Bob cut */}
          <path d="M 32,42 C 32,24 68,24 68,42 C 68,30 32,30 32,42 Z" fill="url(#girlHair)" />
          {/* Front Side Bangs */}
          <path d="M 34,35 Q 48,28 50,42 Q 40,32 34,35 Z" fill="#3D127A" />
          <path d="M 66,35 Q 52,28 50,42 Q 60,32 66,35 Z" fill="#3D127A" />

          {/* Gold Headband / Hairclip Accent */}
          <path d="M 34,30 Q 50,22 66,30" stroke="#E3B624" strokeWidth="2" fill="none" strokeLinecap="round" />
          <circle cx="62" cy="28" r="2.5" fill="#E3B624" className="animate-sparkle" />

          {/* Gold Earrings */}
          <circle cx="33" cy="48" r="2" fill="#E3B624" filter="url(#goldGlow)" />
          <circle cx="67" cy="48" r="2" fill="#E3B624" filter="url(#goldGlow)" />

          {/* Eyes & Blinking Animation */}
          <g className="animate-eye-blink">
            <ellipse cx="43" cy="43" rx="2.8" ry="3.2" fill="#2D0C57" />
            <ellipse cx="57" cy="43" rx="2.8" ry="3.2" fill="#2D0C57" />
            {/* Catchlight white dots */}
            <circle cx="44" cy="42" r="1" fill="#FFFFFF" />
            <circle cx="58" cy="42" r="1" fill="#FFFFFF" />
            {/* Delicate Eyelashes */}
            <path d="M 39,40 Q 43,37 47,40" stroke="#2D0C57" strokeWidth="1.2" fill="none" strokeLinecap="round" />
            <path d="M 53,40 Q 57,37 61,40" stroke="#2D0C57" strokeWidth="1.2" fill="none" strokeLinecap="round" />
          </g>

          {/* Eyebrows */}
          <path d="M 39,36 Q 43,34 47,36" stroke="#531199" strokeWidth="1" fill="none" strokeLinecap="round" />
          <path d="M 53,36 Q 57,34 61,36" stroke="#531199" strokeWidth="1" fill="none" strokeLinecap="round" />

          {/* Nose */}
          <path d="M 50,45 L 50,49 L 51.5,49.5" stroke="#C89274" strokeWidth="1" fill="none" strokeLinecap="round" />

          {/* Friendly Minimal Smile */}
          <path d="M 45,54 Q 50,58 55,54" stroke="#8A2C58" strokeWidth="1.8" fill="none" strokeLinecap="round" />

          {/* Subtle Rosy Cheeks */}
          <ellipse cx="38" cy="49" rx="2" ry="1" fill="#E38A8A" opacity="0.4" />
          <ellipse cx="62" cy="49" rx="2" ry="1" fill="#E38A8A" opacity="0.4" />
        </g>
      </svg>

      {/* Gold AI Status Badge Dot */}
      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#E3B624] ring-2 ring-[#2D0C57] shadow-xs" title="Minakshi AI Active" />
    </div>
  );
};

/**
 * Minakshi Kushwaha Photo Avatar Component (Human Lead User)
 */
export const MinakshiAvatar: React.FC<{ size?: 'sm' | 'md' | 'lg'; className?: string }> = ({
  size = 'md',
  className = ''
}) => {
  const dimensions = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12'
  };

  return (
    <div className={`relative rounded-full overflow-hidden border-2 border-[#E3B624]/60 shadow-sm shrink-0 ${dimensions[size]} ${className}`}>
      <svg viewBox="0 0 100 100" className="w-full h-full object-cover">
        <defs>
          <linearGradient id="bgPalm" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2E6F40" />
            <stop offset="60%" stopColor="#1C4827" />
            <stop offset="100%" stopColor="#0F2B15" />
          </linearGradient>
          <linearGradient id="skinTone" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#E2A77E" />
            <stop offset="100%" stopColor="#C8885C" />
          </linearGradient>
          <linearGradient id="hairDark" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1A181D" />
            <stop offset="100%" stopColor="#0C0A0E" />
          </linearGradient>
        </defs>

        {/* Tropical Palm & Red Flowers Background */}
        <rect width="100" height="100" fill="url(#bgPalm)" />
        <path d="M0,20 Q30,5 60,30 Q20,50 0,20 Z" fill="#3D8E53" opacity="0.8" />
        <path d="M50,0 Q80,25 100,10 Q90,60 50,0 Z" fill="#2B6B3D" opacity="0.8" />
        <circle cx="85" cy="20" r="4" fill="#E63946" />
        <circle cx="20" cy="15" r="3.5" fill="#E63946" />

        {/* Minakshi Kushwaha - Face & Neck */}
        <path d="M42,42 Q50,72 58,42 Z" fill="#B87B52" />
        <ellipse cx="50" cy="40" rx="14" ry="17" fill="url(#skinTone)" />

        {/* Facial Features */}
        <ellipse cx="44" cy="38" rx="2.5" ry="1.8" fill="#2E1B11" />
        <ellipse cx="56" cy="38" rx="2.5" ry="1.8" fill="#2E1B11" />
        <path d="M42,33 Q45,32 47,33" stroke="#2E1B11" strokeWidth="1.2" fill="none" />
        <path d="M53,33 Q55,32 58,33" stroke="#2E1B11" strokeWidth="1.2" fill="none" />
        <path d="M50,39 L50,44 L51.5,45" stroke="#B87B52" strokeWidth="1" fill="none" />
        <path d="M45,49 Q50,53 55,49" stroke="#9A3B3B" strokeWidth="1.8" fill="#C85252" strokeLinecap="round" />
        <circle cx="42" cy="42" r="0.6" fill="#E3B624" />

        {/* Brown Graphic T-shirt */}
        <path d="M 28,62 Q 50,56 72,62 L 85,100 L 15,100 Z" fill="#3D2923" />
        <path d="M 50,65 L 50,85 M 42,73 L 58,73" stroke="#F5EBE6" strokeWidth="3" opacity="0.85" strokeLinecap="round" />
        
        {/* Crossed Arms */}
        <path d="M 22,82 Q 50,92 78,82 Q 50,102 22,82 Z" fill="#2C1D18" stroke="#4A342C" strokeWidth="1" />
        <path d="M 32,85 Q 50,75 68,85" stroke="url(#skinTone)" strokeWidth="4" strokeLinecap="round" />

        {/* Long Dark Hair */}
        <path d="M 36,36 Q 34,18 50,18 Q 66,18 64,36 Q 62,60 70,82 Q 58,85 55,50 Q 45,50 42,85 Q 30,82 36,36 Z" fill="url(#hairDark)" />
        <path d="M 49,18 Q 50,30 50,40" stroke="#000000" strokeWidth="0.8" opacity="0.5" />
      </svg>
    </div>
  );
};

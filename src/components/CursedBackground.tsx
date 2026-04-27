import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(true);
  
  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth > 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  
  return isDesktop;
}

export default function CursedBackground({ theme }: { theme: 'gojo' | 'sukuna' }) {
  const isDesktop = useIsDesktop();
  const { scrollY } = useScroll();
  
  // Smooth out the scroll values so the parallax doesn't feel jumpy
  const smoothY = useSpring(scrollY, { damping: 20, stiffness: 100 });
  
  // Create different parallax depths
  const yDeep = useTransform(smoothY, [0, 5000], [0, -300]);
  const yMid = useTransform(smoothY, [0, 5000], [0, -800]);
  const yFore = useTransform(smoothY, [0, 5000], [0, -1500]);
  
  // Rotations tied to scroll
  const rotateClockwise = useTransform(smoothY, [0, 5000], [0, 180]);
  const rotateCounter = useTransform(smoothY, [0, 5000], [0, -180]);

  const activeColor = theme === 'sukuna' ? '#ff2d2d' : '#00d2ff';
  const secondaryColor = theme === 'sukuna' ? '#c41e3a' : '#005bbb';

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden bg-bg">
      {/* Base gradient ambiance */}
      <div 
        className="absolute inset-0 opacity-10 transition-colors duration-1000"
        style={{
          background: `radial-gradient(circle at 50% 30%, ${activeColor} 0%, transparent 60%)`
        }}
      />
      
      {/* Sub-gradient */}
      <div 
        className="absolute inset-0 opacity-5 transition-colors duration-1000"
        style={{
          background: `radial-gradient(circle at 20% 80%, ${secondaryColor} 0%, transparent 50%)`
        }}
      />

      {isDesktop && (
        <div className="absolute inset-0 opacity-40">
          {/* LAYER 1: Deep (Slowest) */}
          <motion.div style={{ y: yDeep }} className="absolute inset-0">
            <svg className="absolute top-[10%] left-[10%] w-64 h-64 opacity-50" viewBox="0 0 100 100" fill="none" stroke={activeColor} strokeWidth="1">
              <circle cx="50" cy="50" r="40" strokeDasharray="4 4" />
              <circle cx="50" cy="50" r="30" />
            </svg>
            <svg className="absolute top-[60%] right-[15%] w-96 h-96 opacity-40" viewBox="0 0 100 100" fill="none" stroke={secondaryColor} strokeWidth="1">
              <path d="M 10 50 L 90 50 M 50 10 L 50 90 M 20 20 L 80 80 M 20 80 L 80 20" />
              <circle cx="50" cy="50" r="45" />
            </svg>
          </motion.div>

          {/* LAYER 2: Mid (Medium Speed) */}
          <motion.div style={{ y: yMid, rotate: rotateCounter }} className="absolute inset-0 origin-center">
            <svg className="absolute top-[30%] right-[20%] w-48 h-48 opacity-60" viewBox="0 0 100 100" fill="none" stroke={activeColor} strokeWidth="1.5">
              <rect x="25" y="25" width="50" height="50" transform="rotate(45 50 50)" />
              <rect x="25" y="25" width="50" height="50" />
            </svg>
            <svg className="absolute bottom-[10%] left-[25%] w-32 h-32 opacity-70" viewBox="0 0 100 100" fill="none" stroke={secondaryColor} strokeWidth="1.5">
              <polygon points="50,10 90,90 10,90" />
              <circle cx="50" cy="65" r="15" />
            </svg>
          </motion.div>

          {/* LAYER 3: Foreground (Fastest) */}
          <motion.div style={{ y: yFore, rotate: rotateClockwise }} className="absolute inset-0 origin-center">
            <svg className="absolute top-[80%] right-[40%] w-24 h-24 opacity-80" viewBox="0 0 100 100" fill="none" stroke={activeColor} strokeWidth="2">
              <path d="M 0 50 Q 50 0 100 50 T 0 50" />
              <path d="M 50 0 Q 100 50 50 100 T 50 0" />
            </svg>
            <svg className="absolute top-[20%] left-[40%] w-16 h-16 opacity-100" viewBox="0 0 100 100" fill="none" stroke={secondaryColor} strokeWidth="3">
              <line x1="0" y1="0" x2="100" y2="100" />
              <line x1="100" y1="0" x2="0" y2="100" />
            </svg>
          </motion.div>
        </div>
      )}
    </div>
  );
}

import React, { useEffect, useRef, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'motion/react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  size: number;
}

export default function CursedCursor({ theme }: { theme: 'gojo' | 'sukuna' }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const [isHovering, setIsHovering] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 200 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const onMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      
      // Add particles on move
      const particleCount = isHovering ? 4 : 2;
      for (let i = 0; i < particleCount; i++) {
        particles.current.push({
          x: e.clientX,
          y: e.clientY,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5,
          life: 1,
          size: Math.random() * 2 + 1,
        });
      }

      // Check for hoverable elements
      const target = e.target as HTMLElement;
      const isHoverable = target.closest('a, button, .glass-panel, input, textarea');
      setIsHovering(!!isHoverable);
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMouseMove);
    resize();

    let animationFrame: number;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const color = theme === 'sukuna' ? '#ff2d2d' : '#00d2ff';
      ctx.shadowBlur = 8;
      ctx.shadowColor = color;

      particles.current = particles.current.filter(p => p.life > 0);
      
      particles.current.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.015;
        p.size *= 0.99;
        
        ctx.globalAlpha = p.life * 0.6;
        ctx.fillStyle = color;
        ctx.beginPath();
        // Draw small squares or circles for cursed energy feel
        if (theme === 'sukuna') {
          ctx.rect(p.x - p.size/2, p.y - p.size/2, p.size, p.size);
        } else {
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        }
        ctx.fill();
      });

      animationFrame = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animationFrame);
    };
  }, [theme, isHovering]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[9999]"
        style={{ mixBlendMode: 'screen' }}
      />
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 rounded-full pointer-events-none z-[10000] mix-blend-difference"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          backgroundColor: theme === 'sukuna' ? '#ff2d2d' : '#00d2ff',
        }}
        animate={{
          scale: isHovering ? 2 : 1,
        }}
      />
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border rounded-full pointer-events-none z-[10000]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          borderColor: theme === 'sukuna' ? '#ff2d2d' : '#00d2ff',
          opacity: 0.5,
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          rotate: isHovering ? 90 : 0,
        }}
      />
    </>
  );
}

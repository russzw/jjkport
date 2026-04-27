import { motion } from 'motion/react';
import { HeroData } from '../../types/portfolio';

interface HeroProps {
  data: HeroData;
  theme: 'gojo' | 'sukuna';
}

export default function Hero({ data, theme }: HeroProps) {
  return (
    <section className="relative h-screen flex flex-col justify-center items-center px-6 overflow-hidden">
      {/* Drifting Cursed Energy Particles (DOM-based) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full blur-xl opacity-20"
            style={{
              width: Math.random() * 200 + 100,
              height: Math.random() * 200 + 100,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              backgroundColor: theme === 'sukuna' ? '#c41e3a' : '#00b4d8',
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="text-center z-10 relative"
      >
        <p className="text-accent font-sans text-xs tracking-[0.6em] mb-12 opacity-0 animate-[fadeUp_1s_0.5s_forwards] flex items-center justify-center gap-4">
          <span className="w-12 h-[1px] bg-accent/30" />
          {data.title} &nbsp;&nbsp; 01
          <span className="w-12 h-[1px] bg-accent/30" />
        </p>
        
        <div className="relative mb-8">
          <h1 className="domain-expansion-text relative">
            <span className="block drop-shadow-2xl">{data.name}</span>
            <span className="block text-transparent" style={{ WebkitTextStroke: '1px var(--text)', opacity: 0.3 }}>
              {data.surname}
            </span>
          </h1>
          
          <motion.div 
            className="absolute -bottom-4 left-1/2 -translate-x-1/2 h-[2px] bg-accent"
            initial={{ width: 0 }}
            animate={{ width: '60%' }}
            transition={{ delay: 1, duration: 1.5, ease: "circOut" }}
          />
        </div>

        {/* Role subtitle from extracted data */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="font-sans text-[0.7rem] tracking-[0.35em] uppercase opacity-60 mb-8"
        >
          {data.role}
        </motion.p>

        <p className="font-japanese text-xl md:text-3xl tracking-[0.8em] opacity-30 mb-12 leading-relaxed max-w-2xl mx-auto">
          {data.jpQuote}
        </p>

        <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
          <a href="#projects" className="jjk-button group relative bg-accent text-bg px-12 py-5 font-sans text-[0.7rem] tracking-[0.3em] overflow-hidden transition-all hover:scale-105 active:scale-95">
            <span className="relative z-10">VIEW MY WORK</span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </a>
          <a href="#contact" className="jjk-button group border border-current px-12 py-5 font-sans text-[0.7rem] tracking-[0.3em] transition-all hover:text-accent hover:border-accent hover:scale-105 active:scale-95">
            OPEN A CHANNEL
          </a>
        </div>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.03 }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <span className="text-[50vw] font-japanese leading-none select-none blur-sm">
          {theme === 'sukuna' ? '宿' : '悟'}
        </span>
      </motion.div>

      {/* Decorative Corners */}
      <div className="absolute top-32 left-12 w-24 h-24 border-t border-l border-accent/20 hidden lg:block" />
      <div className="absolute top-32 right-12 w-24 h-24 border-t border-r border-accent/20 hidden lg:block" />
      <div className="absolute bottom-32 left-12 w-24 h-24 border-b border-l border-accent/20 hidden lg:block" />
      <div className="absolute bottom-32 right-12 w-24 h-24 border-b border-r border-accent/20 hidden lg:block" />

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-40">
        <span className="text-[0.6rem] tracking-[0.5em] uppercase font-bold">Initiate Descent</span>
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-[1px] h-16 bg-gradient-to-b from-accent to-transparent" 
        />
      </div>
    </section>
  );
}

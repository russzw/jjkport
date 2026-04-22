import { motion } from 'motion/react';
import { HeroData } from '../../types/portfolio';

interface HeroProps {
  data: HeroData;
  theme: 'gojo' | 'sukuna';
}

export default function Hero({ data, theme }: HeroProps) {
  return (
    <section className="relative h-screen flex flex-col justify-center items-center px-6 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="text-center z-10"
      >
        <p className="text-accent font-sans text-xs tracking-[0.4em] mb-6 opacity-0 animate-[fadeUp_1s_0.5s_forwards]">
          {data.title} &nbsp;&nbsp; 01
        </p>
        <h1 className="domain-expansion-text mb-4">
          <span className="block">{data.name}</span>
          <span className="block text-transparent" style={{ WebkitTextStroke: '1.5px var(--text)', opacity: 0.8 }}>{data.surname}</span>
        </h1>
        <p className="font-japanese text-xl md:text-2xl tracking-[0.5em] opacity-40 mb-8">
          {data.jpQuote}
        </p>
        <div className="flex gap-6 justify-center">
          <a href="#projects" className="jjk-button bg-accent text-bg px-8 py-4 font-sans text-xs tracking-widest hover:bg-secondary transition-colors">
            VIEW MY WORK
          </a>
          <a href="#contact" className="jjk-button border border-current px-8 py-4 font-sans text-xs tracking-widest hover:text-accent hover:border-accent transition-colors">
            OPEN A CHANNEL
          </a>
        </div>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.05 }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <span className="text-[40vw] font-japanese leading-none select-none">
          {theme === 'sukuna' ? '宿' : '悟'}
        </span>
      </motion.div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="text-[0.6rem] tracking-[0.3em] uppercase">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-accent to-transparent" />
      </div>
    </section>
  );
}

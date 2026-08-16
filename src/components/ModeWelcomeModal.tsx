import { motion } from 'motion/react';
import { Leaf, Flame } from 'lucide-react';

interface ModeWelcomeModalProps {
  onSelect: (mode: 'zen' | 'immersive') => void;
}

export default function ModeWelcomeModal({ onSelect }: ModeWelcomeModalProps) {
  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
      />

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: 'spring', damping: 24, stiffness: 200 }}
        className="relative w-full max-w-2xl bg-bg text-text border border-accent/30 p-8 md:p-12 jjk-button shadow-[0_0_60px_rgba(0,0,0,0.3)]"
      >
        <div className="text-center mb-10">
          <p className="text-[0.6rem] tracking-[0.5em] uppercase text-accent mb-4 font-sans">Welcome to the domain</p>
          <h2 className="text-3xl md:text-5xl font-display uppercase mb-4">Choose Your Experience</h2>
          <p className="text-sm opacity-60 font-sans tracking-widest uppercase">Select how you would like to enter</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <button
            onClick={() => onSelect('zen')}
            className="group relative flex flex-col items-center text-center p-8 border border-border hover:border-secondary hover:bg-current/[0.03] transition-all duration-500 overflow-hidden jjk-button"
          >
            <Leaf className="text-secondary mb-6 transition-transform group-hover:scale-110" size={30} />
            <h3 className="text-2xl font-display uppercase mb-2">Minimalistic</h3>
            <p className="text-xs font-sans tracking-widest uppercase opacity-60 leading-relaxed mb-8">
              Quiet. Clean. Focused.
              <br />
              Just the essentials.
            </p>
            <span className="text-[0.6rem] tracking-[0.3em] uppercase font-bold text-secondary border-b border-secondary pb-1">
              Enter &rarr;
            </span>
          </button>

          <button
            onClick={() => onSelect('immersive')}
            className="group relative flex flex-col items-center text-center p-8 border border-accent/40 hover:border-accent bg-current/[0.02] transition-all duration-500 overflow-hidden jjk-button"
          >
            <Flame className="text-accent mb-6 transition-transform group-hover:scale-110" size={30} />
            <h3 className="text-2xl font-display uppercase mb-2">Immersive</h3>
            <p className="text-xs font-sans tracking-widest uppercase opacity-60 leading-relaxed mb-8">
              The full cursed domain.
              <br />
              Jujutsu Kaisen atmosphere.
            </p>
            <span className="text-[0.6rem] tracking-[0.3em] uppercase font-bold text-accent border-b border-accent pb-1">
              Enter &rarr;
            </span>
          </button>
        </div>

        <div className="text-center mt-8">
          <button
            onClick={() => onSelect('immersive')}
            className="text-[0.6rem] font-sans uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity"
          >
            Skip &mdash; enter immersive
          </button>
        </div>
      </motion.div>
    </div>
  );
}
import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { X, Lock } from 'lucide-react';

interface DomainAuthModalProps {
  onSuccess: () => void;
  onClose: () => void;
}

export default function DomainAuthModal({ onSuccess, onClose }: DomainAuthModalProps) {
  const [passphrase, setPassphrase] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    // Focus the input when mounted
    const input = document.getElementById('domain-auth-input');
    if (input) input.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passphrase.toLowerCase() === 'tenkai') {
      onSuccess();
    } else {
      setError(true);
      setPassphrase('');
      // Shake effect timeout
      setTimeout(() => setError(false), 500);
    }
  };

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-6">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ 
          opacity: 1, 
          scale: 1, 
          y: 0,
          x: error ? [-10, 10, -10, 10, 0] : 0 
        }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ 
          duration: error ? 0.4 : 0.3,
          type: error ? "tween" : "spring"
        }}
        className="relative w-full max-w-md bg-bg border border-accent p-8 shadow-[0_0_40px_rgba(var(--color-accent),0.2)] jjk-button"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-text/50 hover:text-accent transition-colors"
        >
          <X size={20} />
        </button>

        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-12 h-12 rounded-full border-2 border-accent/30 flex items-center justify-center mb-4 text-accent">
            <Lock size={20} />
          </div>
          <h2 className="text-2xl font-display text-accent mb-2">Domain Expansion</h2>
          <p className="text-xs uppercase tracking-widest opacity-50 font-sans">
            Enter the binding vow passphrase
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              id="domain-auth-input"
              name="domain-auth-passphrase"
              type="password"
              value={passphrase}
              onChange={(e) => setPassphrase(e.target.value)}
              placeholder="Passphrase..."
              className={`w-full bg-transparent border-b py-3 text-center font-sans tracking-widest outline-none transition-colors ${
                error ? 'border-red-500 text-red-500 placeholder-red-500/50' : 'border-border focus:border-accent text-text'
              }`}
            />
          </div>
          <button 
            type="submit"
            className="w-full bg-accent text-bg py-4 font-sans text-xs uppercase tracking-[0.3em] font-bold hover:opacity-90 transition-opacity jjk-button"
          >
            Unseal
          </button>
        </form>

        {/* Decorative corner accents */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-accent" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-accent" />
      </motion.div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { X, Lock, ArrowRight } from 'lucide-react';

interface ZenAuthModalProps {
  onSuccess: () => void;
  onClose: () => void;
}

export default function ZenAuthModal({ onSuccess, onClose }: ZenAuthModalProps) {
  const [passphrase, setPassphrase] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    const input = document.getElementById('zen-auth-input');
    if (input) input.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passphrase.toLowerCase() === 'tenkai') {
      onSuccess();
    } else {
      setError(true);
      setPassphrase('');
      setTimeout(() => setError(false), 500);
    }
  };

  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      />

      <motion.div
        initial={{ opacity: 0, y: 12, scale: 0.98 }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
          x: error ? [-10, 10, -10, 10, 0] : 0,
        }}
        exit={{ opacity: 0, y: 12, scale: 0.98 }}
        transition={{ duration: error ? 0.4 : 0.25, type: error ? 'tween' : 'spring', damping: 24, stiffness: 200 }}
        className="relative w-full max-w-md bg-zen-bg border border-zen-border p-8 text-zen-text font-zen shadow-2xl"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zen-ink/50 hover:text-zen-accent transition-colors"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <div className="flex items-start justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <span className={`w-10 h-10 ${error ? 'text-zen-active' : 'text-zen-accent'}`}>
              <Lock size={20} />
            </span>
            <div>
              <h2 className="font-zen font-semibold tracking-tight normal-case text-xl">Restricted access</h2>
              <p className="text-sm text-zen-ink/70">Admin authentication required</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="zen-auth-input" className="text-xs uppercase tracking-wider text-zen-ink/60">
              Passphrase
            </label>
            <input
              id="zen-auth-input"
              name="zen-auth-passphrase"
              type="password"
              value={passphrase}
              onChange={(e) => setPassphrase(e.target.value)}
              placeholder="••••••••"
              className={`mt-2 w-full bg-transparent border-b py-2 font-zen outline-none transition-colors ${
                error ? 'border-zen-active text-zen-active placeholder-zen-ink/40' : 'border-zen-border focus:border-zen-accent text-zen-text'
              }`}
            />
          </div>
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-zen-text text-zen-bg py-3 text-sm font-medium uppercase tracking-wider hover:opacity-80 transition-opacity"
          >
            Authenticate <ArrowRight size={16} />
          </button>
        </form>
      </motion.div>
    </div>
  );
}
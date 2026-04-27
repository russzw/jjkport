import { useEffect } from 'react';
import { motion } from 'motion/react';
import { X, BookOpen } from 'lucide-react';
import { JournalEntry } from '../types/portfolio';

interface ArticleModalProps {
  article: JournalEntry;
  onClose: () => void;
}

export default function ArticleModal({ article, onClose }: ArticleModalProps) {
  useEffect(() => {
    // Prevent scrolling on the body when modal is open
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 md:p-8">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-bg/90 backdrop-blur-md"
      />

      {/* Modal Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.4, type: 'spring' }}
        className="relative w-full max-w-4xl max-h-full bg-bg border border-accent/50 shadow-[0_0_40px_rgba(var(--color-accent),0.1)] flex flex-col jjk-button"
      >
        {/* Header */}
        <div className="flex justify-between items-start p-6 md:p-10 border-b border-border shrink-0 bg-black/20">
          <div>
            <div className="flex items-center gap-3 text-accent mb-4">
              <BookOpen size={20} />
              <span className="text-xs tracking-[0.3em] uppercase">Grimoire Entry</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-display leading-tight">{article.title}</h2>
            <div className="text-xs uppercase tracking-widest opacity-50 mt-4">{article.date}</div>
          </div>
          <button 
            onClick={onClose}
            className="text-text/50 hover:text-accent transition-colors shrink-0 p-2"
          >
            <X size={28} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 scrollbar-hide">
          <div className="prose prose-invert prose-p:font-sans prose-p:leading-relaxed prose-p:opacity-80 max-w-none whitespace-pre-wrap">
            {article.content || (
              <em className="opacity-50 text-center block py-20">
                The contents of this scroll have been sealed or not yet inscribed.
              </em>
            )}
          </div>
        </div>

        {/* Decorative corner accents */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-accent pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-accent pointer-events-none" />
      </motion.div>
    </div>
  );
}

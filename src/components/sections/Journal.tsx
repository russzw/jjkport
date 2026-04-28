import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen } from 'lucide-react';
import { JournalEntry } from '../../types/portfolio';
import ArticleModal from '../ArticleModal';

interface JournalProps {
  data: JournalEntry[];
}

export default function Journal({ data }: JournalProps) {
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);

  return (
    <section id="journal" className="py-32 px-6 max-w-7xl mx-auto relative">
      
      <AnimatePresence>
        {selectedEntry && (
          <ArticleModal 
            article={selectedEntry} 
            onClose={() => setSelectedEntry(null)} 
          />
        )}
      </AnimatePresence>

      <div className="flex justify-between items-end mb-16">
        <div>
          <div className="section-label">// 06 &nbsp;&nbsp; The Grimoire</div>
          <h2 className="text-4xl md:text-6xl">Journal of <br/>Techniques</h2>

        </div>
        <a href="#" className="text-accent text-xs tracking-widest uppercase border-b border-accent pb-1 hover:opacity-70 transition-opacity">
          All Entries →
        </a>
      </div>
      
      <div className="grid md:grid-cols-3 gap-1px bg-border">
        {data.map((post, i) => (
          <motion.div
            key={post.title}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="bg-bg p-8 md:p-12 group hover:bg-current/[0.03] transition-colors relative"

          >
            <div className="text-[0.6rem] tracking-widest uppercase opacity-40 mb-4 text-center">{post.date}</div>
            <h3 className="text-xl mb-4 group-hover:text-accent transition-colors text-center">{post.title}</h3>
            <p className="text-sm opacity-60 mb-8 leading-relaxed text-center">{post.excerpt}</p>
            <button 
              onClick={() => setSelectedEntry(post)}
              className="text-accent text-xs tracking-widest uppercase flex items-center gap-2 mt-auto mx-auto"
            >
              <BookOpen size={14} /> Open Scroll
            </button>
            <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-accent transition-all group-hover:w-full" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

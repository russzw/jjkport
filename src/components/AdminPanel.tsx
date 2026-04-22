import { motion } from 'motion/react';
import { X, Plus, Trash2 } from 'lucide-react';
import { PortfolioData } from '../types/portfolio';

interface AdminPanelProps {
  data: PortfolioData;
  onSave: (data: PortfolioData) => void;
  onClose: () => void;
}

export default function AdminPanel({ data, onSave, onClose }: AdminPanelProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 100 }}
      className="fixed inset-0 z-[200] bg-bg overflow-y-auto p-6 md:p-12 lg:p-20"
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-12 border-b border-border pb-8">
          <h1 className="text-4xl font-display uppercase tracking-widest text-accent flex items-center gap-4">
            <div className="w-8 h-8 bg-accent animate-spin-slow rotate-45" />
            Technique Scroll Editor
          </h1>
          <button onClick={onClose} className="text-text hover:text-accent transition-colors">
            <X size={32} />
          </button>
        </div>

        <div className="space-y-16">
          {/* HERO SECTION */}
          <section>
            <h3 className="section-label text-accent mb-6 font-bold">// 01 HERO OVERRIDE</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[0.6rem] uppercase tracking-widest opacity-50 mb-2">First Name</label>
                <input 
                  value={data.hero.name} 
                  onChange={e => onSave({...data, hero: {...data.hero, name: e.target.value}})}
                  className="w-full bg-white/5 border border-border p-4 outline-none focus:border-accent"
                />
              </div>
              <div>
                <label className="block text-[0.6rem] uppercase tracking-widest opacity-50 mb-2">Last Name</label>
                <input 
                  value={data.hero.surname} 
                  onChange={e => onSave({...data, hero: {...data.hero, surname: e.target.value}})}
                  className="w-full bg-white/5 border border-border p-4 outline-none focus:border-accent"
                />
              </div>
              <div className="md:col-span-2">
                 <label className="block text-[0.6rem] uppercase tracking-widest opacity-50 mb-2">Technique Title</label>
                 <input 
                  value={data.hero.title} 
                  onChange={e => onSave({...data, hero: {...data.hero, title: e.target.value}})}
                  className="w-full bg-white/5 border border-border p-4 outline-none focus:border-accent"
                />
              </div>
            </div>
          </section>

          {/* JOURNAL SECTION */}
          <section>
            <div className="flex justify-between items-center mb-6">
              <h3 className="section-label text-accent font-bold mb-0">// 02 THE GRIMOIRE</h3>
              <button 
                onClick={() => onSave({...data, journal: [{date: 'New Date', title: 'New Entry', excerpt: 'Start writing...'}, ...data.journal]})}
                className="flex items-center gap-2 text-xs bg-accent/20 text-accent px-4 py-2 hover:bg-accent hover:text-bg transition-all"
              >
                <Plus size={14} /> Add Entry
              </button>
            </div>
            <div className="space-y-4">
              {data.journal.map((post, idx) => (
                <div key={idx} className="glass-panel p-6 flex flex-col gap-4 relative group">
                  <button 
                    onClick={() => onSave({...data, journal: data.journal.filter((_, i) => i !== idx)})}
                    className="absolute top-4 right-4 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 size={16} />
                  </button>
                  <input value={post.date} onChange={e => {
                    const updated = [...data.journal]; updated[idx].date = e.target.value; onSave({...data, journal: updated});
                  }} className="bg-transparent text-accent text-xs font-bold w-full outline-none" />
                  <input value={post.title} onChange={e => {
                    const updated = [...data.journal]; updated[idx].title = e.target.value; onSave({...data, journal: updated});
                  }} className="bg-transparent text-xl font-display w-full outline-none" />
                  <textarea value={post.excerpt} onChange={e => {
                    const updated = [...data.journal]; updated[idx].excerpt = e.target.value; onSave({...data, journal: updated});
                  }} className="bg-transparent text-sm opacity-60 w-full outline-none resize-none" rows={2} />
                </div>
              ))}
            </div>
          </section>

          {/* TESTIMONIALS */}
          <section>
            <div className="flex justify-between items-center mb-6">
              <h3 className="section-label text-accent font-bold mb-0">// 03 VOID ECHOES (TESTIMONIALS)</h3>
              <button 
                onClick={() => onSave({...data, testimonials: [{name: 'Name', role: 'Role', text: 'Quote content'}, ...data.testimonials]})}
                className="flex items-center gap-2 text-xs bg-accent/20 text-accent px-4 py-2 hover:bg-accent hover:text-bg transition-all"
              >
                <Plus size={14} /> Add Testimonial
              </button>
            </div>
            <div className="space-y-4">
              {data.testimonials.map((t, idx) => (
                <div key={idx} className="glass-panel p-6 flex flex-col gap-4 relative group">
                  <button 
                    onClick={() => onSave({...data, testimonials: data.testimonials.filter((_, i) => i !== idx)})}
                    className="absolute top-4 right-4 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 size={16} />
                  </button>
                  <div className="grid grid-cols-2 gap-4">
                    <input value={t.name} onChange={e => {
                      const updated = [...data.testimonials]; updated[idx].name = e.target.value; onSave({...data, testimonials: updated});
                    }} className="bg-white/5 p-2 outline-none" placeholder="Name" />
                    <input value={t.role} onChange={e => {
                      const updated = [...data.testimonials]; updated[idx].role = e.target.value; onSave({...data, testimonials: updated});
                    }} className="bg-white/5 p-2 outline-none" placeholder="Role" />
                  </div>
                  <textarea value={t.text} onChange={e => {
                    const updated = [...data.testimonials]; updated[idx].text = e.target.value; onSave({...data, testimonials: updated});
                  }} className="bg-transparent italic text-sm opacity-80 w-full outline-none resize-none" rows={3} />
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="mt-20 border-t border-border pt-12 text-center text-[0.6rem] uppercase tracking-widest opacity-30">
          End of Binding Vow Editor
        </div>
      </div>
    </motion.div>
  );
}

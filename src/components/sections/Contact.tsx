import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Github, Linkedin, Send, Twitter, Instagram, Loader2, CheckCircle2, XCircle } from 'lucide-react';
import { ContactData } from '../../types/portfolio';
import { saveMessage } from '../../lib/firestore';

interface ContactProps {
  data: ContactData;
}

export default function Contact({ data }: ContactProps) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    setStatus('loading');
    try {
      await saveMessage({
        ...formData,
        createdAt: Date.now(),
        read: false
      });
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      
      // Easter Egg: Domain Expansion (Gravity Inversion)
      document.body.style.transition = "transform 2s cubic-bezier(0.87, 0, 0.13, 1)";
      document.body.style.transform = "rotate(180deg) scale(0.95)";
      
      setTimeout(() => {
        document.body.style.transform = "rotate(0deg) scale(1)";
        setTimeout(() => {
          document.body.style.transition = "";
          document.body.style.transform = ""; // Explicitly clear transform to restore native scrolling performance
          setStatus('idle');
        }, 2000);
      }, 5000); // Revert after 5 seconds

    } catch (err) {
      console.error(err);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <section id="contact" className="py-32 px-6 bg-current/[0.02]">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <div className="section-label">// 07 &nbsp;&nbsp; Open a Channel</div>
          <h2 className="text-6xl mb-8 leading-none">
            Let's Build <br/>Something <br/><em className="text-accent not-italic">Cursed</em>
          </h2>
          <p className="text-lg opacity-70 mb-12 max-w-md">
            Whether it's a new project, a collaboration, or you just want to talk tech — my domain is always open.
          </p>
          
          <div className="space-y-4">
            {[
              { icon: Mail, label: data.email, href: `mailto:${data.email}` },
              { icon: Github, label: `github.com/${data.github}`, href: `https://github.com/${data.github}` },
              { icon: Linkedin, label: `linkedin.com/in/${data.linkedin}`, href: `https://linkedin.com/in/${data.linkedin}` },
              { icon: Twitter, label: `x.com/${data.twitter}`, href: `https://x.com/${data.twitter}` },
              { icon: Instagram, label: `instagram.com/${data.instagram}`, href: `https://instagram.com/${data.instagram}` },
            ].map(link => (
              <a 
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 border border-border hover:border-accent hover:bg-accent/5 transition-all group jjk-button"
              >
                <link.icon className="text-accent group-hover:scale-110 transition-transform" size={20} />
                <span className="text-xs tracking-widest uppercase">{link.label}</span>
              </a>
            ))}
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="glass-panel p-12 jjk-button"
        >
          <form onSubmit={handleSubmit} className="space-y-8 relative">
            
            <AnimatePresence>
              {status !== 'idle' && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-10 bg-bg/90 backdrop-blur-sm flex items-center justify-center border border-accent/20"
                >
                  <div className="text-center font-sans tracking-widest uppercase flex flex-col items-center gap-4">
                    {status === 'loading' && (
                      <>
                        <Loader2 className="animate-spin text-accent" size={32} />
                        <span className="text-xs text-accent animate-pulse">Forging Transmission...</span>
                      </>
                    )}
                    {status === 'success' && (
                      <>
                        <CheckCircle2 className="text-green-500" size={32} />
                        <span className="text-xs text-green-500">Transmission Delivered</span>
                      </>
                    )}
                    {status === 'error' && (
                      <>
                        <XCircle className="text-red-500" size={32} />
                        <span className="text-xs text-red-500">Curse Blocked Transmission</span>
                      </>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-2">
              <label htmlFor="contact-name" className="text-[0.6rem] tracking-widest uppercase opacity-50">Your Name</label>
              <input 
                id="contact-name"
                name="contact-name"
                required
                disabled={status !== 'idle'}
                type="text" 
                value={formData.name}
                onChange={e => setFormData(p => ({...p, name: e.target.value}))}
                className="w-full bg-transparent border-b border-border py-4 focus:border-accent outline-none transition-colors font-sans" 
                placeholder="Gojo Satoru" 
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="contact-email" className="text-[0.6rem] tracking-widest uppercase opacity-50">Email Channel</label>
              <input 
                id="contact-email"
                name="contact-email"
                required
                disabled={status !== 'idle'}
                type="email" 
                value={formData.email}
                onChange={e => setFormData(p => ({...p, email: e.target.value}))}
                className="w-full bg-transparent border-b border-border py-4 focus:border-accent outline-none transition-colors font-sans" 
                placeholder="void@jujutsu.tech" 
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="contact-message" className="text-[0.6rem] tracking-widest uppercase opacity-50">Cursed Message</label>
              <textarea 
                id="contact-message"
                name="contact-message"
                required
                disabled={status !== 'idle'}
                rows={4} 
                value={formData.message}
                onChange={e => setFormData(p => ({...p, message: e.target.value}))}
                className="w-full bg-transparent border-b border-border py-4 focus:border-accent outline-none transition-colors font-sans resize-none" 
                placeholder="Describe the cursed technique you need crafted..." 
              />
            </div>
            <button 
              disabled={status !== 'idle'}
              className="w-full py-6 bg-accent text-bg font-display text-xl uppercase tracking-widest hover:bg-secondary transition-colors flex items-center justify-center gap-4 jjk-button group disabled:opacity-50"
            >
              <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /> 
              <span>Transmit Message</span>
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}

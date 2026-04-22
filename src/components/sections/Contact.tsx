import { motion } from 'motion/react';
import { Mail, Github, Linkedin, Send } from 'lucide-react';
import { ContactData } from '../../types/portfolio';

interface ContactProps {
  data: ContactData;
}

export default function Contact({ data }: ContactProps) {
  return (
    <section id="contact" className="py-32 px-6 bg-current/[0.02]">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <div className="section-label">// 06 &nbsp;&nbsp; Open a Channel</div>
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
            ].map(link => (
              <a 
                key={link.label}
                href={link.href}
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
          <form className="space-y-8">
            <div className="space-y-2">
              <label className="text-[0.6rem] tracking-widest uppercase opacity-50">Your Name</label>
              <input type="text" className="w-full bg-transparent border-b border-border py-4 focus:border-accent outline-none transition-colors font-sans" placeholder="Gojo Satoru" />
            </div>
            <div className="space-y-2">
              <label className="text-[0.6rem] tracking-widest uppercase opacity-50">Email Channel</label>
              <input type="email" className="w-full bg-transparent border-b border-border py-4 focus:border-accent outline-none transition-colors font-sans" placeholder="void@jujutsu.tech" />
            </div>
            <div className="space-y-2">
              <label className="text-[0.6rem] tracking-widest uppercase opacity-50">Cursed Message</label>
              <textarea rows={4} className="w-full bg-transparent border-b border-border py-4 focus:border-accent outline-none transition-colors font-sans resize-none" placeholder="Describe the cursed technique you need crafted..." />
            </div>
            <button className="w-full py-6 bg-accent text-bg font-display text-xl uppercase tracking-widest hover:bg-secondary transition-colors flex items-center justify-center gap-4 jjk-button group">
              <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /> 
              <span>Transmit Message</span>
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}

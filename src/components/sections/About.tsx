import { motion } from 'motion/react';
import { AboutData } from '../../types/portfolio';

interface AboutProps {
  data: AboutData;
  theme: 'gojo' | 'sukuna';
}

export default function About({ data, theme }: AboutProps) {
  return (
    <section id="about" className="py-32 px-6 max-w-7xl mx-auto">
      <div className="section-label">// 01 &nbsp;&nbsp; About the Sorcerer</div>
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-6xl mb-8 leading-none">
            Architect of the <em className="text-accent not-italic">Impossible</em>
          </h2>
          <p className="text-lg leading-relaxed opacity-80 mb-8">
            {data.bio}
          </p>
          <div className="grid grid-cols-2 gap-4 mb-8">
            {data.stats.map(stat => (
              <div key={stat.label} className="glass-panel p-6 jjk-button">
                <div className="text-4xl font-heading text-accent">{stat.val}</div>
                <div className="text-[0.6rem] tracking-widest uppercase opacity-50">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
        
        <div className="relative aspect-[3/4] max-w-sm mx-auto w-full">
          <div className="absolute inset-0 border border-accent/20 translate-x-4 translate-y-4 jjk-button" />
          <div className="absolute inset-0 border border-secondary/20 -translate-x-4 -translate-y-4 jjk-button" />
          <div className="absolute inset-4 glass-panel overflow-hidden jjk-button">
            <img 
              src={theme === 'sukuna' 
                ? "https://picsum.photos/seed/sukuna/800/1000" 
                : "https://picsum.photos/seed/gojo/800/1000"
              } 
              alt="Profile"
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

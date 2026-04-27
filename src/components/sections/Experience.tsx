import { motion } from 'motion/react';
import { Briefcase, ChevronRight } from 'lucide-react';
import { ExperienceEntry } from '../../types/portfolio';

interface ExperienceProps {
  data: ExperienceEntry[];
}

export default function Experience({ data }: ExperienceProps) {
  return (
    <section id="experience" className="py-32 px-6 bg-current/[0.02]">
      <div className="max-w-7xl mx-auto">
        <div className="section-label">// 03 &nbsp;&nbsp; Binding Vow History</div>
        <h2 className="text-6xl mb-16">Mission <br/>Record</h2>
        
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-accent via-accent/40 to-transparent hidden md:block" />
          <div className="absolute left-6 top-0 bottom-0 w-[1px] bg-gradient-to-b from-accent via-accent/40 to-transparent md:hidden" />
          
          <div className="space-y-16 md:space-y-24">
            {data.map((entry, i) => (
              <motion.div
                key={`${entry.company}-${i}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                className={`relative flex flex-col md:flex-row gap-8 md:gap-16 ${
                  i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline node */}
                <div className="absolute left-6 md:left-1/2 top-0 -translate-x-1/2 z-10">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 + 0.2, type: 'spring' }}
                    className="w-12 h-12 bg-bg border-2 border-accent flex items-center justify-center jjk-button"
                  >
                    <Briefcase size={18} className="text-accent" />
                  </motion.div>
                </div>

                {/* Content card */}
                <div className={`flex-1 pl-16 md:pl-0 ${i % 2 === 0 ? 'md:pr-20 md:text-right' : 'md:pl-20'}`}>
                  <div className="glass-panel p-8 md:p-10 jjk-button group hover:border-accent/50 transition-all duration-500 relative overflow-hidden">
                    {/* Hover glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="relative z-10">
                      <span className="text-[0.6rem] tracking-[0.4em] uppercase text-accent font-bold">{entry.period}</span>
                      <h3 className="text-3xl mt-3 mb-1 group-hover:text-accent transition-colors duration-300">{entry.role}</h3>
                      <p className="text-sm tracking-widest uppercase opacity-50 mb-6 font-sans">{entry.company}</p>
                      
                      <ul className={`space-y-3 ${i % 2 === 0 ? 'md:ml-auto' : ''}`}>
                        {entry.achievements.map((achievement, j) => (
                          <motion.li
                            key={j}
                            initial={{ opacity: 0, x: i % 2 === 0 ? 20 : -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.15 + j * 0.1 + 0.3 }}
                            className={`flex items-start gap-3 text-sm opacity-70 leading-relaxed ${
                              i % 2 === 0 ? 'md:flex-row-reverse md:text-left' : ''
                            }`}
                          >
                            <ChevronRight size={14} className="text-accent mt-0.5 shrink-0" />
                            <span>{achievement}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Empty spacer for the other side */}
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

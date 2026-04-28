import { motion } from 'motion/react';
import { SkillCategory } from '../../types/portfolio';

interface SkillsProps {
  data: SkillCategory[];
}

export default function Skills({ data }: SkillsProps) {
  return (
    <section id="skills" className="py-32 px-6 bg-current/[0.02]">
      <div className="max-w-7xl mx-auto">
        <div className="section-label">// 02 &nbsp;&nbsp; Cursed Techniques</div>
        <h2 className="text-4xl md:text-6xl mb-16">My Arsenal of <br/>Techniques</h2>

        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-1px bg-border">
          {data.map((domain, i) => (
            <motion.div
              key={domain.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-bg p-8 md:p-12 group hover:bg-current/[0.03] transition-colors relative overflow-hidden"

            >
              <div className="text-accent font-heading text-4xl mb-4 opacity-20 group-hover:opacity-100 transition-opacity">0{i+1}</div>
              <h3 className="text-2xl mb-4">{domain.title}</h3>
              <p className="text-sm opacity-60 mb-8 leading-relaxed">{domain.desc}</p>
              <div className="flex flex-wrap gap-2">
                {domain.skills.map(s => (
                  <span key={s} className="text-[0.6rem] tracking-widest uppercase border border-border px-2 py-1 group-hover:border-accent transition-colors">{s}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

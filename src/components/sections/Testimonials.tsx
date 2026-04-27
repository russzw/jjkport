import { motion } from 'motion/react';
import { Quote } from 'lucide-react';
import { Testimonial } from '../../types/portfolio';

interface TestimonialsProps {
  data: Testimonial[];
}

export default function Testimonials({ data }: TestimonialsProps) {
  return (
    <section className="py-32 px-6 bg-current/[0.02]">
      <div className="max-w-7xl mx-auto">
        <div className="section-label">// 05 &nbsp;&nbsp; Sorcerer Testimonials</div>
        <h2 className="text-6xl mb-16">What Others <br/>Say</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {data.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-panel p-10 jjk-button"
            >
              <Quote className="text-accent mb-6 opacity-20" size={40} />
              <p className="text-lg italic opacity-80 mb-8 leading-relaxed">"{t.text}"</p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center font-display text-accent">
                  {t.name[0]}
                </div>
                <div>
                  <div className="text-sm font-display">{t.name}</div>
                  <div className="text-[0.6rem] tracking-widest uppercase opacity-50">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

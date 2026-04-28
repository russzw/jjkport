import { motion } from 'motion/react';
import { ExternalLink, Github } from 'lucide-react';
import { Project } from '../../types/portfolio';
import { cn } from '../../lib/utils';

interface ProjectsProps {
  data: Project[];
}

export default function Projects({ data }: ProjectsProps) {
  return (
    <section id="projects" className="py-24 md:py-32 px-6 max-w-7xl mx-auto">
      <div className="section-label">// 04 &nbsp;&nbsp; Cursed Techniques Applied</div>
      <h2 className="text-4xl md:text-6xl mb-12 md:mb-16">Featured <br/>Missions</h2>
      
      <div className="grid gap-16 md:gap-32">
        {data.map((project, i) => (
          <motion.div 
            key={project.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={cn(
              "flex flex-col md:flex-row gap-8 md:gap-16 items-center",
              i % 2 !== 0 && "md:flex-row-reverse"
            )}
          >
            <div className="flex-1 w-full aspect-video overflow-hidden glass-panel jjk-button group">
              <img 
                src={project.imageUrl || `/images/project-${project.id}.png`} 
                alt={project.title}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
              />
            </div>
            <div className="flex-1 w-full">
              <span className="font-sans text-accent text-[0.6rem] md:text-xs tracking-[0.4em] uppercase">{project.type}</span>
              <h3 className="text-3xl md:text-5xl mt-2 md:mt-4 mb-4 md:mb-6">{project.title}</h3>
              <p className="text-base md:text-lg opacity-70 mb-6 md:mb-8 leading-relaxed">
                {project.desc}
              </p>
              <div className="flex flex-wrap gap-2 md:gap-3 mb-6 md:mb-8">
                {project.stack.map(s => (
                  <span key={s} className="text-[0.6rem] tracking-widest uppercase border border-accent/30 px-3 py-1">{s}</span>
                ))}
              </div>
              <div className="flex gap-8">
                {project.demoUrl && (
                  <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[0.6rem] md:text-xs tracking-widest uppercase hover:text-accent transition-colors">
                    <ExternalLink size={14} /> Live Demo
                  </a>
                )}
                {project.repoUrl && (
                  <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[0.6rem] md:text-xs tracking-widest uppercase hover:text-accent transition-colors">
                    <Github size={14} /> Source
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

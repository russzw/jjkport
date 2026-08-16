import { useState, useEffect } from 'react';
import { Sun, Moon, Flame, ArrowUpRight, Home, User, Wrench, Briefcase, FolderGit2, NotebookPen, Mail } from 'lucide-react';
import { PortfolioData } from '../types/portfolio';

interface ZenPortfolioProps {
  data: PortfolioData;
  onSwitchMode: () => void;
}

const NAV_ITEMS: { label: string; href: string; icon: typeof User }[] = [
  { label: 'Home', href: '#top', icon: Home },
  { label: 'About', href: '#about', icon: User },
  { label: 'Skills', href: '#skills', icon: Wrench },
  { label: 'Experience', href: '#experience', icon: Briefcase },
  { label: 'Projects', href: '#projects', icon: FolderGit2 },
  { label: 'Journal', href: '#journal', icon: NotebookPen },
  { label: 'Contact', href: '#contact', icon: Mail },
];

const LINK_CLASS =
  'text-zen-accent hover:text-zen-active underline decoration-dotted underline-offset-4 transition-colors';

function HashHeading({ prefix, text, scale }: { prefix: string; text: string; scale: string }) {
  return (
    <h1 className={`font-zen font-bold normal-case tracking-normal text-zen-text ${scale} mb-2`}>
      <span className="text-zen-accent">{prefix}</span> {text}
    </h1>
  );
}

function Hr() {
  return <hr className="border-t border-dashed border-zen-border my-[18px]" />;
}

function IconNav({ onSwitchMode }: { onSwitchMode: () => void }) {
  return (
    <nav className="grid grid-cols-4 sm:grid-cols-8 gap-x-2 gap-y-4 justify-items-center">
      {NAV_ITEMS.map(item => {
        const Icon = item.icon;
        return (
          <a
            key={item.label}
            href={item.href}
            className="flex flex-col items-center gap-1 text-zen-ink/80 hover:text-zen-accent transition-colors"
          >
            <Icon size={18} strokeWidth={1.75} />
            <span className="text-xs">{item.label}</span>
          </a>
        );
      })}
      <button
        onClick={onSwitchMode}
        className="flex flex-col items-center gap-1 text-zen-ink/80 hover:text-zen-active transition-colors"
        aria-label="Switch to immersive experience"
        title="Switch to immersive experience"
      >
        <Flame size={18} strokeWidth={1.75} />
        <span className="text-xs">Immersive</span>
      </button>
    </nav>
  );
}

export default function ZenPortfolio({ data, onSwitchMode }: ZenPortfolioProps) {
  const [dark, setDark] = useState(false);
  const year = new Date().getFullYear();
  const fullName = `${data.hero.name} ${data.hero.surname}`;

  useEffect(() => {
    const saved = localStorage.getItem('jjk_zen_theme');
    setDark(saved === 'dark');
  }, []);

  useEffect(() => {
    if (dark) {
      document.documentElement.setAttribute('data-zen-theme', 'dark');
      localStorage.setItem('jjk_zen_theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-zen-theme');
      localStorage.setItem('jjk_zen_theme', 'light');
    }
  }, [dark]);

  return (
    <div className="relative min-h-screen font-zen text-[15px] leading-relaxed bg-zen-bg text-zen-text">
      <div className="max-w-[70ch] mx-auto px-4 sm:px-6 py-8">
        <header>
          <div className="flex items-center justify-between gap-3">
            <p className="min-w-0 text-zen-ink">
              <strong className="font-bold text-zen-text">{fullName}</strong>
              <span className="text-zen-ink/70 block sm:inline sm:ml-2">{data.hero.role}</span>
            </p>
            <button
              onClick={() => setDark(prev => !prev)}
              className="shrink-0 text-zen-ink/70 hover:text-zen-accent transition-colors"
              aria-label="Toggle light / dark theme"
              title="Toggle light / dark"
            >
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>

          <div className="mt-6">
            <IconNav onSwitchMode={onSwitchMode} />
          </div>
        </header>

        <Hr />

        <main id="top">
          <article>
            <HashHeading prefix="#" text="Welcome" scale="text-[1.5rem]" />

            <p className="mb-4">
              Hello & welcome! I'm <strong className="font-bold text-zen-text">{fullName}</strong> — a{' '}
              {data.hero.role.toLowerCase()} specialising in building robust, scalable products from the ground up.
              You can read more in the <a href="#about" className={LINK_CLASS}>About</a> section, or browse my{' '}
              <a href="#projects" className={LINK_CLASS}>Projects</a>.
            </p>

            <p className="mb-4">
              Along the way I've shipped{' '}
              {data.about.stats.map((s, i) => (
                <span key={s.label}>
                  <strong className="font-bold text-zen-text">{s.val}</strong> {s.label.toLowerCase()}
                  {i < data.about.stats.length - 2 ? ', ' : i < data.about.stats.length - 1 ? ' & ' : ''}
                </span>
              ))}
            </p>

            <p>
              Fan of TypeScript, React & Next.js, AWS, and everything AI.{' '}
              <a href="#contact" className={LINK_CLASS}>Get in touch</a> if you'd like to work together.
            </p>
          </article>
        </main>

        <Hr />

        <section id="about">
          <HashHeading prefix="##" text="About" scale="text-[1.15rem]" />
          <p className="mb-4">{data.about.realBio}</p>
          <p className="mb-4">{data.about.bio}</p>
        </section>

        <Hr />

        <section id="skills">
          <HashHeading prefix="##" text="Skills" scale="text-[1.15rem]" />

          <div className="grid sm:grid-cols-2 gap-x-10 gap-y-8">
            {data.skills.map(cat => (
              <article key={cat.title}>
                <h3 className="font-zen font-bold normal-case text-zen-text text-[1rem] mb-1">
                  <span className="text-zen-accent">###</span> {cat.title}
                </h3>
                <p className="text-zen-ink/70 mb-2">{cat.desc}</p>
                <p className="text-zen-ink">{cat.skills.join(' · ')}</p>
              </article>
            ))}
          </div>
        </section>

        <Hr />

        <section id="experience">
          <HashHeading prefix="##" text="Experience" scale="text-[1.15rem]" />

          {data.experience.map(entry => (
            <article key={`${entry.company}-${entry.period}`} className="mb-8">
              <h3 className="font-zen font-bold normal-case text-zen-text text-[1rem] mb-1">
                <span className="text-zen-accent">###</span> {entry.role} — {entry.company}
              </h3>
              <p className="text-zen-ink/60 text-sm mb-3">{entry.period}</p>
              <ul className="space-y-1.5 text-zen-ink">
                {entry.achievements.map(a => (
                  <li key={a} className="flex items-start gap-3">
                    <span className="text-zen-accent shrink-0">-</span>
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </section>

        <Hr />

        <section id="projects">
          <HashHeading prefix="##" text="Projects" scale="text-[1.15rem]" />

          {data.projects.map(project => (
            <article key={project.id} className="mb-8">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-zen font-bold normal-case text-zen-text text-[1rem]">
                  <span className="text-zen-accent">###</span> {project.title}
                </h3>
                <span className="text-xs text-zen-ink/50 ml-3 shrink-0">({project.type})</span>
              </div>
              <p className="text-zen-ink mb-1">{project.desc}</p>
              <p className="text-zen-ink/60 mb-2">
                <em>Tools: {project.stack.join(', ')}</em>
              </p>
              <p className="text-sm">
                {project.demoUrl && (
                  <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className={`mr-6 ${LINK_CLASS}`}>
                    Demo <ArrowUpRight size={13} className="inline -mt-0.5" />
                  </a>
                )}
                {project.repoUrl && (
                  <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className={LINK_CLASS}>
                    Source <ArrowUpRight size={13} className="inline -mt-0.5" />
                  </a>
                )}
              </p>
            </article>
          ))}
        </section>

        <Hr />

        <section id="journal">
          <HashHeading prefix="##" text="Journal" scale="text-[1.15rem]" />

          {data.journal.map(entry => (
            <article key={entry.title} className="mb-6">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-zen font-bold normal-case text-zen-text text-[1rem]">
                  <span className="text-zen-accent">###</span> {entry.title}
                </h3>
                <span className="text-xs text-zen-ink/50 ml-3 shrink-0">{entry.date}</span>
              </div>
              <p className="text-zen-ink">{entry.excerpt}</p>
            </article>
          ))}
        </section>

        <Hr />

        <section id="contact">
          <HashHeading prefix="##" text="Contact" scale="text-[1.15rem]" />

          <p className="mb-2">
            Whether it's a project, a collaboration, or just to talk tech, — reach out via the channels below:
          </p>
          <p className="text-zen-ink">
            Email:{' '}
            <a href={`mailto:${data.contact.email}`} className={`${LINK_CLASS} break-all`}>
              {data.contact.email}
            </a>
            <span className="mx-3 text-zen-ink/50">·</span>
            GitHub:{' '}
            <a
              href={`https://github.com/${data.contact.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className={LINK_CLASS}
            >
              {data.contact.github} <ArrowUpRight size={13} className="inline -mt-0.5" />
            </a>
            <span className="mx-3 text-zen-ink/50">·</span>
            LinkedIn:{' '}
            <a
              href={`https://linkedin.com/in/${data.contact.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              className={LINK_CLASS}
            >
              {data.contact.linkedin} <ArrowUpRight size={13} className="inline -mt-0.5" />
            </a>
            <span className="mx-3 text-zen-ink/50">·</span>
            X:{' '}
            <a
              href={`https://x.com/${data.contact.twitter}`}
              target="_blank"
              rel="noopener noreferrer"
              className={LINK_CLASS}
            >
              {data.contact.twitter} <ArrowUpRight size={13} className="inline -mt-0.5" />
            </a>
          </p>
        </section>

        <Hr />

        <footer className="flex flex-wrap items-center justify-between gap-4 text-sm text-zen-ink/60">
          <p>
            &copy; {year} {fullName}
          </p>
          <button
            onClick={onSwitchMode}
            className="flex items-center gap-1.5 text-zen-accent hover:text-zen-active transition-colors"
          >
            <Flame size={15} /> Switch to immersive experience
          </button>
        </footer>
      </div>
    </div>
  );
}
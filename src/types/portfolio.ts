export interface HeroData {
  name: string;
  surname: string;
  title: string;
  jpQuote: string;
}

export interface AboutStat {
  label: string;
  val: string;
}

export interface AboutData {
  bio: string;
  stats: AboutStat[];
}

export interface SkillCategory {
  title: string;
  desc: string;
  skills: string[];
}

export interface Project {
  id: string;
  title: string;
  type: string;
  desc: string;
  stack: string[];
}

export interface Testimonial {
  name: string;
  role: string;
  text: string;
}

export interface JournalEntry {
  date: string;
  title: string;
  excerpt: string;
}

export interface ContactData {
  email: string;
  github: string;
  linkedin: string;
}

export interface PortfolioData {
  hero: HeroData;
  about: AboutData;
  skills: SkillCategory[];
  projects: Project[];
  testimonials: Testimonial[];
  journal: JournalEntry[];
  contact: ContactData;
}

export interface HeroData {
  name: string;
  surname: string;
  title: string;
  role: string;
  jpQuote: string;
}

export interface AboutStat {
  label: string;
  val: string;
}

export interface AboutData {
  bio: string;
  realBio: string;
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
  demoUrl?: string;
  repoUrl?: string;
}

export interface ExperienceEntry {
  period: string;
  role: string;
  company: string;
  achievements: string[];
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
  content?: string;
}

export interface ContactData {
  email: string;
  github: string;
  linkedin: string;
  twitter: string;
  instagram: string;
}

export interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  message: string;
  createdAt: number;
  read: boolean;
}

export interface PortfolioData {
  hero: HeroData;
  about: AboutData;
  skills: SkillCategory[];
  projects: Project[];
  experience: ExperienceEntry[];
  testimonials: Testimonial[];
  journal: JournalEntry[];
  contact: ContactData;
}

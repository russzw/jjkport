import { PortfolioData } from '../types/portfolio';
import { heroData } from './hero';
import { aboutData } from './about';
import { skillsData } from './skills';
import { projectsData } from './projects';
import { experienceData } from './experience';
import { testimonialsData } from './testimonials';
import { journalData } from './journal';
import { contactData } from './contact';

export const DEFAULT_DATA: PortfolioData = {
  hero: heroData,
  about: aboutData,
  skills: skillsData,
  projects: projectsData,
  experience: experienceData,
  testimonials: testimonialsData,
  journal: journalData,
  contact: contactData
};

export * from './hero';
export * from './about';
export * from './skills';
export * from './projects';
export * from './experience';
export * from './testimonials';
export * from './journal';
export * from './contact';

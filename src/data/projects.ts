import { Project } from '../types/portfolio';

export const projectsData: Project[] = [
  { id: '01', title: 'Void Infrastructure Platform', type: 'Cloud Infrastructure', desc: 'A multi-region cloud orchestration platform built on AWS. Handles auto-scaling, cost optimisation, and zero-downtime deployments.', stack: ['AWS', 'Terraform', 'Kubernetes', 'Go'] },
  { id: '02', title: 'Cursed Commerce Engine', type: 'Full Stack Web', desc: 'E-commerce platform with real-time inventory, AI recommendations, and sub-100ms response times. 50k+ daily active users.', stack: ['Next.js', 'Node.js', 'Redis', 'PostgreSQL'] },
  { id: '03', title: 'Six Eyes Finance', type: 'Mobile App', desc: 'Personal finance tracker with AI-driven insights, budget seals, and real-time currency conversion across African markets.', stack: ['React Native', 'Expo', 'FastAPI'] },
];

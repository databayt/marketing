export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
  category: 'featured' | 'company' | 'education' | 'health' | 'ecommerce';
  technologies?: string[];
  featured?: boolean;
}

export interface ProjectSectionProps {
  dictionary?: any;
  projectsSection?: any;
  params?: { lang: string };
}

export interface ProjectCardProps {
  project: Project;
  index: number;
}
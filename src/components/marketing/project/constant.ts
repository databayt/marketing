import { Project } from './type';

export const getProjects = (locale: string = 'en'): Project[] => {
  const projects: Project[] = [
    {
      id: '1',
      title: locale === 'ar' ? 'نظام إدارة الأطباء' : 'Physician Management System',
      description: locale === 'ar' 
        ? 'منصة شاملة لإدارة الأطباء والمواعيد والسجلات الطبية'
        : 'Comprehensive platform for managing physicians, appointments, and medical records',
      image: '/marketing/projects/physician.jpg',
      link: 'https://github.com/yourusername/physician-system',
      category: 'health',
      technologies: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL'],
      featured: true
    },
    {
      id: '2',
      title: locale === 'ar' ? 'متجر التجارة الإلكترونية' : 'E-commerce Store',
      description: locale === 'ar'
        ? 'متجر إلكتروني حديث مع نظام دفع متكامل'
        : 'Modern online store with integrated payment system',
      image: '/marketing/projects/ecommerce.jpg',
      link: 'https://github.com/yourusername/ecommerce',
      category: 'ecommerce',
      technologies: ['React', 'Node.js', 'Stripe', 'MongoDB'],
      featured: true
    },
    {
      id: '3',
      title: locale === 'ar' ? 'منصة التعليم' : 'Education Platform',
      description: locale === 'ar'
        ? 'نظام إدارة التعلم مع دورات تفاعلية'
        : 'Learning management system with interactive courses',
      image: '/marketing/projects/education.jpg',
      link: 'https://github.com/yourusername/education',
      category: 'education',
      technologies: ['Vue.js', 'Django', 'PostgreSQL'],
      featured: true
    },
    {
      id: '4',
      title: locale === 'ar' ? 'موقع الشركة' : 'Company Website',
      description: locale === 'ar'
        ? 'موقع شركة احترافي مع نظام إدارة المحتوى'
        : 'Professional corporate website with CMS',
      image: '/marketing/projects/corporate.jpg',
      link: 'https://github.com/yourusername/corporate',
      category: 'company',
      technologies: ['WordPress', 'PHP', 'MySQL'],
      featured: false
    },
    {
      id: '5',
      title: locale === 'ar' ? 'تطبيق الصحة' : 'Health App',
      description: locale === 'ar'
        ? 'تطبيق لتتبع الصحة واللياقة البدنية'
        : 'Health and fitness tracking application',
      image: '/marketing/projects/health-app.jpg',
      link: 'https://github.com/yourusername/health-app',
      category: 'health',
      technologies: ['React Native', 'Firebase', 'Node.js'],
      featured: false
    },
    {
      id: '6',
      title: locale === 'ar' ? 'منصة الأعمال' : 'Business Platform',
      description: locale === 'ar'
        ? 'منصة متكاملة لإدارة الأعمال'
        : 'Integrated business management platform',
      image: '/marketing/projects/business.jpg',
      link: 'https://github.com/yourusername/business',
      category: 'company',
      technologies: ['Angular', 'Spring Boot', 'PostgreSQL'],
      featured: false
    }
  ];

  return projects;
};

export const PROJECT_CATEGORIES = [
  'featured',
  'company', 
  'education',
  'health',
  'ecommerce'
] as const;

export const getProjectTabs = (isMobile: boolean, projectsSection: any) => {
  return [
    { 
      id: 'featured', 
      label: isMobile 
        ? projectsSection?.tabsMobile?.featured || 'Featured'
        : projectsSection?.tabs?.featured || 'Featured' 
    },
    { 
      id: 'company', 
      label: isMobile 
        ? projectsSection?.tabsMobile?.company || 'Co'
        : projectsSection?.tabs?.company || 'Company' 
    },
    { 
      id: 'education', 
      label: isMobile 
        ? projectsSection?.tabsMobile?.education || 'Edu'
        : projectsSection?.tabs?.education || 'Education' 
    },
    { 
      id: 'health', 
      label: isMobile 
        ? projectsSection?.tabsMobile?.health || 'Health'
        : projectsSection?.tabs?.health || 'Health' 
    },
    { 
      id: 'ecommerce', 
      label: isMobile 
        ? projectsSection?.tabsMobile?.ecommerce || 'E-comm'
        : projectsSection?.tabs?.ecommerce || 'E-commerce' 
    },
  ];
};
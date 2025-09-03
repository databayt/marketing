import { ProjectItem } from "./type";
import { getTranslations } from '@/lib/locales';

export const getProjects = (locale: string = 'en'): ProjectItem[] => {
  const t = getTranslations(locale as 'en' | 'ar');
  
  return [
    {
      title: t.marketing.projects.mkan.title,
      description: t.marketing.projects.mkan.description,
      link: "https://mk.databayt.org",
      image: "/marketing/site/mkan.png",
      imageDark: "/marketing/site/mkan.png",
      imageLight: "/marketing/site/mkan.png",
      date: "2024",
      author: t.marketing.projects.mkan.category
    },
    {
      title: t.marketing.projects.hogwarts.title,
      description: t.marketing.projects.hogwarts.description,
      link: "https://portsudan.databayt.org",
      image: "/marketing/site/hogwarts-dark.png",
      imageDark: "/marketing/site/hogwarts-light.png",
      imageLight: "/marketing/site/hogwarts-dark.png",
      date: "2024",
      author: t.marketing.projects.hogwarts.category
    },
    {
      title: t.marketing.projects.nmbd.title,
      description: t.marketing.projects.nmbd.description,
      link: "https://nmbdsd.org",
      image: "/marketing/site/nmbd-dark.png",
      imageDark: "/marketing/site/nmbd-light.png",
      imageLight: "/marketing/site/nmbd-dark.png",
      date: "2024",
      author: t.marketing.projects.nmbd.category
    }
  ];
};

export const featuredProjects = (count: number = 3, locale: string = 'en') => {
  return getProjects(locale).slice(0, count);
};
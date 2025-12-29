import { ProjectItem } from "./type";
import type { Locale } from '@/components/internationalization/config';

// Import dictionaries directly for synchronous access
import enTranslations from '@/components/internationalization/en.json';
import arTranslations from '@/components/internationalization/ar.json';

const dictionaries = {
  en: enTranslations,
  ar: arTranslations,
} as const;

function getTranslations(locale: Locale = 'en') {
  return dictionaries[locale] || dictionaries.en;
}

export const getProjects = (locale: Locale = 'en'): ProjectItem[] => {
  const t = getTranslations(locale);
  
  return [
    {
      title: t.marketing.projects.mkan.title,
      description: t.marketing.projects.mkan.description,
      link: "https://mk.databayt.org",
      image: "/marketing/site/airbnb.png",
      imageDark: "/marketing/site/airbnb.png",
      imageLight: "/marketing/site/airbnb.png",
      date: "2024",
      author: t.marketing.projects.mkan.category,
      category: "states"
    },
    {
      title: t.marketing.projects.acme.title,
      description: t.marketing.projects.acme.description,
      link: "https://co.databayt.org",
      image: "/marketing/site/acme.avif",
      imageDark: "/marketing/site/acme.avif",
      imageLight: "/marketing/site/acme.avif",
      date: "2024",
      author: t.marketing.projects.acme.category,
      category: "company"
    },
    {
      title: t.marketing.projects.nmbd.title,
      description: t.marketing.projects.nmbd.description,
      link: "https://nmbdsd.org",
      image: "/marketing/site/nmbd.jpg",
      imageDark: "/marketing/site/nmbd.jpg",
      imageLight: "/marketing/site/nmbd.jpg",
      date: "2024",
      author: t.marketing.projects.nmbd.category,
      category: "company"
    },
    {
      title: t.marketing.projects.shifa.title,
      description: t.marketing.projects.shifa.description,
      link: "https://hc.databayt.org",
      image: "/marketing/site/shifa.jpg",
      imageDark: "/marketing/site/shifa.jpg",
      imageLight: "/marketing/site/shifa.jpg",
      date: "2024",
      author: t.marketing.projects.shifa.category,
      category: "health"
    },
    {
      title: t.marketing.projects.giats.title,
      description: t.marketing.projects.giats.description,
      link: "https://gi.databayt.org",
      image: "/marketing/site/giats.jpg",
      imageDark: "/marketing/site/giats.jpg",
      imageLight: "/marketing/site/giats.jpg",
      date: "2024",
      author: t.marketing.projects.giats.category,
      category: "ecommerce"
    },
    {
      title: t.marketing.projects.camille.title,
      description: t.marketing.projects.camille.description,
      link: "https://camillemormal.com/",
      image: "/marketing/site/camille.png",
      imageDark: "/marketing/site/camille.png",
      imageLight: "/marketing/site/camille.png",
      date: "2024",
      author: t.marketing.projects.camille.category,
      category: "ecommerce"
    },
    {
      title: t.marketing.projects.accessories.title,
      description: t.marketing.projects.accessories.description,
      link: "https://ec.databayt.org",
      image: "/marketing/site/keyboard.jpg",
      imageDark: "/marketing/site/keyboard.jpg",
      imageLight: "/marketing/site/keyboard.jpg",
      date: "2024",
      author: t.marketing.projects.accessories.category,
      category: "ecommerce"
    },
    {
      title: t.marketing.projects.nike.title,
      description: t.marketing.projects.nike.description,
      link: "https://ni.databayt.org",
      image: "/marketing/site/nike.jpg",
      imageDark: "/marketing/site/nike.jpg",
      imageLight: "/marketing/site/nike.jpg",
      date: "2024",
      author: t.marketing.projects.nike.category,
      category: "ecommerce",
      featured: false
    },
    {
      title: t.marketing.projects.ziara.title,
      description: t.marketing.projects.ziara.description,
      link: "https://zi.databayt.org",
      image: "/marketing/site/hat.png",
      imageDark: "/marketing/site/hat.png",
      imageLight: "/marketing/site/hat.png",
      date: "2024",
      author: t.marketing.projects.ziara.category,
      category: "ecommerce",
      featured: false
    },
    {
      title: t.marketing.projects.abdout.title,
      description: t.marketing.projects.abdout.description,
      link: "https://abdoutgroup.com",
      image: "/marketing/site/abdout_II8z_ANxr.png",
      imageDark: "/marketing/site/abdout_II8z_ANxr.png",
      imageLight: "/marketing/site/abdout_II8z_ANxr.png",
      date: "2024",
      author: t.marketing.projects.abdout.category,
      category: "company"
    },
    {
      title: t.marketing.projects.domestic.title,
      description: t.marketing.projects.domestic.description,
      link: "https://dw.futuretech-innovations.com",
      image: "/marketing/site/domestic_ov3Ws-gImm.jpg",
      imageDark: "/marketing/site/domestic_ov3Ws-gImm.jpg",
      imageLight: "/marketing/site/domestic_ov3Ws-gImm.jpg",
      date: "2024",
      author: t.marketing.projects.domestic.category,
      category: "company"
    }
  ];
};

export const featuredProjects = (count: number = 3, locale: Locale = 'en') => {
  return getProjects(locale).slice(0, count);
};
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
      category: "health",
      featured: false
    },
    {
      title: t.marketing.projects.almersal.title,
      description: t.marketing.projects.almersal.description,
      link: "https://mr.databayt.org",
      image: "/marketing/site/giats.jpg",
      imageDark: "/marketing/site/giats.jpg",
      imageLight: "/marketing/site/giats.jpg",
      date: "2024",
      author: t.marketing.projects.almersal.category,
      category: "clone"
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
      category: "clone"
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
      link: "https://maid-web.databayt.org",
      mobileLink: "https://maid-app.databayt.org",
      image: "/marketing/site/domestic_ov3Ws-gImm.jpg",
      imageDark: "/marketing/site/domestic_ov3Ws-gImm.jpg",
      imageLight: "/marketing/site/domestic_ov3Ws-gImm.jpg",
      date: "2024",
      author: t.marketing.projects.domestic.category,
      category: "company"
    },
    {
      title: t.marketing.projects.zenda.title,
      description: t.marketing.projects.zenda.description,
      link: "https://zenda.databayt.org",
      image: "/marketing/site/zenda.png",
      imageDark: "/marketing/site/zenda.png",
      imageLight: "/marketing/site/zenda.png",
      date: "2024",
      author: t.marketing.projects.zenda.category,
      category: "clone"
    },
    {
      title: t.marketing.projects.apple.title,
      description: t.marketing.projects.apple.description,
      link: "https://apple.databayt.org",
      image: "/marketing/site/apple.png",
      imageDark: "/marketing/site/apple.png",
      imageLight: "/marketing/site/apple.png",
      date: "2024",
      author: t.marketing.projects.apple.category,
      category: "clone"
    },
    {
      title: t.marketing.projects.topmate.title,
      description: t.marketing.projects.topmate.description,
      link: "https://tm.databayt.org",
      image: "/marketing/site/topmate.png",
      imageDark: "/marketing/site/topmate.png",
      imageLight: "/marketing/site/topmate.png",
      date: "2024",
      author: t.marketing.projects.topmate.category,
      category: "clone"
    },
    {
      title: t.marketing.projects.dropshipping.title,
      description: t.marketing.projects.dropshipping.description,
      link: "https://dropshipping.ibrahimomer.dev",
      image: "/marketing/site/dropshipping.png",
      imageDark: "/marketing/site/dropshipping.png",
      imageLight: "/marketing/site/dropshipping.png",
      date: "2024",
      author: t.marketing.projects.dropshipping.category,
      category: "ecommerce"
    },
    {
      title: t.marketing.projects.moalimee.title,
      description: t.marketing.projects.moalimee.description,
      link: "https://moalimee.com",
      mobileLink: "https://moalimee.com",
      image: "/marketing/site/moalimee.png",
      imageDark: "/marketing/site/moalimee.png",
      imageLight: "/marketing/site/moalimee.png",
      date: "2024",
      author: t.marketing.projects.moalimee.category,
      category: "education"
    },
    {
      title: t.marketing.projects.sijillee.title,
      description: t.marketing.projects.sijillee.description,
      link: "https://sijillee.com",
      image: "/marketing/site/sijillee.png",
      imageDark: "/marketing/site/sijillee.png",
      imageLight: "/marketing/site/sijillee.png",
      date: "2024",
      author: t.marketing.projects.sijillee.category,
      category: "company"
    }
  ];
};

export const featuredProjects = (count: number = 3, locale: Locale = 'en') => {
  return getProjects(locale).slice(0, count);
};
export interface ProjectItem {
    title: string;
    description: string;
    link: string;
    mobileLink?: string;
    image: string;
    imageDark?: string;
    imageLight?: string;
    date: string;
    author: string;
    category?: string | string[];
    featured?: boolean;
  }
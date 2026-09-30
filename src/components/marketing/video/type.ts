export interface ProjectItem {
    title: string;
    description: string;
    link: string;
    mobileLink?: string;
    image: string;
    imageDark?: string;
    imageLight?: string;
    /** `image*` are files in /public served by this site, not ImageKit library paths. */
    imageLocal?: boolean;
    date: string;
    author: string;
    category?: string;
    featured?: boolean;
  }
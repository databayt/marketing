import { ProjectItem } from "./type";

export const projects: ProjectItem[] = [
  {
    title: "Mkan",
    description: "Airbnb like Real estate, diversity of properties and hotels",
    link: "https://mk.databayt.org",
    image: "/marketing/site/mkan.png",
    imageDark: "/marketing/site/mkan.png",
    imageLight: "/marketing/site/mkan.png",
    date: "2024",
    author: "Real Estate Platform"
  },
  {
    title: "Hogwarts",
    description: "Organization automation, attendance, exams, grades and more",
    link: "https://portsudan.databayt.org",
    image: "/marketing/site/hogwarts-dark.png",
    imageDark: "/marketing/site/hogwarts-light.png",
    imageLight: "/marketing/site/hogwarts-dark.png",
    date: "2024",
    author: "Education System"
  },
  {
    title: "NMBD",
    description: "National movement for building & development",
    link: "https://nmbdsd.org",
    image: "/marketing/site/nmbd-dark.png",
    imageDark: "/marketing/site/nmbd-light.png",
    imageLight: "/marketing/site/nmbd-dark.png",
    date: "2024",
    author: "Development Organization"
  }
];

export const featuredProjects = (count: number = 3) => {
  return projects.slice(0, count);
};
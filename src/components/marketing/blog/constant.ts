export interface BlogPost {
  id: string;
  title: string;
  description: string;
  body: string;
  author: string;
  date: string;
  readingTime: string;
  cover: string;
  tag: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "building-modern-web-apps",
    title: "Building Modern Web Apps with Next.js 16",
    description:
      "How the App Router, Server Components, and Server Actions reshape the way we ship production web apps.",
    body: "The App Router moves data fetching to the server by default, shrinking client bundles and removing whole classes of loading-state bugs. Server Actions let you mutate data without hand-writing API routes, while Cache Components keep reads fast and tenant-scoped. Together they make the default path the fast, secure one.",
    author: "Databayt Team",
    date: "2026-05-12",
    readingTime: "6 min read",
    cover: "/marketing/site/logo.png",
    tag: "Engineering",
  },
  {
    id: "design-systems-that-scale",
    title: "Design Systems That Scale Across Languages",
    description:
      "Lessons from shipping an Arabic-first, RTL-default product without forking the design system.",
    body: "Logical CSS properties — inline-start, inline-end, margin-inline — let one set of components mirror cleanly between Arabic and English. Pair that with OKLCH design tokens and dark mode falls out for free. The result is a single source of truth that adapts instead of duplicating.",
    author: "Databayt Team",
    date: "2026-04-28",
    readingTime: "5 min read",
    cover: "/marketing/site/logo.png",
    tag: "Design",
  },
  {
    id: "from-idea-to-launch",
    title: "From Idea to Launch in Two Weeks",
    description:
      "A look at the workflow we use to take a client brief to a live, production-ready marketing site.",
    body: "Speed comes from convention, not heroics. A shared component hierarchy, a pattern registry, and an opinionated stack mean every project starts at 60% done. We spend the saved time on the work that actually differentiates the product: content, motion, and polish.",
    author: "Databayt Team",
    date: "2026-04-09",
    readingTime: "4 min read",
    cover: "/marketing/site/logo.png",
    tag: "Process",
  },
];

export function getBlogPost(id: string): BlogPost | undefined {
  return blogPosts.find((post) => post.id === id);
}

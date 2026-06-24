export interface Author {
  name: string;
  role: string;
  /** Optional ImageKit avatar path; falls back to initials when absent. */
  avatar?: string;
}

export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "quote"; text: string }
  | { type: "list"; items: string[] };

export interface BlogPost {
  id: string;
  title: string;
  /** One-line dek shown under the title and in feed cards. */
  description: string;
  content: ContentBlock[];
  author: Author;
  date: string;
  readingTime: string;
  cover: string;
  /** Primary category, rendered as the lead pill. */
  tag: string;
  /** Topic chips surfaced in the sidebar + footer. */
  tags: string[];
}

const databaytTeam: Author = {
  name: "Databayt Team",
  role: "Engineering & Design",
};

export const blogPosts: BlogPost[] = [
  {
    id: "building-modern-web-apps",
    title: "Building Modern Web Apps with Next.js 16",
    description:
      "How the App Router, Server Components, and Server Actions reshape the way we ship production web apps.",
    content: [
      {
        type: "paragraph",
        text: "The App Router moves data fetching to the server by default, shrinking client bundles and removing whole classes of loading-state bugs. Server Actions let you mutate data without hand-writing API routes, while Cache Components keep reads fast and tenant-scoped. Together they make the default path the fast, secure one.",
      },
      {
        type: "heading",
        text: "Server Components are the new default",
      },
      {
        type: "paragraph",
        text: "When every component renders on the server until you opt out, the question flips from \"what can I move to the server?\" to \"what truly needs the client?\" The answer is usually a small leaf — an input, a toggle, a menu. Everything around it stays on the server, where it can read the database directly and never ship a kilobyte of query logic to the browser.",
      },
      {
        type: "quote",
        text: "The best client component is the one you never had to write.",
      },
      {
        type: "heading",
        text: "Mutations without the boilerplate",
      },
      {
        type: "paragraph",
        text: "Server Actions collapse the form-submit-fetch-revalidate dance into a single async function. You write the mutation, mark it with a directive, and call it straight from a form. No API route, no client fetch wrapper, no manual cache busting — the framework wires revalidation for you.",
      },
      {
        type: "list",
        items: [
          "Smaller bundles: query and validation logic never reaches the client.",
          "Fewer states: no loading flicker for data the server already has.",
          "Safer defaults: secrets and tenant scoping stay on the server.",
        ],
      },
      {
        type: "paragraph",
        text: "The payoff compounds. Once the default path is the fast, secure one, the whole team ships less accidental complexity — and spends its time on the work users actually feel.",
      },
    ],
    author: databaytTeam,
    date: "2026-05-12",
    readingTime: "6 min read",
    cover: "/marketing/site/build.png",
    tag: "Engineering",
    tags: ["Next.js", "Server Components", "Architecture"],
  },
  {
    id: "design-systems-that-scale",
    title: "Design Systems That Scale Across Languages",
    description:
      "Lessons from shipping an Arabic-first, RTL-default product without forking the design system.",
    content: [
      {
        type: "paragraph",
        text: "Logical CSS properties — inline-start, inline-end, margin-inline — let one set of components mirror cleanly between Arabic and English. Pair that with OKLCH design tokens and dark mode falls out for free. The result is a single source of truth that adapts instead of duplicating.",
      },
      {
        type: "heading",
        text: "Stop thinking left and right",
      },
      {
        type: "paragraph",
        text: "Physical properties pin a layout to one direction. The moment you write margin-left, you have quietly decided the component only works in LTR. Logical properties describe intent — start and end — and let the document direction decide which is which. One component, two directions, zero forks.",
      },
      {
        type: "quote",
        text: "A design system that can't mirror isn't a system — it's two codebases waiting to drift apart.",
      },
      {
        type: "heading",
        text: "OKLCH makes dark mode honest",
      },
      {
        type: "paragraph",
        text: "Because OKLCH separates lightness from hue and chroma, you can flip a theme by adjusting a single channel and trust that contrast holds. Hover and active shades derive from the same token instead of being eyeballed, so the palette stays coherent as it grows.",
      },
      {
        type: "list",
        items: [
          "One token set drives light, dark, and every interactive state.",
          "Logical utilities mirror RTL/LTR with no conditional CSS.",
          "New components inherit accessibility instead of re-litigating it.",
        ],
      },
    ],
    author: databaytTeam,
    date: "2026-04-28",
    readingTime: "5 min read",
    cover: "/marketing/site/design.png",
    tag: "Design",
    tags: ["Design Systems", "RTL", "OKLCH"],
  },
  {
    id: "from-idea-to-launch",
    title: "From Idea to Launch in Two Weeks",
    description:
      "A look at the workflow we use to take a client brief to a live, production-ready marketing site.",
    content: [
      {
        type: "paragraph",
        text: "Speed comes from convention, not heroics. A shared component hierarchy, a pattern registry, and an opinionated stack mean every project starts at 60% done. We spend the saved time on the work that actually differentiates the product: content, motion, and polish.",
      },
      {
        type: "heading",
        text: "Convention is a head start",
      },
      {
        type: "paragraph",
        text: "Every decision you make once and reuse is a decision you never have to make again. A typed component hierarchy, a known folder structure, and a registry of vetted patterns mean a new project is never a blank page — it is a running start with the boring parts already solved.",
      },
      {
        type: "quote",
        text: "We don't move fast by skipping steps. We move fast because the steps are already built.",
      },
      {
        type: "heading",
        text: "Spend the saved time where it shows",
      },
      {
        type: "paragraph",
        text: "When scaffolding takes an afternoon instead of a week, the remaining time goes into the things a client actually notices: sharper copy, considered motion, and the last ten percent of polish that separates a template from a product.",
      },
      {
        type: "list",
        items: [
          "Day 1–3: brief, content model, and a working skeleton.",
          "Day 4–9: sections, motion, and responsive passes.",
          "Day 10–14: polish, performance, and launch.",
        ],
      },
    ],
    author: databaytTeam,
    date: "2026-04-09",
    readingTime: "4 min read",
    cover: "/marketing/site/creative.png",
    tag: "Process",
    tags: ["Workflow", "Velocity", "Launch"],
  },
];

export function getBlogPost(id: string): BlogPost | undefined {
  return blogPosts.find((post) => post.id === id);
}

/** Posts other than `id`, preferring those that share a tag. */
export function getRelatedPosts(id: string, limit = 2): BlogPost[] {
  const current = getBlogPost(id);
  const others = blogPosts.filter((post) => post.id !== id);
  if (!current) return others.slice(0, limit);
  const ranked = [...others].sort((a, b) => {
    const aShared = a.tags.some((t) => current.tags.includes(t)) ? 0 : 1;
    const bShared = b.tags.some((t) => current.tags.includes(t)) ? 0 : 1;
    return aShared - bShared;
  });
  return ranked.slice(0, limit);
}

/** Unique topic chips across every post, in first-seen order. */
export function getAllTopics(): string[] {
  return Array.from(new Set(blogPosts.flatMap((post) => post.tags)));
}

/** Locale-aware "Month D, YYYY" (falls back to the raw string on bad input). */
export function formatDate(iso: string, locale: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return new Intl.DateTimeFormat(locale === "ar" ? "ar" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

/** Two-letter initials for the avatar fallback. */
export function authorInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

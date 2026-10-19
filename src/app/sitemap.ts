import type { MetadataRoute } from 'next';
import { i18n } from '@/components/internationalization/config';
import { blogPosts } from '@/components/marketing/blog/constant';
import { languageAlternates, localeUrl } from '@/lib/seo';

// Indexable marketing pages. Auth and chatbot stay out on purpose.
const pages: { path: string; priority: number; changeFrequency: 'weekly' | 'monthly' }[] = [
  { path: '', priority: 1, changeFrequency: 'weekly' },
  { path: '/pricing', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/design', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/about', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/blog', priority: 0.7, changeFrequency: 'weekly' },
  { path: '/wizard', priority: 0.6, changeFrequency: 'monthly' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries = [
    ...pages.map((p) => ({ ...p, lastModified: undefined as Date | undefined })),
    ...blogPosts.map((post) => ({
      path: `/blog/${post.id}`,
      priority: 0.6,
      changeFrequency: 'monthly' as const,
      lastModified: new Date(post.date),
    })),
  ];

  return entries.flatMap(({ path, priority, changeFrequency, lastModified }) =>
    i18n.locales.map((locale) => ({
      url: localeUrl(locale, path),
      ...(lastModified && { lastModified }),
      changeFrequency,
      priority,
      alternates: { languages: languageAlternates(path) },
    })),
  );
}

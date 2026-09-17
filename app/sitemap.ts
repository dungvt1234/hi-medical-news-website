import type { MetadataRoute } from 'next';
import { ARTICLES } from '@/lib/articles';
import { SERVICES } from '@/lib/services';

const BASE = 'https://himedicalskin.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${BASE}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE}/dich-vu`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/journal`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE}/feedback`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/lien-he`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    ...SERVICES.map((s) => ({
      url: `${BASE}/dich-vu/${s.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    })),
    ...ARTICLES.map((a) => ({
      url: `${BASE}/tin-tuc/${a.slug}`,
      lastModified: new Date(a.date),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];
}

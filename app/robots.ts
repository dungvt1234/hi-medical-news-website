import type { MetadataRoute } from 'next';

const BASE = 'https://hi-medical-news.vercel.app';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
      // Cho phép bot AI trích dẫn nội dung (GEO)
      {
        userAgent: ['GPTBot', 'ClaudeBot', 'PerplexityBot', 'Google-Extended'],
        allow: '/',
      },
    ],
    sitemap: `${BASE}/sitemap.xml`,
  };
}

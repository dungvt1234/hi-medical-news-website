import type { MetadataRoute } from 'next';

const BASE = 'https://himedicalskin.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
      // Bot AI-search (quyết định trích dẫn — khác bot training)
      {
        userAgent: ['OAI-SearchBot', 'Claude-SearchBot', 'PerplexityBot'],
        allow: '/',
      },
      // Bot training (mở theo lựa chọn, không ảnh hưởng search)
      {
        userAgent: ['GPTBot', 'ClaudeBot', 'Google-Extended'],
        allow: '/',
      },
    ],
    sitemap: `${BASE}/sitemap.xml`,
  };
}

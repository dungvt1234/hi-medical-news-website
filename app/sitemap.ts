import type { MetadataRoute } from 'next';
import { ARTICLES } from '@/lib/articles';
import { SERVICES } from '@/lib/services';

const BASE = 'https://himedicalskin.com';

const BASE = 'https://himedicalskin.com';
// Ngày cập nhật nội dung thực — đổi khi sửa trang tĩnh/dịch vụ
const SITE_UPDATED = new Date('2026-09-17');

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${BASE}/`, lastModified: SITE_UPDATED },
    { url: `${BASE}/dich-vu`, lastModified: SITE_UPDATED },
    { url: `${BASE}/journal`, lastModified: SITE_UPDATED },
    { url: `${BASE}/feedback`, lastModified: SITE_UPDATED },
    { url: `${BASE}/lien-he`, lastModified: SITE_UPDATED },
    ...SERVICES.map((s) => ({
      url: `${BASE}/dich-vu/${s.slug}`,
      lastModified: SITE_UPDATED,
    })),
    ...ARTICLES.map((a) => ({
      url: `${BASE}/tin-tuc/${a.slug}`,
      lastModified: new Date(a.date),
    })),
  ];
}

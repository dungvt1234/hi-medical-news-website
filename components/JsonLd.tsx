const BASE = 'https://himedicalskin.com';

/** Thông tin spa dùng chung cho schema */
export const SALON = {
  name: 'Hi Medical Skincare & Beauty',
  telephone: '+84 799 390 790',
  address: '49 Nguyễn Bỉnh Khiêm, Phường Vũng Tàu, TP. Hồ Chí Minh',
};

export function SalonJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BeautySalon',
        '@id': `${BASE}/#spa`,
        name: SALON.name,
        url: BASE,
        image: `${BASE}/logo.png`,
        telephone: SALON.telephone,
        priceRange: '₫₫',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '49 Nguyễn Bỉnh Khiêm',
          addressLocality: 'Phường Vũng Tàu, TP. Hồ Chí Minh',
          addressCountry: 'VN',
        },
        areaServed: 'TP. Hồ Chí Minh',
        openingHoursSpecification: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          opens: '09:00',
          closes: '18:00',
        },
        sameAs: ['https://zalo.me/0799390790', 'https://www.facebook.com/ChamSocDaVungTau'],
      },
      {
        '@type': 'WebSite',
        '@id': `${BASE}/#website`,
        url: BASE,
        name: SALON.name,
        inLanguage: 'vi',
      },
    ],
  };
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}

export function ArticleJsonLd({
  article,
}: {
  article: { title: string; excerpt: string; slug: string; date: string; image: string };
}) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    image: article.image.startsWith('http') ? article.image : `${BASE}${article.image}`,
    datePublished: article.date,
    author: { '@type': 'Organization', name: SALON.name, url: BASE },
    publisher: { '@type': 'Organization', name: SALON.name, url: BASE },
    mainEntityOfPage: `${BASE}/tin-tuc/${article.slug}`,
    inLanguage: 'vi',
  };
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}

export function BreadcrumbJsonLd({ items }: { items: { name: string; path: string }[] }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: `${BASE}${it.path}`,
    })),
  };
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}

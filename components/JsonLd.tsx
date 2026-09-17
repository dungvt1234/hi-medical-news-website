const BASE = 'https://himedicalskin.com';
const BUSINESS_ID = `${BASE}/#business`;
const WEBSITE_ID = `${BASE}/#website`;

/** Thông tin thật đang hiển thị trên website (Footer + trang liên hệ) */
export const SALON = {
  name: 'Hi Medical Skincare & Beauty',
  telephone: '+84 799 390 790',
  street: '49 Nguyễn Bỉnh Khiêm',
  locality: 'Phường Vũng Tàu, TP. Hồ Chí Minh',
};

const AREA_SERVED = { '@type': 'City', name: 'Vũng Tàu' };

/** Homepage: Business + WebSite + WebPage — entity gốc, dùng 1 @id duy nhất */
export function SalonJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'HealthAndBeautyBusiness',
        '@id': BUSINESS_ID,
        name: SALON.name,
        url: BASE,
        image: `${BASE}/logo.png`,
        logo: `${BASE}/logo.png`,
        telephone: SALON.telephone,
        address: {
          '@type': 'PostalAddress',
          streetAddress: SALON.street,
          addressLocality: SALON.locality,
          addressCountry: 'VN',
        },
        areaServed: AREA_SERVED,
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
        '@id': WEBSITE_ID,
        url: BASE,
        name: SALON.name,
        inLanguage: 'vi',
        publisher: { '@id': BUSINESS_ID },
      },
      {
        '@type': 'WebPage',
        '@id': `${BASE}/#webpage`,
        url: BASE,
        name: 'Triệt lông, Trị nám & Spa tại Vũng Tàu | Hi Medical',
        isPartOf: { '@id': WEBSITE_ID },
        about: { '@id': BUSINESS_ID },
        inLanguage: 'vi',
      },
    ],
  };
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}

/** Trang dịch vụ: Service + WebPage, provider trỏ về #business */
export function ServiceJsonLd({
  service,
}: {
  service: { slug: string; name: string; tagline: string };
}) {
  const url = `${BASE}/dich-vu/${service.slug}`;
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${url}#service`,
        name: service.name,
        serviceType: service.name,
        description: service.tagline,
        url,
        provider: { '@id': BUSINESS_ID },
        areaServed: AREA_SERVED,
      },
      {
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        url,
        name: `${service.name} tại Vũng Tàu`,
        isPartOf: { '@id': WEBSITE_ID },
        about: { '@id': BUSINESS_ID },
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
    author: { '@id': BUSINESS_ID },
    publisher: { '@id': BUSINESS_ID },
    about: { '@id': BUSINESS_ID },
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

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CalendarDays, Clock, ArrowLeft, ArrowUpRight } from 'lucide-react';
import { ARTICLES, getArticleBySlug } from '@/lib/articles';

// Pre-render tất cả trang chi tiết bài viết
export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const article = getArticleBySlug(params.slug);
  if (!article) return { title: 'Bài viết không tồn tại' };
  return {
    title: `${article.title} | Hi Medical`,
    description: article.excerpt,
  };
}

export default function ArticleDetailPage({ params }: { params: { slug: string } }) {
  const article = getArticleBySlug(params.slug);
  if (!article) notFound();

  // Bài viết liên quan (cùng chuyên mục, loại bài đang xem)
  const related = ARTICLES.filter((a) => a.id !== article.id && a.categoryKey === article.categoryKey).slice(0, 3);
  const fallbackRelated = related.length >= 3 ? related : [...related, ...ARTICLES.filter((a) => a.id !== article.id && a.categoryKey !== article.categoryKey)].slice(0, 3);

  return (
    <main className="min-h-screen bg-night">
      {/* Hero bài viết */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={article.image} alt={article.title} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-night via-night/80 to-night/40" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-5 pb-14 pt-32 sm:px-8 sm:pt-40">
          <Link
            href="/journal"
            className="mb-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-ink-light transition-colors hover:text-gold"
          >
            <ArrowLeft className="h-4 w-4" />
            Quay lại Bài viết
          </Link>

          <div className="mb-5 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-gold px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
              {article.category}
            </span>
            {article.featured && (
              <span className="rounded-full border border-luxury bg-night-2/80 px-3 py-1 text-[11px] font-semibold text-rose-deep backdrop-blur">
                Bài nổi bật
              </span>
            )}
          </div>

          <h1 className="font-heading text-3xl font-light leading-snug text-ink sm:text-4xl lg:text-[44px]">
            {article.title}
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-5 text-xs font-medium text-ink-light">
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="h-4 w-4 text-gold" />
              {article.dateLabel}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-gold" />
              {article.readTime}
            </span>
          </div>
        </div>
      </section>

      {/* Nội dung trọn bộ */}
      <section className="mx-auto max-w-3xl px-5 pb-16 sm:px-8">
        <p className="border-l-2 border-gold pl-5 font-heading text-xl font-light italic leading-relaxed text-ink-light sm:text-2xl">
          {article.excerpt}
        </p>

        {article.video && (
          <div className="mt-10">
            <p className="mb-4 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-rose-deep">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-rose" />
              Xem video giới thiệu
            </p>
            <div className="overflow-hidden rounded-3xl border border-luxury bg-night-2 p-3">
              <div className="aspect-video overflow-hidden rounded-2xl">
                <iframe
                  src={article.video}
                  title={`Video giới thiệu ${article.title}`}
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        )}

        <div className="mt-10 space-y-10">
          {article.content.map((section, i) => (
            <div key={i}>
              {section.heading && (
                <h2 className="mb-4 font-heading text-2xl font-light text-ink sm:text-[28px]">
                  <span className="mr-3 inline-block h-6 w-1.5 translate-y-0.5 rounded-full bg-rose" />
                  {section.heading}
                </h2>
              )}
              <div className="space-y-4">
                {section.paragraphs.map((p, j) => (
                  <p key={j} className="text-[15px] font-light leading-[1.9] text-ink-light">
                    {p}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA đặt lịch */}
        <div className="mt-14 rounded-3xl border border-luxury bg-night-2 p-8 text-center sm:p-10">
          <p className="font-heading text-2xl font-light text-ink sm:text-3xl">
            Sẵn sàng <span className="italic text-rose-deep">trải nghiệm?</span>
          </p>
          <p className="mx-auto mt-3 max-w-md text-sm font-light text-ink-light">
            Đặt lịch ngay hôm nay để được tư vấn miễn phí và nhận ưu đãi dành riêng cho khách
            hàng online.
          </p>
          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="https://zalo.me/0799390790"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-rose px-8 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-white transition-all duration-500 hover:bg-rose-deep hover:shadow-glow sm:w-auto"
            >
              Đặt lịch trải nghiệm
            </a>
            <a
              href="tel:0799390790"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-luxury px-8 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-ink transition-all duration-500 hover:border-rose/60 hover:text-rose-deep sm:w-auto"
            >
              📞 0799 390 790
            </a>
          </div>
        </div>

        {/* Bài viết liên quan */}
        <div className="mt-14">
          <h3 className="mb-6 flex items-center gap-2 font-heading text-xl font-light text-ink">
            <span className="h-5 w-1.5 rounded-full bg-gold" />
            Bài viết liên quan
          </h3>
          <div className="grid gap-5 sm:grid-cols-3">
            {fallbackRelated.map((a) => (
              <Link
                key={a.id}
                href={`/tin-tuc/${a.slug}`}
                className="group overflow-hidden rounded-2xl border border-luxury bg-night-2 transition-all duration-500 hover:-translate-y-1 hover:border-rose/40 hover:shadow-glow"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={a.image}
                    alt={a.title}
                    loading="lazy"
                    className="img-zoom h-full w-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-rose-deep">
                    {a.category}
                  </p>
                  <h4 className="mt-1.5 line-clamp-2 text-sm font-medium leading-snug text-ink transition-colors group-hover:text-rose-deep">
                    {a.title}
                  </h4>
                  <p className="mt-2 flex items-center gap-1 text-[11px] text-ink-light">
                    {a.dateLabel}
                    <ArrowUpRight className="ml-auto h-3.5 w-3.5 text-gold" />
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

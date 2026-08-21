import Link from 'next/link';
import { Clock, ArrowUpRight, CalendarDays } from 'lucide-react';
import type { Article } from '@/lib/articles';

export default function FeaturedPost({ article }: { article: Article }) {
  return (
    <Link
      href={`/tin-tuc/${article.slug}`}
      className="group relative block overflow-hidden rounded-3xl shadow-card-lg transition-shadow hover:shadow-2xl"
    >
      {/* Ảnh lớn */}
      <div className="relative aspect-[16/10] w-full overflow-hidden sm:aspect-[16/9]">
        <img
          src={article.image}
          alt={article.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Gradient đè ảnh */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-900/95 via-brand-900/35 to-transparent" />
      </div>

      {/* Nội dung đè ảnh */}
      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-gold px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
            Bài nổi bật
          </span>
          <span className="rounded-full bg-white/20 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur">
            {article.category}
          </span>
        </div>

        <h2 className="mt-3 font-heading text-xl font-bold leading-snug text-white transition-colors group-hover:text-gold-light sm:text-2xl lg:text-[28px]">
          {article.title}
        </h2>

        <p className="mt-2.5 hidden max-w-2xl text-sm leading-relaxed text-white/80 sm:line-clamp-2">
          {article.excerpt}
        </p>

        <div className="mt-4 flex items-center gap-4 text-xs font-medium text-white/70">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="h-3.5 w-3.5 text-gold-light" />
            {article.dateLabel}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-gold-light" />
            {article.readTime}
          </span>
          <span className="ml-auto inline-flex items-center gap-1 rounded-full border border-white/30 px-3 py-1 text-white transition-colors group-hover:border-gold group-hover:text-gold-light">
            Đọc ngay
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}

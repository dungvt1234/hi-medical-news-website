import Link from 'next/link';
import { Clock, ArrowUpRight } from 'lucide-react';
import type { Article } from '@/lib/articles';

/**
 * Card bài viết dạng ngang (thumbnail trái + nội dung phải)
 * Dùng cho danh sách cột phụ bên phải featured post.
 */
export function ArticleCardHorizontal({ article }: { article: Article }) {
  return (
    <Link
      href={`/tin-tuc/${article.slug}`}
      className="group flex gap-4 rounded-2xl border border-brand-100 bg-white p-3 transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-card"
    >
      {/* Thumbnail */}
      <div className="relative h-[86px] w-[118px] shrink-0 overflow-hidden rounded-xl sm:h-[92px] sm:w-[132px]">
        <img
          src={article.image}
          alt={article.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {/* Nội dung */}
      <div className="flex min-w-0 flex-col justify-between py-0.5">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wide text-gold-dark">
            {article.category}
          </span>
          <h3 className="mt-1 line-clamp-2 text-[15px] font-semibold leading-snug text-ink transition-colors group-hover:text-brand-600">
            {article.title}
          </h3>
        </div>
        <div className="mt-2 flex items-center gap-3 text-[11px] font-medium text-ink-light">
          <span>{article.dateLabel}</span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {article.readTime}
          </span>
        </div>
      </div>

      <ArrowUpRight className="ml-auto mt-1 h-4 w-4 shrink-0 text-brand-300 transition-all group-hover:text-gold-dark group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </Link>
  );
}

/**
 * Card bài viết dạng dọc (ảnh trên + nội dung dưới)
 * Dùng cho lưới bài viết thường bên dưới.
 */
export function ArticleCardVertical({ article }: { article: Article }) {
  return (
    <Link
      href={`/tin-tuc/${article.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-brand-100 bg-white transition-all hover:-translate-y-1 hover:border-brand-300 hover:shadow-card-lg"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={article.image}
          alt={article.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-wide text-brand-600 backdrop-blur">
          {article.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="line-clamp-2 font-heading text-[17px] font-bold leading-snug text-ink transition-colors group-hover:text-brand-600">
          {article.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-ink-light">
          {article.excerpt}
        </p>
        <div className="mt-auto flex items-center gap-3 pt-3 text-[11px] font-medium text-ink-light">
          <span>{article.dateLabel}</span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {article.readTime}
          </span>
          <span className="ml-auto inline-flex items-center gap-1 font-semibold text-brand-600 transition-colors group-hover:text-gold-dark">
            Đọc tiếp
            <ArrowUpRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}

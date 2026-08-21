'use client';

import { useState } from 'react';
import HeroBanner from '@/components/HeroBanner';
import CategoryBar from '@/components/CategoryBar';
import NewsGrid from '@/components/NewsGrid';
import { ARTICLES } from '@/lib/articles';
import { ArticleCardHorizontal } from '@/components/ArticleCard';

/**
 * Trang Tin tức & Sự kiện
 * Layout chuẩn web mẫu: Header sticky + Banner pastel + Category filter + Grid bất đối xứng
 */
export default function NewsPage() {
  const [activeCat, setActiveCat] = useState('all');

  // Lọc bài theo category (khi chọn tab)
  const filtered =
    activeCat === 'all'
      ? ARTICLES
      : ARTICLES.filter((a) => a.categoryKey === activeCat);

  const hasFilter = activeCat !== 'all';

  return (
    <>
      <HeroBanner />
      <CategoryBar active={activeCat} onChange={setActiveCat} />

      {hasFilter ? (
        // ---- Kết quả lọc theo danh mục ----
        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <p className="mb-6 text-sm font-medium text-ink-light">
            Hiển thị <strong className="text-brand-700">{filtered.length}</strong> bài viết trong mục{' '}
            <strong className="text-gold-dark">
              {ARTICLES.find((a) => a.categoryKey === activeCat)?.category}
            </strong>
          </p>
          {filtered.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-brand-200 bg-brand-50/60 py-16 text-center">
              <p className="font-heading text-xl font-bold text-brand-700">
                Đang cập nhật bài viết cho mục này
              </p>
              <p className="mt-2 text-sm text-ink-light">
                Anh/chị vui lòng quay lại sau nhé!
              </p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {filtered.map((a) => (
                <ArticleCardHorizontal key={a.id} article={a} />
              ))}
            </div>
          )}
        </section>
      ) : (
        <NewsGrid />
      )}
    </>
  );
}

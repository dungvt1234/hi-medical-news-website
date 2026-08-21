'use client';

import { useState } from 'react';
import { ARTICLES, getFeatured, getSidebar } from '@/lib/articles';
import FeaturedPost from './FeaturedPost';
import { ArticleCardHorizontal, ArticleCardVertical } from './ArticleCard';
import { LayoutGrid, Rows3 } from 'lucide-react';

export default function NewsGrid() {
  const featured = getFeatured(ARTICLES);
  const sidebar = getSidebar(ARTICLES);

  // 5 bài đầu cho sidebar (cột phải), phần còn lại xuống lưới dưới
  const sidebarTop = sidebar.slice(0, 5);
  const gridRest = sidebar.slice(5);

  const [view, setView] = useState<'grid' | 'list'>('grid');

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* ---- Layout bất đối xứng: Featured lớn (trái) + Sidebar (phải) ---- */}
      <div className="grid gap-6 lg:grid-cols-[1.65fr_1fr] lg:gap-8">
        {/* Cột trái: Featured post */}
        <div className="animate-fade-up">
          <FeaturedPost article={featured} />
        </div>

        {/* Cột phải: Sidebar list */}
        <aside className="flex flex-col gap-4">
          <h2 className="flex items-center gap-2 font-heading text-lg font-bold text-brand-800">
            <span className="h-5 w-1.5 rounded-full bg-gold" />
            Bài viết mới nhất
          </h2>
          {sidebarTop.map((a, i) => (
            <div key={a.id} className="animate-fade-up" style={{ animationDelay: `${i * 60}ms` }}>
              <ArticleCardHorizontal article={a} />
            </div>
          ))}
        </aside>
      </div>

      {/* ---- Lưới bài viết thường bên dưới ---- */}
      <div className="mt-12">
        <div className="mb-5 flex items-center justify-between gap-3">
          <h2 className="flex items-center gap-2 font-heading text-lg font-bold text-brand-800">
            <span className="h-5 w-1.5 rounded-full bg-gold" />
            Có thể bạn quan tâm
          </h2>

          {/* Chuyển chế độ xem */}
          <div className="flex items-center gap-1 rounded-full border border-brand-100 bg-white p-1">
            <button
              type="button"
              onClick={() => setView('grid')}
              aria-label="Xem dạng lưới"
              className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors ${
                view === 'grid' ? 'bg-brand-600 text-white' : 'text-ink-light hover:bg-brand-50'
              }`}
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setView('list')}
              aria-label="Xem dạng danh sách"
              className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors ${
                view === 'list' ? 'bg-brand-600 text-white' : 'text-ink-light hover:bg-brand-50'
              }`}
            >
              <Rows3 className="h-4 w-4" />
            </button>
          </div>
        </div>

        {view === 'grid' ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {gridRest.map((a, i) => (
              <div key={a.id} className="animate-fade-up" style={{ animationDelay: `${i * 70}ms` }}>
                <ArticleCardVertical article={a} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {gridRest.map((a) => (
              <ArticleCardHorizontal key={a.id} article={a} />
            ))}
          </div>
        )}

        {/* Nút xem thêm */}
        <div className="mt-10 text-center">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full border-2 border-brand-600 px-7 py-3 text-sm font-bold text-brand-600 transition-all hover:bg-brand-600 hover:text-white"
          >
            Xem thêm bài viết
            <span aria-hidden>→</span>
          </button>
        </div>
      </div>
    </section>
  );
}

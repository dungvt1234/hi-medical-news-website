'use client';

import { useMemo, useState } from 'react';
import { ARTICLES, CATEGORIES } from '@/lib/articles';
import { LayoutGrid, Rows3 } from 'lucide-react';

/**
 * Journal — Trang tin tức & sự kiện (theme Midnight Luxury)
 * Giữ lại dữ liệu + logic filter từ bản cũ, làm mới giao diện theo phong cách spa
 */
export default function JournalPage() {
  const [activeCat, setActiveCat] = useState('all');
  const [view, setView] = useState<'grid' | 'list'>('grid');

  const filtered = useMemo(
    () =>
      activeCat === 'all'
        ? ARTICLES
        : ARTICLES.filter((a) => a.categoryKey === activeCat),
    [activeCat]
  );

  const featured = ARTICLES[0];
  const rest = filtered.filter((a) => a.id !== featured.id);

  return (
    <main className="min-h-screen bg-night pt-28">
      {/* Hero nhỏ */}
      <section className="relative overflow-hidden border-b border-luxury">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 70% 20%, rgba(174,151,190,0.25), transparent 40%), #171D35',
          }}
        />
        <div className="relative z-10 mx-auto max-w-7xl px-5 py-16 text-center sm:px-8 sm:py-20">
          <p className="eyebrow mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-rose/60" />
            Journal
            <span className="h-px w-10 bg-rose/60" />
          </p>
          <h1 className="font-heading text-4xl font-light text-ink sm:text-5xl lg:text-6xl">
            Tin tức &amp; <span className="italic text-rose">sự kiện</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-sm font-light leading-relaxed text-ink-light">
            Cập nhật xu hướng làm đẹp, bí quyết chăm sóc da từ chuyên gia và chương trình
            ưu đãi hấp dẫn tại Hi Medical.
          </p>
        </div>
      </section>

      {/* Category tabs */}
      <div className="sticky top-[68px] z-20 border-b border-luxury bg-night/90 backdrop-blur-md">
        <div className="no-scrollbar mx-auto flex max-w-7xl gap-2 overflow-x-auto px-5 py-4 sm:px-8">
          {CATEGORIES.map((c) => (
            <button
              key={c.key}
              type="button"
              onClick={() => setActiveCat(c.key)}
              className={`shrink-0 rounded-full border px-5 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                activeCat === c.key
                  ? 'border-rose bg-rose text-night'
                  : 'border-luxury text-ink-light hover:border-rose/60 hover:text-rose'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
        {filtered.length === 0 ? (
          <div className="rounded-4xl border border-dashed border-luxury py-20 text-center">
            <p className="font-heading text-2xl italic text-rose">Đang cập nhật...</p>
            <p className="mt-2 text-sm text-ink-light">
              Anh/chị vui lòng quay lại sau nhé!
            </p>
          </div>
        ) : (
          <>
            {/* Featured (khi xem Tất cả) */}
            {activeCat === 'all' && (
              <a
                href={`/journal#${featured.slug}`}
                className="group mb-10 grid overflow-hidden rounded-4xl border border-luxury bg-night-2 transition-all duration-500 hover:border-rose/40 hover:shadow-glow lg:grid-cols-2"
              >
                <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={featured.image}
                    alt={featured.title}
                    className="img-zoom h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-col justify-center p-8 lg:p-12">
                  <p className="mb-4 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-rose">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-rose" />
                    {featured.category}
                  </p>
                  <h2 className="font-heading text-3xl font-light leading-snug text-ink transition-colors group-hover:text-rose sm:text-4xl">
                    {featured.title}
                  </h2>
                  <p className="mt-4 line-clamp-3 text-sm font-light leading-relaxed text-ink-light">
                    {featured.excerpt}
                  </p>
                  <p className="mt-6 text-xs tracking-wide text-lavender">
                    {featured.dateLabel} · {featured.readTime}
                  </p>
                </div>
              </a>
            )}

            {/* Tiêu đề + toggle view */}
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-ink-light">
                Hiển thị <strong className="text-rose">{filtered.length}</strong> bài viết
              </p>
              <div className="flex items-center gap-1 rounded-full border border-luxury bg-night-2 p-1">
                <button
                  type="button"
                  onClick={() => setView('grid')}
                  aria-label="Xem dạng lưới"
                  className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors ${
                    view === 'grid' ? 'bg-rose text-night' : 'text-ink-light hover:text-rose'
                  }`}
                >
                  <LayoutGrid className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setView('list')}
                  aria-label="Xem dạng danh sách"
                  className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors ${
                    view === 'list' ? 'bg-rose text-night' : 'text-ink-light hover:text-rose'
                  }`}
                >
                  <Rows3 className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Grid / List */}
            {view === 'grid' ? (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {rest.map((a) => (
                  <article
                    key={a.id}
                    className="group overflow-hidden rounded-3xl border border-luxury bg-night-2 transition-all duration-500 hover:-translate-y-1 hover:border-rose/40 hover:shadow-glow"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={a.image}
                        alt={a.title}
                        loading="lazy"
                        className="img-zoom h-full w-full object-cover"
                      />
                      <span className="absolute left-4 top-4 rounded-full bg-night/70 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-rose backdrop-blur-sm">
                        {a.category}
                      </span>
                    </div>
                    <div className="p-6">
                      <h3 className="line-clamp-2 font-heading text-xl font-medium leading-snug text-ink transition-colors group-hover:text-rose">
                        {a.title}
                      </h3>
                      <p className="mt-3 line-clamp-2 text-sm font-light leading-relaxed text-ink-light">
                        {a.excerpt}
                      </p>
                      <p className="mt-4 text-xs tracking-wide text-lavender">
                        {a.dateLabel} · {a.readTime}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {rest.map((a) => (
                  <article
                    key={a.id}
                    className="group grid gap-5 overflow-hidden rounded-3xl border border-luxury bg-night-2 p-4 transition-all duration-500 hover:border-rose/40 hover:shadow-glow sm:grid-cols-[200px_1fr] sm:p-5"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden rounded-2xl sm:aspect-auto">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={a.image}
                        alt={a.title}
                        loading="lazy"
                        className="img-zoom h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col justify-center">
                      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-rose">
                        {a.category}
                      </p>
                      <h3 className="mt-2 font-heading text-xl font-medium leading-snug text-ink transition-colors group-hover:text-rose">
                        {a.title}
                      </h3>
                      <p className="mt-2 line-clamp-2 text-sm font-light text-ink-light">
                        {a.excerpt}
                      </p>
                      <p className="mt-3 text-xs text-lavender">
                        {a.dateLabel} · {a.readTime}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </>
        )}
      </section>
    </main>
  );
}

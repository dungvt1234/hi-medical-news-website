'use client';

import { useEffect, useRef, useState } from 'react';
import Reveal from './Reveal';

/**
 * Gallery — "Khoảnh khắc an nhiên" với hiệu ứng motion graphic
 * 2 hàng ảnh chạy ngang liên tục (marquee), ngược chiều nhau
 *
 * Kỹ thuật:
 * - CSS keyframes thuần (GPU: transform translateX) — không thư viện mới
 * - Mỗi track chứa 2 bản copy → vòng lặp seamless (dịch -50%)
 * - Hàng 1 chạy trái→phải, hàng 2 chạy phải→trái
 * - Hover: tạm dừng hàng đó để xem ảnh
 * - prefers-reduced-motion: tắt chuyển động, hiển thị tĩnh
 */
const ROW_1 = [
  '/images/gallery/an-nhien-1.jpg',
  '/images/gallery/an-nhien-2.jpg',
  '/images/gallery/an-nhien-3.jpg',
  '/images/gallery/an-nhien-4.jpg',
  '/images/gallery/an-nhien-5.jpg',
  '/images/gallery/an-nhien-6.jpg',
  '/images/gallery/an-nhien-7.jpg',
];
const ROW_2 = [
  '/images/gallery/an-nhien-8.jpg',
  '/images/gallery/an-nhien-9.jpg',
  '/images/gallery/an-nhien-10.jpg',
  '/images/gallery/an-nhien-11.jpg',
  '/images/gallery/an-nhien-12.jpg',
  '/images/gallery/an-nhien-13.jpg',
  '/images/gallery/an-nhien-14.jpg',
];

const ALL_IMAGES = [...ROW_1, ...ROW_2];

export default function Gallery() {
  const ref = useRef<HTMLDivElement>(null);
  const [lightbox, setLightbox] = useState<number | null>(null);

  // Đóng lightbox khi bấm ESC / chuyển ảnh bằng mũi tên
  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null);
      if (e.key === 'ArrowRight') setLightbox((i) => (i === null ? i : (i + 1) % ALL_IMAGES.length));
      if (e.key === 'ArrowLeft') setLightbox((i) => (i === null ? i : (i - 1 + ALL_IMAGES.length) % ALL_IMAGES.length));
    };
    window.addEventListener('keydown', onKey);
    // Khoá scroll nền khi mở lightbox
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [lightbox]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.querySelectorAll('.reveal').forEach((n, i) => {
              setTimeout(() => n.classList.add('is-visible'), i * 100);
            });
            obs.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const renderTrack = (imgs: string[], dir: 'ltr' | 'rtl') => (
    <div className={`marquee-track ${dir === 'rtl' ? 'marquee-rtl' : ''}`}>
      {[0, 1].map((dup) => (
        <div key={dup} className="marquee-group" aria-hidden={dup === 1}>
          {imgs.map((src, i) => {
            const globalIdx = ALL_IMAGES.indexOf(src);
            return (
              <figure
                key={`${dup}-${i}`}
                className="marquee-item group relative cursor-pointer overflow-hidden rounded-2xl"
                onClick={() => setLightbox(globalIdx)}
                role="button"
                tabIndex={0}
                aria-label="Xem ảnh to"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setLightbox(globalIdx);
                  }
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt={`Khoảnh khắc an nhiên ${globalIdx + 1}`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-night/60 via-transparent to-transparent opacity-50 transition-opacity duration-700 group-hover:opacity-80" />
                {/* Icon zoom nhẹ góc phải */}
                <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-night/60 text-ink opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                    <circle cx="11" cy="11" r="7" />
                    <path d="m21 21-4.35-4.35M11 8v6M8 11h6" />
                  </svg>
                </span>
              </figure>
            );
          })}
        </div>
      ))}
    </div>
  );

  return (
    <section className="overflow-hidden bg-night py-24 sm:py-32">
      <div ref={ref} className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-16 text-center">
          <p className="eyebrow reveal mb-5 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-gold" />
            The Gallery
            <span className="h-px w-10 bg-gold" />
          </p>
          <Reveal as="h2" className="font-heading text-4xl font-light text-ink sm:text-5xl">
            Khoảnh khắc <span className="italic text-rose">an nhiên.</span>
          </Reveal>
        </div>
      </div>

      {/* Motion graphic: 2 hàng chạy ngang liên tục */}
      <div className="relative flex flex-col gap-5 sm:gap-7">
        {/* Hàng 1 — trái → phải */}
        <div className="marquee marquee-left">{renderTrack(ROW_1, 'ltr')}</div>
        {/* Hàng 2 — phải → trái */}
        <div className="marquee marquee-right">{renderTrack(ROW_2, 'rtl')}</div>

        {/* Fade 2 mép cho mượt */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-night to-transparent sm:w-40" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-night to-transparent sm:w-40" />
      </div>

      {/* Lightbox: click ảnh → hiện to đầy đủ */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-night/95 p-4 backdrop-blur-sm sm:p-10"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Xem ảnh to"
        >
          {/* Nút đóng */}
          <button
            className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-ink transition-colors hover:bg-white/15"
            onClick={() => setLightbox(null)}
            aria-label="Đóng"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>

          {/* Nút trước */}
          <button
            className="absolute left-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/5 text-ink transition-colors hover:bg-white/15 sm:left-8"
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((i) => (i === null ? i : (i - 1 + ALL_IMAGES.length) % ALL_IMAGES.length));
            }}
            aria-label="Ảnh trước"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>

          {/* Nút sau */}
          <button
            className="absolute right-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/5 text-ink transition-colors hover:bg-white/15 sm:right-8"
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((i) => (i === null ? i : (i + 1) % ALL_IMAGES.length));
            }}
            aria-label="Ảnh sau"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>

          {/* Ảnh to đầy đủ (object-contain: không cắt) */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={ALL_IMAGES[lightbox]}
            alt={`Khoảnh khắc an nhiên ${lightbox + 1}`}
            className="max-h-full max-w-full rounded-xl object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Số ảnh */}
          <span className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-4 py-1.5 text-sm text-ink/80">
            {lightbox + 1} / {ALL_IMAGES.length}
          </span>
        </div>
      )}
    </section>
  );
}

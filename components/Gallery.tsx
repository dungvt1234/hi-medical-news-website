'use client';

import { useEffect, useRef } from 'react';
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

export default function Gallery() {
  const ref = useRef<HTMLDivElement>(null);

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
          {imgs.map((src, i) => (
            <figure
              key={`${dup}-${i}`}
              className="marquee-item group relative overflow-hidden rounded-2xl"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={`Khoảnh khắc an nhiên ${i + 1}`}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-night/60 via-transparent to-transparent opacity-50 transition-opacity duration-700 group-hover:opacity-80" />
            </figure>
          ))}
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
    </section>
  );
}

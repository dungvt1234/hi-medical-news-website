'use client';

import { useEffect, useState } from 'react';
import GalleryDeck, { DeckImage } from './GalleryDeck';

/**
 * Gallery — "Khoảnh khắc an nhiên" với hiệu ứng Deck
 * Section ghim (sticky), cuộn trang đẩy dải ảnh chạy ngang 3D:
 * ảnh giữa rõ, ảnh bên nghiêng + lùi sâu + mờ dần.
 * Kéo/vuốt ngang + nút ‹ › + đếm 01—08. Click ảnh mở lightbox.
 */
const DECK_IMAGES: DeckImage[] = [
  { src: '/images/gallery/an-nhien-1.jpg', alt: 'Không gian spa Hi Medical 1', caption: 'Sảnh đón an nhiên' },
  { src: '/images/gallery/an-nhien-2.jpg', alt: 'Không gian spa Hi Medical 2', caption: 'Góc thư giãn' },
  { src: '/images/gallery/an-nhien-3.jpg', alt: 'Không gian spa Hi Medical 3', caption: 'Phòng trị liệu' },
  { src: '/images/gallery/an-nhien-4.jpg', alt: 'Không gian spa Hi Medical 4', caption: 'Chi tiết decor' },
  { src: '/images/gallery/an-nhien-5.jpg', alt: 'Không gian spa Hi Medical 5', caption: 'Khu chăm sóc da' },
  { src: '/images/gallery/an-nhien-6.jpg', alt: 'Không gian spa Hi Medical 6', caption: 'Không gian nghỉ' },
  { src: '/images/gallery/an-nhien-7.jpg', alt: 'Không gian spa Hi Medical 7', caption: 'Góc ánh sáng' },
  { src: '/images/gallery/an-nhien-8.jpg', alt: 'Không gian spa Hi Medical 8', caption: 'Hành trình an nhiên' },
];

const ALL_IMAGES = DECK_IMAGES.map((d) => d.src);

export default function Gallery() {
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

  return (
    <section className="bg-night py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-10 text-center sm:mb-14">
          <p className="eyebrow mb-5 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-gold" />
            The Gallery
            <span className="h-px w-10 bg-gold" />
          </p>
          <h2 className="font-heading text-4xl font-light text-ink sm:text-5xl">
            Khoảnh khắc <span className="italic text-rose">an nhiên.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm font-light text-ink-light">
            Cuộn xuống để dạo qua từng khung hình — hoặc bấm vào ảnh để xem to.
          </p>
        </div>
      </div>

      {/* Deck: cuộn đẩy dải ảnh 3D */}
      <GalleryDeck images={DECK_IMAGES} onSelect={setLightbox} />

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
            alt={DECK_IMAGES[lightbox].alt}
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

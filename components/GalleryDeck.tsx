'use client';

import { useEffect, useRef } from 'react';

/**
 * GalleryDeck — Deck: scroll-driven 3D carousel (theo mẫu Mộc Không fx-deck).
 * - Section cao, pin sticky h-screen; quãng cuộn đẩy dải ảnh chạy ngang.
 * - Ảnh giữa rõ; ảnh ngoài tâm nghiêng rotateY + lùi translateZ + nhỏ + mờ dần.
 * - Điều khiển: cuộn trang, kéo/vuốt ngang, nút ‹ ›. HUD đếm 01—08 + caption.
 * - prefers-reduced-motion: hiện lưới tĩnh, không animation.
 * - Click ảnh → onSelect(i) mở lightbox (do Gallery quản lý).
 */

export type DeckImage = { src: string; alt: string; caption: string };

const TUNING = { maxN: 2.2, depth: 340, tilt: 32, shrink: 0.07, fade: 0.38, minOpacity: 0.16 };
// Mỗi ảnh chiếm ~46vh quãng cuộn
const VH_PER_CARD = 46;

export default function GalleryDeck({
  images,
  onSelect,
}: {
  images: DeckImage[];
  onSelect: (i: number) => void;
}) {
  const secRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const captionRef = useRef<HTMLParagraphElement>(null);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  const reduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (reduced) return;
    const sec = secRef.current;
    const pin = pinRef.current;
    const stage = stageRef.current;
    const track = trackRef.current;
    if (!sec || !pin || !stage || !track) return;
    const cards = Array.prototype.slice.call(
      track.querySelectorAll('[data-deck-card]')
    ) as HTMLElement[];
    const N = cards.length;
    if (!N) return;

    // Alias non-null cho các closure (TS không giữ narrowing trong function lồng)
    const secEl: HTMLElement = sec;
    const pinEl: HTMLDivElement = pin;
    const stageEl: HTMLDivElement = stage;
    const trackEl: HTMLDivElement = track;

    const prevBtn = prevRef.current;
    const nextBtn = nextRef.current;

    let drive = 1;
    let cardW = 0;
    let itemStep = 0;
    let span = 1;
    let stageC = 0;
    let front = -1;
    let ticking = false;
    let mode: 'scroll' | 'drag' | 'snap' = 'scroll';
    let dragFrac = 0;
    let dragStartX = 0;
    let dragBase = 0;
    let candidate: { x: number; y: number; active: boolean } | null = null;
    let snapTo = -1;
    let snapFrom = 0;
    let snapStart = 0;
    let snapDur = 0;

    function measure() {
      if (!secEl) return;
      const vh = window.innerHeight;
      drive = Math.max(1, secEl.offsetHeight - vh);
      cardW = cards[0].offsetWidth;
      const gap = parseFloat(window.getComputedStyle(trackEl).gap) || 0;
      itemStep = cardW + gap;
      span = Math.max(1, (N - 1) * itemStep);
      stageC = stageEl.clientWidth / 2;
    }

    function scrollFrac() {
      if (!secEl) return 0;
      const sy = window.pageYOffset || document.documentElement.scrollTop || 0;
      const secT = secEl.getBoundingClientRect().top + sy;
      let p = (sy - secT) / drive;
      if (p < 0) p = 0;
      else if (p > 1) p = 1;
      return p;
    }

    function apply(f: number) {
      const focusX = cardW / 2 + f * span;
      const move = stageC - focusX;
      trackEl.style.transform = `translate3d(${move.toFixed(1)}px,0,0)`;

      const fi = Math.max(0, Math.min(N - 1, Math.round(f * (N - 1))));
      if (fi !== front) {
        front = fi;
        if (countRef.current)
          countRef.current.textContent = `0${fi + 1} — 0${N}`;
        if (captionRef.current) captionRef.current.textContent = images[fi]?.caption ?? '';
        for (let c = 0; c < N; c++) {
          if (c === fi) cards[c].classList.add('is-front');
          else cards[c].classList.remove('is-front');
        }
        if (prevBtn) prevBtn.disabled = fi === 0;
        if (nextBtn) nextBtn.disabled = fi === N - 1;
      }

      for (let i = 0; i < N; i++) {
        const cx = i * itemStep + cardW / 2;
        const dx = (cx - focusX) / itemStep;
        const n = Math.min(Math.abs(dx), TUNING.maxN);
        const z = -n * TUNING.depth;
        const ry = (dx < 0 ? 1 : -1) * n * TUNING.tilt;
        const sc = 1 - n * TUNING.shrink;
        const op = Math.max(TUNING.minOpacity, 1 - n * TUNING.fade);
        cards[i].style.transform = `translateZ(${z.toFixed(0)}px) rotateY(${ry.toFixed(1)}deg) scale(${sc.toFixed(3)})`;
        cards[i].style.opacity = String(op);
      }
    }

    function frame() {
      ticking = false;
      let f: number;
      if (mode === 'drag') {
        f = dragFrac;
      } else if (mode === 'snap' && snapTo >= 0) {
        const t = Math.min(1, (performance.now() - snapStart) / snapDur);
        const e = 1 - Math.pow(1 - t, 3);
        f = snapFrom + (snapTo - snapFrom) * e;
        if (t >= 1) {
          f = snapTo;
          snapTo = -1;
          mode = 'scroll';
        } else {
          request();
        }
      } else {
        f = scrollFrac();
      }
      apply(f);
    }

    function request() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(frame);
      }
    }

    function snapToIndex(g: number, dur: number) {
      const target = Math.max(0, Math.min(N - 1, g)) / (N - 1);
      snapFrom = mode === 'drag' ? dragFrac : scrollFrac();
      snapTo = target;
      snapStart = performance.now();
      snapDur = dur;
      mode = 'snap';
      request();
    }

    function endDrag() {
      if (mode !== 'drag') return;
      const anchor = Math.max(0, Math.min(N - 1, Math.round(dragFrac * (N - 1))));
      mode = 'snap';
      snapFrom = dragFrac;
      snapTo = anchor / (N - 1);
      snapStart = performance.now();
      snapDur = 420;
      request();
    }

    // Kéo/vuốt: chỉ bắt khi ý định ngang rõ (vuốt dọc vẫn cuộn trang)
    const onDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      candidate = { x: e.clientX, y: e.clientY, active: false };
    };
    const onMove = (e: PointerEvent) => {
      if (candidate && !candidate.active) {
        const dx = e.clientX - candidate.x;
        const dy = e.clientY - candidate.y;
        if (Math.abs(dx) > 8 && Math.abs(dx) > Math.abs(dy) * 1.3) {
          candidate.active = true;
          mode = 'drag';
          snapTo = -1;
          dragBase = scrollFrac();
          dragStartX = e.clientX;
          dragFrac = dragBase;
          try {
            pinEl.setPointerCapture(e.pointerId);
          } catch {
            /* noop */
          }
        }
      }
      if (mode === 'drag') {
        dragFrac = Math.max(0, Math.min(1, dragBase + (dragStartX - e.clientX) / span));
        request();
      }
    };
    const onUp = () => {
      candidate = null;
      endDrag();
    };

    const onScroll = () => {
      if (mode === 'scroll') request();
    };
    const onResize = () => {
      measure();
      request();
    };
    const onPrev = () => snapToIndex(front - 1, 460);
    const onNext = () => snapToIndex(front + 1, 460);

    pinEl.addEventListener('pointerdown', onDown);
    pinEl.addEventListener('pointermove', onMove);
    pinEl.addEventListener('pointerup', onUp);
    pinEl.addEventListener('pointercancel', onUp);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    prevBtn?.addEventListener('click', onPrev);
    nextBtn?.addEventListener('click', onNext);
    measure();
    request();

    return () => {
      pinEl.removeEventListener('pointerdown', onDown);
      pinEl.removeEventListener('pointermove', onMove);
      pinEl.removeEventListener('pointerup', onUp);
      pinEl.removeEventListener('pointercancel', onUp);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      prevBtn?.removeEventListener('click', onPrev);
      nextBtn?.removeEventListener('click', onNext);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  // Giảm chuyển động: lưới tĩnh
  if (reduced) {
    return (
      <div className="mx-auto grid max-w-7xl gap-5 px-5 sm:grid-cols-2 sm:px-8 lg:grid-cols-4">
        {images.map((img, i) => (
          <button
            key={img.src}
            type="button"
            onClick={() => onSelect(i)}
            className="group relative aspect-[3/4] overflow-hidden rounded-2xl"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img.src} alt={img.alt} loading="lazy" className="h-full w-full object-cover" />
          </button>
        ))}
      </div>
    );
  }

  const secHeight = `calc(100vh + ${images.length * VH_PER_CARD}vh)`;

  return (
    <section ref={secRef} style={{ height: secHeight }} className="relative">
      <div ref={pinRef} className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        {/* Stage 3D */}
        <div ref={stageRef} style={{ perspective: '1200px' }} className="w-full">
          <div ref={trackRef} className="flex w-max gap-5 will-change-transform sm:gap-7">
            {images.map((img, i) => (
              <figure
                key={img.src}
                data-deck-card
                onClick={() => onSelect(i)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelect(i);
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label={`${img.alt} — xem ảnh to`}
                className="group relative h-[52vh] w-[78vw] shrink-0 cursor-pointer overflow-hidden rounded-3xl border border-luxury/40 shadow-card will-change-transform sm:h-[56vh] sm:w-[440px]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.src}
                  alt={img.alt}
                  loading={i < 2 ? 'eager' : 'lazy'}
                  draggable={false}
                  className="h-full w-full select-none object-cover"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-night/70 via-transparent to-transparent" />
                <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 p-6 text-left">
                  <p className="font-heading text-2xl font-light text-white sm:text-3xl">{img.caption}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.2em] text-white/70">
                    Hi Medical · {String(i + 1).padStart(2, '0')}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        {/* HUD: đếm + caption + nút */}
        <div className="mx-auto mt-8 flex w-full max-w-7xl items-center gap-5 px-5 sm:px-8">
          <span ref={countRef} className="font-heading text-xl italic text-rose-deep">
            01 — {String(images.length).padStart(2, '0')}
          </span>
          <p ref={captionRef} className="min-w-0 flex-1 truncate font-heading text-lg text-ink">
            {images[0]?.caption ?? ''}
          </p>
          <div className="flex shrink-0 gap-2">
            <button
              ref={prevRef}
              type="button"
              aria-label="Ảnh trước"
              className="flex h-11 w-11 touch-manipulation items-center justify-center rounded-full border border-luxury text-ink transition-all hover:border-rose/60 hover:text-rose-deep disabled:opacity-30"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
            <button
              ref={nextRef}
              type="button"
              aria-label="Ảnh sau"
              className="flex h-11 w-11 touch-manipulation items-center justify-center rounded-full border border-luxury text-ink transition-all hover:border-rose/60 hover:text-rose-deep disabled:opacity-30"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

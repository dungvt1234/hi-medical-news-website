'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Percent } from 'lucide-react';
import { SERVICES } from '@/lib/services';

/**
 * TreatmentsDeck — Deck: scroll-driven 3D carousel cho khối Liệu trình.
 * - Section cao, pin sticky h-screen; cuộn trang đẩy dải thẻ chạy ngang.
 * - Thẻ giữa rõ; thẻ bên nghiêng rotateY + lùi translateZ + mờ dần.
 * - Điều khiển: cuộn trang, kéo/vuốt ngang, nút ‹ ›. HUD đếm 01—06 + tên dịch vụ.
 * - Bấm thẻ → sang trang chi tiết (tự chặn click nếu vừa kéo).
 * - prefers-reduced-motion: lưới tĩnh.
 */

const TUNING = { maxN: 2.2, depth: 340, tilt: 32, shrink: 0.07, fade: 0.38, minOpacity: 0.16 };
const VH_PER_CARD = 46;

export default function TreatmentsDeck() {
  const router = useRouter();
  const secRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const captionRef = useRef<HTMLParagraphElement>(null);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const movedRef = useRef(false);

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
      const vh = window.innerHeight;
      drive = Math.max(1, secEl.offsetHeight - vh);
      cardW = cards[0].offsetWidth;
      const gap = parseFloat(window.getComputedStyle(trackEl).gap) || 0;
      itemStep = cardW + gap;
      span = Math.max(1, (N - 1) * itemStep);
      stageC = stageEl.clientWidth / 2;
    }

    function scrollFrac() {
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
        if (countRef.current) countRef.current.textContent = `0${fi + 1} — 0${N}`;
        if (captionRef.current) captionRef.current.textContent = SERVICES[fi]?.name ?? '';
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

    const onDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      movedRef.current = false;
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
        if (Math.abs(e.clientX - dragStartX) > 8) movedRef.current = true;
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

  const goDetail = (slug: string) => (e: React.MouseEvent | React.KeyboardEvent) => {
    if (movedRef.current) {
      e.preventDefault();
      e.stopPropagation();
      movedRef.current = false;
      return;
    }
    if ('key' in e && e.key !== 'Enter' && e.key !== ' ') return;
    if ('key' in e) e.preventDefault();
    router.push(`/dich-vu/${slug}`);
  };

  // Giảm chuyển động: lưới tĩnh
  if (reduced) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((t) => (
          <button
            key={t.slug}
            type="button"
            onClick={() => router.push(`/dich-vu/${t.slug}`)}
            className="block overflow-hidden rounded-4xl border border-luxury bg-night-2 text-left"
          >
            <div className="relative aspect-[3/4] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={t.img} alt={t.name} loading="lazy" className="h-full w-full object-cover" />
            </div>
            <div className="p-7">
              <h3 className="font-heading text-2xl font-medium text-ink">{t.name}</h3>
              <p className="mt-2.5 text-sm font-light leading-relaxed text-ink-light">{t.tagline}</p>
            </div>
          </button>
        ))}
      </div>
    );
  }

  const secHeight = `calc(100vh + ${SERVICES.length * VH_PER_CARD}vh)`;

  return (
    <div ref={secRef} style={{ height: secHeight }} className="relative">
      <div ref={pinRef} className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div ref={stageRef} style={{ perspective: '1200px' }} className="w-full">
          <div ref={trackRef} className="flex w-max gap-5 will-change-transform sm:gap-7">
            {SERVICES.map((t) => (
              <article
                key={t.slug}
                data-deck-card
                onClick={goDetail(t.slug)}
                onKeyDown={goDetail(t.slug)}
                role="link"
                tabIndex={0}
                aria-label={`${t.name} — xem chi tiết`}
                className={`group w-[78vw] shrink-0 cursor-pointer overflow-hidden rounded-4xl border transition-colors duration-500 will-change-transform sm:w-[380px] ${
                  t.special
                    ? 'border-gold bg-gradient-to-b from-[#3A2E56] via-[#4A3A6B] to-[#3A2E56]'
                    : 'border-luxury bg-night-2'
                }`}
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={t.img}
                    alt={t.name}
                    loading="lazy"
                    draggable={false}
                    className="h-full w-full select-none object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-night-2 via-transparent to-transparent" />
                  {t.special && (
                    <span className="absolute left-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-gold px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.15em] text-[#302642] shadow-glow">
                      <Percent className="h-3.5 w-3.5" />
                      Ưu đãi
                    </span>
                  )}
                </div>
                <div className="p-6 sm:p-7">
                  <h3
                    className={`font-heading text-2xl font-medium ${
                      t.special ? 'text-white' : 'text-ink'
                    }`}
                  >
                    {t.name}
                  </h3>
                  {t.en && (
                    <p className={`mt-1.5 font-heading text-sm italic ${t.special ? 'text-gold' : 'text-rose-deep/90'}`}>
                      {t.en}
                    </p>
                  )}
                  <p className={`mt-2.5 line-clamp-2 text-sm font-light leading-relaxed ${t.special ? 'text-[#D8C8F0]' : 'text-ink-light'}`}>
                    {t.tagline}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* HUD */}
        <div className="mx-auto mt-8 flex w-full max-w-7xl items-center gap-5 px-5 sm:px-8">
          <span ref={countRef} className="font-heading text-xl italic text-rose-deep">
            01 — 06
          </span>
          <p ref={captionRef} className="min-w-0 flex-1 truncate font-heading text-lg text-ink">
            {SERVICES[0]?.name ?? ''}
          </p>
          <div className="flex shrink-0 gap-2">
            <button
              ref={prevRef}
              type="button"
              aria-label="Liệu trình trước"
              className="flex h-11 w-11 touch-manipulation items-center justify-center rounded-full border border-luxury text-ink transition-all hover:border-rose/60 hover:text-rose-deep disabled:opacity-30"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
            <button
              ref={nextRef}
              type="button"
              aria-label="Liệu trình sau"
              className="flex h-11 w-11 touch-manipulation items-center justify-center rounded-full border border-luxury text-ink transition-all hover:border-rose/60 hover:text-rose-deep disabled:opacity-30"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

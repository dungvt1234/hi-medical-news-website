'use client';

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  type ReactNode,
} from 'react';
import gsap from 'gsap';

/**
 * FlipProvider — Hiệu ứng "lật trang" 3D khi điều hướng giữa các section.
 *
 * Học từ AURUM Atelier (prism-art-aura.base44.app):
 *  - Overlay che toàn màn hình, rotateY 90°→0° (transformPerspective 2000, origin-left)
 *  - Scroll tới section giữa chừng (300ms), lật ra 0°→-90° (340ms)
 *  - 2 lớp vệt sáng quét (shine + sweep mix-blend screen, skew)
 *  - Tổng thời gian < 1s, easing power2.out (tương đương cubic-bezier(.2,1,.3,1))
 *
 * Brand: Hi Medical — Medical Luxury Lavender Glow
 *  - Nền overlay: deep purple → violet gradient (#241B33 → #8B5FC7)
 *  - Chữ: Cormorant Garamond italic, champagne gold #E8C95A
 *  - Vệt sáng: trắng mờ blur + mix-blend screen
 *
 * Accessibility: prefers-reduced-motion → scroll thẳng, KHÔNG lật.
 */

type FlipContextValue = { flipTo: (hash: string) => void };

const FlipContext = createContext<FlipContextValue | null>(null);

export function useFlip(): FlipContextValue {
  const ctx = useContext(FlipContext);
  if (!ctx) throw new Error('useFlip must be used within FlipProvider');
  return ctx;
}

const EASE_OUT = 'power2.out';
const EASE_IN = 'power2.in';

/**
 * CẤU HÌNH (Option B — anh Dung chọn 2026-08-30):
 * ALWAYS_FLIP = true → hiệu ứng luôn chạy, kể cả khi máy bật
 * prefers-reduced-motion: reduce (Windows Animation OFF).
 * Đổi thành false → quay về chuẩn accessibility (scroll thẳng, không lật).
 */
const ALWAYS_FLIP = true;

function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

export default function FlipProvider({ children }: { children: ReactNode }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLSpanElement>(null);
  const shineRef = useRef<HTMLDivElement>(null);
  const sweepRef = useRef<HTMLDivElement>(null);

  const flipTo = useCallback((hash: string) => {
    const target = document.querySelector(hash) as HTMLElement | null;

    // Accessibility: reduced motion → scroll thẳng, bỏ hiệu ứng
    // (CHỈ khi ALWAYS_FLIP = false; mặc định Option B: luôn chạy)
    if (!ALWAYS_FLIP && prefersReducedMotion()) {
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      else if (hash === '#home' || hash === '#top')
        window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const overlay = overlayRef.current;
    const brand = brandRef.current;
    const shine = shineRef.current;
    const sweep = sweepRef.current;
    if (!overlay || !brand || !shine || !sweep) return;

    gsap.killTweensOf([overlay, brand, shine, sweep]);

    // Reset trạng thái trước khi lật vào
    gsap.set(overlay, {
      display: 'flex',
      transformPerspective: 2000, // ⭐ chiều sâu 3D
      transformOrigin: 'left center', // ⭐ lật như trang sách
      rotateY: 90,
      opacity: 0,
    });
    gsap.set(brand, { opacity: 0, y: 10 });
    gsap.set(shine, { xPercent: -60 });
    gsap.set(sweep, { opacity: 0, xPercent: -80 });

    const tl = gsap.timeline({
      onComplete: () => gsap.set(overlay, { display: 'none' }),
    });

    tl.to(overlay, { rotateY: 0, opacity: 1, duration: 0.3, ease: EASE_OUT }, 0)
      .to(brand, { opacity: 1, y: 0, duration: 0.25, ease: EASE_OUT }, 0.08)
      .to(shine, { xPercent: 320, duration: 0.6, ease: EASE_OUT }, 0.1)
      // 300ms: scroll tới section (lật gần xong thì cuộn)
      .add(
        () => {
          if (target) target.scrollIntoView({ behavior: 'auto', block: 'start' });
          else if (hash === '#home' || hash === '#top')
            window.scrollTo({ top: 0, behavior: 'auto' });
        },
        0.3,
      )
      // 340ms: lật ra + vệt sáng thứ 2
      .to(sweep, { opacity: 1, duration: 0.2, ease: EASE_OUT }, 0.34)
      .to(sweep, { xPercent: 360, duration: 0.54, ease: EASE_OUT }, 0.34)
      .to(overlay, { rotateY: -90, opacity: 0, duration: 0.3, ease: EASE_IN }, 0.34);
  }, []);

  return (
    <FlipContext.Provider value={{ flipTo }}>
      {children}

      {/* ===== Overlay lật trang chính (z-200, trên navbar z-100) ===== */}
      <div
        ref={overlayRef}
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[200] hidden items-center justify-center overflow-hidden"
        style={{
          background:
            'linear-gradient(140deg, #241B33 0%, #4A3273 55%, #8B5FC7 100%)',
        }}
      >
        {/* Vệt sáng quét #1 — giống AURUM shine sweep */}
        <div
          ref={shineRef}
          className="absolute inset-y-0 -left-1/2 w-1/2"
          style={{
            background:
              'linear-gradient(105deg, transparent 0%, rgba(255,255,255,0) 35%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0) 65%, transparent 100%)',
            filter: 'blur(2px)',
          }}
        />
        {/* Chữ thương hiệu */}
        <div className="relative text-center">
          <span
            ref={brandRef}
            className="block font-heading text-5xl font-medium italic tracking-wide text-gold md:text-6xl"
          >
            Hi Medical
          </span>
          <span className="mt-3 block text-[11px] font-bold uppercase tracking-[0.45em] text-cream md:text-xs">
            Skincare &amp; Beauty
          </span>
        </div>
      </div>

      {/* ===== Vệt sáng thứ 2 (z-190, mix-blend screen + skew) ===== */}
      <div
        ref={sweepRef}
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[190] overflow-hidden"
        style={{ opacity: 0, mixBlendMode: 'screen' }}
      >
        <div
          className="absolute -inset-y-10 -left-1/3 w-1/2"
          style={{
            background:
              'linear-gradient(100deg, transparent 0%, rgba(255,255,255,0) 30%, rgba(255,255,255,0.45) 50%, rgba(255,255,255,0) 70%, transparent 100%)',
            filter: 'blur(3px)',
            transform: 'skewX(-8deg)',
          }}
        />
      </div>
    </FlipContext.Provider>
  );
}

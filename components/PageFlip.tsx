'use client';

import { useEffect, useRef, useCallback } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import gsap from 'gsap';

/**
 * PageFlip — hiệu ứng lật trang 3D như cuốn sách thật (phải → trái)
 *
 * Cơ chế:
 * 1. Bắt click trên mọi link nội bộ (capture phase) → chặn navigation mặc định
 * 2. Một "trang sách" phủ toàn màn hình, xoay quanh gáy TRÁI (rotateY 0 → -178°)
 * 3. Trong lúc lật (~52% thời gian): thực hiện navigation (scroll tới section / router.push)
 *    — trang đang vuông góc nên người dùng không thấy nội dung đổi
 * 4. Trang lật xong + fade nhẹ → nội dung mới hiện ra → tương tác bình thường
 *
 * Chi tiết 3D: perspective, preserve-3d, backface-visibility, shadow động theo
 * progress, light gradient di chuyển, độ dày gáy + scaleX nhẹ tạo cảm giác cong giấy.
 *
 * Accessibility: prefers-reduced-motion → bỏ animation, navigation thường.
 * Mobile: giảm perspective + duration + shadow.
 */

const DURATION_DESKTOP = 1.05; // giây
const DURATION_MOBILE = 0.85;
const FLIP_AT = 0.52; // thời điểm thực hiện navigation (% tổng thời gian)

export default function PageFlip() {
  const router = useRouter();
  const pathname = usePathname();
  const busyRef = useRef(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);
  const lightRef = useRef<HTMLDivElement>(null);

  const prefersReducedMotion = useCallback(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  /** Chạy animation lật trang, navigate() được gọi giữa chừng lật */
  const runFlip = useCallback(
    (navigate: () => void) => {
      if (busyRef.current) return;
      busyRef.current = true;

      const isMobile = window.innerWidth < 768;
      const duration = isMobile ? DURATION_MOBILE : DURATION_DESKTOP;
      const overlay = overlayRef.current;
      const page = pageRef.current;
      const shadow = shadowRef.current;
      const light = lightRef.current;
      if (!overlay || !page || !shadow || !light) return;

      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(overlay, { visibility: 'hidden', opacity: 0 });
          gsap.set(page, { rotationY: 0, scaleX: 1, opacity: 1 });
          gsap.set(shadow, { opacity: 0 });
          gsap.set(light, { opacity: 0 });
          busyRef.current = false;
        },
      });

      tl.set(overlay, { visibility: 'visible', opacity: 1 })
        // Trang bắt đầu lật: 0 → -178° quanh gáy trái, có cong nhẹ + shadow/light động
        .fromTo(
          page,
          { rotationY: 0, scaleX: 1, opacity: 1 },
          {
            rotationY: -178,
            scaleX: 1.015,
            duration,
            ease: 'power3.inOut',
            onUpdate: function () {
              const p = this.progress();
              // Shadow đổ theo góc lật (mạnh nhất ở giữa)
              gsap.set(shadow, { opacity: Math.sin(p * Math.PI) * 0.85 });
              // Light gradient di chuyển theo trang
              gsap.set(light, {
                xPercent: -60 + p * 120,
                opacity: 0.2 + Math.sin(p * Math.PI) * 0.4,
              });
            },
          },
          0
        )
        // Navigation tại giữa lật (trang đang vuông góc)
        .call(
          () => {
            navigate();
          },
          [],
          duration * FLIP_AT
        )
        // Trang lật xong → fade nhẹ, lộ nội dung mới
        .to(page, { opacity: 0, duration: 0.16, ease: 'power1.out' }, duration * 0.84)
        .to(overlay, { opacity: 0, duration: 0.14, ease: 'power1.out' }, duration * 0.9);
    },
    []
  );

  // ── Intercept click trên mọi link nội bộ ─────────────────────────────
  useEffect(() => {
    if (prefersReducedMotion()) return; // accessibility: để trình duyệt xử lý

    const onClick = (e: MouseEvent) => {
      if (busyRef.current) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
        return; // chuột phải / ctrl+click / cmd+click → hành vi mặc định
      }
      const anchor = (e.target as Element).closest('a');
      if (!anchor) return;
      const href = anchor.getAttribute('href') || '';
      if (anchor.target === '_blank') return;
      if (href.startsWith('tel:') || href.startsWith('mailto:') || href.startsWith('http') || href.startsWith('//')) {
        return; // external / tel / mailto
      }
      if (!href.startsWith('/') && !href.startsWith('#')) return;
      if (href.startsWith('#') && !href.startsWith('/#')) return; // pure anchor không có

      e.preventDefault();
      e.stopPropagation();
      window.dispatchEvent(new CustomEvent('pageflip-start'));

      const [pathPart, hash] = href.split('#');
      const curPath = window.location.pathname || '/';
      const targetPath = pathPart || '/';
      const samePage = curPath === targetPath || curPath.replace(/\/$/, '') === targetPath.replace(/\/$/, '');

      runFlip(() => {
        if (samePage) {
          // Cùng trang → scroll tới section (instant, vì đang bị trang sách che)
          if (hash) {
            const el = document.getElementById(hash);
            if (el) {
              const y = el.getBoundingClientRect().top + window.scrollY - 72;
              window.scrollTo({ top: Math.max(0, y), behavior: 'instant' as ScrollBehavior });
            } else {
              window.scrollTo(0, 0);
            }
          } else {
            window.scrollTo(0, 0);
          }
        } else {
          // Route thật → Next.js xử lý
          router.push(href);
        }
      });
    };

    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, [prefersReducedMotion, runFlip, router, pathname]);

  // Route đổi ngoài luồng (back/forward, refresh) → đảm bảo overlay ẩn, không kẹt
  useEffect(() => {
    if (overlayRef.current) {
      gsap.set(overlayRef.current, { visibility: 'hidden', opacity: 0 });
    }
    busyRef.current = false;
  }, [pathname]);

  return (
    <div
      ref={overlayRef}
      aria-hidden="true"
      className="pageflip"
      style={{ visibility: 'hidden', opacity: 0 }}
    >
      <div className="pf-scene">
        {/* Trang sách: xoay quanh gáy trái */}
        <div ref={pageRef} className="pf-page">
          <div className="pf-face pf-front" />
          <div className="pf-face pf-back" />
          {/* Độ dày gáy */}
          <div className="pf-edge" />
        </div>
        {/* Shadow đổ theo góc lật */}
        <div ref={shadowRef} className="pf-shadow" />
      </div>
      {/* Light gradient di chuyển theo trang */}
      <div ref={lightRef} className="pf-light" />
    </div>
  );
}

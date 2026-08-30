'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * CinematicScroll — scroll reveal + parallax nhẹ (KHÔNG intercept navigation)
 *
 * Navigation (click menu) do PageFlip xử lý. Component này chỉ lo:
 * 1. Section reveal: fade + translate nhẹ khi section vào viewport
 * 2. Parallax rất nhẹ cho ảnh nền hero (desktop)
 *
 * prefers-reduced-motion → bỏ qua tất cả.
 */

export default function CinematicScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (pathname !== '/') return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      // Parallax rất nhẹ cho ảnh nền hero (desktop, có GPU)
      mm.add('(min-width: 768px)', () => {
        const bg = document.querySelector<HTMLElement>('#home .absolute.inset-0 img');
        if (bg) {
          gsap.fromTo(
            bg,
            { scale: 1.08, yPercent: -4 },
            {
              scale: 1.08,
              yPercent: 4,
              ease: 'none',
              scrollTrigger: {
                trigger: '#home',
                start: 'top top',
                end: 'bottom top',
                scrub: 0.6,
              },
            }
          );
        }
      });

      // Section reveal: fade + translate nhẹ khi section vào viewport
      // (bỏ #home — hero hiện ngay; bỏ #treatments — đã có IntersectionObserver riêng)
      gsap.utils.toArray<HTMLElement>('main section[id]').forEach((sec) => {
        if (sec.id === 'home' || sec.id === 'treatments') return;
        gsap.from(sec, {
          opacity: 0,
          y: 48,
          duration: 1.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sec,
            start: 'top 88%',
            once: true,
          },
        });
      });
    });

    return () => {
      ctx.revert();
      mm.revert();
    };
  }, [pathname]);

  // Component vô hình — chỉ quản lý hiệu ứng
  return null;
}

'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

/**
 * CinematicScroll — smooth scroll cinematic + scroll reveal + parallax nhẹ
 *
 * Cơ chế:
 * 1. Click menu anchor cùng trang chủ (/#home, /#about, /#treatments, /#experience, /#contact)
 *    → GSAP ScrollToPlugin cuộn mượt (power3.inOut, ~1.15s) thay vì jump
 * 2. Section reveal: mỗi section (trừ hero) fade + translate nhẹ khi vào viewport
 * 3. Parallax rất nhẹ cho ảnh nền hero (desktop)
 * 4. prefers-reduced-motion → bỏ qua tất cả, scroll thường
 *
 * Không ảnh hưởng: route thật (/journal, /dich-vu/...) vẫn do Next.js xử lý bình thường.
 * Không thêm thư viện mới — tận dụng GSAP đã có trong project.
 */

export default function CinematicScroll() {
  const pathname = usePathname();

  // ── 1. Smooth scroll khi click menu (anchor cùng trang) ──────────────
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return; // accessibility: scroll thường

    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element).closest('a');
      if (!a) return;
      const href = a.getAttribute('href') || '';
      // Chỉ xử lý anchor nội bộ dạng /#section
      if (!href.startsWith('/#')) return;
      // Chỉ intercept khi đang ở trang chủ (cùng route) — route thật để Next xử lý
      if (window.location.pathname !== '/') return;
      const id = href.slice(2);
      const el = document.getElementById(id);
      if (!el) return;
      // Giữ nguyên hành vi mặc định cho click đặc biệt (mở tab mới, chuột giữa...)
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;

      e.preventDefault();
      e.stopPropagation();
      // Đóng mobile drawer nếu đang mở
      window.dispatchEvent(new CustomEvent('cinematic-scroll-start'));

      // Tạm tắt CSS scroll-behavior:smooth để GSAP kiểm soát hoàn toàn
      const html = document.documentElement;
      const prev = html.style.scrollBehavior;
      html.style.scrollBehavior = 'auto';

      gsap.to(window, {
        duration: window.innerWidth < 768 ? 0.9 : 1.15,
        ease: 'power3.inOut',
        scrollTo: { y: el, offsetY: -72 }, // trừ chiều cao navbar fixed
        onComplete: () => {
          html.style.scrollBehavior = prev;
        },
      });
    };

    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, [pathname]);

  // ── 2. Scroll reveal + parallax nhẹ (chỉ áp dụng ở trang chủ) ────────
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

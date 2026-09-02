'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * HeroImageGrid — Hiệu ứng "hàng nghìn mảnh ảnh hội tụ"
 *
 * Chia ảnh thành lưới ô nhỏ (cols x rows). Mỗi ô là một <img> cùng nguồn,
 * dùng object-fit:cover + object-position để hiển thị đúng lát cắt của ảnh
 * (giống cách chia ảnh thành mảng ô). Vì dùng object-fit:cover, các ô ghép
 * khít thành ảnh hoàn chỉnh KHÔNG BỊ MÉO, không phụ thuộc tỷ lệ ảnh gốc.
 *
 * Khi cuộn tới hero, các ô bắt đầu rải rác khắp màn hình (translate + xoay),
 * rồi cùng lúc bay về vị trí grid → ghép thành ảnh. Sau khi xong, một vệt
 * ánh bạc lướt ngang qua ảnh.
 */

const COLS = 6;
const ROWS = 8;
const CELL_W = 100 / COLS; // % chiều rộng mỗi ô
const CELL_H = 100 / ROWS; // % chiều cao mỗi ô

interface HeroImageGridProps {
  src: string;
  alt?: string;
  className?: string;
}

export default function HeroImageGrid({ src, alt, className }: HeroImageGridProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const shineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const shine = shineRef.current;
    if (!root || !shine) return;

    const cells = Array.from(root.querySelectorAll<HTMLElement>('.slice'));

    // 1) Trạng thái ban đầu: các ô rải rác khắp nơi, xoay ngẫu nhiên
    cells.forEach((cell) => {
      const randX = gsap.utils.random(-35, 35) * 18; // px
      const randY = gsap.utils.random(-35, 35) * 18; // px
      const rot = gsap.utils.random(-300, 300); // độ
      gsap.set(cell, { x: randX, y: randY, rotation: rot, opacity: 0, scale: 0.5 });
    });

    // 2) ScrollTrigger: khi hero lọt vào viewport → các ô bay về vị trí grid
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: root,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
      onComplete: () => {
        // 3) Sau khi ghép xong → vệt ánh bạc lướt ngang
        gsap.fromTo(
          shine,
          { xPercent: -130, opacity: 0 },
          {
            xPercent: 130,
            opacity: 1,
            duration: 1.1,
            ease: 'power2.inOut',
            onComplete: () => gsap.set(shine, { opacity: 0 }),
          }
        );
      },
    });

    tl.to(cells, {
      x: 0,
      y: 0,
      rotation: 0,
      scale: 1,
      opacity: 1,
      duration: 1.2,
      ease: 'power3.out',
      stagger: {
        each: 0.02,
        from: 'random',
      },
    });

    // Fallback: nếu ScrollTrigger không kích hoạt trong 5s, tự play
    const fallback = setTimeout(() => {
      if (tl.progress() < 0.1) tl.play();
    }, 5000);

    return () => {
      clearTimeout(fallback);
      setTimeout(() => tl.scrollTrigger && tl.scrollTrigger.kill(), 0);
      tl.kill();
    };
  }, []);

  const cells = [];
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      /*
       * Sprite-sheet trimming: mỗi cell là một "cửa sổ" nhỏ, bên trong chứa
       * toàn bộ ảnh được phóng to lên (COLS x ROWS) lần rồi dịch chuyển để
       * hiển thị đúng lát cắt. Vì ảnh phóng đều theo cả 2 trục, các cell ghép
       * lại khít thành ảnh hoàn chỉnh — KHÔNG bị méo, KHÔNG bị lệch.
       */
      const imgW = COLS * 100; // % so với cell width
      const imgH = ROWS * 100; // % so với cell height
      const offX = -(c * 100); // % so với cell width
      const offY = -(r * 100); // % so với cell height
      cells.push(
        <div
          key={`${r}-${c}`}
          className="slice absolute overflow-hidden"
          style={{
            left: `${c * CELL_W}%`,
            top: `${r * CELL_H}%`,
            width: `${CELL_W}%`,
            height: `${CELL_H}%`,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt ?? ''}
            draggable={false}
            className="absolute block"
            style={{
              left: `${offX}%`,
              top: `${offY}%`,
              width: `${imgW}%`,
              height: `${imgH}%`,
              maxWidth: 'none',
            }}
          />
        </div>
      );
    }
  }

  return (
    <div
      ref={rootRef}
      className={`relative h-full w-full overflow-hidden ${className ?? ''}`}
    >
      {cells}
      {/* Vệt ánh bạc lướt ngang khi ảnh hội tụ xong */}
      <div
        ref={shineRef}
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-24 opacity-0"
        style={{
          background:
            'linear-gradient(105deg, transparent 0%, rgba(220,225,255,0.0) 15%, rgba(226,232,255,0.55) 45%, rgba(255,255,255,0.9) 50%, rgba(226,232,255,0.55) 55%, transparent 85%)',
          filter: 'blur(2px)',
          mixBlendMode: 'screen',
        }}
      />
    </div>
  );
}

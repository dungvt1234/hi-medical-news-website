'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * HeroImageGrid — Hiệu ứng "hàng nghìn mảnh ảnh hội tụ"
 *
 * Chia ảnh thành lưới ô nhỏ (cols x rows). Mỗi ô hiển thị một lát cắt của
 * cùng một ảnh lớn (dùng background-position để hiển thị đúng phần của nó)
 * và được xếp đúng vị trí grid (left/top theo cột & hàng).
 *
 * Khi cuộn tới hero, các ô bắt đầu ở vị trí ngẫu nhiên rải khắp màn hình
 * (translate + xoay), rồi cùng lúc bay về vị trí grid → ghép thành ảnh
 * hoàn chỉnh. Sau khi ghép xong, một vệt ánh bạc lướt ngang qua ảnh.
 */

const COLS = 6;
const ROWS = 8;
const CELL_W = 100 / COLS; // % chiều rộng mỗi ô
const CELL_H = 100 / ROWS; // % chiều cao mỗi ô

interface HeroImageGridProps {
  src: string;
  className?: string;
}

export default function HeroImageGrid({ src, className }: HeroImageGridProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const shineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const shine = shineRef.current;
    if (!root || !shine) return;

    const cells = Array.from(root.querySelectorAll<HTMLElement>('.slice'));

    // 1) Trạng thái ban đầu: các ô rải rác khắp nơi, xoay ngẫu nhiên
    cells.forEach((cell) => {
      const randX = gsap.utils.random(-40, 40) * 16; // px
      const randY = gsap.utils.random(-40, 40) * 16; // px
      const rot = gsap.utils.random(-360, 360); // độ
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

    // Tăng độ tin cậy: nếu ScrollTrigger không kích hoạt trong 5s, tự play
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
      cells.push(
        <div
          key={`${r}-${c}`}
          className="slice absolute"
          style={{
            left: `${c * CELL_W}%`,
            top: `${r * CELL_H}%`,
            width: `${CELL_W}%`,
            height: `${CELL_H}%`,
            backgroundImage: `url(${src})`,
            backgroundSize: `${COLS * 100}% ${ROWS * 100}%`,
            backgroundPosition: `${c * CELL_W}% ${r * CELL_H}%`,
            backgroundRepeat: 'no-repeat',
          }}
        />
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

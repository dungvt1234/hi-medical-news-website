'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * HeroImageGrid — Hiệu ứng "hàng nghìn mảnh ảnh hội tụ"
 *
 * Chia ảnh thành lưới ô nhỏ (cols x rows). Mỗi ô là một lát cắt của cùng
 * một ảnh lớn (dùng background-position để hiển thị đúng phần của nó).
 *
 * Khi cuộn tới hero, các ô bắt đầu ở vị trí ngẫu nhiên rải khắp màn hình,
 * có góc xoay riêng, rồi cùng lúc bay về vị trí đúng → ghép thành ảnh
 * hoàn chỉnh. Sau khi ghép xong, một vệt ánh bạc lướt ngang qua ảnh.
 *
 * Lưu ý: ảnh được truyền vào phải là absolute path (đường dẫn tĩnh),
 * vì mỗi ô dùng ảnh đó làm background.
 */

const COLS = 10;
const ROWS = 12;

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
      const randX = gsap.utils.random(-50, 50) * 12; // px
      const randY = gsap.utils.random(-50, 50) * 12; // px
      const rot = gsap.utils.random(-420, 420); // độ
      gsap.set(cell, { x: randX, y: randY, rotation: rot, opacity: 0, scale: 0.6 });
    });

    // 2) ScrollTrigger: khi hero lọt vào viewport → các ô bay về vị trí gốc
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: root,
        start: 'top 80%',
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
      duration: 1.4,
      ease: 'power3.out',
      stagger: {
        each: 0.02,
        from: 'random',
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      tl.kill();
    };
  }, []);

  const cells = [];
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const px = (c / (COLS - 1)) * 100;
      const py = (r / (ROWS - 1)) * 100;
      cells.push(
        <div
          key={`${r}-${c}`}
          className="slice absolute inset-0"
          style={{
            backgroundImage: `url(${src})`,
            backgroundSize: `${COLS * 100}% ${ROWS * 100}%`,
            backgroundPosition: `${px}% ${py}%`,
            backgroundRepeat: 'no-repeat',
          }}
        />
      );
    }
  }

  return (
    <div
      ref={rootRef}
      className={`relative aspect-[4/5] w-full overflow-hidden ${className ?? ''}`}
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

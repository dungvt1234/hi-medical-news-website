'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * HeroImageGrid — Hiệu ứng "hàng nghìn mảnh ảnh hội tụ"
 *
 * Chia ảnh thành lưới rất dày (COLS x ROWS ≈ 500 mảnh nhỏ, 20x25).
 * Mỗi mảnh là một "cửa sổ" chứa toàn bộ ảnh phóng lên (COLS x ROWS) lần rồi
 * dịch chuyển để hiển thị đúng lát cắt (kỹ thuật sprite-sheet trimming).
 * Vì ảnh phóng đều cả 2 trục, các mảnh ghép khít thành ảnh hoàn chỉnh —
 * KHÔNG méo, KHÔNG lệch, không phụ thuộc tỉ lệ ảnh gốc.
 *
 * - Khi cuộn tới hero: các mảnh BAY TỪ RÌA MÀN HÌNH (ngoài viewport) hội tụ
 *   về vị trí grid → ghép thành ảnh.
 * - Sau khi hội tụ xong: vệt sáng chạy CHÉO TỪ TRÊN-XUỐNG qua ảnh.
 */

const COLS = 20;
const ROWS = 25;
const CELL_W = 100 / COLS; // % chiều rộng mỗi mảnh so với container
const CELL_H = 100 / ROWS; // % chiều cao mỗi mảnh so với container

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

    // 1) Trạng thái ban đầu: mỗi mảnh RẤT TO + MỜ (như máy quay đang nhìn sát)
    // rồi sẽ thu nhỏ dần về đúng vị trí → ghép thành ảnh (cảm giác camera lùi xa).
    cells.forEach((cell) => {
      // Ngẫu nhiên mức phóng đại ban đầu (mảnh càng to khi càng "gần mắt")
      const fromScale = gsap.utils.random(6, 11);
      // Dịch nhẹ + xoay nhẹ quanh vị trí gốc tạo cảm giác lơ lửng trong không gian
      const randX = gsap.utils.random(-120, 120);
      const randY = gsap.utils.random(-120, 120);
      const rot = gsap.utils.random(-70, 70);
      gsap.set(cell, {
        x: randX,
        y: randY,
        rotation: rot,
        scale: fromScale,
        opacity: 0,
      });
    });

    // 2) ScrollTrigger: khi hero lọt vào viewport → các mảnh thu nhỏ về đúng vị trí
    // (mỗi lần cuộn vào hero là chạy lại hiệu ứng)
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: root,
        start: 'top 90%',
        toggleActions: 'play none none reverse',
      },
      onComplete: () => {
        // 3) Vệt sáng chạy chéo từ trên-xuống: một dải nghiêng 135°
        // trượt từ góc trái-trên ra góc phải-dưới.
        gsap.fromTo(
          shine,
          { x: -shine.offsetWidth * 1.6, y: -shine.offsetHeight, opacity: 0 },
          {
            x: shine.offsetWidth * 1.6 + root.offsetWidth,
            y: shine.offsetHeight,
            opacity: 1,
            duration: 1.3,
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
      duration: 3,
      ease: 'power3.out',
      stagger: {
        each: 0.006,
        from: 'center',
        grid: [ROWS, COLS],
      },
    });

    // Fallback: nếu ScrollTrigger không kích hoạt trong 6s, tự play
    const fallback = setTimeout(() => {
      if (tl.progress() < 0.1) tl.play();
    }, 6000);

    return () => {
      clearTimeout(fallback);
      setTimeout(() => tl.scrollTrigger && tl.scrollTrigger.kill(), 0);
      tl.kill();
    };
  }, []);

  const cells = [];
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      /* Sprite-sheet trimming: img phóng lên (COLS x ROWS) lần, dịch trái/top
         theo cột/hàng để hiển thị đúng lát cắt — ghép khít, không méo. */
      const imgW = COLS * 100; // % so với mảnh width
      const imgH = ROWS * 100; // % so với mảnh height
      const offX = -(c * 100); // % so với mảnh width
      const offY = -(r * 100); // % so với mảnh height
      cells.push(
        <div
          key={`${r}-${c}`}
          className="slice will-change-transform absolute overflow-hidden"
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
            alt=""
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
      style={{ perspective: '1200px' }}
    >
      {cells}
      {/* Vệt sáng chạy chéo từ trên xuống: dải nghiêng 135°, bắt đầu ngoài
          góc trên-trái rồi trượt qua xuống góc phải-dưới */}
      <div
        ref={shineRef}
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 opacity-0"
        style={{
          width: 260,
          height: '200%',
          top: '-50%',
          transform: 'rotate(135deg)',
          transformOrigin: 'center',
          background:
            'linear-gradient(90deg, transparent 0%, rgba(235,240,255,0.0) 30%, rgba(238,243,255,0.4) 45%, rgba(255,255,255,0.95) 50%, rgba(238,243,255,0.4) 55%, rgba(235,240,255,0.0) 70%, transparent 100%)',
          filter: 'blur(2px)',
          mixBlendMode: 'screen',
        }}
      />
    </div>
  );
}

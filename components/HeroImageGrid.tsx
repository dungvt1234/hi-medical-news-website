'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

/**
 * HeroImageGrid — "Đàn mảnh ảnh bị khung hút lại"
 *
 * Render 1 lưới mảnh ảnh (sprite-sheet tiles) PHỦ TOÀN BỘ vùng hero (đặt ở cấp
 * section, KHÔNG bên trong khung arch). Mỗi mảnh khởi đầu RẢI RÁC KHẮP HERO &
 * MÀN HÌNH (hình vuông rõ, xa-nhỏ, mờ, xoay nhẹ) như đàn chim trên bầu trời.
 *
 * Khi cuộn tới hero: toàn bộ mảnh đồng loạt BAY VỀ VỊ TRÍ KHUNG ẢNH (archRef —
 * khung nằm bên phải), to dần + nét dần → ghép khít thành ảnh hoàn chỉnh
 * (hình chữ nhật). Cảm giác "đàn mảnh bị khung hút lại rồi hội tụ thành ảnh".
 */

const COLS = 18;
const ROWS = 22;
const CELL_W = 100 / COLS;
const CELL_H = 100 / ROWS;

interface HeroImageGridProps {
  src: string;
  /** ref tới khung ảnh = vị trí đích hội tụ (hình chữ nhật) */
  archRef: React.MutableRefObject<HTMLDivElement | null>;
  className?: string;
}

export default function HeroImageGrid({ src, archRef, className }: HeroImageGridProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const shineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const shine = shineRef.current;
    const arch = archRef.current;
    if (!root || !shine || !arch) return;

    const cells = Array.from(root.querySelectorAll<HTMLElement>('.slice'));
    const rootW = root.offsetWidth;
    const rootH = root.offsetHeight;
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // Vị trí đích (hình chữ nhật) = vị trí khung arch trong hệ tọa độ root
    const archRect = arch.getBoundingClientRect();
    const rootRect = root.getBoundingClientRect();
    const dx = archRect.left - rootRect.left;
    const dy = archRect.top - rootRect.top;
    const archW = archRect.width;
    const archH = archRect.height;

    // Pre-tính mảng vị trí đích + trạng thái ban đầu cho mỗi mảnh
    const targets: { x: number; y: number; sx: number; sy: number; s: number; rot: number }[] = [];
    cells.forEach((_cell, i) => {
      const col = i % COLS;
      const row = Math.floor(i / COLS);
      const sx = gsap.utils.random(-80, vw + 80);
      const sy = gsap.utils.random(-80, vh + 80);
      const s = gsap.utils.random(0.35, 0.7);
      const rot = gsap.utils.random(-45, 45);
      const cssX = (col * CELL_W) / 100 * rootW;
      const cssY = (row * CELL_H) / 100 * rootH;
      const tx = dx + (col * CELL_W) / 100 * archW;
      const ty = dy + (row * CELL_H) / 100 * archH;
      targets.push({ x: tx - cssX, y: ty - cssY, sx: sx - cssX, sy: sy - cssY, s, rot });
      gsap.set(cells[i], {
        x: sx - cssX,
        y: sy - cssY,
        scale: s,
        rotation: rot,
        opacity: 0.12,
      });
    });

    // 2) Timeline tự chạy (không pause): giữ trạng thái rải ~1.1s rồi mảnh
    // BAY VỀ khung arch, to dần + nét dần → ghép thành ảnh hoàn chỉnh.
    const tl = gsap.timeline({
      delay: 1.1,
      onComplete: () => {
        // 3) Vệt sáng chạy chéo qua vùng khung ảnh
        gsap.fromTo(
          shine,
          { x: dx - shine.offsetWidth * 1.4, y: dy - shine.offsetHeight, opacity: 0 },
          {
            x: dx + archW + shine.offsetWidth * 0.4,
            y: dy + archH,
            opacity: 1,
            duration: 1.3,
            ease: 'power2.inOut',
            onComplete: () => gsap.set(shine, { opacity: 0 }),
          }
        );
      },
    });

    tl.to(cells, {
      x: (i) => targets[i].x,
      y: (i) => targets[i].y,
      scale: 1,
      rotation: 0,
      opacity: 1,
      duration: 2.6,
      ease: 'power3.inOut',
      stagger: { each: 0.004, from: 'random' },
    });

    // Fallback cứng: dù thế nào thì sau ~6s mọi mảnh CHẮC CHẮN về đúng vị trí
    // và hiện ảnh (không bao giờ bị treo ở trạng thái mảnh rải trên nền).
    const settle = () => {
      if (tl.progress() < 1) {
        cells.forEach((cell, i) => {
          gsap.set(cell, {
            x: targets[i].x,
            y: targets[i].y,
            scale: 1,
            rotation: 0,
            opacity: 1,
          });
        });
        if (shine) gsap.set(shine, { opacity: 0 });
      }
    };
    const forceSettle = setTimeout(settle, 6000);

    return () => {
      clearTimeout(forceSettle);
      tl.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src]);

  const pieces = [];
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const imgW = COLS * 100;
      const imgH = ROWS * 100;
      const offX = -(c * 100);
      const offY = -(r * 100);
      pieces.push(
        <div
          key={`${r}-${c}`}
          className="slice absolute will-change-transform"
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
      className={`absolute inset-0 overflow-hidden ${className ?? ''}`}
    >
      {pieces}
      {/* Vệt sáng chạy chéo qua vùng khung ảnh */}
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

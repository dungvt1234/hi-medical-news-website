'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Reveal — hiệu ứng split-text: heading hiện ra từng chữ cái khi scroll vào viewport
 * - Dùng GSAP SplitText (có sẵn trong core 3.13+)
 * - gsap.context để tự dọn dẹp đúng scope, không ảnh hưởng component khác
 * - Tôn trọng prefers-reduced-motion: hiện thẳng, không animation
 */
export default function Reveal({
  as: Tag = 'h2',
  children,
  className = '',
  delay = 0,
}: {
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // prefers-reduced-motion: hiện thẳng, không animation
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.style.opacity = '1';
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const SplitText = require('gsap/SplitText').SplitText;
    const split = new SplitText(el, { type: 'words,chars' });

    const ctx = gsap.context(() => {
      // Ẩn chars ngay lập tức (tránh flash trước khi trigger fire)
      gsap.set(split.chars, { yPercent: 110, opacity: 0, rotateX: -60 });
      gsap.fromTo(
        split.chars,
        { yPercent: 110, opacity: 0, rotateX: -60 },
        {
          yPercent: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.9,
          ease: 'power4.out',
          stagger: 0.018,
          delay,
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            once: true,
          },
        }
      );
    }, el);

    return () => {
      ctx.revert();
    };
  }, [delay]);

  return (
    <Tag
      ref={ref as never}
      className={`[perspective:600px] ${className}`}
    >
      {children}
    </Tag>
  );
}

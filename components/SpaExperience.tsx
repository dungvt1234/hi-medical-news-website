'use client';

import { useEffect, useRef } from 'react';

/**
 * Spa Experience — full-width cinematic image với parallax nhẹ
 * Overlay: "AN EXPERIENCE BEYOND BEAUTY."
 */
export default function SpaExperience() {
  const imgRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  // Parallax nhẹ: ảnh dịch chuyển chậm hơn tốc độ scroll
  useEffect(() => {
    const img = imgRef.current;
    const txt = textRef.current;
    if (!img || !txt) return;

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = img.getBoundingClientRect();
        const mid = rect.top + rect.height / 2 - window.innerHeight / 2;
        const offset = mid * -0.08; // parallax nhẹ
        img.style.transform = `translateY(${offset}px) scale(1.08)`;
        if (rect.top < window.innerHeight * 0.8 && rect.bottom > 0) {
          txt.classList.add('is-visible');
        }
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="experience" className="relative overflow-hidden bg-night-3 py-24 sm:py-36">
      {/* Ảnh nền full-width */}
      <div className="absolute inset-0">
        <div ref={imgRef} className="absolute inset-0 will-change-transform">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=2000&auto=format&fit=crop"
            alt="Không gian spa cao cấp"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-[#302642]/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-night-3 via-transparent to-night-3" />
      </div>

      {/* Overlay text */}
      <div
        ref={textRef}
        className="reveal relative z-10 mx-auto max-w-4xl px-5 text-center sm:px-8"
      >
        <p className="eyebrow mb-6 flex items-center justify-center gap-3 !text-[#E5DCF0]">
          <span className="h-px w-10 bg-gold" />
          The Experience
          <span className="h-px w-10 bg-gold" />
        </p>
        <h2 className="font-heading text-4xl font-light leading-[1.15] !text-[#F8F4F7] sm:text-6xl">
          An experience
          <br />
          <span className="italic text-gold">beyond beauty.</span>
        </h2>
        <p className="mx-auto mt-7 max-w-xl text-base font-light leading-relaxed !text-[#D8CCE8]">
          Không gian được thiết kế như một ốc đảo tĩnh lặng — ánh sáng dịu, hương thơm
          nhẹ nhàng và những chạm khắc tinh tế, đưa bạn rời xa ồn ào để trở về với chính mình.
        </p>
      </div>
    </section>
  );
}

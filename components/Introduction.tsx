'use client';

import { useEffect, useRef } from 'react';
import Reveal from './Reveal';

/**
 * Introduction — section sáng #F1E9ED
 * Editorial layout: label + serif heading (trái) | description + philosophy + CTA (phải)
 */
export default function Introduction() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.querySelectorAll('.reveal').forEach((n, i) => {
              setTimeout(() => n.classList.add('is-visible'), i * 150);
            });
            obs.disconnect();
          }
        });
      },
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="about" className="bg-cream py-24 sm:py-32">
      <div ref={ref} className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
        {/* Trái: label + heading */}
        <div>
          <p className="eyebrow reveal mb-6 flex items-center gap-3 !text-[#8B5FC7]">
            <span className="h-px w-10 bg-gold" />
            Our Philosophy
          </p>
          <Reveal as="h2" className="font-heading text-4xl font-light leading-[1.15] text-[#302642] sm:text-5xl lg:text-6xl">
            Chúng tôi tin vẻ đẹp bắt đầu
            từ việc <span className="italic text-rose-deep">chậm lại.</span>
          </Reveal>
        </div>

        {/* Phải: description + philosophy + CTA */}
        <div className="flex flex-col justify-center">
          <p className="reveal text-lg font-light leading-relaxed text-[#5b5668]">
            Giữa nhịp sống hối hả, Hi Medical mang đến một khoảng lặng dành riêng cho bạn.
            Mỗi liệu trình được thiết kế như một nghi thức — chậm rãi, tinh tế và trọn vẹn,
            để cơ thể được phục hồi và làn da được nuôi dưỡng từ sâu bên trong.
          </p>
          <p className="reveal mt-6 border-l-2 border-rose-deep/50 pl-5 font-heading text-xl italic leading-relaxed text-[#3a3550]">
            "Vẻ đẹp thật sự không đến từ sự vội vã, mà từ những khoảnh khắc ta dành
            trọn cho chính mình."
          </p>
          <a
            href="#treatments"
            className="reveal mt-10 inline-flex w-fit items-center gap-3 rounded-full bg-rose px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-white transition-all duration-500 hover:bg-rose-deep hover:shadow-glow"
          >
            Khám phá liệu trình
            <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

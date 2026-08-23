'use client';

import { useEffect, useRef } from 'react';

/**
 * Testimonial — background #272744
 * Một testimonial lớn ở giữa, serif lớn, tên + location
 */
export default function Testimonial() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.querySelectorAll('.reveal').forEach((n) => n.classList.add('is-visible'));
            obs.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="bg-night-2 py-24 sm:py-32">
      <div ref={ref} className="mx-auto max-w-4xl px-5 text-center sm:px-8">
        {/* Dấu ngoặc kép trang trí */}
        <div className="reveal mb-8 flex justify-center">
          <span className="font-heading text-7xl italic leading-none text-gold">"</span>
        </div>

        <blockquote className="reveal">
          <p className="font-heading text-3xl font-light leading-[1.3] text-ink sm:text-4xl lg:text-[2.75rem]">
            Liệu trình Moonlight Facial đã thay đổi hoàn toàn làn da của tôi.
            Không gian tĩnh lặng, chuyên viên tận tâm — mọi thứ đều hoàn hảo
            đến từng chi tiết. Đây thực sự là nơi để phụ nữ được chăm sóc trọn vẹn.
          </p>
        </blockquote>

        <div className="reveal mt-10">
          <div className="mx-auto mb-4 h-px w-16 bg-gold" />
          <p className="font-heading text-xl text-rose-deep">Minh Anh</p>
          <p className="mt-1 text-xs uppercase tracking-[0.22em] text-ink-light">
            Khách hàng thân thiết · TP. Hồ Chí Minh
          </p>
        </div>
      </div>
    </section>
  );
}

'use client';

import { useEffect, useRef } from 'react';
import TreatmentsDeck from './TreatmentsDeck';

/**
 * Signature Treatments — 6 cards dịch vụ
 * Style: dark navy, large image, minimal typography, hover zoom nhẹ
 * Dữ liệu dùng chung từ lib/services (đồng bộ ảnh với /dich-vu và trang chi tiết)
 */

export default function Treatments() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.querySelectorAll('.reveal').forEach((n, i) => {
              setTimeout(() => n.classList.add('is-visible'), i * 120);
            });
            obs.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="treatments" className="bg-night py-24 sm:py-32">
      <div ref={ref} className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Heading */}
        <div className="mb-16 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow reveal mb-5 flex items-center gap-3">
              <span className="h-px w-10 bg-gold" />
              Signature Treatments
            </p>
            <h2 className="reveal font-heading text-4xl font-light leading-tight text-ink sm:text-5xl">
              Liệu trình tuyển chọn cho
              <br />
              <span className="italic text-rose-deep">mọi vẻ đẹp.</span>
            </h2>
          </div>
        </div>

        {/* Deck: cuộn đẩy dải liệu trình 3D */}
        <TreatmentsDeck />
      </div>
    </section>
  );
}

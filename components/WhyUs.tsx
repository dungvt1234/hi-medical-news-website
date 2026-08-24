'use client';

import { useEffect, useRef } from 'react';
import Reveal from './Reveal';

/**
 * Why Us — 4 statistics / benefits
 * Layout tối giản editorial portfolio
 */
const STATS = [
  { value: '10+', label: 'Năm kinh nghiệm' },
  { value: '5K+', label: 'Khách hàng hài lòng' },
  { value: '20+', label: 'Liệu trình đặc trưng' },
  { value: '100%', label: 'Chăm sóc cá nhân hóa' },
];

export default function WhyUs() {
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
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="bg-night py-24 sm:py-28">
      <div ref={ref} className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-16 text-center">
          <p className="eyebrow reveal mb-5 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-gold" />
            Why Hi Medical
            <span className="h-px w-10 bg-gold" />
          </p>
          <Reveal as="h2" className="font-heading text-4xl font-light text-ink sm:text-5xl">
            Được tin chọn bởi những người{' '}
            <span className="italic text-rose-deep">tìm kiếm sự tinh tế.</span>
          </Reveal>
        </div>

        {/* Stats grid — editorial minimal */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className={`reveal text-center lg:border-l lg:border-luxury ${
                i === 0 ? 'lg:border-l-0' : ''
              }`}
            >
              <p className="font-heading text-6xl font-light text-rose-deep sm:text-7xl">
                {s.value}
              </p>
              <p className="mt-3 text-xs font-semibold uppercase tracking-[0.22em] text-ink-light">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

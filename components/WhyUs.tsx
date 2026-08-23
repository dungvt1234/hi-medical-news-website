'use client';

import { useEffect, useRef } from 'react';

/**
 * Why Us — 4 statistics / benefits
 * Layout tối giản editorial portfolio
 */
const STATS = [
  { value: '10+', label: 'Years of experience' },
  { value: '5K+', label: 'Happy clients' },
  { value: '20+', label: 'Signature rituals' },
  { value: '100%', label: 'Personalized care' },
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
          <h2 className="reveal font-heading text-4xl font-light text-ink sm:text-5xl">
            Trusted by those who seek{' '}
            <span className="italic text-rose-deep">the finest.</span>
          </h2>
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

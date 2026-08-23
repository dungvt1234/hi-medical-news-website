'use client';

import { useEffect, useRef } from 'react';

/**
 * Ritual Process — 4 bước
 * Timeline ngang trên desktop, dọc trên mobile
 */
const STEPS = [
  {
    num: '01',
    title: 'Arrive',
    desc: 'Chào đón nồng ấm, trà thảo mộc và không gian tĩnh lặng.',
  },
  {
    num: '02',
    title: 'Unwind',
    desc: 'Thư giãn toàn thân, xoa dịu căng thẳng từ những lo toan.',
  },
  {
    num: '03',
    title: 'Restore',
    desc: 'Liệu trình chuyên sâu phục hồi làn da và năng lượng.',
  },
  {
    num: '04',
    title: 'Glow',
    desc: 'Rời đi với làn da rạng rỡ và tâm trí nhẹ nhàng.',
  },
];

export default function RitualProcess() {
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
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="bg-night-2 py-24 sm:py-32">
      <div ref={ref} className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-16 text-center">
          <p className="eyebrow reveal mb-5 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-rose/60" />
            The Ritual Process
            <span className="h-px w-10 bg-rose/60" />
          </p>
          <h2 className="reveal font-heading text-4xl font-light text-ink sm:text-5xl">
            Four steps to <span className="italic text-rose">complete serenity.</span>
          </h2>
        </div>

        {/* Timeline desktop: ngang — mobile: dọc */}
        <div className="relative">
          {/* Đường timeline (desktop) */}
          <div
            aria-hidden
            className="absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-rose/40 to-transparent lg:block"
          />
          {/* Đường timeline (mobile) */}
          <div
            aria-hidden
            className="absolute bottom-4 left-8 top-4 w-px bg-gradient-to-b from-rose/40 to-transparent lg:hidden"
          />

          <div className="grid gap-10 lg:grid-cols-4 lg:gap-8">
            {STEPS.map((s, i) => (
              <div key={s.num} className="reveal relative flex gap-6 lg:block lg:text-center">
                {/* Số + chấm */}
                <div className="flex flex-col items-center lg:mb-8">
                  <span className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-rose/50 bg-night font-heading text-xl italic text-rose shadow-glow">
                    {s.num}
                  </span>
                  {i < STEPS.length - 1 && (
                    <span
                      aria-hidden
                      className="mt-2 hidden h-10 w-px bg-rose/30 lg:hidden"
                    />
                  )}
                </div>
                <div className="lg:px-4">
                  <h3 className="font-heading text-2xl font-medium uppercase tracking-wide text-ink">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-sm font-light leading-relaxed text-ink-light">
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

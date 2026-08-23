'use client';

import { useEffect, useRef } from 'react';

/**
 * CTA — background tối
 * Headline "YOUR TIME TO RESTORE." + CTA + hình landscape/organic bên phải
 */
export default function CTASection() {
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
    <section id="contact" className="relative overflow-hidden bg-night py-24 sm:py-32">
      {/* Glow nền */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 80% 30%, rgba(194,179,212,0.28), transparent 40%), radial-gradient(circle at 10% 90%, rgba(215,191,208,0.12), transparent 35%)',
        }}
      />

      <div ref={ref} className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_0.9fr]">
        {/* Trái: text + CTA */}
        <div className="text-center lg:text-left">
          <p className="eyebrow reveal mb-6 flex items-center justify-center gap-3 lg:justify-start">
            <span className="h-px w-10 bg-rose/60" />
            Reserve Your Moment
          </p>
          <h2 className="reveal font-heading text-5xl font-light leading-[1.1] text-ink sm:text-6xl">
            Your time
            <br />
            to <span className="italic text-rose">restore.</span>
          </h2>
          <p className="reveal mx-auto mt-6 max-w-md text-base font-light leading-relaxed text-ink-light lg:mx-0">
            Take a moment for yourself. Đặt lịch ngay hôm nay để được tư vấn miễn phí
            và nhận liệu trình phù hợp nhất với làn da của bạn.
          </p>
          <div className="reveal mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
            <a
              href="tel:0799390790"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-rose px-9 py-4 text-xs font-bold uppercase tracking-[0.2em] text-night transition-all duration-500 hover:bg-rose-deep hover:shadow-glow sm:w-auto"
            >
              Book Your Experience
            </a>
            <a
              href="https://zalo.me/0799390790"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-luxury px-9 py-4 text-xs font-bold uppercase tracking-[0.2em] text-ink transition-all duration-500 hover:border-rose/60 hover:text-rose sm:w-auto"
            >
              Chat Zalo
            </a>
          </div>
          <p className="reveal mt-8 text-sm text-ink-light">
            📞 Hotline: <span className="text-rose">0799 390 790</span> · 09:00 — 21:00
          </p>
        </div>

        {/* Phải: hình organic */}
        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div
            aria-hidden
            className="absolute -inset-5 rounded-[48px] bg-rose/10 blur-3xl"
          />
          <div className="relative overflow-hidden rounded-[999px_999px_48px_48px] border border-luxury">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1000&auto=format&fit=crop"
              alt="Trải nghiệm spa Hi Medical"
              className="aspect-[4/5] w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-night/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-luxury bg-night/60 p-4 text-center backdrop-blur-md">
              <p className="font-heading text-lg italic text-rose">A quiet luxury</p>
              <p className="text-xs text-ink-light">spa experience under moonlight</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

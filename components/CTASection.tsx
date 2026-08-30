'use client';

import { useEffect, useRef } from 'react';
import Reveal from './Reveal';

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
            'radial-gradient(circle at 80% 30%, rgba(139,95,199,0.18), transparent 45%), radial-gradient(circle at 10% 90%, rgba(232,201,90,0.10), transparent 35%)',
        }}
      />

      <div ref={ref} className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_0.9fr]">
        {/* Trái: text + CTA */}
        <div className="text-center lg:text-left">
          <p className="eyebrow reveal mb-6 flex items-center justify-center gap-3 lg:justify-start">
            <span className="h-px w-10 bg-gold" />
            Reserve Your Moment
          </p>
          <Reveal as="h2" className="font-heading text-5xl font-light leading-[1.1] text-ink sm:text-6xl">
            Khoảnh khắc
            <br />
            của bạn để <span className="italic text-rose-deep">hồi phục.</span>
          </Reveal>
          <p className="reveal mx-auto mt-6 max-w-md text-base font-light leading-relaxed text-ink-light lg:mx-0">
            Hãy dành một khoảnh khắc cho chính mình. Đặt lịch ngay hôm nay để được tư vấn miễn phí
            và nhận liệu trình phù hợp nhất với làn da của bạn.
          </p>
          <div className="reveal mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
            <a
              href="tel:0799390790"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-rose px-9 py-4 text-xs font-bold uppercase tracking-[0.2em] text-white transition-all duration-500 hover:bg-rose-deep hover:shadow-glow sm:w-auto"
            >
              Đặt lịch trải nghiệm
            </a>
            <a
              href="https://zalo.me/0799390790"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-luxury px-9 py-4 text-xs font-bold uppercase tracking-[0.2em] text-ink transition-all duration-500 hover:border-rose/60 hover:text-rose-deep sm:w-auto"
            >
              Chat Zalo
            </a>
          </div>
          <p className="reveal mt-8 text-sm text-ink-light">
            📞 Hotline: <span className="text-rose-deep">0799 390 790</span> · 09:00 — 18:00
          </p>
        </div>

        {/* Phải: hình organic */}
        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div
            aria-hidden
            className="absolute -inset-5 rounded-[48px] bg-lavender-soft/20 blur-3xl"
          />
          <div className="relative overflow-hidden rounded-[999px_999px_48px_48px] border border-luxury">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/cta-quiet-luxury.jpg"
              alt="Trải nghiệm spa Hi Medical"
              className="aspect-[4/5] w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#302642]/35 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-luxury bg-night/70 p-4 text-center backdrop-blur-md">
              <p className="font-heading text-lg italic text-rose-deep">A quiet luxury</p>
              <p className="text-xs text-ink-light">trải nghiệm spa dưới ánh trăng</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

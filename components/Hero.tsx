'use client';

import { useEffect, useRef } from 'react';
import { Sparkles } from 'lucide-react';

/**
 * Hero — Midnight Luxury Spa
 * Left: eyebrow + headline editorial + desc + 2 CTA
 * Right: ảnh arched mask + glow lavender phía sau
 * Background: #171D35 + 2 radial gradient cinematic glow
 */
export default function Hero() {
  const imgRef = useRef<HTMLDivElement>(null);

  // Slow image reveal khi mount
  useEffect(() => {
    const el = imgRef.current;
    if (!el) return;
    const t = setTimeout(() => el.classList.add('opacity-100'), 200);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden bg-night"
      style={{
        background:
          'radial-gradient(circle at 70% 20%, rgba(169,130,216,0.35), transparent 45%), radial-gradient(circle at 15% 85%, rgba(232,201,90,0.12), transparent 35%), linear-gradient(160deg, #F5F1FA 0%, #D8C8F0 100%)',
      }}
    >
      {/* Decorative moon + stars */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute right-[12%] top-[14%] h-16 w-16 rounded-full bg-lavender-soft/25 blur-2xl" />
        <div className="absolute left-[8%] top-[20%] h-2 w-2 rounded-full bg-lavender/40" />
        <div className="absolute left-[18%] top-[38%] h-1.5 w-1.5 rounded-full bg-gold/70" />
        <div className="absolute right-[26%] top-[60%] h-1.5 w-1.5 rounded-full bg-lavender-soft/60" />
        <div className="absolute bottom-[22%] left-[45%] h-1 w-1 rounded-full bg-gold/60" />
        {/* Crescent moon */}
        <div className="absolute right-[10%] top-[26%] opacity-20">
          <div className="h-10 w-10 rounded-full bg-gold/70" />
          <div className="absolute -right-2 -top-2 h-10 w-10 rounded-full bg-night" />
        </div>
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-12 px-5 pb-20 pt-32 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8 lg:pt-24">
        {/* ---- Left: text ---- */}
        <div className="text-center lg:text-left">
          <p className="eyebrow mb-6 flex items-center justify-center gap-3 lg:justify-start">
            <span className="h-px w-10 bg-gold" />
            Hi Medical Skincare &amp; Beauty
          </p>

          <h1 className="font-heading text-5xl font-light leading-[1.08] tracking-tight text-ink sm:text-6xl lg:text-7xl">
            Rituals for
            <br />
            your inner
            <br />
            <span className="italic text-rose-deep">glow.</span>
          </h1>

          <p className="mx-auto mt-7 max-w-md text-base font-light leading-relaxed text-ink-light lg:mx-0">
            Bước vào thế giới tĩnh lặng dưới ánh trăng — nơi làn da được chăm sóc,
            tâm trí được thư giãn và vẻ đẹp tự nhiên được đánh thức.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
            <a
              href="#contact"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-rose px-9 py-4 text-xs font-bold uppercase tracking-[0.2em] text-white transition-all duration-500 hover:bg-rose-deep hover:shadow-glow sm:w-auto"
            >
              Book Your Ritual
            </a>
            <a
              href="#treatments"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-luxury px-9 py-4 text-xs font-bold uppercase tracking-[0.2em] text-ink transition-all duration-500 hover:border-rose/60 hover:text-rose-deep sm:w-auto"
            >
              Explore Treatments
            </a>
          </div>

          <p className="mt-10 flex items-center justify-center gap-2 text-xs tracking-[0.2em] text-lavender lg:justify-start">
            <Sparkles className="h-4 w-4 text-gold" />
            OPEN DAILY 9:00 — 21:00
          </p>
        </div>

        {/* ---- Right: arched image ---- */}
        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          {/* Glow phía sau ảnh */}
          <div
            aria-hidden
            className="absolute -inset-6 rounded-[999px_999px_48px_48px] bg-lavender-soft/25 blur-3xl"
          />
          <div
            ref={imgRef}
            className="arch-mask relative aspect-[4/5] w-full opacity-0 transition-opacity duration-[1500ms]"
            style={{ boxShadow: '0 30px 80px rgba(139, 95, 199, 0.30)' }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1000&auto=format&fit=crop"
              alt="Liệu trình spa cao cấp Midnight Luxury"
              className="h-full w-full object-cover"
            />
            {/* Overlay nhẹ */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#302642]/30 via-transparent to-transparent" />
            {/* Badge */}
            <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-luxury bg-night/60 p-4 backdrop-blur-md">
              <p className="font-heading text-lg italic text-rose-deep">Since 2016</p>
              <p className="mt-1 text-xs tracking-wide text-ink-light">
                Chuyên gia thẩm mỹ · Công nghệ chuẩn quốc tế
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

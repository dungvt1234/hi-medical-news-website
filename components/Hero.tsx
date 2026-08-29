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
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden bg-night">
      {/* Ảnh nền: ảnh anh Dung gửi */}
      <div aria-hidden className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/hero-bg.jpg"
          alt=""
          className="h-full w-full object-cover"
        />
        {/* Overlay gradient tối navy/đen: đậm trái (vùng chữ + logo) → nhạt phải (vẫn thấy ảnh) */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(105deg, rgba(6,8,18,0.75) 0%, rgba(12,15,32,0.55) 38%, rgba(23,29,53,0.3) 65%, rgba(20,20,35,0.2) 100%)',
          }}
        />
      </div>
      {/* Decorative stars trên ảnh nền */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-[8%] top-[20%] h-2 w-2 rounded-full bg-gold/80" />
        <div className="absolute left-[18%] top-[38%] h-1.5 w-1.5 rounded-full bg-gold/70" />
        <div className="absolute right-[26%] top-[60%] h-1.5 w-1.5 rounded-full bg-white/50" />
        <div className="absolute bottom-[22%] left-[45%] h-1 w-1 rounded-full bg-gold/60" />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-12 px-5 pb-20 pt-32 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8 lg:pt-24">
        {/* ---- Left: text ---- */}
        <div className="text-center lg:text-left">
          <p className="eyebrow mb-6 flex items-center justify-center gap-3 lg:justify-start !text-white/90">
            <span className="h-px w-10 bg-gold" />
            Hi Medical Skincare &amp; Beauty
          </p>

          <h1 className="font-heading text-5xl font-light leading-[1.08] tracking-tight text-white sm:text-6xl lg:text-7xl">
            <img
              src="/images/moon.png"
              alt="moon"
              className="mr-3 inline-block h-14 w-14 align-middle sm:h-16 sm:w-16"
            />
            Moonlight,
            <br />
            floral scent &amp;
            <br />
            a touch of <span className="italic text-gold">beauty.</span>
          </h1>

          <p className="mx-auto mt-7 max-w-md text-base font-light leading-relaxed text-white/85 lg:mx-0">
            Bước vào thế giới tĩnh lặng dưới ánh trăng — nơi làn da được chăm sóc,
            tâm trí được thư giãn và vẻ đẹp tự nhiên được đánh thức.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
            <a
              href="#contact"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-rose px-9 py-4 text-xs font-bold uppercase tracking-[0.2em] text-white transition-all duration-500 hover:bg-rose-deep hover:shadow-glow sm:w-auto"
            >
              Đặt lịch ngay
            </a>
            <a
              href="#treatments"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/50 bg-white/10 px-9 py-4 text-xs font-bold uppercase tracking-[0.2em] text-white backdrop-blur-sm transition-all duration-500 hover:border-gold hover:text-gold sm:w-auto"
            >
              Xem liệu trình
            </a>
          </div>

          <p className="mt-10 flex items-center justify-center gap-2 text-xs tracking-[0.2em] text-white/75 lg:justify-start">
            <Sparkles className="h-4 w-4 text-gold" />
            MỞ CỬA HÀNG NGÀY 9:00 — 18:00
          </p>
        </div>

        {/* ---- Right: arched image ---- */}
        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          {/* Glow phía sau ảnh */}
          <div
            aria-hidden
            className="absolute -inset-6 rounded-[999px_999px_48px_48px] bg-white/15 blur-3xl"
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
            <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/40 bg-night/50 p-4 backdrop-blur-md">
              <p className="font-heading text-lg italic text-gold">Từ 2016</p>
              <p className="mt-1 text-xs tracking-wide text-white/85">
                Chuyên gia da liễu · Làm đẹp công nghệ cao
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { Percent } from 'lucide-react';
import Reveal from './Reveal';

/**
 * Signature Treatments — 4 cards dịch vụ
 * Style: dark navy, large image, minimal typography, hover zoom nhẹ
 */
const SERVICES = [
  {
    slug: 'triet-long-cong-nghe-cao',
    name: 'Triệt lông công nghệ cao',
    en: 'SMART OPT IDPL DELUXE',
    desc: 'Nách, tay, chân, mặt, bikini, toàn thân — triệt lông an toàn, êm ái, hiệu quả lâu dài.',
    img: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=900&auto=format&fit=crop',
  },
  {
    slug: 'dieu-tri-da-chuyen-sau',
    name: 'Hỗ trợ cải thiện các vấn đề da',
    en: 'Acne & Pigmentation',
    desc: 'Mụn, nám, thâm, sẹo, quầng thâm mắt — liệu trình an toàn với công nghệ laser & IPL hiện đại.',
    img: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?q=80&w=900&auto=format&fit=crop',
  },
  {
    slug: 'cham-soc-da',
    name: 'Chăm sóc da',
    en: 'Luxury Skincare',
    desc: 'Làm sạch sâu, dưỡng ẩm phục hồi, đắp mặt nạ và chăm sóc da toàn thân.',
    img: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=900&auto=format&fit=crop',
  },
  {
    slug: 'tre-hoa-nang-co',
    name: 'Trẻ hóa & nâng cơ',
    en: 'Rejuvenation',
    desc: 'IPL, laser, Micro needle shoot — giúp da săn chắc, tươi trẻ hơn mà không cần phẫu thuật.',
    img: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=900&auto=format&fit=crop',
  },
  {
    slug: 'massage-thu-gian',
    name: 'Dưỡng sinh thảo dược',
    en: 'Massage',
    desc: 'Giải tỏa căng thẳng, làm dịu cơ thể và phục hồi năng lượng sau những ngày dài mệt mỏi.',
    img: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=900&auto=format&fit=crop',
  },
  {
    slug: 'combo-uu-dai',
    name: 'Combo ưu đãi',
    en: 'Best Value',
    desc: 'Gói combo chăm sóc toàn diện với mức giá ưu đãi hấp dẫn — dành riêng cho khách đặt lịch online.',
    img: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=900&auto=format&fit=crop',
    special: true,
  },
];

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
            <Reveal as="h2" className="font-heading text-4xl font-light leading-tight text-ink sm:text-5xl">
              Liệu trình tuyển chọn cho
              <br />
              <span className="italic text-rose-deep">mọi vẻ đẹp.</span>
            </Reveal>
          </div>
          <a
            href="#contact"
            className="reveal inline-flex shrink-0 items-center gap-2 rounded-full border border-luxury px-7 py-3.5 text-xs font-bold uppercase tracking-[0.18em] text-ink transition-all duration-500 hover:border-rose/60 hover:text-rose-deep"
          >
            Xem tất cả liệu trình
          </a>
        </div>

        {/* Grid 6 cards dịch vụ — combo ưu đãi nổi bật */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((t, i) => (
            <Link
              key={t.slug}
              href={`/dich-vu/${t.slug}`}
              className={`reveal group block overflow-hidden rounded-4xl border transition-all duration-700 hover:-translate-y-1.5 hover:shadow-glow ${
                t.special
                  ? 'relative border-gold bg-gradient-to-b from-[#3A2E56] via-[#4A3A6B] to-[#3A2E56] shadow-[0_0_35px_rgba(232,201,90,0.18)] hover:border-[#F3D97A]'
                  : 'border-luxury bg-night-2 hover:border-rose/40'
              } ${i % 3 === 1 ? 'lg:mt-10' : ''}`}
            >
              {/* Ảnh */}
              <div className="relative aspect-[3/4] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={t.img}
                  alt={t.name}
                  loading="lazy"
                  className="img-zoom h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-night-2 via-transparent to-transparent" />
                {/* Số thứ tự */}
                <span className="absolute right-5 top-5 font-heading text-lg italic text-rose-deep/80">
                  0{i + 1}
                </span>
                {/* Badge ưu đãi nổi bật */}
                {t.special && (
                  <span className="absolute left-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-gold px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.15em] text-[#302642] shadow-glow">
                    <Percent className="h-3.5 w-3.5" />
                    Ưu đãi
                  </span>
                )}
              </div>

              {/* Nội dung */}
              <div className="p-7">
                <h3
                  className={`font-heading text-2xl font-medium transition-colors duration-500 ${
                    t.special ? 'text-white group-hover:text-gold' : 'text-ink group-hover:text-rose-deep'
                  }`}
                >
                  {t.name}
                </h3>
                {t.en && (
                  <p
                    className={`mt-1.5 font-heading text-sm italic ${
                      t.special ? 'text-gold' : 'text-rose-deep/90'
                    }`}
                  >
                    {t.en}
                  </p>
                )}
                <p
                  className={`mt-2.5 text-sm font-light leading-relaxed ${
                    t.special ? 'text-[#D8C8F0]' : 'text-ink-light'
                  }`}
                >
                  {t.desc}
                </p>
                <span
                  className={`mt-5 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] opacity-0 transition-all duration-500 group-hover:opacity-100 ${
                    t.special ? 'text-gold' : 'text-rose-deep/80'
                  }`}
                >
                  Khám phá <span aria-hidden>→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

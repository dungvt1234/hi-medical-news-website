'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { Percent } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Reveal from './Reveal';

gsap.registerPlugin(ScrollTrigger);

/**
 * Signature Treatments — horizontal scroll-driven 3D carousel
 *
 * - Cuộn dọc → section bị PIN, dải 6 card TRƯỢT NGANG theo cuộn (scrub).
 * - Container có perspective; mỗi card có rotateY + translateZ + scale + blur
 *   + opacity thay đổi theo vị trí so với trung tâm viewport (coverflow depth).
 * - Card ở giữa: to, rõ, nổi bật. Card xa: lùi sâu, mờ, nhỏ lại (z-depth fading).
 */
const SERVICES = [
  {
    slug: 'triet-long-cong-nghe-cao',
    name: 'Triệt lông công nghệ cao',
    en: 'SMART OPT IDPL DELUXE',
    desc: 'Nách, tay, chân, mặt, bikini, toàn thân — triệt lông an toàn, êm ái, hiệu quả lâu dài.',
    img: '/images/triet-long-cong-nghe-cao.jpg',
  },
  {
    slug: 'dieu-tri-da-chuyen-sau',
    name: 'Hỗ trợ cải thiện các vấn đề da',
    en: 'Acne & Pigmentation',
    desc: 'Mụn, nám, thâm, sẹo, quầng thâm mắt — liệu trình an toàn với công nghệ laser & IPL hiện đại.',
    img: '/images/dieu-tri-da-chuyen-sau.jpg',
  },
  {
    slug: 'cham-soc-da',
    name: 'Chăm sóc da',
    en: 'Luxury Skincare',
    desc: 'Làm sạch sâu, dưỡng ẩm phục hồi, đắp mặt nạ và chăm sóc da toàn thân.',
    img: '/images/cham-soc-da.jpg',
  },
  {
    slug: 'tre-hoa-nang-co',
    name: 'Trẻ hóa & nâng cơ',
    en: 'Rejuvenation',
    desc: 'IPL, laser, Micro needle shoot — giúp da săn chắc, tươi trẻ hơn mà không cần phẫu thuật.',
    img: '/images/tre-hoa-nang-co.jpg',
  },
  {
    slug: 'massage-thu-gian',
    name: 'Dưỡng sinh thảo dược',
    en: 'Massage',
    desc: 'Giải tỏa căng thẳng, làm dịu cơ thể và phục hồi năng lượng sau những ngày dài mệt mỏi.',
    img: '/images/duong-sinh-thao-moc.jpg',
  },
  {
    slug: 'combo-uu-dai',
    name: 'Combo ưu đãi',
    en: 'Best Value',
    desc: 'Gói combo chăm sóc toàn diện với mức giá ưu đãi hấp dẫn — dành riêng cho khách đặt lịch online.',
    img: '/images/combo-uu-dai.jpg',
    special: true,
  },
];

export default function Treatments() {
  const triggerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = triggerRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const cards = Array.from(track.querySelectorAll<HTMLElement>('.t-card'));

    // Đo theo từng lần refresh để responsive chuẩn
    const getScroll = () => {
      const total = track.scrollWidth - window.innerWidth;
      return total > 0 ? total : 0;
    };

    const updateDepth = () => {
      const center = window.innerWidth / 2;
      const p = gsap.getProperty(track, 'x') as number;
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const cardCenter = rect.left + rect.width / 2;
        const diff = (cardCenter - center) / (window.innerWidth * 0.55); // chuẩn hoá
        const abs = Math.min(Math.abs(diff), 1.6);
        const rotY = diff * -30;
        const tz = -abs * 320;
        const scale = 1 - abs * 0.22;
        const blur = abs * 2.5;
        const opacity = 1 - abs * 0.6;
        gsap.set(card, {
          rotationY: rotY,
          z: tz,
          scale: Math.max(scale, 0.66),
          opacity: Math.max(opacity, 0.35),
          filter: `blur(${blur.toFixed(1)}px)`,
        });
      });
      void p;
    };

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: () => -getScroll(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => '+=' + Math.max(getScroll(), 1200),
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: updateDepth,
        },
      });
    }, section);

    // Cập nhật depth ban đầu
    requestAnimationFrame(() => ScrollTrigger.refresh());
    updateDepth();

    return () => ctx.revert();
  }, []);

  return (
    <section id="treatments" className="relative bg-night">
      {/* Heading */}
      <div className="mx-auto max-w-7xl px-5 pt-24 sm:px-8 sm:pt-32">
        <div className="mb-16 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow mb-5 flex items-center gap-3">
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
            className="inline-flex shrink-0 items-center gap-2 rounded-full border border-luxury px-7 py-3.5 text-xs font-bold uppercase tracking-[0.18em] text-ink transition-all duration-500 hover:border-rose/60 hover:text-rose-deep"
          >
            Xem tất cả liệu trình
          </a>
        </div>
      </div>

      {/* Horizontal 3D carousel (pinned) */}
      <div
        ref={triggerRef}
        className="relative flex h-[90vh] items-center overflow-hidden"
        style={{ perspective: '1400px' }}
      >
        <div ref={trackRef} className="flex w-max items-stretch gap-6 pl-[40vw] pr-[12vw] will-change-transform">
          {SERVICES.map((t, i) => (
            <Link
              key={t.slug}
              href={`/dich-vu/${t.slug}`}
              className={`t-card group relative block w-[78vw] shrink-0 rounded-4xl border transition-[border-color,box-shadow] duration-500 will-change-transform sm:w-[60vw] lg:w-[38vw] ${
                t.special
                  ? 'border-gold bg-gradient-to-b from-[#3A2E56] via-[#4A3A6B] to-[#3A2E56] shadow-[0_0_35px_rgba(232,201,90,0.18)] hover:border-[#F3D97A]'
                  : 'border-luxury bg-night-2 hover:border-rose/40'
              }`}
            >
              {/* Ảnh */}
              <div className="relative aspect-[3/4] overflow-hidden rounded-t-4xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={t.img}
                  alt={t.name}
                  loading="lazy"
                  className="img-zoom h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-night-2 via-transparent to-transparent" />
                <span className="absolute right-5 top-5 font-heading text-lg italic text-rose-deep/80 drop-shadow">
                  0{i + 1}
                </span>
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

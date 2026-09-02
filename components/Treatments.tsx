'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Percent } from 'lucide-react';
import gsap from 'gsap';
import Reveal from './Reveal';

/**
 * Signature Treatments — grid nhiều cột + hiệu ứng tilt 3D theo chuột
 *
 * - Các ảnh sắp xếp theo nhiều cột dọc (grid responsive 1/2/3 cột).
 * - Mỗi card có perspective; khi hover chuột → card NGHIÊNG theo vị trí chuột
 *   (rotateX/rotateY + translateZ) tạo chiều sâu, kèm vệt sáng (glare) di chuyển.
 * - Chuột rời card → nghiêng về vị trí ban đầu mượt mà.
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
  useEffect(() => {
    const cards = Array.from(document.querySelectorAll<HTMLElement>('#treatments .tilt-card'));
    const norm = (v: number, min: number, max: number) =>
      Math.min(Math.max((v - min) / (max - min), 0), 1);

    const onMove = (card: HTMLElement, e: MouseEvent) => {
      const glue = card.querySelector<HTMLElement>('.tilt-glare');
      const rect = card.getBoundingClientRect();
      const px = norm(e.clientX, rect.left, rect.right);
      const py = norm(e.clientY, rect.top, rect.bottom);
      const rotateY = (0.5 - px) * 26;
      const rotateX = (0.5 - py) * -26;
      gsap.to(card, {
        rotationY: rotateY,
        rotationX: rotateX,
        z: 40,
        duration: 0.4,
        ease: 'power2.out',
        overwrite: 'auto',
      });
      if (glue) {
        glue.style.background = `radial-gradient(circle at ${px * 100}% ${
          py * 100
        }%, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0) 55%)`;
        glue.style.opacity = '1';
      }
    };

    const onLeave = (card: HTMLElement) => {
      const glue = card.querySelector<HTMLElement>('.tilt-glare');
      gsap.to(card, { rotationY: 0, rotationX: 0, z: 0, duration: 0.7, ease: 'power3.out' });
      if (glue) glue.style.opacity = '0';
    };

    const handlers: { el: HTMLElement; move: (e: MouseEvent) => void; leave: () => void }[] = [];
    cards.forEach((card) => {
      const move = (e: MouseEvent) => onMove(card, e);
      const leave = () => onLeave(card);
      card.addEventListener('mousemove', move);
      card.addEventListener('mouseleave', leave);
      handlers.push({ el: card, move, leave });
    });

    return () => {
      handlers.forEach(({ el, move, leave }) => {
        el.removeEventListener('mousemove', move);
        el.removeEventListener('mouseleave', leave);
      });
    };
  }, []);

  return (
    <section id="treatments" className="bg-night py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        {/* Heading */}
        <div className="mb-16 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow mb-5 flex items-center gap-3">
              <span className="h-px w-10 bg-gold" />
              Signature Treatments
            </p>
            <Reveal as="h2" className="font-heading text-4xl font-light leading-tight text-ink sm:text-4xl">
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

        {/* Grid nhiều cột dọc — mỗi card tilt 3D theo chuột */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" style={{ perspective: '1600px' }}>
          {SERVICES.map((t, i) => (
            <Link
              key={t.slug}
              href={`/dich-vu/${t.slug}`}
              className={`tilt-card group relative block overflow-hidden rounded-4xl border transition-[border-color,box-shadow] duration-500 ${
                t.special
                  ? 'border-gold bg-gradient-to-b from-[#3A2E56] via-[#4A3A6B] to-[#3A2E56] shadow-[0_0_35px_rgba(232,201,90,0.18)] hover:border-[#F3D97A]'
                  : 'border-luxury bg-night-2 hover:border-rose/40'
              } ${i % 3 === 1 ? 'lg:mt-8' : ''}`}
              style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
            >
              {/* Ảnh — kích thước nhỏ gọn */}
              <div className="relative aspect-[4/5] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={t.img}
                  alt={t.name}
                  loading="lazy"
                  className="img-zoom h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-night-2 via-transparent to-transparent" />
                <span className="absolute right-5 top-5 font-heading text-lg italic text-rose-deep/80">
                  0{i + 1}
                </span>
                {t.special && (
                  <span className="absolute left-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-gold px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.15em] text-[#302642] shadow-glow">
                    <Percent className="h-3.5 w-3.5" />
                    Ưu đãi
                  </span>
                )}
              </div>

              {/* Nội dung — compact */}
              <div className="p-6">
                <h3
                  className={`font-heading text-xl font-medium transition-colors duration-500 ${
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

              {/* Vệt sáng (glare) theo chuột */}
              <div
                aria-hidden
                className="tilt-glare pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300"
                style={{ zIndex: 10 }}
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

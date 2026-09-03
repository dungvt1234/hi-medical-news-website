'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { Percent } from 'lucide-react';
import Reveal from './Reveal';

/**
 * Signature Treatments ΓÇö 4 cards dß╗ïch vß╗Ñ
 * Style: dark navy, large image, minimal typography, hover zoom nhß║╣
 */
const SERVICES = [
  {
    slug: 'triet-long-cong-nghe-cao',
    name: 'Triß╗çt l├┤ng c├┤ng nghß╗ç cao',
    en: 'SMART OPT IDPL DELUXE',
    desc: 'N├ích, tay, ch├ón, mß║╖t, bikini, to├án th├ón ΓÇö triß╗çt l├┤ng an to├án, ├¬m ├íi, hiß╗çu quß║ú l├óu d├ái.',
    img: '/images/triet-long-cong-nghe-cao.jpg',
  },
  {
    slug: 'dieu-tri-da-chuyen-sau',
    name: 'Hß╗ù trß╗ú cß║úi thiß╗çn c├íc vß║Ñn ─æß╗ü da',
    en: 'Acne & Pigmentation',
    desc: 'Mß╗Ñn, n├ím, th├óm, sß║╣o, quß║ºng th├óm mß║»t ΓÇö liß╗çu tr├¼nh an to├án vß╗¢i c├┤ng nghß╗ç laser & IPL hiß╗çn ─æß║íi.',
    img: '/images/dieu-tri-da-chuyen-sau.jpg',
  },
  {
    slug: 'cham-soc-da',
    name: 'Ch─âm s├│c da',
    en: 'Luxury Skincare',
    desc: 'L├ám sß║ích s├óu, d╞░ß╗íng ß║⌐m phß╗Ñc hß╗ôi, ─æß║»p mß║╖t nß║í v├á ch─âm s├│c da to├án th├ón.',
    img: '/images/cham-soc-da.jpg',
  },
  {
    slug: 'tre-hoa-nang-co',
    name: 'Trß║╗ h├│a & n├óng c╞í',
    en: 'Rejuvenation',
    desc: 'IPL, laser, Micro needle shoot ΓÇö gi├║p da s─ân chß║»c, t╞░╞íi trß║╗ h╞ín m├á kh├┤ng cß║ºn phß║½u thuß║¡t.',
    img: '/images/tre-hoa-nang-co.jpg',
  },
  {
    slug: 'massage-thu-gian',
    name: 'D╞░ß╗íng sinh thß║úo d╞░ß╗úc',
    en: 'Massage',
    desc: 'Giß║úi tß╗Åa c─âng thß║│ng, l├ám dß╗ïu c╞í thß╗â v├á phß╗Ñc hß╗ôi n─âng l╞░ß╗úng sau nhß╗»ng ng├áy d├ái mß╗çt mß╗Åi.',
    img: '/images/duong-sinh-thao-moc.jpg',
  },
  {
    slug: 'combo-uu-dai',
    name: 'Combo ╞░u ─æ├úi',
    en: 'Best Value',
    desc: 'G├│i combo ch─âm s├│c to├án diß╗çn vß╗¢i mß╗⌐c gi├í ╞░u ─æ├úi hß║Ñp dß║½n ΓÇö d├ánh ri├¬ng cho kh├ích ─æß║╖t lß╗ïch online.',
    img: '/images/combo-uu-dai.jpg',
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
              Liß╗çu tr├¼nh tuyß╗ân chß╗ìn cho
              <br />
              <span className="italic text-rose-deep">mß╗ìi vß║╗ ─æß║╣p.</span>
            </Reveal>
          </div>
          <a
            href="#contact"
            className="reveal inline-flex shrink-0 items-center gap-2 rounded-full border border-luxury px-7 py-3.5 text-xs font-bold uppercase tracking-[0.18em] text-ink transition-all duration-500 hover:border-rose/60 hover:text-rose-deep"
          >
            Xem tß║Ñt cß║ú liß╗çu tr├¼nh
          </a>
        </div>

        {/* Grid 6 cards dß╗ïch vß╗Ñ ΓÇö combo ╞░u ─æ├úi nß╗òi bß║¡t */}
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
              {/* ß║ónh */}
              <div className="relative aspect-[3/4] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={t.img}
                  alt={t.name}
                  loading="lazy"
                  className="img-zoom h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-night-2 via-transparent to-transparent" />
                {/* Sß╗æ thß╗⌐ tß╗▒ */}
                <span className="absolute right-5 top-5 font-heading text-lg italic text-rose-deep/80">
                  0{i + 1}
                </span>
                {/* Badge ╞░u ─æ├úi nß╗òi bß║¡t */}
                {t.special && (
                  <span className="absolute left-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-gold px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.15em] text-[#302642] shadow-glow">
                    <Percent className="h-3.5 w-3.5" />
                    ╞»u ─æ├úi
                  </span>
                )}
              </div>

              {/* Nß╗Öi dung */}
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
                  Kh├ím ph├í <span aria-hidden>ΓåÆ</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

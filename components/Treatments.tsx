'use client';

import { useEffect, useRef } from 'react';

/**
 * Signature Treatments — 4 cards dịch vụ
 * Style: dark navy, large image, minimal typography, hover zoom nhẹ
 */
const TREATMENTS = [
  {
    name: 'Moonlight Facial',
    desc: 'Deep hydration & skin renewal',
    img: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?q=80&w=900&auto=format&fit=crop',
  },
  {
    name: 'Lavender Ritual',
    desc: 'Relaxation & aromatherapy',
    img: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?q=80&w=900&auto=format&fit=crop',
  },
  {
    name: 'Deep Rest Massage',
    desc: 'Full-body recovery',
    img: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=900&auto=format&fit=crop',
  },
  {
    name: 'Glow Therapy',
    desc: 'Radiance & rejuvenation',
    img: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=900&auto=format&fit=crop',
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
            <h2 className="reveal font-heading text-4xl font-light leading-tight text-ink sm:text-5xl">
              Curated rituals for
              <br />
              <span className="italic text-rose-deep">every glow.</span>
            </h2>
          </div>
          <a
            href="#contact"
            className="reveal inline-flex shrink-0 items-center gap-2 rounded-full border border-luxury px-7 py-3.5 text-xs font-bold uppercase tracking-[0.18em] text-ink transition-all duration-500 hover:border-rose/60 hover:text-rose-deep"
          >
            View All Treatments
          </a>
        </div>

        {/* Grid 4 cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TREATMENTS.map((t, i) => (
            <article
              key={t.name}
              className={`reveal group overflow-hidden rounded-4xl border border-luxury bg-night-2 transition-all duration-700 hover:-translate-y-1.5 hover:border-rose/40 hover:shadow-glow ${
                i % 2 === 1 ? 'lg:mt-10' : ''
              }`}
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
              </div>

              {/* Nội dung */}
              <div className="p-7">
                <h3 className="font-heading text-2xl font-medium text-ink transition-colors duration-500 group-hover:text-rose-deep">
                  {t.name}
                </h3>
                <p className="mt-2 text-sm font-light leading-relaxed text-ink-light">
                  {t.desc}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-rose-deep/80 opacity-0 transition-all duration-500 group-hover:opacity-100">
                  Discover <span aria-hidden>→</span>
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

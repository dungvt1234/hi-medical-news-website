'use client';

import { useEffect, useRef } from 'react';

/**
 * Gallery — masonry/editorial grid 6 ảnh
 * Hover: scale 1.03 + overlay nhẹ + caption fade in
 */
const GALLERY = [
  {
    img: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?q=80&w=900&auto=format&fit=crop',
    caption: 'Lavender Ritual',
    tall: true,
  },
  {
    img: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=900&auto=format&fit=crop',
    caption: 'Glow Therapy',
    tall: false,
  },
  {
    img: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?q=80&w=900&auto=format&fit=crop',
    caption: 'Signature Facial',
    tall: false,
  },
  {
    img: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=900&auto=format&fit=crop',
    caption: 'Deep Rest Massage',
    tall: true,
  },
  {
    img: 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?q=80&w=900&auto=format&fit=crop',
    caption: 'Serene Interiors',
    tall: false,
  },
  {
    img: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=900&auto=format&fit=crop',
    caption: 'Premium Products',
    tall: false,
  },
];

export default function Gallery() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.querySelectorAll('.reveal').forEach((n, i) => {
              setTimeout(() => n.classList.add('is-visible'), i * 100);
            });
            obs.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="bg-night py-24 sm:py-32">
      <div ref={ref} className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-16 text-center">
          <p className="eyebrow reveal mb-5 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-rose/60" />
            The Gallery
            <span className="h-px w-10 bg-rose/60" />
          </p>
          <h2 className="reveal font-heading text-4xl font-light text-ink sm:text-5xl">
            Moments of <span className="italic text-rose">tranquility.</span>
          </h2>
        </div>

        {/* Masonry grid */}
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
          {GALLERY.map((g, i) => (
            <figure
              key={i}
              className={`reveal group relative overflow-hidden rounded-3xl ${
                g.tall ? 'row-span-2' : ''
              } ${i % 5 === 0 ? 'lg:col-span-2' : ''}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={g.img}
                alt={g.caption}
                loading="lazy"
                className="img-zoom h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
              />
              {/* Overlay nhẹ */}
              <div className="absolute inset-0 bg-gradient-to-t from-night/70 via-transparent to-transparent opacity-60 transition-opacity duration-700 group-hover:opacity-90" />
              {/* Caption fade in */}
              <figcaption className="absolute bottom-0 left-0 right-0 translate-y-4 p-6 opacity-0 transition-all duration-700 group-hover:translate-y-0 group-hover:opacity-100">
                <span className="font-heading text-xl italic text-rose">{g.caption}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

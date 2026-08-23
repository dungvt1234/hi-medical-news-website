'use client';

/**
 * Marquee — dải chữ chạy ngang vô tận (premium editorial feel)
 * Tôn trọng prefers-reduced-motion: animation tự tắt
 */
export default function Marquee({
  items = ['Lavender Glow Spa', 'Premium Skincare', 'Medical Luxury', 'Rituals of Beauty'],
  speed = 30, // giây cho 1 vòng
  className = '',
}: {
  items?: string[];
  speed?: number;
  className?: string;
}) {
  const row = items.map((item, i) => (
    <span key={i} className="mx-6 flex items-center gap-6 whitespace-nowrap">
      <span className="font-heading text-2xl font-light italic tracking-wide sm:text-3xl">
        {item}
      </span>
      <span className="text-gold" aria-hidden>
        ✦
      </span>
    </span>
  ));

  return (
    <div
      className={`relative z-10 overflow-hidden border-y border-luxury/60 bg-lavender-soft/30 py-5 motion-reduce:py-4 ${className}`}
    >
      {/* fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-lavender-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-lavender-white to-transparent" />

      <div
        className="flex w-max motion-reduce:w-full motion-reduce:justify-center"
        style={{
          animation: `marquee ${speed}s linear infinite`,
        }}
      >
        <div className="flex shrink-0 items-center" aria-hidden>
          {row}
        </div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {row}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}

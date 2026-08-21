import { Newspaper, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function HeroBanner() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-sky-100 via-brand-50 to-brand-100">
      {/* Decorative blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-sky-200/50 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 -top-10 h-80 w-80 rounded-full bg-brand-200/60 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-1/3 h-56 w-56 rounded-full bg-gold-light/60 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 sm:py-24 lg:px-8">
        {/* Badge */}
        <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-brand-600 shadow-sm backdrop-blur">
          <Newspaper className="h-3.5 w-3.5 text-gold-dark" />
          Tạp chí làm đẹp
        </div>

        {/* Title */}
        <h1 className="font-heading text-4xl font-extrabold tracking-tight text-brand-800 sm:text-5xl lg:text-6xl">
          TIN TỨC <span className="text-gold-dark">&amp;</span> SỰ KIỆN
        </h1>

        {/* Sub */}
        <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-ink-light sm:text-base">
          Cập nhật những xu hướng làm đẹp mới nhất, bí quyết chăm sóc da từ chuyên gia và các
          chương trình ưu đãi hấp dẫn tại Hi Medical Skincare &amp; Beauty.
        </p>

        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="mt-7 flex items-center justify-center gap-1.5 text-sm text-ink-light"
        >
          <Link href="/" className="font-medium text-brand-600 transition-colors hover:text-gold-dark">
            Trang chủ
          </Link>
          <ChevronRight className="h-4 w-4 text-gold-dark" />
          <span className="font-semibold text-ink">Tin tức &amp; Sự kiện</span>
        </nav>
      </div>

      {/* Wave bottom */}
      <svg
        aria-hidden
        className="relative block w-full text-white"
        viewBox="0 0 1440 48"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          d="M0 24C240 48 480 48 720 24C960 0 1200 0 1440 24V48H0V24Z"
          fill="currentColor"
        />
      </svg>
    </section>
  );
}

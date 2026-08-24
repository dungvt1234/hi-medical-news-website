'use client';

import Link from 'next/link';
import { Facebook, Instagram, Phone, MapPin, Clock } from 'lucide-react';

/**
 * Footer — background #151728
 * Logo + Navigation + Contact + Opening hours + Social + Address + Booking CTA
 */
export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-night-3 pb-10 pt-20 text-[#E9E0F7]">
      {/* Ảnh nền: hoa oải hương cận cảnh + overlay gradient lavender bán trong suốt */}
      <div aria-hidden className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?q=80&w=2000&auto=format&fit=crop"
          alt=""
          className="h-full w-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, rgba(48,38,66,0.92) 0%, rgba(139,95,199,0.78) 45%, rgba(169,130,216,0.60) 100%)',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
        {/* CTA booking trên cùng */}
        <div className="mb-16 flex flex-col items-center justify-between gap-6 rounded-4xl border border-white/25 bg-white/10 px-8 py-10 text-center backdrop-blur-sm sm:flex-row sm:text-left">
          <div>
            <h3 className="font-heading text-3xl font-light text-white">
              Ready for your <span className="italic text-gold">ritual?</span>
            </h3>
            <p className="mt-2 text-sm">Đặt lịch hôm nay — ưu đãi dành riêng cho khách hàng mới.</p>
          </div>
          <a
            href="tel:0799390790"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-gold px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-[#302642] transition-all duration-500 hover:bg-[#F3D97A] hover:shadow-glow"
          >
            Đặt lịch hẹn
          </a>
        </div>

        {/* Grid 4 cột */}
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Logo + desc + social */}
          <div>
            <Link href="/#home" className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="Hi Medical"
                className="h-28 w-auto object-contain"
              />
              <span className="leading-tight">
                <span className="block font-heading text-xl font-semibold text-white">
                  Hi Medical
                </span>
                <span className="block text-[10px] font-medium uppercase tracking-[0.3em] text-[#D8C8F0]">
                  Lavender Glow Spa
                </span>
              </span>
            </Link>
            <p className="mt-6 max-w-xs text-sm font-light leading-relaxed">
              Nơi vẻ đẹp được chăm sóc trọn vẹn — kết hợp công nghệ thẩm mỹ tiên tiến
              và những nghi thức thư giãn đẳng cấp.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 text-[#E9E0F7] transition-all duration-300 hover:border-gold hover:text-gold"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 text-[#E9E0F7] transition-all duration-300 hover:border-gold hover:text-gold"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://zalo.me/0799390790"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Zalo"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 text-[#E9E0F7] transition-all duration-300 hover:border-gold hover:text-gold"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
                  <path d="M12.04 2C6.54 2 2.06 6.25 2.06 11.47c0 2.86 1.39 5.4 3.57 7.1V22l3.26-1.79c.99.27 2.04.42 3.15.42 5.5 0 9.98-4.25 9.98-9.47S17.54 2 12.04 2zm5.5 8.26-3.98 3.98a.62.62 0 0 1-.88 0l-1.43-1.43-2.72 2.72a.62.62 0 0 1-.88-.88l3.17-3.16a.62.62 0 0 1 .88 0l1.43 1.43 3.53-3.53a.62.62 0 1 1 .88.87z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="mb-6 text-xs font-bold uppercase tracking-[0.25em] text-white">
              Khám phá
            </h4>
            <ul className="space-y-3 text-sm font-light">
              {[
                ['/#home', 'Trang chủ'],
                ['/#treatments', 'Dịch vụ'],
                ['/#about', 'Giới thiệu'],
                ['/#experience', 'Trải nghiệm'],
                ['/journal', 'Bài viết'],
                ['/#contact', 'Liên hệ'],
              ].map(([href, label]) => (
                <li key={label}>
                  <Link href={href} className="transition-colors duration-300 hover:text-gold">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-6 text-xs font-bold uppercase tracking-[0.25em] text-white">
              Liên hệ
            </h4>
            <ul className="space-y-4 text-sm font-light">
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <a href="tel:0799390790" className="transition-colors hover:text-gold">
                  0799 390 790
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <span>
                  123 Nguyễn Trãi, Q.1,
                  <br />
                  TP. Hồ Chí Minh
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <span>
                  Thứ 2 — Chủ nhật · 09:00 — 21:00
                </span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="mb-6 text-xs font-bold uppercase tracking-[0.25em] text-white">
              Nhận tin mới
            </h4>
            <p className="text-sm font-light leading-relaxed">
              Nhận bí quyết chăm sóc da và ưu đãi độc quyền mỗi tháng.
            </p>
            <form
              className="mt-5 flex overflow-hidden rounded-full border border-white/25 bg-white/10 focus-within:border-gold/70"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Email của bạn"
                aria-label="Email"
                className="w-full bg-transparent px-5 py-3 text-sm text-white placeholder:text-white/50 focus:outline-none"
              />
              <button
                type="submit"
                className="shrink-0 bg-gold px-5 text-xs font-bold uppercase tracking-wider text-[#302642] transition-colors hover:bg-[#F3D97A]"
              >
                Gửi
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/20 pt-8 text-xs text-[#D8C8F0] sm:flex-row">
          <p>© 2026 Hi Medical Skincare &amp; Beauty. Mọi quyền được bảo lưu.</p>
          <p className="flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-gold" />
            Lavender Glow Spa
          </p>
        </div>
      </div>
    </footer>
  );
}

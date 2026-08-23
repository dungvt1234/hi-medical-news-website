'use client';

import { Facebook, Instagram, Phone, MapPin, Clock } from 'lucide-react';

/**
 * Footer — background #151728
 * Logo + Navigation + Contact + Opening hours + Social + Address + Booking CTA
 */
export default function Footer() {
  return (
    <footer className="bg-night-3 pb-10 pt-20 text-ink-light">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* CTA booking trên cùng */}
        <div className="mb-16 flex flex-col items-center justify-between gap-6 rounded-4xl border border-luxury bg-night/60 px-8 py-10 text-center sm:flex-row sm:text-left">
          <div>
            <h3 className="font-heading text-3xl font-light text-ink">
              Ready for your <span className="italic text-rose-deep">ritual?</span>
            </h3>
            <p className="mt-2 text-sm">Đặt lịch hôm nay — ưu đãi dành riêng cho khách hàng mới.</p>
          </div>
          <a
            href="tel:0799390790"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-rose px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-[#3B3157] transition-all duration-500 hover:bg-rose-deep hover:shadow-glow"
          >
            Book an Appointment
          </a>
        </div>

        {/* Grid 4 cột */}
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Logo + desc + social */}
          <div>
            <a href="#home" className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-luxury bg-night/40 font-heading text-lg italic text-rose-deep">
                H
              </span>
              <span className="leading-tight">
                <span className="block font-heading text-xl font-semibold text-ink">
                  Hi Medical
                </span>
                <span className="block text-[10px] font-medium uppercase tracking-[0.3em] text-lavender">
                  Midnight Spa
                </span>
              </span>
            </a>
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
                className="flex h-10 w-10 items-center justify-center rounded-full border border-luxury text-ink-light transition-all duration-300 hover:border-rose/60 hover:text-rose-deep"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-luxury text-ink-light transition-all duration-300 hover:border-rose/60 hover:text-rose-deep"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://zalo.me/0799390790"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Zalo"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-luxury text-ink-light transition-all duration-300 hover:border-rose/60 hover:text-rose-deep"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
                  <path d="M12.04 2C6.54 2 2.06 6.25 2.06 11.47c0 2.86 1.39 5.4 3.57 7.1V22l3.26-1.79c.99.27 2.04.42 3.15.42 5.5 0 9.98-4.25 9.98-9.47S17.54 2 12.04 2zm5.5 8.26-3.98 3.98a.62.62 0 0 1-.88 0l-1.43-1.43-2.72 2.72a.62.62 0 0 1-.88-.88l3.17-3.16a.62.62 0 0 1 .88 0l1.43 1.43 3.53-3.53a.62.62 0 1 1 .88.87z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="mb-6 text-xs font-bold uppercase tracking-[0.25em] text-ink">
              Explore
            </h4>
            <ul className="space-y-3 text-sm font-light">
              {[
                ['#home', 'Home'],
                ['#treatments', 'Treatments'],
                ['#about', 'About'],
                ['#experience', 'Experience'],
                ['/journal', 'Journal'],
                ['#contact', 'Contact'],
              ].map(([href, label]) => (
                <li key={label}>
                  <a href={href} className="transition-colors duration-300 hover:text-rose-deep">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-6 text-xs font-bold uppercase tracking-[0.25em] text-ink">
              Contact
            </h4>
            <ul className="space-y-4 text-sm font-light">
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-rose-deep" />
                <a href="tel:0799390790" className="transition-colors hover:text-rose-deep">
                  0799 390 790
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-rose-deep" />
                <span>
                  123 Nguyễn Trãi, Q.1,
                  <br />
                  TP. Hồ Chí Minh
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-rose-deep" />
                <span>
                  Mon — Sun · 09:00 — 21:00
                </span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="mb-6 text-xs font-bold uppercase tracking-[0.25em] text-ink">
              Stay in Touch
            </h4>
            <p className="text-sm font-light leading-relaxed">
              Nhận bí quyết chăm sóc da và ưu đãi độc quyền mỗi tháng.
            </p>
            <form
              className="mt-5 flex overflow-hidden rounded-full border border-luxury bg-night/60 focus-within:border-rose/60"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Email của bạn"
                aria-label="Email"
                className="w-full bg-transparent px-5 py-3 text-sm text-ink placeholder:text-ink-light/50 focus:outline-none"
              />
              <button
                type="submit"
                className="shrink-0 bg-rose px-5 text-xs font-bold uppercase tracking-wider text-[#3B3157] transition-colors hover:bg-rose-deep"
              >
                Send
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-luxury/40 pt-8 text-xs text-ink-light/70 sm:flex-row">
          <p>© 2026 Hi Medical Skincare &amp; Beauty. All rights reserved.</p>
          <p className="flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-rose" />
            Midnight Luxury Spa
          </p>
        </div>
      </div>
    </footer>
  );
}

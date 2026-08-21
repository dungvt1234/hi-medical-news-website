import Link from 'next/link';
import { Phone, MapPin, Clock, Facebook, Instagram, Youtube, Send } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-brand-900 text-brand-100">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Thương hiệu */}
          <div className="lg:col-span-1.5">
            <div className="flex items-center gap-2.5">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-gold to-gold-dark font-heading text-lg font-bold text-white">
                H
              </span>
              <div className="leading-tight">
                <p className="font-heading text-[17px] font-bold text-white">Hi Medical</p>
                <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-gold-light">
                  Skincare &amp; Beauty
                </p>
              </div>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-brand-200">
              Hệ thống thẩm mỹ công nghệ cao với đội ngũ chuyên gia giàu kinh nghiệm — đồng hành
              cùng vẻ đẹp của bạn.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <a
                href="#"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-brand-100 transition-colors hover:bg-gold hover:text-brand-900"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-brand-100 transition-colors hover:bg-gold hover:text-brand-900"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="#"
                aria-label="Youtube"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-brand-100 transition-colors hover:bg-gold hover:text-brand-900"
              >
                <Youtube className="h-4 w-4" />
              </a>
              <a
                href="#"
                aria-label="Zalo"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-brand-100 transition-colors hover:bg-gold hover:text-brand-900"
              >
                <Send className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Dịch vụ */}
          <div>
            <h3 className="font-heading text-base font-bold text-white">Dịch vụ</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {[
                'Phun xăm thẩm mỹ',
                'Triệt lông công nghệ cao',
                'Điều trị da chuyên sâu',
                'Trẻ hóa & chăm sóc da',
                'Làm hồng vùng kín',
              ].map((s) => (
                <li key={s}>
                  <Link href="/dich-vu" className="text-brand-200 transition-colors hover:text-gold-light">
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tin tức */}
          <div>
            <h3 className="font-heading text-base font-bold text-white">Tin tức</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {[
                'Báo chí nói về chúng tôi',
                'Bí quyết làm đẹp',
                'Câu chuyện thành công',
                'Chương trình khuyến mãi',
                'Đối tác',
              ].map((s) => (
                <li key={s}>
                  <Link href="/tin-tuc" className="text-brand-200 transition-colors hover:text-gold-light">
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Liên hệ */}
          <div>
            <h3 className="font-heading text-base font-bold text-white">Liên hệ</h3>
            <ul className="mt-4 space-y-3 text-sm text-brand-200">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <span>123 Nguyễn Trãi, Quận 1, TP. Hồ Chí Minh</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-gold" />
                <a href="tel:0799390790" className="transition-colors hover:text-gold-light">
                  0799 390 790
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <span>08:00 – 20:30 (cả tuần)</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-5">
        <p className="text-center text-xs text-brand-300">
          © 2026 Hi Medical Skincare &amp; Beauty. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

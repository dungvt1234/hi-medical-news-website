import { MapPin, Phone, Clock, MessageCircle, Facebook } from 'lucide-react';

export const metadata = {
  title: 'Liên hệ Hi Medical Spa tại Vũng Tàu',
  description:
    'Địa chỉ Hi Medical Skincare & Beauty: 49 Nguyễn Bỉnh Khiêm, Vũng Tàu. Hotline 0799 390 790, mở cửa 09:00–18:00. Đặt lịch tư vấn miễn phí.',
  alternates: { canonical: '/lien-he' },
  openGraph: {
    title: 'Liên hệ Hi Medical | Hi Medical',
    description:
      '49 Nguyễn Bỉnh Khiêm, Vũng Tàu · Hotline 0799 390 790 · Mở cửa 09:00–18:00.',
  },
};

const INFO = [
  {
    icon: MapPin,
    label: 'Địa chỉ',
    value: '49 Nguyễn Bỉnh Khiêm, Phường Vũng Tàu, TP. Hồ Chí Minh',
    href: 'https://www.google.com/maps/search/?api=1&query=49+Nguy%E1%BB%85n+B%E1%BB%89nh+Khi%C3%AAm+V%C5%A9ng+T%C3%A0u',
  },
  {
    icon: Phone,
    label: 'Hotline',
    value: '0799 390 790',
    href: 'tel:0799390790',
  },
  {
    icon: Clock,
    label: 'Giờ mở cửa',
    value: 'Thứ 2 — Chủ nhật · 09:00 — 18:00',
  },
];

export default function LienHePage() {
  return (
    <main className="min-h-screen bg-night pt-28">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-luxury">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 70% 20%, rgba(169,130,216,0.30), transparent 45%), linear-gradient(160deg, #F5F1FA 0%, #D8C8F0 100%)',
          }}
        />
        <div className="relative z-10 mx-auto max-w-7xl px-5 py-16 text-center sm:px-8 sm:py-20">
          <p className="eyebrow mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-rose/60" />
            Liên hệ
            <span className="h-px w-10 bg-rose/60" />
          </p>
          <h1 className="font-heading text-4xl font-light text-ink sm:text-5xl lg:text-6xl">
            Ghé thăm <span className="italic text-rose-deep">Hi Medical</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-sm font-light leading-relaxed text-ink-light">
            Đặt lịch trước ít nhất 1 ngày để được phục vụ chu đáo nhất —
            tư vấn miễn phí, không ép mua liệu trình.
          </p>
        </div>
      </section>

      {/* Thông tin + bản đồ */}
      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16">
        <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          {/* Thẻ thông tin */}
          <div className="flex flex-col gap-4">
            {INFO.map((item) => (
              <div
                key={item.label}
                className="flex items-start gap-4 rounded-3xl border border-luxury bg-night-2 p-6"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-rose/10 text-rose-deep">
                  <item.icon className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-lavender">
                    {item.label}
                  </p>
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="mt-1.5 block font-heading text-xl leading-snug text-ink transition-colors hover:text-rose-deep"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="mt-1.5 font-heading text-xl leading-snug text-ink">{item.value}</p>
                  )}
                </div>
              </div>
            ))}

            {/* Nút liên hệ nhanh */}
            <div className="grid grid-cols-2 gap-3">
              <a
                href="tel:0799390790"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-rose px-6 py-3.5 text-xs font-bold uppercase tracking-[0.15em] text-white transition-all duration-500 hover:bg-rose-deep hover:shadow-glow"
              >
                <Phone className="h-4 w-4" />
                Gọi ngay
              </a>
              <a
                href="https://zalo.me/0799390790"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0068ff] px-6 py-3.5 text-xs font-bold uppercase tracking-[0.15em] text-white transition-all duration-500 hover:shadow-glow"
              >
                <MessageCircle className="h-4 w-4" />
                Chat Zalo
              </a>
              <a
                href="https://m.me/ChamSocDaVungTau"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-luxury bg-night-2 px-6 py-3.5 text-xs font-bold uppercase tracking-[0.15em] text-ink transition-all duration-500 hover:border-rose/60 hover:text-rose-deep"
              >
                <MessageCircle className="h-4 w-4" />
                Messenger
              </a>
              <a
                href="https://www.facebook.com/ChamSocDaVungTau"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-luxury bg-night-2 px-6 py-3.5 text-xs font-bold uppercase tracking-[0.15em] text-ink transition-all duration-500 hover:border-rose/60 hover:text-rose-deep"
              >
                <Facebook className="h-4 w-4" />
                Facebook
              </a>
            </div>
          </div>

          {/* Bản đồ */}
          <div className="overflow-hidden rounded-4xl border border-luxury shadow-card">
            <iframe
              title="Bản đồ Hi Medical Skincare & Beauty — 49 Nguyễn Bỉnh Khiêm, Vũng Tàu"
              src="https://maps.google.com/maps?q=49%20Nguy%E1%BB%85n%20B%E1%BB%89nh%20Khi%C3%AAm%2C%20V%C5%A9ng%20T%C3%A0u&t=&z=16&ie=UTF8&iwloc=&output=embed"
              className="h-[420px] w-full lg:h-full lg:min-h-[520px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </section>
    </main>
  );
}

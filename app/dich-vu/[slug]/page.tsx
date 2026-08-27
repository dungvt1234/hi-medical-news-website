import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SERVICES, getService } from '@/lib/services';

export const dynamicParams = false;

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const sv = getService(params.slug);
  if (!sv) return { title: 'Không tìm thấy dịch vụ' };
  return {
    title: `${sv.name} — Hi Medical Lavender Glow Spa`,
    description: sv.tagline,
  };
}

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const sv = getService(params.slug);
  if (!sv) notFound();

  const others = SERVICES.filter((s) => s.slug !== sv.slug);

  return (
    <main className="bg-night">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="relative h-[420px] sm:h-[480px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={sv.img} alt={sv.name} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#171D35] via-[#171D35]/60 to-[#171D35]/30" />
        </div>
        <div className="absolute inset-x-0 bottom-0">
          <div className="mx-auto max-w-6xl px-5 pb-12 sm:px-8">
            <nav className="mb-4 flex items-center gap-2 text-xs font-medium text-white/60">
              <Link href="/" className="transition-colors hover:text-gold">
                Trang chủ
              </Link>
              <span>/</span>
              <Link href="/dich-vu" className="transition-colors hover:text-gold">
                Dịch vụ
              </Link>
              <span>/</span>
              <span className="text-gold">{sv.name}</span>
            </nav>
            <h1 className="font-heading text-4xl font-medium leading-tight text-white sm:text-5xl">
              {sv.name}
            </h1>
            <p className="mt-2 font-heading text-lg italic text-gold">{sv.en}</p>
            <p className="mt-4 max-w-2xl text-sm font-light leading-relaxed text-white/80">
              {sv.tagline}
            </p>
          </div>
        </div>
      </section>

      {/* Giới thiệu + dịch vụ con */}
      <section className="px-5 py-20 sm:px-8">
        <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[1fr_1.6fr]">
          {/* Giới thiệu */}
          <div>
            <p className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.25em] text-[#8B5FC7]">
              <span className="h-px w-8 bg-gold" /> Giới thiệu
            </p>
            <h2 className="mt-4 font-heading text-3xl font-medium leading-snug text-ink">
              Liệu trình được thiết kế riêng cho <span className="italic text-[#7A4FB3]">bạn</span>
            </h2>
            <p className="mt-5 text-sm font-light leading-relaxed text-[#6E6285]">{sv.desc}</p>

            {/* Công nghệ */}
            <div className="mt-8">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#6E6285]">
                Công nghệ sử dụng
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {sv.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-[#8B5FC7]/30 bg-[#F5F1FA] px-4 py-1.5 text-xs font-semibold text-[#7A4FB3]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Lợi ích */}
            <div className="mt-8 rounded-3xl border border-luxury bg-white p-6">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#6E6285]">
                Vì sao chọn Hi Medical
              </p>
              <ul className="mt-4 space-y-3">
                {sv.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-sm font-light text-ink">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#8B5FC7]/10 text-[10px] text-[#7A4FB3]">
                      ✓
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Dịch vụ con */}
          <div>
            <p className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.25em] text-[#8B5FC7]">
              <span className="h-px w-8 bg-gold" /> Dịch vụ bao gồm
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {sv.subs.map((sub) => (
                <div
                  key={sub.name}
                  className={`group rounded-3xl border p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-glow ${
                    sv.special ? 'border-gold/60 bg-gradient-to-b from-[#3A2E56] to-[#4A3A6B]' : 'border-luxury bg-white'
                  }`}
                >
                  <h3
                    className={`font-heading text-xl font-medium ${
                      sv.special ? 'text-white' : 'text-ink'
                    }`}
                  >
                    {sub.name}
                  </h3>
                  {sub.en && (
                    <p className={`mt-0.5 font-heading text-xs italic ${sv.special ? 'text-gold' : 'text-[#7A4FB3]'}`}>
                      {sub.en}
                    </p>
                  )}
                  <p
                    className={`mt-2.5 text-[13px] font-light leading-relaxed ${
                      sv.special ? 'text-[#D8C8F0]' : 'text-[#6E6285]'
                    }`}
                  >
                    {sub.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quy trình */}
      <section className="bg-white px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-center text-[11px] font-bold uppercase tracking-[0.25em] text-[#8B5FC7]">
            <span className="mx-auto inline-flex items-center gap-2">
              <span className="h-px w-8 bg-gold" /> Quy trình chuẩn <span className="h-px w-8 bg-gold" />
            </span>
          </p>
          <h2 className="mt-4 text-center font-heading text-3xl font-medium text-ink sm:text-4xl">
            Bốn bước đến kết quả <span className="italic text-[#7A4FB3]">tốt nhất</span>
          </h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {sv.steps.map((step, i) => (
              <div key={step.name} className="relative text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#8B5FC7] font-heading text-xl italic text-white shadow-glow">
                  {i + 1}
                </div>
                <h3 className="mt-4 font-heading text-lg font-medium text-ink">{step.name}</h3>
                <p className="mt-2 text-[13px] font-light leading-relaxed text-[#6E6285]">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden px-5 py-24 sm:px-8">
        <div className="absolute inset-0 bg-gradient-to-br from-[#8B5FC7] via-[#A982D8] to-[#D8C8F0]" />
        <div className="relative mx-auto max-w-3xl text-center">
          <h2 className="font-heading text-4xl font-medium leading-tight text-white sm:text-5xl">
            Đặt lịch ngay hôm nay
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm font-light leading-relaxed text-white/85">
            Đặt lịch để được tư vấn miễn phí và nhận ưu đãi dành riêng cho khách hàng online.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="tel:0799390790"
              className="inline-flex items-center gap-2 rounded-full bg-gold px-8 py-4 text-sm font-bold uppercase tracking-[0.15em] text-[#302642] shadow-glow transition-transform hover:scale-105"
            >
              Đặt lịch ngay
            </a>
            <a
              href="https://zalo.me/0799390790"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/60 px-8 py-4 text-sm font-bold uppercase tracking-[0.15em] text-white transition-colors hover:bg-white/10"
            >
              Chat Zalo
            </a>
          </div>
          <p className="mt-5 text-xs font-light text-white/70">📞 Hotline: 0799 390 790 · 09:00 — 18:00</p>
        </div>
      </section>

      {/* Dịch vụ khác */}
      <section className="bg-night px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#8B5FC7]">
            Khám phá thêm
          </p>
          <h2 className="mt-3 font-heading text-3xl font-medium text-ink">
            Các dịch vụ <span className="italic text-[#7A4FB3]">khác</span>
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {others.map((o) => (
              <Link
                key={o.slug}
                href={`/dich-vu/${o.slug}`}
                className={`group rounded-3xl border p-5 transition-all duration-500 hover:-translate-y-1 hover:shadow-glow ${
                  o.special ? 'border-gold bg-gradient-to-b from-[#3A2E56] to-[#4A3A6B]' : 'border-luxury bg-white'
                }`}
              >
                <h3 className={`font-heading text-lg font-medium ${o.special ? 'text-white' : 'text-ink'}`}>
                  {o.name}
                </h3>
                <p className={`mt-0.5 font-heading text-xs italic ${o.special ? 'text-gold' : 'text-[#7A4FB3]'}`}>
                  {o.en}
                </p>
                <span
                  className={`mt-3 inline-block text-[10px] font-bold uppercase tracking-[0.15em] transition-colors ${
                    o.special ? 'text-gold' : 'text-[#7A4FB3]'
                  }`}
                >
                  Xem chi tiết →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

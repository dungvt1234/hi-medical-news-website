import Link from 'next/link';
import { SERVICES } from '@/lib/services';

export const metadata = {
  title: 'Dịch vụ — Hi Medical Lavender Glow Spa',
  description:
    'Khám phá các dịch vụ chăm sóc sắc đẹp chuẩn y khoa tại Hi Medical: triệt lông công nghệ cao, điều trị da chuyên sâu, chăm sóc da, trẻ hóa & nâng cơ, massage thư giãn và combo ưu đãi.',
};

export default function DichVuPage() {
  return (
    <main className="bg-night">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#F5F1FA] via-[#D8C8F0] to-[#A982D8] px-5 pb-20 pt-36 sm:px-8">
        <div className="mx-auto max-w-6xl text-center">
          <p className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.25em] text-[#8B5FC7]">
            <span className="h-px w-8 bg-gold" /> Our Services <span className="h-px w-8 bg-gold" />
          </p>
          <h1 className="mt-5 font-heading text-4xl font-medium leading-tight text-ink sm:text-6xl">
            Dịch vụ của <span className="italic text-[#7A4FB3]">chúng tôi</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base font-light leading-relaxed text-[#6E6285]">
            Từ triệt lông công nghệ cao đến điều trị da chuyên sâu — mỗi liệu trình đều được
            cá nhân hóa theo làn da và nhu cầu của bạn, với tiêu chuẩn y khoa và không gian
            sang trọng.
          </p>
        </div>
      </section>

      {/* Grid dịch vụ */}
      <section className="px-5 py-20 sm:px-8">
        <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((sv, i) => (
            <Link
              key={sv.slug}
              href={`/dich-vu/${sv.slug}`}
              className={`group overflow-hidden rounded-4xl border transition-all duration-700 hover:-translate-y-1.5 hover:shadow-glow ${
                sv.special
                  ? 'relative border-gold bg-gradient-to-b from-[#3A2E56] via-[#4A3A6B] to-[#3A2E56] shadow-[0_0_35px_rgba(232,201,90,0.18)] hover:border-[#F3D97A]'
                  : 'border-luxury bg-white hover:border-rose/40'
              } ${i % 3 === 1 ? 'lg:mt-10' : ''}`}
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={sv.img}
                  alt={sv.name}
                  loading="lazy"
                  className="img-zoom h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#171D35] via-transparent to-transparent" />
                <span className="absolute right-5 top-5 font-heading text-lg italic text-white/70">
                  0{i + 1}
                </span>
                {sv.special && (
                  <span className="absolute left-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-gold px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.15em] text-[#302642] shadow-glow">
                    Ưu đãi
                  </span>
                )}
                <div className="absolute inset-x-0 bottom-0 p-7">
                  <h2 className="font-heading text-3xl font-medium text-white">{sv.name}</h2>
                  <p className="mt-1 font-heading text-sm italic text-gold">{sv.en}</p>
                </div>
              </div>
              <div className="p-7">
                <p className="text-sm font-light leading-relaxed text-[#6E6285]">{sv.tagline}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7A4FB3]">
                  Xem chi tiết <span aria-hidden>→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 pb-24 pt-4 sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 rounded-4xl border border-luxury bg-white p-10 text-center shadow-card sm:flex-row sm:text-left">
          <div>
            <h2 className="font-heading text-3xl font-medium text-ink">
              Chưa chắc chọn dịch vụ nào?
            </h2>
            <p className="mt-2 text-sm font-light text-[#6E6285]">
              Để chuyên gia tư vấn miễn phí liệu trình phù hợp nhất với làn da của bạn.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:0799390790"
              className="inline-flex items-center gap-2 rounded-full bg-[#8B5FC7] px-8 py-4 text-sm font-bold uppercase tracking-[0.15em] text-white transition-colors hover:bg-[#7A4FB3]"
            >
              📞 Gọi tư vấn
            </a>
            <a
              href="https://zalo.me/0799390790"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[#8B5FC7] px-8 py-4 text-sm font-bold uppercase tracking-[0.15em] text-[#7A4FB3] transition-colors hover:bg-[#8B5FC7] hover:text-white"
            >
              Chat Zalo
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

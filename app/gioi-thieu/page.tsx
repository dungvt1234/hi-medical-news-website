import Link from 'next/link';

export const metadata = {
  title: 'Về Hi Medical Skincare & Beauty Vũng Tàu',
  description:
    'Hi Medical Skincare & Beauty tại Vũng Tàu — 10 năm chăm sóc da an toàn, cá nhân hoá và hiệu quả bền vững. Tìm hiểu câu chuyện thương hiệu.',
  alternates: { canonical: '/gioi-thieu' },
  openGraph: {
    title: 'Về Hi Medical | Hi Medical',
    description:
      '10 năm kiến tạo hành trình làm đẹp an toàn tại Vũng Tàu — an toàn, cá nhân hoá, hiệu quả bền vững.',
  },
};

const STATS = [
  { value: '10+', label: 'Năm kinh nghiệm' },
  { value: '5K+', label: 'Khách hàng hài lòng' },
  { value: '20+', label: 'Liệu trình đặc trưng' },
  { value: '100%', label: 'Chăm sóc cá nhân hoá' },
];

const VALUES = [
  {
    title: 'An toàn',
    desc: 'Mọi liệu trình bắt đầu bằng thăm khám. Công nghệ rõ nguồn gốc, quy trình chuẩn y khoa, không làm đại trà.',
  },
  {
    title: 'Cá nhân hoá',
    desc: 'Mỗi làn da có một điểm xuất phát khác nhau — phác đồ được thiết kế riêng, theo dõi và điều chỉnh từng buổi.',
  },
  {
    title: 'Hiệu quả bền vững',
    desc: 'Không chạy theo đẹp tức thì. Chăm sóc đúng lúc, đúng nhu cầu để kết quả duy trì lâu dài.',
  },
];

export default function GioiThieuPage() {
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
            Về chúng tôi
            <span className="h-px w-10 bg-rose/60" />
          </p>
          <h1 className="font-heading text-4xl font-light text-ink sm:text-5xl lg:text-6xl">
            Hi Medical <span className="italic text-rose-deep">Skincare &amp; Beauty</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-sm font-light leading-relaxed text-ink-light">
            10 năm kiến tạo hành trình làm đẹp an toàn tại Vũng Tàu —
            nơi mỗi làn da được lắng nghe và chăm sóc như duy nhất.
          </p>
        </div>
      </section>

      {/* Câu chuyện */}
      <section className="mx-auto max-w-3xl px-5 py-12 sm:px-8 sm:py-16">
        <p className="border-l-2 border-gold pl-5 font-heading text-xl font-light italic leading-relaxed text-ink-light sm:text-2xl">
          Làm đẹp chưa bao giờ chỉ là làm cho một người đẹp hơn —
          đó còn là hành trình xây dựng niềm tin và sự an tâm.
        </p>
        <div className="mt-8 space-y-5 text-[15px] font-light leading-[1.9] text-ink-light">
          <p>
            Từ những ngày đầu tiên, Hi Medical bắt đầu với một mong muốn giản dị:
            xây dựng nơi chăm sóc da chuyên nghiệp, nơi khách hàng được tư vấn dựa
            trên nhu cầu thực tế của làn da thay vì những xu hướng nhất thời.
          </p>
          <p>
            10 năm qua, mong muốn ấy được hoàn thiện bằng kiến thức, công nghệ và
            trải nghiệm thực tế cùng hàng nghìn làn da — từ triệt lông, điều trị
            mụn nám đến trẻ hoá và thư giãn dưỡng sinh.
          </p>
          <p>
            Hôm nay tại 49 Nguyễn Bỉnh Khiêm, Vũng Tàu, Hi Medical tiếp tục cập nhật
            những tinh hoa làm đẹp thế giới, chọn lọc kỹ càng để phù hợp với người Việt.
          </p>
        </div>

        {/* Stats */}
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="rounded-3xl border border-luxury bg-night-2 p-6 text-center"
            >
              <p className="font-heading text-3xl font-medium text-rose-deep sm:text-4xl">
                {s.value}
              </p>
              <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-ink-light">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Giá trị */}
      <section className="border-y border-luxury bg-night-2/60">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16">
          <h2 className="text-center font-heading text-3xl font-light text-ink sm:text-4xl">
            Giá trị chúng tôi <span className="italic text-rose-deep">giữ gìn</span>
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {VALUES.map((v, i) => (
              <div
                key={v.title}
                className="rounded-3xl border border-luxury bg-night-2 p-8"
              >
                <p className="font-heading text-lg italic text-gold">0{i + 1}</p>
                <h3 className="mt-3 font-heading text-2xl font-medium text-ink">{v.title}</h3>
                <p className="mt-3 text-sm font-light leading-relaxed text-ink-light">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-3xl px-5 py-12 text-center sm:px-8 sm:py-16">
        <p className="font-heading text-2xl font-light text-ink sm:text-3xl">
          Trải nghiệm <span className="italic text-rose-deep">Hi Medical</span> ngay hôm nay
        </p>
        <p className="mx-auto mt-3 max-w-md text-sm font-light text-ink-light">
          Đặt lịch soi da và tư vấn miễn phí — hotline 0799 390 790.
        </p>
        <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/dich-vu"
            className="inline-flex w-full items-center justify-center rounded-full bg-rose px-8 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-white transition-all duration-500 hover:bg-rose-deep hover:shadow-glow sm:w-auto"
          >
            Xem dịch vụ
          </Link>
          <Link
            href="/lien-he"
            className="inline-flex w-full items-center justify-center rounded-full border border-luxury px-8 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-ink transition-all duration-500 hover:border-rose/60 hover:text-rose-deep sm:w-auto"
          >
            Liên hệ
          </Link>
        </div>
      </section>
    </main>
  );
}

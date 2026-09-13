import Link from 'next/link';
import { Star, Quote, ArrowRight } from 'lucide-react';
import { FEEDBACKS } from '@/lib/feedbacks';

export const metadata = {
  title: 'Đánh giá khách hàng | Hi Medical',
  description:
    'Khách hàng nói gì về Hi Medical Skincare & Beauty — những chia sẻ thật sau liệu trình chăm sóc da, triệt lông và điều trị chuyên sâu.',
};

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1" aria-label={`${rating}/5 sao`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < rating ? 'fill-gold text-gold' : 'text-lavender/40'}`}
        />
      ))}
    </div>
  );
}

export default function FeedbackPage() {
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
            Feedback
            <span className="h-px w-10 bg-rose/60" />
          </p>
          <h1 className="font-heading text-4xl font-light text-ink sm:text-5xl lg:text-6xl">
            Khách hàng <span className="italic text-rose-deep">nói gì?</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-sm font-light leading-relaxed text-ink-light">
            Những chia sẻ thật từ khách hàng đã trải nghiệm dịch vụ tại Hi Medical —
            động lực để chúng tôi hoàn thiện mỗi ngày.
          </p>
        </div>
      </section>

      {/* Danh sách đánh giá */}
      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16">
        <div className="grid gap-5 md:grid-cols-2">
          {FEEDBACKS.map((fb) => (
            <article
              key={fb.id}
              className="group flex flex-col rounded-3xl border border-luxury bg-night-2 p-7 transition-all duration-500 hover:border-rose/40 hover:shadow-glow sm:p-8"
            >
              <div className="flex items-center justify-between">
                <Stars rating={fb.rating} />
                <Quote className="h-6 w-6 text-gold/60" />
              </div>
              <p className="mt-5 flex-1 font-heading text-lg font-light italic leading-relaxed text-ink sm:text-xl">
                “{fb.content}”
              </p>
              <div className="mt-7 flex items-center gap-4 border-t border-luxury/60 pt-5">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-rose/10 font-heading text-lg font-semibold text-rose-deep">
                  {fb.name.charAt(0)}
                </span>
                <div className="min-w-0">
                  <p className="truncate font-heading text-lg text-ink">{fb.name}</p>
                  <p className="truncate text-xs text-ink-light">{fb.meta}</p>
                </div>
                <span className="ml-auto shrink-0 rounded-full bg-gold/15 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#8A6D1F]">
                  {fb.service}
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 rounded-4xl border border-luxury bg-night-2 p-8 text-center sm:p-12">
          <p className="font-heading text-2xl font-light text-ink sm:text-3xl">
            Bạn đã trải nghiệm? <span className="italic text-rose-deep">Chia sẻ nhé!</span>
          </p>
          <p className="mx-auto mt-3 max-w-md text-sm font-light text-ink-light">
            Gửi cảm nhận của bạn qua Zalo — mỗi đánh giá là món quà quý với đội ngũ Hi Medical.
          </p>
          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="https://zalo.me/0799390790"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-rose px-8 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-white transition-all duration-500 hover:bg-rose-deep hover:shadow-glow sm:w-auto"
            >
              Gửi đánh giá qua Zalo
              <ArrowRight className="h-4 w-4" />
            </a>
            <Link
              href="/#contact"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-luxury px-8 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-ink transition-all duration-500 hover:border-rose/60 hover:text-rose-deep sm:w-auto"
            >
              Đặt lịch trải nghiệm
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

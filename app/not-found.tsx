import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-night px-5">
      <div className="text-center">
        <p className="eyebrow mb-4 flex items-center justify-center gap-3">
          <span className="h-px w-10 bg-rose/60" />
          404
          <span className="h-px w-10 bg-rose/60" />
        </p>
        <h1 className="font-heading text-5xl font-light text-ink sm:text-6xl">
          Trang này <span className="italic text-rose-deep">không tồn tại</span>
        </h1>
        <p className="mx-auto mt-5 max-w-md text-sm font-light leading-relaxed text-ink-light">
          Liên kết bạn mở có thể đã đổi hoặc bị xóa. Quay về trang chủ để tiếp tục
          khám phá Hi Medical nhé.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full bg-rose px-8 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-white transition-all duration-500 hover:bg-rose-deep hover:shadow-glow"
          >
            Về trang chủ
          </Link>
          <Link
            href="/dich-vu"
            className="inline-flex items-center justify-center rounded-full border border-luxury px-8 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-ink transition-all duration-500 hover:border-rose/60 hover:text-rose-deep"
          >
            Xem dịch vụ
          </Link>
        </div>
      </div>
    </main>
  );
}

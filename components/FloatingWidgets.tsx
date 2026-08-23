'use client';

import { useEffect, useState } from 'react';
import { MessageCircle, X, Phone } from 'lucide-react';
import { ARTICLES } from '@/lib/articles';

/**
 * Floating widgets cố định góc dưới bên phải (theme Midnight Luxury):
 * - Nút tròn chính mở/đóng cụm tương tác
 * - Zalo, Messenger, Hotline
 * - Kèm 1 bài viết mới nhất (Journal)
 */
export default function FloatingWidgets() {
  const [open, setOpen] = useState(false);
  const latest = ARTICLES[0];

  return (
    <div className="fixed bottom-6 right-4 z-50 flex flex-col items-end gap-3 sm:right-6">
      {/* Cụm nút phụ (hiện khi mở) */}
      <div
        className={`flex flex-col items-end gap-3 transition-all duration-300 ${
          open ? 'visible translate-y-0 opacity-100' : 'invisible pointer-events-none translate-y-3 opacity-0'
        }`}
      >
        {/* Bài viết mới nhất */}
        <a
          href="/journal"
          className="group mb-1 max-w-[260px] rounded-2xl border border-luxury bg-night-2/95 p-4 shadow-card backdrop-blur-md transition-colors hover:border-rose/50"
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-lavender">
            Journal · Mới nhất
          </p>
          <p className="mt-1.5 line-clamp-2 font-heading text-base italic leading-snug text-ink group-hover:text-rose-deep">
            {latest.title}
          </p>
        </a>

        {/* Zalo */}
        <a
          href="https://zalo.me/0799390790"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat Zalo"
          className="group relative flex h-12 w-12 items-center justify-center rounded-full bg-[#0068ff] text-white shadow-card transition-transform hover:scale-110"
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" aria-hidden>
            <path d="M12.04 2C6.54 2 2.06 6.25 2.06 11.47c0 2.86 1.39 5.4 3.57 7.1V22l3.26-1.79c.99.27 2.04.42 3.15.42 5.5 0 9.98-4.25 9.98-9.47S17.54 2 12.04 2zm5.5 8.26-3.98 3.98a.62.62 0 0 1-.88 0l-1.43-1.43-2.72 2.72a.62.62 0 0 1-.88-.88l3.17-3.16a.62.62 0 0 1 .88 0l1.43 1.43 3.53-3.53a.62.62 0 1 1 .88.87z" />
          </svg>
          <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-lg bg-night-3 px-3 py-1.5 text-xs font-semibold text-white opacity-0 shadow-card transition-opacity group-hover:opacity-100">
            Chat Zalo
          </span>
        </a>

        {/* Messenger */}
        <a
          href="https://m.me/himedical"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat Messenger"
          className="group relative flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#00b2ff] to-[#006aff] text-white shadow-card transition-transform hover:scale-110"
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" aria-hidden>
            <path d="M12 2C6.48 2 2 6.14 2 11.25c0 2.83 1.35 5.36 3.44 7.06V22l3.15-1.74c.9.25 1.85.38 2.83.38 5.52 0 10-4.14 10-9.25S17.52 2 12 2zm5.17 7.62-2.6 4.14a.94.94 0 0 1-1.42.23l-2.05-1.66a.23.23 0 0 0-.28 0l-3.05 2.44c-.46.37-1.1-.14-.84-.66l2.6-4.14a.94.94 0 0 1 1.42-.23l2.05 1.66c.09.07.2.07.28 0l3.05-2.44c.46-.37 1.1.14.84.66z" />
          </svg>
          <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-lg bg-night-3 px-3 py-1.5 text-xs font-semibold text-white opacity-0 shadow-card transition-opacity group-hover:opacity-100">
            Chat Messenger
          </span>
        </a>

        {/* Hotline */}
        <a
          href="tel:0799390790"
          aria-label="Gọi hotline"
          className="group relative flex h-12 w-12 items-center justify-center rounded-full bg-rose text-white shadow-card transition-transform hover:scale-110"
        >
          <Phone className="h-5 w-5" />
          <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-lg bg-night-3 px-3 py-1.5 text-xs font-semibold text-white opacity-0 shadow-card transition-opacity group-hover:opacity-100">
            Gọi 0799 390 790
          </span>
        </a>
      </div>

      {/* Nút tròn chính */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Đóng trợ giúp' : 'Mở trợ giúp'}
        aria-expanded={open}
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-rose text-white shadow-card transition-all hover:scale-105"
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        {/* Vòng pulse */}
        {!open && (
          <span
            aria-hidden
            className="absolute inset-0 rounded-full bg-rose/40 animate-pulse-ring"
          />
        )}
      </button>
    </div>
  );
}

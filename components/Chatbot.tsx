'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { MessageCircle, X, Send } from 'lucide-react';

/**
 * Chatbot FAQ — Hi Medical
 * - Nút nổi góc dưới-bên trái (tránh chồng cụm Zalo/Messenger bên phải)
 * - Trả lời tự động theo từ khóa (không dấu), kèm link hành động
 * - Không cần API key
 */

type ChatLink = { label: string; href: string; external?: boolean };
type ChatMsg = { id: number; from: 'bot' | 'user'; text: string; links?: ChatLink[] };

const ZALO = 'https://zalo.me/0799390790';
const HOTLINE = 'tel:0799390790';

// Chuẩn hoá tiếng Việt: thường hoá + bỏ dấu (để so khớp từ khóa)
function norm(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/đ/g, 'd');
}

type FaqRule = { keys: string[]; text: string; links?: ChatLink[] };

const FAQ: FaqRule[] = [
  {
    keys: ['dat lich', 'booking', 'hen lich', 'hen gio', 'dang ky'],
    text: 'Bạn đặt lịch rất nhanh qua Zalo hoặc hotline — đội ngũ Hi Medical phản hồi trong 15 phút (giờ hành chính) và tư vấn miễn phí liệu trình phù hợp.',
    links: [
      { label: 'Chat Zalo đặt lịch', href: ZALO, external: true },
      { label: 'Gọi 0799 390 790', href: HOTLINE },
    ],
  },
  {
    keys: ['gia', 'bao nhieu', 'khuyen mai', 'uu dai', '168', 'combo', 'sale', 'giam gia'],
    text: 'Tháng này có combo chăm sóc da + triệt lông chỉ từ 168K cho khách đặt lịch online (số lượng có hạn). Xem chi tiết các gói combo ưu đãi tại đây nhé.',
    links: [{ label: 'Xem combo ưu đãi', href: '/dich-vu/combo-uu-dai' }],
  },
  {
    keys: ['triet long', 'long nach', 'long tay', 'long chan', 'long mat', 'bikini', 'wax', 'long'],
    text: 'Hi Medical dùng công nghệ SMART OPT IDPL DELUXE: êm ái, an toàn, hiệu quả lâu dài cho mọi vùng (nách, tay, chân, mặt, bikini, toàn thân). Xem chi tiết dịch vụ triệt lông nhé.',
    links: [{ label: 'Triệt lông công nghệ cao', href: '/dich-vu/triet-long-cong-nghe-cao' }],
  },
  {
    keys: ['mun', 'nam', 'tan nhang', 'tham', 'seo', 'quang tham', 'lo chan long', 'da dau'],
    text: 'Các vấn đề mụn, nám, thâm, sẹo, quầng thâm mắt được thăm khám bởi chuyên gia da liễu và điều trị bằng laser & IPL hiện đại theo phác đồ riêng cho từng làn da.',
    links: [{ label: 'Điều trị da chuyên sâu', href: '/dich-vu/dieu-tri-da-chuyen-sau' }],
  },
  {
    keys: ['cham soc', 'facial', 'duong am', 'mat na', 'da kho', 'cap am', 'lam sach'],
    text: 'Liệu trình chăm sóc da thư giãn với dược mỹ phẩm: làm sạch sâu, dưỡng ẩm phục hồi, đắp mặt nạ — hiệu quả thấy ngay sau buổi đầu tiên.',
    links: [{ label: 'Chăm sóc da', href: '/dich-vu/cham-soc-da' }],
  },
  {
    keys: ['tre hoa', 'nang co', 'nep nhan', 'chay xe', 'laser tre', 'rf'],
    text: 'Công nghệ trẻ hoá không phẫu thuật (IPL, laser, Micro needle shoot, RF) giúp da săn chắc, mờ nếp nhăn mà không cần nghỉ dưỡng.',
    links: [{ label: 'Trẻ hoá & nâng cơ', href: '/dich-vu/tre-hoa-nang-co' }],
  },
  {
    keys: ['gio', 'mo cua', 'dong cua', 'may gio', 'thu 2', 'chu nhat', 'lam viec'],
    text: 'Hi Medical mở cửa tất cả các ngày: Thứ 2 — Chủ nhật · 09:00 — 18:00. Bạn nên đặt lịch trước ít nhất 1 ngày để được phục vụ chu đáo nhất.',
  },
  {
    keys: ['dia chi', 'o dau', 'duong', 'quan', 'chi nhanh', 'den truc tiep'],
    text: 'Địa chỉ: 123 Nguyễn Trãi, Q.1, TP. Hồ Chí Minh. Bạn có thể ghé trực tiếp trong giờ mở cửa hoặc đặt lịch online trước nhé.',
  },
  {
    keys: ['sdt', 'dien thoai', 'hotline', 'lien he', 'zalo', 'tu van', 'hoi'],
    text: 'Bạn liên hệ Hi Medical qua hotline 0799 390 790 (09:00 — 18:00) hoặc nhắn Zalo để được tư vấn miễn phí.',
    links: [
      { label: 'Chat Zalo', href: ZALO, external: true },
      { label: 'Gọi hotline', href: HOTLINE },
    ],
  },
  {
    keys: ['gioi thieu', 've hi', 'hi medical', '10 nam', 'cau chuyen', 'thuong hieu'],
    text: 'Hi Medical — 10 năm kiến tạo hành trình làm đẹp an toàn: cập nhật xu hướng thế giới, chọn lọc để phù hợp với người Việt. An toàn • Cá nhân hoá • Hiệu quả bền vững.',
    links: [{ label: 'Đọc câu chuyện Hi Medical', href: '/tin-tuc/cau-chuyen-hi-medical-10-nam' }],
  },
];

const QUICK_REPLIES = [
  'Đặt lịch',
  'Ưu đãi 168K',
  'Triệt lông',
  'Trị mụn & nám',
  'Giờ mở cửa',
  'Địa chỉ',
];

const FALLBACK =
  'Mình chưa hiểu rõ ý bạn lắm. Bạn chọn nhanh một chủ đề bên dưới, hoặc nhắn Zalo / gọi hotline để được tư vấn trực tiếp nhé.';
const FALLBACK_LINKS: ChatLink[] = [
  { label: 'Chat Zalo', href: ZALO, external: true },
  { label: 'Gọi 0799 390 790', href: HOTLINE },
];

function findAnswer(input: string): { text: string; links?: ChatLink[] } {
  const n = ` ${norm(input)} `;
  if (/\b(chao|hi|hello|xin chao)\b/.test(n)) {
    return {
      text: 'Chào bạn! Mình là trợ lý Hi Medical. Bạn cần hỏi về dịch vụ, ưu đãi hay đặt lịch?',
    };
  }
  if (/\b(cam on|thank|ok|tuyet)\b/.test(n)) {
    return {
      text: 'Rất vui được giúp bạn! Hi Medical luôn sẵn sàng đồng hành cùng làn da của bạn.',
      links: [{ label: 'Đặt lịch trải nghiệm', href: ZALO, external: true }],
    };
  }
  for (const rule of FAQ) {
    if (rule.keys.some((k) => n.includes(k))) return { text: rule.text, links: rule.links };
  }
  return { text: FALLBACK, links: FALLBACK_LINKS };
}

let msgId = 0;
const nextId = () => ++msgId;

type ChatbotProps = {
  /** Ẩn nút nổi + bong bóng riêng (dùng chung cụm liên hệ) */
  hideTrigger?: boolean;
  /** Điều khiển mở/đóng từ bên ngoài */
  externalOpen?: boolean;
  onExternalClose?: () => void;
  /** Neo khung chat bên phải (trên cụm liên hệ) */
  alignRight?: boolean;
};

export default function Chatbot({
  hideTrigger = false,
  externalOpen,
  onExternalClose,
  alignRight = false,
}: ChatbotProps = {}) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [bubbleDismissed, setBubbleDismissed] = useState(false);
  const [typing, setTyping] = useState(false);

  const open = externalOpen ?? internalOpen;
  const handleToggle = () => {
    if (externalOpen === undefined) setInternalOpen((v) => !v);
  };
  const handleClose = () => {
    setInternalOpen(false);
    onExternalClose?.();
  };
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMsg[]>([
    {
      id: nextId(),
      from: 'bot',
      text: 'Chào bạn! Mình là trợ lý Hi Medical — hỏi mình về dịch vụ, ưu đãi hoặc đặt lịch nhé.',
    },
  ]);
  const bodyRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Cuộn xuống cuối khi có tin nhắn mới
  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, typing, open]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const send = (raw: string) => {
    const text = raw.trim();
    if (!text || typing) return;
    setMessages((m) => [...m, { id: nextId(), from: 'user', text }]);
    setInput('');
    setTyping(true);
    timerRef.current = setTimeout(() => {
      const ans = findAnswer(text);
      setMessages((m) => [...m, { id: nextId(), from: 'bot', ...ans }]);
      setTyping(false);
    }, 650);
  };

  return (
    <div
      className={
        alignRight
          ? 'fixed bottom-[88px] right-4 z-50 flex flex-col items-end sm:right-6'
          : 'fixed bottom-6 left-4 z-50 flex flex-col items-start sm:left-6'
      }
    >
      {/* Lớp nền: bấm ra ngoài để đóng chat */}
      <div
        aria-hidden
        onClick={handleClose}
        className={`fixed inset-0 -z-10 bg-night/60 backdrop-blur-[1px] transition-opacity duration-300 ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />
      {/* Khung chat */}
      <div
        className={`mb-3 flex h-[360px] max-h-[calc(100dvh-16rem)] w-[250px] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-3xl border border-luxury bg-white shadow-2xl transition-all duration-300 sm:mb-4 sm:h-[480px] sm:max-h-[calc(100dvh-10rem)] sm:w-[340px] ${
          open ? 'visible translate-y-0 scale-100 opacity-100' : 'invisible pointer-events-none translate-y-4 scale-95 opacity-0'
        }`}
        role="dialog"
        aria-label="Chat với Hi Medical"
      >
        {/* Header */}
        <div className="flex items-center gap-3 bg-gradient-to-r from-rose to-rose-deep px-4 py-3.5">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white font-heading text-lg font-bold text-rose-deep">
            H
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-heading text-[15px] font-bold leading-tight text-white">Hi Medical</p>
            <p className="flex items-center gap-1.5 text-[11px] font-medium text-white/80">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Trực tuyến · trả lời ngay
            </p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Đóng chat"
            className="flex h-8 w-8 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/15 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Tin nhắn */}
        <div ref={bodyRef} className="flex-1 space-y-3 overflow-y-auto bg-[#F5F1FA] p-4">
          {messages.map((m) =>
            m.from === 'bot' ? (
              <div key={m.id} className="max-w-[85%]">
                <div className="rounded-2xl rounded-tl-md border border-luxury bg-white px-3.5 py-2.5 text-[13.5px] leading-relaxed text-ink shadow-sm">
                  {m.text}
                </div>
                {m.links && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {m.links.map((l) =>
                      l.external || l.href.startsWith('tel:') ? (
                        <a
                          key={l.label}
                          href={l.href}
                          {...(l.external
                            ? { target: '_blank', rel: 'noopener noreferrer' }
                            : {})}
                          className="rounded-full bg-gold px-3.5 py-1.5 text-xs font-bold text-[#302642] shadow-card transition-all hover:bg-[#F3D97A]"
                        >
                          {l.label}
                          {l.external ? ' ↗' : ''}
                        </a>
                      ) : (
                        <Link
                          key={l.label}
                          href={l.href}
                          onClick={handleClose}
                          className="rounded-full bg-gold px-4 py-1.5 text-xs font-bold text-[#302642] shadow-card transition-all hover:bg-[#F3D97A]"
                        >
                          Xem chi tiết →
                        </Link>
                      )
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div key={m.id} className="ml-auto max-w-[85%]">
                <div className="rounded-2xl rounded-tr-md bg-rose px-3.5 py-2.5 text-[13.5px] leading-relaxed text-white shadow-sm">
                  {m.text}
                </div>
              </div>
            )
          )}
          {typing && (
            <div className="flex max-w-[85%] items-center gap-1 rounded-2xl rounded-tl-md border border-luxury bg-white px-4 py-3 shadow-sm">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="h-1.5 w-1.5 animate-bounce rounded-full bg-rose"
                  style={{ animationDelay: `${i * 150}ms` }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Gợi ý nhanh */}
        <div className="no-scrollbar flex gap-1.5 overflow-x-auto border-t border-brand-100 bg-white px-3 py-2.5">
          {QUICK_REPLIES.map((q) => (
            <button
              key={q}
              type="button"
              onClick={() => send(q)}
              className="shrink-0 whitespace-nowrap rounded-full border border-rose/30 bg-[#F5F1FA] px-3 py-1.5 text-xs font-semibold text-rose-deep transition-colors hover:bg-cream"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Ô nhập */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="flex items-center gap-2 border-t border-brand-100 bg-white p-3"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Nhập câu hỏi của bạn..."
            aria-label="Nhập câu hỏi"
            className="w-full rounded-full border border-luxury bg-[#F5F1FA] px-4 py-2.5 text-sm text-ink outline-none placeholder:text-ink-light focus:border-rose"
          />
          <button
            type="submit"
            aria-label="Gửi tin nhắn"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rose text-white transition-all hover:bg-rose-deep disabled:opacity-40"
            disabled={!input.trim()}
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>

      {/* Bong bóng mời chat (ẩn khi gộp vào cụm liên hệ) */}
      {!hideTrigger && !open && !bubbleDismissed && (
        <div
          role="button"
          tabIndex={0}
          onClick={() => externalOpen === undefined && setInternalOpen(true)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && externalOpen === undefined) setInternalOpen(true);
          }}
          aria-label="Mở chat với Hi Medical"
          className="relative mb-3 w-[210px] cursor-pointer rounded-2xl rounded-bl-md border border-luxury bg-white px-4 py-3 shadow-card motion-reduce:animate-none"
          style={{ animation: 'chat-nudge 4s ease-in-out infinite' }}
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setBubbleDismissed(true);
            }}
            aria-label="Ẩn bong bóng chat"
            className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-night-3 text-[10px] font-bold text-white shadow-card hover:bg-ink"
          >
            <X className="h-3 w-3" />
          </button>
          <p className="flex items-center gap-1.5 text-[13px] font-bold text-ink">
            <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
            Quý khách cần hỗ trợ?
          </p>
          <p className="mt-0.5 text-xs font-medium text-ink-light">
            Chat ngay với Hi Medical
          </p>
          <style jsx>{`
            @keyframes chat-nudge {
              0%,
              88%,
              100% {
                transform: translateY(0);
              }
              92%,
              96% {
                transform: translateY(-6px);
              }
            }
          `}</style>
        </div>
      )}

      {/* Nút nổi mở/đóng (ẩn khi gộp vào cụm liên hệ) */}
      {!hideTrigger && (
      <button
        type="button"
        onClick={handleToggle}
        aria-label={open ? 'Đóng chat' : 'Mở chat với Hi Medical'}
        aria-expanded={open}
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-rose to-rose-deep text-white shadow-card transition-all hover:scale-105"
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        {!open && (
          <span aria-hidden className="absolute inset-0 rounded-full bg-rose/40 animate-pulse-ring" />
        )}
      </button>
      )}
    </div>
  );
}

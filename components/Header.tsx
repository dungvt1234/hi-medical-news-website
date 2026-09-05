'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import {
  ChevronDown,
  Search,
  Menu,
  X,
  Phone,
  Sparkles,
  GraduationCap,
  Newspaper,
  Scissors,
  HeartHandshake,
} from 'lucide-react';

// ---------- Dữ liệu menu ----------
type MenuItem = {
  label: string;
  href: string;
  children?: { label: string; href: string; icon?: React.ReactNode }[];
};

const MENU: MenuItem[] = [
  {
    label: 'Giới thiệu',
    href: '/gioi-thieu',
    children: [
      { label: 'Về Hi Medical', href: '/gioi-thieu', icon: <HeartHandshake className="h-4 w-4" /> },
      { label: 'Đội ngũ chuyên gia', href: '/chuyen-gia', icon: <GraduationCap className="h-4 w-4" /> },
      { label: 'Hệ thống chi nhánh', href: '/chi-nhanh', icon: <Scissors className="h-4 w-4" /> },
    ],
  },
  {
    label: 'Dịch vụ',
    href: '/dich-vu',
    children: [
      { label: 'Phun xăm thẩm mỹ', href: '/dich-vu/phun-xam' },
      { label: 'Triệt lông công nghệ cao', href: '/dich-vu/triet-long' },
      { label: 'Điều trị da chuyên sâu', href: '/dich-vu/dieu-tri-da' },
      { label: 'Trẻ hóa & chăm sóc da', href: '/dich-vu/tre-hoa-da' },
    ],
  },
  {
    label: 'Kiến thức',
    href: '/kien-thuc',
    children: [
      { label: 'Bí quyết làm đẹp', href: '/kien-thuc/bi-quyet-lam-dep' },
      { label: 'Câu chuyện khách hàng', href: '/kien-thuc/cau-chuyen-khach-hang' },
      { label: 'Hỏi đáp cùng chuyên gia', href: '/kien-thuc/hoi-dap' },
    ],
  },
  {
    label: 'Tin tức',
    href: '/tin-tuc',
    children: [
      { label: 'ĐÓN NHỊP XU HƯỚNG LÀM ĐẸP TOÀN CẦU – CHỌN LỌC ĐỂ PHÙ HỢP VỚI NGƯỜI VIỆT', href: '/tin-tuc/bao-chi' },
      { label: 'Chương trình khuyến mãi', href: '/tin-tuc/khuyen-mai' },
      { label: 'Sự kiện', href: '/tin-tuc/su-kien' },
    ],
  },
];

// ---------- Label dài: marquee chạy liên tục ----------
function MarqueeText({ text }: { text: string }) {
  return (
    <span className="relative flex w-full items-center overflow-hidden">
      <span
        className="flex w-max shrink-0 items-center motion-reduce:w-auto motion-reduce:overflow-visible"
        style={{ animation: 'nav-marquee 10s linear infinite' }}
      >
        <span className="whitespace-nowrap pr-10">{text}</span>
        <span className="whitespace-nowrap pr-10" aria-hidden>
          {text}
        </span>
      </span>
      <style jsx>{`
        @keyframes nav-marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </span>
  );
}

// ---------- Dropdown desktop ----------
function NavItem({ item }: { item: MenuItem }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  return (
    <li ref={ref} className="relative">
      <Link
        href={item.href}
        onMouseEnter={() => setOpen(true)}
        onClick={() => setOpen((v) => !v)}
        className="group flex items-center gap-1 rounded-full px-4 py-2 text-[15px] font-semibold text-ink transition-colors hover:text-brand-600"
      >
        {item.label}
        {item.children && (
          <ChevronDown
            className={`h-4 w-4 text-brand-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          />
        )}
        {/* underline hover */}
        <span className="absolute inset-x-4 -bottom-0.5 h-0.5 origin-left scale-x-0 rounded-full bg-gold transition-transform duration-300 group-hover:scale-x-100" />
      </Link>

      {item.children && (
        <div
          className={`absolute left-0 top-full z-50 w-64 pt-3 transition-all duration-200 ${
            open ? 'visible opacity-100 translate-y-0' : 'invisible opacity-0 -translate-y-1'
          }`}
        >
          <div className="overflow-hidden rounded-2xl border border-brand-100 bg-white p-2 shadow-card-lg">
            {item.children.map((c) => (
              <Link
                key={c.href}
                href={c.href}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-brand-50 hover:text-brand-600"
              >
                {c.icon && <span className="text-gold-dark">{c.icon}</span>}
                {c.label.length > 40 ? <MarqueeText text={c.label} /> : c.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </li>
  );
}

// ---------- Header ----------
export default function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSub, setMobileSub] = useState<Record<string, boolean>>({});
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  // Khoá scroll khi mobile menu mở
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-brand-100/80 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-800 font-heading text-lg font-bold text-white shadow-card">
            H
          </span>
          <span className="leading-tight">
            <span className="block font-heading text-[17px] font-bold tracking-wide text-brand-800">
              Hi Medical
            </span>
            <span className="block text-[11px] font-medium uppercase tracking-[0.18em] text-gold-dark">
              Skincare &amp; Beauty
            </span>
          </span>
        </Link>

        {/* Menu desktop */}
        <nav className="hidden items-center lg:flex">
          <ul className="flex items-center gap-1">
            <li>
              <Link
                href="/"
                className="block rounded-full px-4 py-2 text-[15px] font-semibold text-brand-600 transition-colors hover:text-brand-600"
              >
                Trang chủ
              </Link>
            </li>
            {MENU.map((item) => (
              <NavItem key={item.label} item={item} />
            ))}
          </ul>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Search */}
          <div className="relative hidden sm:block">
            <button
              type="button"
              onClick={() => setSearchOpen((v) => !v)}
              aria-label="Tìm kiếm"
              className="flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-brand-50 hover:text-brand-600"
            >
              <Search className="h-5 w-5" />
            </button>
            <div
              className={`absolute right-0 top-full z-50 mt-2 w-72 origin-top-right transition-all duration-200 ${
                searchOpen ? 'visible scale-100 opacity-100' : 'invisible scale-95 opacity-0'
              }`}
            >
              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex items-center gap-2 rounded-2xl border border-brand-100 bg-white p-2 shadow-card-lg"
              >
                <Search className="ml-2 h-4 w-4 shrink-0 text-brand-400" />
                <input
                  ref={searchRef}
                  type="text"
                  placeholder="Tìm bài viết, dịch vụ..."
                  className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-ink-light"
                />
                <button
                  type="submit"
                  className="shrink-0 rounded-xl bg-brand-600 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-brand-700"
                >
                  Tìm
                </button>
              </form>
            </div>
          </div>

          {/* Hotline */}
          <a
            href="tel:0799390790"
            className="hidden items-center gap-2 rounded-full border border-brand-100 px-3.5 py-2 text-sm font-semibold text-brand-700 transition-colors hover:border-gold hover:text-gold-dark md:flex"
          >
            <Phone className="h-4 w-4 text-gold-dark" />
            0799 390 790
          </a>

          {/* CTA gold */}
          <Link
            href="/uu-dai"
            className="hidden items-center gap-2 rounded-full bg-gradient-to-r from-gold to-gold-dark px-5 py-2.5 text-sm font-bold text-white shadow-card transition-all hover:-translate-y-0.5 hover:shadow-card-lg sm:inline-flex"
          >
            <Sparkles className="h-4 w-4" />
            Ưu đãi
          </Link>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Mở menu"
            className="flex h-10 w-10 items-center justify-center rounded-full text-ink hover:bg-brand-50 lg:hidden"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-40 bg-brand-900/50 backdrop-blur-sm transition-opacity lg:hidden ${
          mobileOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={() => setMobileOpen(false)}
      />
      <div
        className={`fixed right-0 top-0 z-50 flex h-full w-[320px] max-w-[85vw] flex-col overflow-y-auto bg-white shadow-2xl transition-transform duration-300 lg:hidden ${
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-brand-100 p-5">
          <span className="font-heading text-lg font-bold text-brand-800">Hi Medical</span>
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            aria-label="Đóng menu"
            className="flex h-9 w-9 items-center justify-center rounded-full text-ink hover:bg-brand-50"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="flex-1 p-4">
          <Link
            href="/"
            onClick={() => setMobileOpen(false)}
            className="block rounded-xl px-4 py-3 text-[15px] font-semibold text-brand-700 hover:bg-brand-50"
          >
            Trang chủ
          </Link>
          {MENU.map((item) => (
            <div key={item.label} className="mt-1">
              <div className="flex items-center justify-between rounded-xl px-4 py-3">
                <Link
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-[15px] font-semibold text-ink hover:text-brand-600"
                >
                  {item.label}
                </Link>
                {item.children && (
                  <button
                    type="button"
                    onClick={() => setMobileSub((s) => ({ ...s, [item.label]: !s[item.label] }))}
                    aria-label={`Mở mục ${item.label}`}
                    className="flex h-8 w-8 items-center justify-center rounded-full text-brand-400 hover:bg-brand-50"
                  >
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${mobileSub[item.label] ? 'rotate-180' : ''}`}
                    />
                  </button>
                )}
              </div>
              {item.children && mobileSub[item.label] && (
                <div className="ml-4 border-l-2 border-brand-100 pl-3">
                  {item.children.map((c) => (
                    <Link
                      key={c.href}
                      href={c.href}
                      onClick={() => setMobileOpen(false)}
                      className="block rounded-lg px-4 py-2.5 text-sm text-ink-light hover:bg-brand-50 hover:text-brand-600"
                    >
                      {c.label.length > 40 ? <MarqueeText text={c.label} /> : c.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
        <div className="border-t border-brand-100 p-5">
          <Link
            href="/uu-dai"
            onClick={() => setMobileOpen(false)}
            className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold to-gold-dark px-5 py-3 text-sm font-bold text-white"
          >
            <Sparkles className="h-4 w-4" />
            Ưu đãi hấp dẫn
          </Link>
          <a
            href="tel:0799390790"
            className="mt-3 flex items-center justify-center gap-2 rounded-full border border-brand-100 px-5 py-3 text-sm font-semibold text-brand-700"
          >
            <Phone className="h-4 w-4 text-gold-dark" />
            0799 390 790
          </a>
        </div>
      </div>
    </header>
  );
}

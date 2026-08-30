'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useFlip } from './FlipProvider';

/**
 * Navbar Midnight Luxury Spa
 * - Transparent khi ở đầu trang (trên hero)
 * - Sticky + background #171D35 + blur nhẹ khi scroll
 * - Mobile: hamburger drawer
 */
const NAV_LINKS = [
  { href: '/#home', label: 'Trang chủ' },
  { href: '/#treatments', label: 'Dịch vụ' },
  { href: '/#about', label: 'Giới thiệu' },
  { href: '/#experience', label: 'Trải nghiệm' },
  { href: '/journal', label: 'Bài viết' },
  { href: '/#contact', label: 'Liên hệ' },
];

/** Các dịch vụ con — hiện trong dropdown “Dịch vụ” */
const SERVICE_LINKS = [
  { name: 'Triệt lông công nghệ cao', en: 'SMART OPT IDPL DELUXE', href: '/dich-vu/triet-long-cong-nghe-cao' },
  { name: 'Hỗ trợ cải thiện các vấn đề da', en: 'Acne & Pigmentation', href: '/dich-vu/dieu-tri-da-chuyen-sau' },
  { name: 'Chăm sóc da', en: 'Luxury Skincare', href: '/dich-vu/cham-soc-da' },
  { name: 'Trẻ hóa & nâng cơ', en: 'Rejuvenation', href: '/dich-vu/tre-hoa-nang-co' },
  { name: 'Dưỡng sinh thảo dược', en: 'Massage', href: '/dich-vu/massage-thu-gian' },
  { name: 'Combo ưu đãi', en: 'Best Value', href: '/dich-vu/combo-uu-dai', special: true },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = usePathname();
  const { flipTo } = useFlip();

  /**
   * Flip page: nếu đang ở trang chủ và link là anchor (/#section) →
   * chặn scroll mặc định, lật trang rồi cuộn tới section.
   * Link route khác (/journal, /dich-vu/...) → điều hướng bình thường.
   */
  const handleNavClick = (e: React.MouseEvent, href: string) => {
    if (href.startsWith('/#') && pathname === '/') {
      e.preventDefault();
      flipTo('#' + href.slice(2));
    }
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Khóa scroll khi mở drawer mobile
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[100] transition-all duration-500 ${
        scrolled
          ? 'border-b border-luxury bg-night/95 py-3 shadow-glow'
          : 'border-b border-white/10 bg-white/30 py-6'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8">
        {/* Logo */}
        <Link
          href="/#home"
          onClick={(e) => handleNavClick(e, '/#home')}
          className="group flex items-center gap-3"
        >
          <img
            src="/logo.png"
            alt="Hi Medical"
            className="h-24 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
          <span className="leading-tight">
            <span className="block font-heading text-xl font-semibold tracking-wide text-ink">
              Hi Medical
            </span>
            <span className="block text-[10px] font-bold uppercase tracking-[0.3em] text-gold">
              Skincare &amp; Beauty
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) =>
            link.label === 'Dịch vụ' ? (
              /* Dropdown Dịch vụ — hover hiện danh sách */
              <div key={link.label} className="group relative">
                <Link
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="flex items-center gap-1.5 text-sm font-bold text-ink drop-shadow-[0_1px_2px_rgba(255,255,255,0.85)] transition-colors duration-300 hover:text-rose-deep"
                >
                  {link.label}
                  <ChevronDown className="h-4 w-4 transition-transform duration-300 group-hover:rotate-180" />
                </Link>

                {/* Panel dropdown */}
                <div className="invisible absolute left-1/2 top-full -translate-x-1/2 pt-5 opacity-0 transition-all duration-300 group-hover:visible group-hover:opacity-100">
                  <div className="w-[300px] overflow-hidden rounded-2xl border border-luxury bg-white/95 shadow-glow backdrop-blur-md">
                    <div className="p-2.5">
                      {SERVICE_LINKS.map((sv) => (
                        <Link
                          key={sv.name}
                          href={sv.href}
                          className={`flex items-center justify-between gap-3 rounded-xl px-4 py-3 transition-colors duration-200 ${
                            sv.special ? 'bg-gold/10 hover:bg-gold/20' : 'hover:bg-rose/10'
                          }`}
                        >
                          <span
                            className={`text-sm font-semibold ${
                              sv.special ? 'text-[#8A6D1F]' : 'text-ink'
                            }`}
                          >
                            {sv.name}
                          </span>
                          {sv.special ? (
                            <span className="rounded-full bg-gold px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#302642]">
                              Ưu đãi
                            </span>
                          ) : (
                            <span className="text-[11px] italic text-lavender">{sv.en}</span>
                          )}
                        </Link>
                      ))}
                    </div>
                    <div className="border-t border-luxury/60 p-2.5">
                      <Link
                        href="/dich-vu"
                        className="flex items-center justify-center gap-1 rounded-xl px-4 py-2.5 text-xs font-bold uppercase tracking-[0.15em] text-rose-deep transition-colors hover:bg-rose/10"
                      >
                        Xem tất cả dịch vụ <span aria-hidden>→</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm font-bold text-ink drop-shadow-[0_1px_2px_rgba(255,255,255,0.85)] transition-colors duration-300 hover:text-rose-deep"
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        {/* CTA + hamburger */}
        <div className="flex items-center gap-4">
          <Link
            href="/#contact"
            onClick={(e) => handleNavClick(e, '/#contact')}
            className="hidden rounded-full border-2 border-rose bg-white/30 px-6 py-2.5 text-xs font-extrabold uppercase tracking-[0.18em] text-rose-deep backdrop-blur-sm transition-all duration-300 hover:bg-rose hover:text-white sm:inline-flex"
          >
            Đặt lịch hẹn
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Mở menu"
            aria-expanded={open}
            className="relative z-[60] flex h-10 w-10 items-center justify-center rounded-full border border-luxury bg-white/30 text-ink backdrop-blur-sm lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-50 bg-night transition-all duration-500 lg:hidden ${
          open ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        <nav className="flex flex-col gap-1 px-8 pt-10">
          {NAV_LINKS.map((link, i) =>
            link.label === 'Dịch vụ' ? (
              /* Dịch vụ — accordion mobile */
              <div key={link.label} className="border-b border-luxury/40">
                <button
                  type="button"
                  onClick={() => setServicesOpen((v) => !v)}
                  aria-expanded={servicesOpen}
                  className="flex w-full items-center justify-between py-4 font-heading text-2xl text-ink transition-colors hover:text-rose-deep"
                  style={{ transitionDelay: `${i * 30}ms` }}
                >
                  Dịch vụ
                  <ChevronDown
                    className={`h-5 w-5 text-lavender transition-transform duration-300 ${
                      servicesOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    servicesOpen ? 'max-h-[420px]' : 'max-h-0'
                  }`}
                >
                  <div className="flex flex-col gap-0.5 pb-4 pl-4">
                    {SERVICE_LINKS.map((sv) => (
                      <Link
                        key={sv.name}
                        href={sv.href}
                        onClick={() => setOpen(false)}
                        className={`flex items-center justify-between gap-3 py-2.5 text-base transition-colors ${
                          sv.special ? 'font-semibold text-[#8A6D1F]' : 'text-ink-light hover:text-rose-deep'
                        }`}
                      >
                        <span>{sv.name}</span>
                        {sv.special && (
                          <span className="rounded-full bg-gold px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#302642]">
                            Ưu đãi
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  handleNavClick(e, link.href);
                  setOpen(false);
                }}
                className="border-b border-luxury/40 py-4 font-heading text-2xl text-ink transition-colors hover:text-rose-deep"
                style={{ transitionDelay: `${i * 30}ms` }}
              >
                {link.label}
              </Link>
            )
          )}
          <Link
            href="/#contact"
            onClick={(e) => {
              handleNavClick(e, '/#contact');
              setOpen(false);
            }}
            className="mt-8 inline-flex items-center justify-center rounded-full bg-rose px-8 py-4 text-sm font-bold uppercase tracking-[0.18em] text-white"
          >
            Đặt lịch hẹn
          </Link>
        </nav>
      </div>
    </header>
  );
}

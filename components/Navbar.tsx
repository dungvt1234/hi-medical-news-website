'use client';

import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

/**
 * Navbar Midnight Luxury Spa
 * - Transparent khi ở đầu trang (trên hero)
 * - Sticky + background #171D35 + blur nhẹ khi scroll
 * - Mobile: hamburger drawer
 */
const NAV_LINKS = [
  { href: '#home', label: 'Home' },
  { href: '#treatments', label: 'Treatments' },
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '/journal', label: 'Journal' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

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
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
        scrolled
          ? 'border-b border-luxury bg-night/90 py-3 shadow-glow backdrop-blur-md'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8">
        {/* Logo */}
        <a href="#home" className="group flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-luxury bg-night/40 font-heading text-lg italic text-rose-deep transition-colors group-hover:border-rose/50">
            H
          </span>
          <span className="leading-tight">
            <span className="block font-heading text-xl font-semibold tracking-wide text-ink">
              Hi Medical
            </span>
            <span className="block text-[10px] font-medium uppercase tracking-[0.3em] text-lavender">
              Midnight Spa
            </span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-ink-light transition-colors duration-300 hover:text-rose-deep"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA + hamburger */}
        <div className="flex items-center gap-4">
          <a
            href="#contact"
            className="hidden rounded-full border border-rose/60 px-6 py-2.5 text-xs font-bold uppercase tracking-[0.18em] text-rose-deep transition-all duration-300 hover:bg-rose hover:text-[#3B3157] sm:inline-flex"
          >
            Book an Appointment
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Mở menu"
            aria-expanded={open}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-luxury text-ink lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-x-0 top-[64px] bottom-0 z-30 bg-night/95 backdrop-blur-lg transition-all duration-500 lg:hidden ${
          open ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        <nav className="flex flex-col gap-1 px-8 pt-10">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              className="border-b border-luxury/40 py-4 font-heading text-2xl text-ink transition-colors hover:text-rose-deep"
              style={{ transitionDelay: `${i * 30}ms` }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-8 inline-flex items-center justify-center rounded-full bg-rose px-8 py-4 text-sm font-bold uppercase tracking-[0.18em] text-[#3B3157]"
          >
            Book an Appointment
          </a>
        </nav>
      </div>
    </header>
  );
}

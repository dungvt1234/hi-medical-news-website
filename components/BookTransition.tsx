'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { usePathname, useRouter } from 'next/navigation';

/**
 * BookTransition — hiệu ứng chuyển trang kiểu mở/lật sách 3D
 *
 * Cơ chế:
 * 1. Bắt click trên mọi link nội bộ (capture phase) → chặn navigation mặc định
 * 2. Chạy phase "closing" (trang cũ khép thành bìa sách) ~450ms
 * 3. Thực hiện router.push / scroll tới section
 * 4. Chạy phase "opening" (sách mở ra, lộ trang mới) ~550ms
 * 5. Trả về idle — người dùng tương tác bình thường
 *
 * Accessibility: prefers-reduced-motion → bỏ qua animation, navigation mặc định.
 * Mobile: giảm duration + độ lật qua CSS media query.
 */

const CLOSE_MS = 460; // thời gian đóng sách (ms)
const OPEN_MS = 560; // thời gian mở sách (ms)
const PAGE_ROTATION = 172; // độ lật tối đa (deg)

type Phase = 'idle' | 'closing' | 'opening';

export default function BookTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const [phase, setPhase] = useState<Phase>('idle');
  const busyRef = useRef(false);
  const pendingHashRef = useRef<string | null>(null);
  const prevPathRef = useRef<string | null>(null);

  const prefersReducedMotion = useCallback(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  const scrollToHash = useCallback((hash: string) => {
    const id = hash.replace(/^#/, '');
    if (!id) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    // Chờ DOM render xong rồi scroll
    requestAnimationFrame(() => {
      const el = document.getElementById(id);
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 80; // trừ chiều cao navbar
        window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
      }
    });
  }, []);

  const finishOpening = useCallback(() => {
    setPhase('idle');
    busyRef.current = false;
    if (pendingHashRef.current) {
      const hash = pendingHashRef.current;
      pendingHashRef.current = null;
      // Đợi 1 frame để nội dung mới render xong
      requestAnimationFrame(() => scrollToHash(hash));
    }
  }, [scrollToHash]);

  /** Chạy animation mở sách khi route đã đổi (từ click, back/forward) */
  const runOpening = useCallback(() => {
    setPhase('opening');
    window.setTimeout(finishOpening, OPEN_MS);
  }, [finishOpening]);

  /** Chạy toàn bộ chuỗi: close → navigate → open */
  const runTransition = useCallback(
    (href: string, samePage: boolean, hash: string | null) => {
      if (busyRef.current) return;
      busyRef.current = true;
      pendingHashRef.current = hash;

      // 1. Đóng sách
      setPhase('closing');
      window.setTimeout(() => {
        if (samePage) {
          // Cùng trang → scroll tới section (sách đang che màn hình nên không thấy nhảy)
          if (hash) scrollToHash(hash);
          pendingHashRef.current = null;
          runOpening();
        } else {
          // Khác trang → navigate
          router.push(href);
          // pathname sẽ đổi → useEffect bên dưới gọi runOpening
        }
      }, CLOSE_MS);
    },
    [router, runOpening, scrollToHash]
  );

  /** Intercept click trên mọi link nội bộ */
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (prefersReducedMotion()) return; // accessibility: để trình duyệt xử lý bình thường
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
        return; // click chuột phải / ctrl+click / cmd+click → giữ hành vi mặc định
      }
      const anchor = (e.target as Element).closest('a');
      if (!anchor) return;
      const href = anchor.getAttribute('href') || '';
      if (anchor.target === '_blank') return;
      if (href.startsWith('tel:') || href.startsWith('mailto:') || href.startsWith('http') || href.startsWith('//')) {
        return; // external / tel / mailto → mặc định
      }
      if (!href.startsWith('/') && !href.startsWith('#')) return;
      if (busyRef.current) {
        e.preventDefault();
        e.stopPropagation();
        return; // đang chạy animation → chặn click lồng nhau
      }

      const [pathPart, hash] = href.split('#');
      // pathname hiện tại của Next (không có hash)
      const curPath = window.location.pathname || '/';
      const targetPath = pathPart.startsWith('/') ? pathPart : pathPart || '/';
      const samePage = curPath === targetPath || curPath.replace(/\/$/, '') === targetPath.replace(/\/$/, '');

      e.preventDefault();
      e.stopPropagation();

      // Thông báo cho Navbar (đóng mobile drawer nếu đang mở)
      window.dispatchEvent(new CustomEvent('book-transition-start'));

      runTransition(href, samePage, hash || null);
    };

    // capture phase: chạy trước handler của Next Link
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, [prefersReducedMotion, runTransition]);

  /** Khi pathname thay đổi do router.push hoặc back/forward */
  useEffect(() => {
    if (prevPathRef.current === null) {
      prevPathRef.current = pathname;
      return; // lần mount đầu — không animation
    }
    const changed = prevPathRef.current !== pathname;
    prevPathRef.current = pathname;
    if (!changed) return;

    if (busyRef.current) {
      // Đang trong luồng close→navigate→open: tiếp tục mở sách
      runOpening();
    } else {
      // Back/forward của trình duyệt: chạy hiệu ứng mở sách cho mượt
      window.dispatchEvent(new CustomEvent('book-transition-start'));
      runOpening();
    }
  }, [pathname, runOpening]);

  // Animation quá lâu (route không đổi do lỗi) → tự thoát
  useEffect(() => {
    if (phase !== 'closing') return;
    const t = window.setTimeout(() => {
      if (busyRef.current) {
        busyRef.current = false;
        setPhase('idle');
      }
    }, CLOSE_MS + 1500);
    return () => window.clearTimeout(t);
  }, [phase]);

  return (
    <div
      aria-hidden="true"
      className={`book-transition ${phase === 'idle' ? '' : 'active'} ${phase}`}
      style={
        {
          '--bt-rotation': `${PAGE_ROTATION}deg`,
        } as React.CSSProperties
      }
    >
      <div className="bt-stage">
        {/* Trang sách bên trái (gáy ở mép phải của nó = giữa màn hình) */}
        <div className="bt-page bt-left">
          <div className="bt-face bt-front" />
          <div className="bt-face bt-back" />
        </div>
        {/* Trang sách bên phải (gáy ở mép trái của nó = giữa màn hình) */}
        <div className="bt-page bt-right">
          <div className="bt-face bt-front" />
          <div className="bt-face bt-back" />
        </div>
        {/* Gáy sách — đường shadow trung tâm tăng cảm giác 3D */}
        <div className="bt-spine" />
      </div>
      {/* Vignette mờ quanh mép khi đang chuyển */}
      <div className="bt-vignette" />
    </div>
  );
}

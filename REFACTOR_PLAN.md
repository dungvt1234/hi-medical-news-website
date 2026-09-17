# KẾ HOẠCH REFACTOR — hi-medical-news-website
> Audit 17/09/2026 · Chỉ kế hoạch, chưa sửa code · P0 = làm trước, P2 = làm sau

## NHÓM 1 — DỌN RÁC & HIỆU NĂNG (làm trước, dễ, hiệu quả ngay)

| # | Việc | Mức | Công |
|---|---|---|---|
| 1 | Xóa `public/videos/clip-tmp.bin` 30MB còn sót sau lần tải clip | P0 | 5 phút |
| 2 | Nén `hero-spa.mp4` 13.8MB → 720p <3MB + bản `.webm`; poster sang WebP | P0 | 1 buổi |
| 3 | Nén `logo.png` 669KB + `moon.png` 688KB → WebP <100KB (logo cân nhắc SVG) | P0 | 1 buổi |
| 4 | Xóa file backup `*-20260829.*` + `logo-original.jpg` trong `public/` | P1 | 10 phút |
| 5 | Chuyển 100% `<img>` → `next/image` (ưu tiên Hero/LCP + covers), thêm `sizes` | P1 | 1–2 buổi |
| 6 | Fonts: `<link>` Google → `next/font/google` self-host + subset `vietnamese` | P1 | 1 buổi |
| 7 | Xóa CSS chết (`.line-clamp-2`, `.luxury-border`), gom 3 hệ marquee thành 1 | P2 | 1 buổi |

## NHÓM 2 — KIẾN TRÚC CODE (chống lỗi ngầm)

| # | Việc | Mức | Công |
|---|---|---|---|
| 8 | Reveal SplitText còn ở 6 heading tiếng Việt (Introduction, Gallery, CTA…) — vỡ dấu như Treatments đã từng. Đổi sang fade-up CSS hoặc split theo từ | P0 | 1 buổi |
| 9 | `require('gsap/SplitText')` + `ref as never` trong Reveal → import ESM + `registerPlugin` đúng chuẩn | P0 | 1 buổi |
| 10 | Gom logic `.reveal` + IntersectionObserver lặp 5 components thành `hooks/useReveal.ts` | P1 | 1 buổi |
| 11 | Tách `Chatbot.tsx` (~421 dòng): data FAQ → `lib/`, UI panel/bubble thành component con; sửa `div role=button` lồng button | P1 | 1–2 buổi |
| 12 | TreatmentsDeck/Gallery dùng `<article>/<figure role=link/button>` → `<Link>` thật; `key={index}` → `key={slug/id}` | P1 | 1 buổi |
| 13 | `'use client'` thừa (Marquee, Treatments wrapper…) → server component; tách `JournalFilter.client.tsx` để page server giữ metadata | P1 | 1 buổi |
| 14 | Iframe Drive thêm `loading="lazy"` + `sandbox`; slug cũ đã đổi (phun-may, han-quoc…) thêm redirect 301 trong `next.config.mjs` | P2 | 1 buổi |
| 15 | Thêm `not-found.tsx`, `loading.tsx`, favicon, `export const viewport`, OG image 1200×630, FAQPage schema | P2 | 1 buổi |
| 16 | Xác nhận redirect www → non-www trên Vercel + GSC property mới đã submit sitemap | P1 | 15 phút (anh làm) |

## NHÓM 3 — NỘI DUNG SEO (cần thông tin từ anh)

| # | Việc | Mức | Công |
|---|---|---|---|
| 17 | Bài chống lão hoá 150 từ → 800+ từ (HIFU/skin booster/giá) | P0 | cần dàn ý từ anh |
| 18 | Bài ưu đãi T8/2026 hết hạn → viết lại theo tháng hiện tại; sửa chatbot còn rao “combo 168K” | P0 | 1 buổi + giá mới |
| 19 | 6 trang dịch vụ dùng chung 1 quy trình 4 bước → viết riêng từng dịch vụ + mở bài 40–60 từ + bảng giá + FAQ (theo SEO_KEYWORDS.md) | P0 | cần BẢNG GIÁ THẬT |
| 20 | H1 trang chủ tiếng Anh thơ → giữ thiết kế nhưng thêm keyword (VD giữ “Moonlight…” + sub-headline tiếng Việt có “spa Vũng Tàu”) | P0 | quyết cùng anh |
| 21 | Feedback mới 2 cái, chưa ảnh thật → anh gửi ảnh/review để gắn | P1 | chờ anh gửi |

## NHÓM 4 — UX (rủi ro đã thấy)

| # | Việc | Mức | Công |
|---|---|---|---|
| 22 | Deck Treatments section cao ~376vh, nặng GPU mobile, dễ hijack vuốt dọc → giảm VH_PER_CARD mobile, tăng ngưỡng drag, thêm nút “bỏ qua” | P0 | 1 buổi |
| 23 | Form newsletter Footer bấm “Gửi” không làm gì → hoặc nối lưu email thật, hoặc bỏ form | P1 | 1 buổi |
| 24 | Nút chat hiện 2 chỗ (bubble Chatbot + cụm Floating) → thống nhất 1 | P2 | nửa buổi |

## THỨ TỰ ĐỀ XUẤT
Đợt 1 (tôi tự làm, không cần anh): 1 → 4 → 16 → 8 → 9 → 22
Đợt 2 (cần anh): 19 + 17 + 18 + 21 (bảng giá, giá mới, ảnh/review)
Đợt 3 (hoàn thiện): còn lại

# PROJECT STATUS — Hi Medical Spa Website (hi-medical-news)

> Lưu lúc: 2026-08-23 15:06 UTC (chuẩn bị session mới)
> Session cũ: agent:analysis:main — 10h42m, context 87k/131k (67%), model deepseek/deepseek-reasoner

---

## 📋 THÔNG TIN CHUNG

| Mục | Giá trị |
|---|---|
| **Repo** | `/home/dell/.openclaw/workspace/hi-medical-news` |
| **Git remote** | `github.com:dungvt1234/hi-medical-news-website.git` (branch `main`) |
| **Production** | https://hi-medical-news-website.vercel.app (deploy tự động qua GitHub integration) |
| **Dev server** | port **3101** — `nohup npm start -- -p 3101` (LƯU Ý: dùng `npm start -- -p 3101`, KHÔNG phải `next start 3101`) |
| **Tech stack** | Next.js 14 App Router + Tailwind + lucide-react + **GSAP 3.15** (SplitText + ScrollTrigger) |
| **HEAD commit** | `3af5044` (feat: Level 2 motion graphics) |

---

## 🎨 BRAND — "HI MEDICAL — Medical Luxury – Lavender Glow" (palette chính thức)

| Tên | Hex | Vai trò |
|---|---|---|
| Violet | `#8B5FC7` | CTA / footer bg / điểm nhấn mạnh |
| Lavender | `#A982D8` | trung gian gradient |
| Soft Lavender | `#D8C8F0` | nền section phụ |
| Lavender White | `#F5F1FA` | nền chính (body) |
| White | `#FFFFFF` | card / nền sạch |
| Champagne Gold | `#E8C95A` | CTA phụ / accent premium (hover: `#F3D97A`) |
| Deep Purple | `#302642` | text chính (ink) |

- **Background gradient**: `#F5F1FA → #D8C8F0 → #A982D8 → #8B5FC7`
- **Tỷ lệ**: 60% trắng/lavender-white · 25% lavender · 10% violet · 5% champagne gold
- **Định hướng**: medical luxury, clean, premium, tránh neon / violet-blue
- **Fonts**: Cormorant Garamond (heading, font-heading) + Manrope (body) — load trong `app/layout.tsx`

---

## 📄 CẤU TRÚC TRANG (11 section)

```
Navbar → Hero (ảnh lavender + overlay) → Marquee (mới) → Introduction → Treatments
→ SpaExperience (parallax) → WhyUs → RitualProcess → Testimonial → Gallery (parallax)
→ CTASection → Footer (ảnh lavender + overlay) → FloatingWidgets (fixed)
```

Journal cũ giữ ở route `/journal` (bài viết tin tức — code cũ giữ nguyên, hero đổi lavender glow).

**Files components** (trong `components/`):
- `Navbar.tsx` — sticky, bg-night/90 + blur khi scroll, brand "Hi Medical / Lavender Glow Spa", CTA white
- `Hero.tsx` — ảnh lavender field (photo-1500530855697) + overlay gradient (chi tiết bên dưới)
- `Marquee.tsx` — **MỚI**: dải chữ chạy vô tận "Lavender Glow Spa ✦ Premium Skincare ✦..." (CSS keyframes, fade edges, motion-reduce safe)
- `Reveal.tsx` — **MỚI**: GSAP SplitText heading reveal (chars flip 3D khi scroll)
- `Introduction.tsx` — bg-cream (#D8C8F0), editorial layout, CTA "Discover Our Rituals" bg-rose
- `Treatments.tsx` — 4 cards dịch vụ, bg-night-2, hover lift, price rose-deep
- `SpaExperience.tsx` — cinematic parallax (ảnh photo-1608248543803, translateY -0.08*offset scale 1.08), overlay #2C2447/70, heading "beyond beauty." gold
- `WhyUs.tsx` — 4 stats, divider gold
- `RitualProcess.tsx` — timeline 4 bước (ngang desktop / dọc mobile), badge tròn bg-rose
- `Testimonial.tsx` — quote "Minh Anh", gold accent
- `Gallery.tsx` — masonry 6 ảnh + **parallax ScrollTrigger scrub** (yPercent -8→8)
- `CTASection.tsx` — dark bg lavender radial glows, "Your time to restore.", CTA tel:0799390790 + zalo.me/0799390790
- `Footer.tsx` — ảnh lavender close-up (photo-1465146344425) + overlay gradient, CTA gold, 3 social icons
- `FloatingWidgets.tsx` — Zalo #0068ff, Messenger gradient #00b2ff→#006aff, Hotline, journal card — **QUAN TRỌNG cho conversion, giữ nguyên**

---

## 🎬 MOTION GRAPHICS (Level 2 — commit 3af5044)

### Đã áp dụng
1. **Marquee** (`components/Marquee.tsx`): chữ chạy ngang vô tận, đặt sau Hero trong `app/page.tsx`
2. **Split-text 3D reveal** (`components/Reveal.tsx`): heading hiện từng chữ cái (yPercent 110 + rotateX -60 → 0, stagger 0.018, power4.out, ScrollTrigger once start 'top 88%') — áp dụng 7 heading: Introduction, Treatments, SpaExperience, WhyUs, RitualProcess, Gallery, CTASection
3. **Gallery parallax**: ScrollTrigger scrub yPercent -8 → 8 trên 6 ảnh

### Kỹ thuật quan trọng (bug đã fix + lưu ý)
- **BUG đã fix**: React `style={{opacity:0}}` trên h2 + GSAP chỉ animate chars (children) → parent opacity 0 làm chữ vô hình VĨNH VIỄN. Fix: bỏ style opacity trên Tag, dùng `gsap.set(split.chars, {yPercent:110, opacity:0, rotateX:-60})` ngay khi mount để ẩn chars (tránh flash)
- **Dùng `gsap.context()`** trong cleanup (ctx.revert()) — KHÔNG dùng `ScrollTrigger.getAll().forEach(kill)` vì sẽ kill trigger của component khác
- **SplitText 3.15** tạo `div.word` (inline-block) > `div.char` (không có class `.char`!) — query DOM phải lọc `div` không có children, không tìm `.char`
- **prefers-reduced-motion**: mọi animation check `window.matchMedia('(prefers-reduced-motion: reduce)')` → hiện thẳng (máy anh Dung đang bật reduce — Windows Animation OFF)
- GSAP đã cài trong package.json (`gsap@3.15.0`)

---

## 🖼️ HERO & FOOTER — ảnh nền + overlay gradient (kiểu anh yêu cầu)

### Hero (`components/Hero.tsx`, commit 08e7044)
- Ảnh: Unsplash lavender field `photo-1500530855697-b586d89ba3ee` (w=2000)
- Overlay: `linear-gradient(105deg, rgba(48,38,66,0.72) 0%, rgba(139,95,199,0.55) 38%, rgba(169,130,216,0.35) 65%, rgba(216,200,240,0.25) 100%)`
- Chữ trắng, "glow." gold, CTA phụ glassmorphism (bg-white/10 blur + border-white/50, hover gold), badge "Since 2016" gold trên night/50

### Footer (`components/Footer.tsx`, commit c340c7d)
- Ảnh: Unsplash lavender close-up `photo-1465146344425-f00d5f5c8f07` (khác hero)
- Overlay: `linear-gradient(to top, rgba(48,38,66,0.92) 0%, rgba(139,95,199,0.78) 45%, rgba(169,130,216,0.60) 100%)` — đậm hơn hero vì nhiều chữ
- Content bọc `relative z-10`, giữ CTA gold + glass cards

---

## ✅ TRẠNG THÁI: DONE / PENDING

### ✅ Đã xong (hôm nay 2026-08-23)
- [x] Lavender Glow palette toàn trang (commit 44a71ee)
- [x] Hero ảnh + overlay gradient (08e7044)
- [x] Footer ảnh + overlay gradient (c340c7d)
- [x] Level 2 motion graphics: marquee + split text + parallax (3af5044)
- [x] Build PASS, responsive desktop 1440 + mobile 390 không overflow

### ⏳ PENDING (chưa làm — anh chưa yêu cầu)
- [ ] `app/layout.tsx` keywords vẫn chứa "midnight luxury spa" (stale brand string — cần đổi thành lavender glow)
- [ ] Route `/dich-vu` vẫn 404 (chưa có trang dịch vụ riêng)
- [ ] Chưa có article detail page (chỉ có /journal list)
- [ ] Journal page có thể còn sót màu pastel cũ (#C9B7EA, #3B3157) — cần rà lại
- [ ] (Fairy Luxury — repo khác) pending: tên sản phẩm trùng (Kẹp tóc ×5, Khăn lụa ×8), thiếu product id p16

---

## 🧪 VERIFY / TEST (chưa có vision model — dùng agent-browser eval)

- **Vision model KHÔNG hoạt động** trên gateway (mọi option trả "Unknown model") → kiểm tra UI bằng agent-browser eval, không xem ảnh
- Test motion: mở http://localhost:3101 → check marquee `getComputedStyle(...).animationName === 'marquee'`, chars ẩn `opacity 0` trước scroll → sau scroll `opacity 1`
- Screenshot full page: `agent-browser screenshot --full file.png` (regular capture chỉ chụp viewport)
- Verify production: `agent-browser open https://hi-medical-news-website.vercel.app/` → eval (marqueeOK, chars, overflow)
- **LƯU Ý**: grep "gsap" trong HTML production KHÔNG thấy (bundle hash tên) — phải verify bằng agent-browser, không grep text

---

## 🖥️ CÁC PROJECT KHÁC (context cho session mới)

| Project | Path | Port | Trạng thái |
|---|---|---|---|
| **MÖBEL studio** | `mobel-studio/` | 8092 (PID 70388) + 8093 (PID 71325) | Tunnel `https://insight-bool-proceeds-split.trycloudflare.com` (PID 92125). Pending: `pt-8flex` typo footer, favicon, meta description, prefers-reduced-motion, Level 2 motion graphics (đã bàn, CHƯA làm — hôm nay anh chọn áp vào Hi Medical trước) |
| **Chinese AI platform** | `chinese-ai-platform/` | 8094 (PID 84123) | Tunnel PID 84833. SPEC.md 26 sections, HSK2 demo (CAU_TRUC_DEMO_HSK2.md, ocr_text/ p001-p162, 139MB textbook đã OCR) |
| **goal-tracker** | `goal-tracker/` | 3009 | Flask? PID 74765 |
| **manufacturing-mgmt** | `manufacturing-mgmt/` | 3007 (KHÔNG thấy trong ss — cần check) | Node + Express + SQLite, 3 modules, auth admin/admin123 |
| **Fairy Luxury** | `fairy-luxury-template/` (repo riêng) | — | Deployed fairy-luxury-website.vercel.app, pending duplicate products |

---

## 🔑 GHI NHỚ MÔI TRƯỜNG

- sudo cần password — cài tool vào user dir (`~/.npm-global`, `~/.local`)
- Port 3007 (manufacturing) không thấy trong ss lúc lưu — check lại khi cần
- MÖBEL = port 8092 (trước từng nhầm 8902)
- Context warning rule: cảnh báo anh khi context ≥ 80%
- Screenshot rule: chỉ chụp/gửi khi anh yêu cầu rõ ràng

---

*File này được tạo để handoff session mới — đọc file này đầu tiên khi session mới bắt đầu làm Hi Medical.*

# KẾ HOẠCH SEO + GEO — hi-medical-news.vercel.app
> Lập: 13/09/2026 · Mục tiêu: spa TP.HCM được Google và AI (AI Overviews, ChatGPT, Gemini) tìm thấy + trích dẫn

## 0. NAP CHUẨN (dùng đồng nhất mọi nơi)
- **Địa chỉ:** 49 Nguyễn Bỉnh Khiêm, Phường Vũng Tàu, TP. Hồ Chí Minh
- **Hotline/Zalo:** 0799 390 790 · **Giờ:** 09:00–18:00 (T2–CN)
- **Facebook:** https://www.facebook.com/ChamSocDaVungTau
- Local SEO đánh cụm **Vũng Tàu** (spa Vũng Tàu, triệt lông Vũng Tàu), không đánh Quận 1 nữa.

## 1. HIỆN TRẠNG WEB (audit 13/09/2026)

**Tài sản sẵn có:** 21 trang tĩnh (6 dịch vụ, 9 bài viết, feedback, journal), đúng 1 H1/trang,
phân cấp H1→H2→H3 chuẩn ở trang chi tiết, `lang="vi"`, NAP nhất quán
(0799 390 790 · 09:00–18:00), CTA Zalo/tel mọi trang, hero video đã tối ưu mobile.

**7 lỗ hổng lớn nhất:**
1. Không `sitemap.xml`, `robots.txt`, canonical, Open Graph, JSON-LD.
2. Trang `/journal` là client component → không có title/description.
3. H1 trang chủ tiếng Anh thơ (“Moonlight, floral scent…”) — 0 từ khóa.
4. 100% ảnh `<img>` thô, chưa dùng `next/image` (LCP kém).
5. Nội dung mỏng: bài chống lão hoá ~150 từ, bài ưu đãi T8/2026 đã hết hạn,
   quy trình 4 bước copy y nhau ở 6 trang dịch vụ.
6. Journal + bài liên quan dùng `<a href>` thay vì `<Link>` (reload trang).
7. Chỉ 2 review, chưa có ảnh feedback thật; review tự gắn sao trên web mình
   KHÔNG được Google hiện (cấm self-serving review markup).

## 2. INSIGHT KHÁCH SPA (quyết định nội dung)

- Tìm theo công thức **[dịch vụ] + [giá / review / công nghệ / quận]**,
  local-first trên mobile (“spa gần đây”, “triệt lông TPHCM”).
- 4 nỗi sợ: giá ảo + vẽ liệu trình, review seeding ảo, không hiệu quả/tái phát,
  biến chứng (bỏng laser, tăng sắc tố).
- Chốt sale bằng: review thật + ảnh before/after, bác sĩ/chuyên gia đứng tên,
  công nghệ rõ nguồn gốc (FDA), **giá minh bạch trọn gói**, gần nhà + đặt lịch nhanh.
- Xu hướng 2026: skinimalism, trẻ hoá sớm/chủ động (28–35), cá nhân hoá,
  không xâm lấn (HIFU, laser, skin booster), khách nam tăng.

## 3. KẾ HOẠCH THỰC HIỆN

### Giai đoạn 0 — Nền kỹ thuật (làm 1 lần, tôi làm được ngay)
- [ ] `app/sitemap.ts` + `app/robots.ts` (cho phép GPTBot/ClaudeBot/PerplexityBot),
      submit Google Search Console + Bing.
- [ ] `metadataBase` + canonical + Open Graph/Twitter (ảnh 1200×630) toàn site.
- [ ] JSON-LD: `BeautySalon` (địa chỉ, giờ, SĐT, khu vực TP.HCM) +
      `Article` + `FAQPage` + `BreadcrumbList`. KHÔNG markup sao review của chính mình.
- [ ] Sửa H1 trang chủ + title/description theo hướng local + dịch vụ.
- [ ] `/journal` có metadata (tách server/client), `<a>` → `<Link>`, alt ảnh có nghĩa.
- [ ] `llms.txt` giới thiệu spa cho bot AI.

### Giai đoạn 1 — Nội dung money-pages (cần thông tin từ anh)
- [ ] Mỗi trang dịch vụ: mở bài trả lời trực tiếp 40–60 từ
      (là gì + hiệu quả + **giá từ…**), heading dạng câu hỏi, bảng so sánh,
      FAQ 3–5 câu + FAQ schema, ghi “Cập nhật 09/2026”.
- [ ] Mở rộng bài mỏng (chống lão hoá 150 → 800+ từ), thay bài ưu đãi hết hạn.
- [ ] Topical cluster: 3–5 trụ (triệt lông, trị mụn/nám, trẻ hoá, chăm sóc da,
      giá spa) — 1 pillar dài + 10–15 bài long-tail link chéo.
- [ ] Cần anh cung cấp: **bảng giá thật**, tên công nghệ/máy, ảnh thật,
      feedback + before/after (che SĐT khách).

### Giai đoạn 2 — Local (anh làm, tôi hỗ trợ nội dung)
- [ ] Tạo/xác minh Google Business Profile: đúng 1 danh mục chính (Spa),
      tên đúng bảng hiệu, giờ, link đặt lịch, ảnh thật geotag.
- [ ] NAP đồng nhất web = GBP = Facebook. Nhúng Google Map + trang liên hệ rõ quận.
- [ ] Dồn review 5 sao lên **Google** (không phải web mình) — 100 review ảnh thật
      > mọi quảng cáo. Trả lời mọi review < 24h, đăng GBP post 2–3 lần/tuần.

### Giai đoạn 3 — Duy trì (hàng tuần/tháng)
- [ ] 2–3 bài/tuần trong 3–6 tháng đầu, ưu tiên long-tail giao dịch
      (“triệt lông bikini giá bao nhiêu”, “trị nám ở đâu hiệu quả review”).
- [ ] Refresh nội dung theo quý, audit link nội bộ, test prompt
      (“spa trị mụn tốt Vũng Tàu?”) trên ChatGPT/Gemini/Perplexity để check trích dẫn.

## 4. NGUYÊN TẮC GEO (để AI trích dẫn)
Định nghĩa trước 40–60 từ → heading câu hỏi → số liệu cụ thể → bảng/bước/FAQ →
ghi ngày cập nhật + tác giả → nội dung gốc (giá thật, case thật) →
đa nguồn xác nhận (báo chí, Top list, GBP).

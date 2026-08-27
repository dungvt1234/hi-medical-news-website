// ============================================================
// Dữ liệu bài viết mẫu — Trang Tin tức & Sự kiện
// ============================================================

export type Article = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  categoryKey: string;
  image: string;
  date: string;
  dateLabel: string;
  readTime: string;
  featured?: boolean;
};

// Danh mục tabs (khớp với CategoryBar)
export const CATEGORIES = [
  { key: 'all', label: 'Tất cả' },
  { key: 'press', label: 'Báo chí nói về chúng tôi' },
  { key: 'tips', label: 'Bí quyết làm đẹp' },
  { key: 'stories', label: 'Câu chuyện thành công' },
  { key: 'promo', label: 'Chương trình khuyến mãi' },
  { key: 'partner', label: 'Đối tác' },
];

// Ảnh Unsplash đã kiểm tra hoạt động (HTTP 200)
const IMG = {
  spa: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1200&auto=format&fit=crop',
  facial: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?q=80&w=1200&auto=format&fit=crop',
  skincare: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=1200&auto=format&fit=crop',
  candles: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?q=80&w=1200&auto=format&fit=crop',
  massage: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=1200&auto=format&fit=crop',
  laser: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=1200&auto=format&fit=crop',
  salon: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=1200&auto=format&fit=crop',
  cream: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=1200&auto=format&fit=crop',
  flower: 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?q=80&w=1200&auto=format&fit=crop',
};

export const ARTICLES: Article[] = [
  {
    id: 'a1',
    slug: 'triet-long-cong-nghe-cao-diot-laser',
    title:
      'Triệt lông công nghệ cao SMART OPT IDPL DELUXE: giải pháp "sạch lông vĩnh viễn" được chị em tin dùng nhất 2026',
    excerpt:
      'Không còn lo lắng về việc triệt lông đau rát, lông mọc lại nhanh hay kích ứng da — công nghệ SMART OPT IDPL DELUXE tại Hi Medical giúp làm sạch lông an toàn, êm ái, hiệu quả lâu dài chỉ sau một liệu trình chuẩn y khoa.',
    category: 'Bí quyết làm đẹp',
    categoryKey: 'tips',
    image: IMG.laser,
    date: '2026-08-18',
    dateLabel: '18/08/2026',
    readTime: '6 phút đọc',
    featured: true,
  },
  {
    id: 'a2',
    slug: 'phun-may-ombre-tu-nhien',
    title: 'Phun mày ombre tự nhiên — bí quyết khuôn mặt thanh thoát không cần trang điểm',
    excerpt:
      'Kỹ thuật phun mày ombre chuyển màu gradient giúp đôi chân mày mềm mại, tự nhiên như thật. Tìm hiểu vì sao đây là lựa chọn hàng đầu của các nàng bận rộn.',
    category: 'Bí quyết làm đẹp',
    categoryKey: 'tips',
    image: IMG.salon,
    date: '2026-08-15',
    dateLabel: '15/08/2026',
    readTime: '4 phút đọc',
  },
  {
    id: 'a3',
    slug: 'cham-soc-da-mun-o-tuoi-day-thi',
    title: 'Chăm sóc da mụn ở tuổi dậy thì: 5 sai lầm khiến mụn "không bao giờ biến mất"',
    excerpt:
      'Rửa mặt quá nhiều, nặn mụn tại nhà, lạm dụng sản phẩm tẩy da chết… là những sai lầm phổ biến. Chuyên gia da liễu Hi Medical chỉ ra cách điều trị đúng chuẩn.',
    category: 'Bí quyết làm đẹp',
    categoryKey: 'tips',
    image: IMG.facial,
    date: '2026-08-12',
    dateLabel: '12/08/2026',
    readTime: '5 phút đọc',
  },
  {
    id: 'a4',
    slug: 'hanh-trinh-xoa-tan-nam-3-thang',
    title: 'Hành trình xóa nám 3 tháng của chị Thu Hà: "Tôi đã tìm lại làn da trắng sáng sau 10 năm"',
    excerpt:
      'Chị Thu Hà (38 tuổi, TP.HCM) chia sẻ hành trình điều trị nám chân sâu với công nghệ laser hiện đại và phác đồ chuẩn y khoa tại Hi Medical.',
    category: 'Câu chuyện thành công',
    categoryKey: 'stories',
    image: IMG.skincare,
    date: '2026-08-10',
    dateLabel: '10/08/2026',
    readTime: '7 phút đọc',
  },
  {
    id: 'a5',
    slug: 'uu-dai-thang-8-combo-lam-dep',
    title: 'Ưu đãi tháng 8: Combo chăm sóc da + triệt lông chỉ từ 168K — số lượng có hạn',
    excerpt:
      'Chương trình ưu đãi đặc biệt dành riêng cho khách hàng đặt lịch online trong tháng 8. Nhanh tay đăng ký để nhận combo làm đẹp toàn diện với giá cực hấp dẫn.',
    category: 'Chương trình khuyến mãi',
    categoryKey: 'promo',
    image: IMG.cream,
    date: '2026-08-08',
    dateLabel: '08/08/2026',
    readTime: '3 phút đọc',
  },
  {
    id: 'a6',
    slug: 'dieu-tri-tham-quang-duoi-mat',
    title: 'Trị thâm quầng mắt bằng công nghệ IPL: trả lại ánh nhìn tươi trẻ sau 2 liệu trình',
    excerpt:
      'Quầng thâm mắt khiến gương mặt luôn mệt mỏi, già hơn tuổi. Công nghệ IPL bước sóng kép giúp mờ thâm, kích thích collagen, trả lại vùng da mắt sáng khỏe.',
    category: 'Bí quyết làm đẹp',
    categoryKey: 'tips',
    image: IMG.candles,
    date: '2026-08-05',
    dateLabel: '05/08/2026',
    readTime: '5 phút đọc',
  },
  {
    id: 'a7',
    slug: 'tmv-hi-medical-dat-chuan-quoc-te',
    title: 'Hi Medical đạt chuẩn quốc tế ISO 9001:2015 về quy trình thẩm mỹ an toàn',
    excerpt:
      'Sự kiện đánh dấu cột mốc quan trọng trong hành trình nâng cao chất lượng dịch vụ: toàn bộ quy trình thẩm mỹ tại Hi Medical được chứng nhận đạt chuẩn quốc tế.',
    category: 'Báo chí nói về chúng tôi',
    categoryKey: 'press',
    image: IMG.flower,
    date: '2026-08-02',
    dateLabel: '02/08/2026',
    readTime: '4 phút đọc',
  },
  {
    id: 'a8',
    slug: 'hop-tac-cong-nghe-my-pham-han-quoc',
    title: 'Hi Medical ký kết hợp tác độc quyền với hãng mỹ phẩm dược liệu Hàn Quốc',
    excerpt:
      'Thỏa thuận hợp tác mang đến cho khách hàng dòng sản phẩm chăm sóc da chuyên sâu với công nghệ chiết xuất thảo dược tiên tiến từ Hàn Quốc.',
    category: 'Đối tác',
    categoryKey: 'partner',
    image: IMG.massage,
    date: '2026-07-28',
    dateLabel: '28/07/2026',
    readTime: '3 phút đọc',
  },
  {
    id: 'a9',
    slug: 'spa-ngay-cuoi-tuan-thu-gian',
    title: 'Tự thưởng cho bản thân: liệu trình spa cuối tuần giúp cân bằng cả thể chất lẫn tinh thần',
    excerpt:
      'Sau một tuần làm việc căng thẳng, cơ thể cần được phục hồi. Gợi ý liệu trình chăm sóc toàn diện giúp chị em nạp lại năng lượng cho tuần mới.',
    category: 'Bí quyết làm đẹp',
    categoryKey: 'tips',
    image: IMG.spa,
    date: '2026-07-25',
    dateLabel: '25/07/2026',
    readTime: '4 phút đọc',
  },
];

export function getFeatured(articles: Article[] = ARTICLES): Article {
  return articles.find((a) => a.featured) ?? articles[0];
}

export function getSidebar(articles: Article[] = ARTICLES): Article[] {
  return articles.filter((a) => !a.featured);
}

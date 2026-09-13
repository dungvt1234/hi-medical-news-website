// ============================================================
// Dữ liệu đánh giá khách hàng — Trang Feedback
// Thêm review mới: copy 1 object, đổi tên + dịch vụ + nội dung
// ============================================================

export type Feedback = {
  id: string;
  name: string;
  meta: string;
  service: string;
  rating: number;
  content: string;
  dateLabel: string;
  /** Ảnh feedback thật (chụp màn hình/chat/trước-sau) — để trong public/images/feedbacks/ */
  images?: string[];
};

export const FEEDBACKS: Feedback[] = [
  {
    id: 'f1',
    name: 'Minh Anh',
    meta: 'Khách hàng thân thiết · TP. Hồ Chí Minh',
    service: 'Moonlight Facial',
    rating: 5,
    content:
      'Liệu trình Moonlight Facial đã thay đổi hoàn toàn làn da của tôi. Không gian tĩnh lặng, chuyên viên tận tâm — mọi thứ đều hoàn hảo đến từng chi tiết. Đây thực sự là nơi để phụ nữ được chăm sóc trọn vẹn.',
    dateLabel: '2026',
  },
  {
    id: 'f2',
    name: 'Thu Hà',
    meta: '38 tuổi · TP. Hồ Chí Minh',
    service: 'Điều trị nám chuyên sâu',
    rating: 5,
    content:
      'Tôi bị nám 10 năm, thử đủ loại mà không hết. Tại Hi Medical, từng bước điều trị đều được giải thích rõ ràng, không hề có cảm giác bị bán liệu trình mà là được đồng hành thực sự. Sau 3 tháng, nám mờ trên 80%, giờ tôi chỉ cần kem chống nắng là đủ tự tin.',
    dateLabel: '2026',
  },
];

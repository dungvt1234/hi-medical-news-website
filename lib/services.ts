export type SubService = {
  name: string;
  en?: string;
  desc: string;
};

export type Service = {
  slug: string;
  name: string;
  en: string;
  tagline: string;
  desc: string;
  img: string;
  subs: SubService[];
  tech: string[];
  steps: { name: string; desc: string }[];
  benefits: string[];
  special?: boolean;
};

const STEPS = [
  {
    name: 'Thăm khám & tư vấn',
    desc: 'Chuyên viên kiểm tra tình trạng da/cơ thể, tư vấn liệu trình phù hợp.',
  },
  {
    name: 'Làm sạch & chuẩn bị',
    desc: 'Vệ sinh sạch sẽ vùng cần làm, giúp bạn thoải mái và an toàn.',
  },
  {
    name: 'Thực hiện liệu trình',
    desc: 'Kỹ thuật viên có tay nghề thực hiện bằng công nghệ hiện đại, an toàn.',
  },
  {
    name: 'Chăm sóc & dặn dò',
    desc: 'Hướng dẫn chăm sóc tại nhà và hẹn lịch tiếp theo để đạt kết quả tốt.',
  },
];

export const SERVICES: Service[] = [
  {
    slug: 'triet-long-cong-nghe-cao',
    name: 'Triệt lông công nghệ cao',
    en: 'SMART OPT IDPL DELUXE Hair Removal',
    tagline:
      'Nách, tay, chân, mặt, bikini, toàn thân — triệt lông an toàn, êm ái, hiệu quả lâu dài.',
    desc: 'Công nghệ SMART OPT IDPL DELUXE tác động vào chân lông, giúp lông yếu dần và hạn chế mọc lại, không làm hại vùng da xung quanh. Liệu trình được điều chỉnh theo từng vùng da và độ dày của lông.',
    img: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=1200&auto=format&fit=crop',
    subs: [
      { name: 'Triệt lông nách', en: 'Underarm', desc: 'Vùng nhạy cảm, hay ra mồ hôi — làm nhanh, ít đau, không để lại vết thâm.' },
      { name: 'Triệt lông tay', en: 'Arms', desc: 'Cánh tay mịn màng tự nhiên, phù hợp cả nam và nữ.' },
      { name: 'Triệt lông chân', en: 'Legs', desc: 'Nửa chân hoặc toàn chân — loại bỏ lông cứng, da mịn lâu dài.' },
      { name: 'Triệt lông mặt', en: 'Face', desc: 'Ria mép, cằm, má, lông mày — phù hợp nam giới, xử lý vùng lông dày hiệu quả.' },
      { name: 'Triệt lông bikini', en: 'Bikini Line', desc: 'Vùng nhạy cảm nhất — êm ái, riêng tư, an toàn.' },
      { name: 'Triệt lông lưng – ngực – bụng', en: 'Back & Chest', desc: 'Kỹ thuật tỉ mỉ cho vùng da nhạy cảm.' },
      { name: 'Combo triệt lông toàn thân', en: 'Full Body', desc: 'Gói trọn toàn thân với mức ưu đãi hấp dẫn, tiết kiệm thời gian.' },
    ],
    tech: ['SMART OPT IDPL DELUXE', 'IPL'],
    steps: STEPS,
    benefits: [
      'An toàn, không làm hại da',
      'Êm ái, ít đau nhờ công nghệ làm mát',
      'Hiệu quả lâu dài, lông mọc lại thưa và mềm hơn',
      'Không cần nghỉ dưỡng, sinh hoạt bình thường',
      'Phù hợp mọi vùng cơ thể, mọi loại da',
    ],
  },
  {
    slug: 'dieu-tri-da-chuyen-sau',
    name: 'Hỗ trợ cải thiện các vấn đề da',
    en: 'Acne & Pigmentation Treatment',
    tagline:
      'Mụn, nám, thâm, sẹo, quầng thâm mắt — liệu trình an toàn với công nghệ laser & IPL hiện đại.',
    desc: 'Mỗi người có một tình trạng da khác nhau. Sau khi thăm khám, chuyên gia da liễu sẽ tư vấn liệu trình phù hợp, kết hợp công nghệ laser, IPL và mỹ phẩm chuyên dụng để cải thiện rõ rệt các vấn đề về da.',
    img: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?q=80&w=1200&auto=format&fit=crop',
    subs: [
      { name: 'Điều trị mụn', en: 'Acne Treatment', desc: 'Mụn viêm, mụn bọc, mụn đầu đen — liệu trình an toàn, hạn chế mụn quay lại.' },
      { name: 'Điều trị nám & tàn nhang', en: 'Melasma & Pigmentation', desc: 'Nám chân sâu, tàn nhang, đồi mồi — làm mờ rõ rệt sau liệu trình.' },
      { name: 'Điều trị thâm & sẹo', en: 'Dark Spots & Scars', desc: 'Sẹo rỗ, sẹo lồi, thâm mụn — làm da mềm mịn hơn.' },
      { name: 'Trị quầng thâm mắt', en: 'Eye Brightening', desc: 'Công nghệ IPL (ánh sáng xung cường độ cao) — tác động nhẹ nhàng, giúp giảm thâm quầng và làm sáng vùng da quanh mắt.' },
      { name: 'Điều trị da dầu & lỗ chân lông to', en: 'Oily Skin & Pores', desc: 'Giảm nhờn, se nhỏ lỗ chân lông, da thông thoáng hơn.' },
    ],
    tech: ['Laser', 'IPL', 'Peel hóa học', 'Lăn kim (Microneedling)'],
    steps: STEPS,
    benefits: [
      'Liệu trình được thiết kế theo từng loại da',
      'Thăm khám bởi chuyên gia da liễu',
      'Công nghệ laser & IPL hiện đại',
      'Kết quả rõ rệt, an toàn lâu dài',
      'Theo dõi và điều chỉnh qua từng buổi',
    ],
  },
  {
    slug: 'cham-soc-da',
    name: 'Chăm sóc da',
    en: 'Luxury Skincare',
    tagline:
      'Làm sạch sâu, dưỡng ẩm phục hồi, đắp mặt nạ và chăm sóc da toàn thân.',
    desc: 'Chăm sóc da đều đặn giúp da khỏe hơn và tinh thần thoải mái hơn. Hi Medical mang đến quy trình chăm sóc da thư giãn với mỹ phẩm chuyên dụng và kỹ thuật viên có tay nghề.',
    img: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=1200&auto=format&fit=crop',
    subs: [
      { name: 'CHĂM SÓC DA CHUẨN HÀN', en: 'Basic Facial', desc: 'Căng bóng mướt mịn' },
      { name: 'NGẬM TRẮNG HOÀN HẢO', en: 'Body Care', desc: 'WHITENING COMPLEX' },
      { name: 'SUPER DETOX SKIN', en: 'Deep Cleansing', desc: 'Cho da mụn, da dầu, lỗ chân lông to — làm sạch tận sâu.' },
      { name: 'HỒI SINH DA', en: 'Hydration Therapy', desc: 'NHIỄM ĐỘC - DỊ ỨNG' },
      { name: 'TRỊ MỤN CÔNG NGHỆ CAO', desc: 'Mụn viêm, mụn bọc, mụn đầu đen — công nghệ hiện đại, hạn chế mụn quay lại.' },
      { name: 'CẤP ẨM ĐA TẦNG', desc: 'Cấp ẩm sâu từ nhiều lớp — da căng mọng, mềm mại.' },
      { name: 'LUXURY GOLD THERAPY', en: 'Luxury Mask', desc: 'Dát vàng 24K chăm sóc nâng cơ' },
      { name: 'TÁI SINH DA HÀN QUỐC', desc: 'Tái sinh làn da theo công nghệ Hàn Quốc — da tươi mới, khỏe khoắn.' },
    ],
    tech: ['Mỹ phẩm chuyên dụng', 'Công nghệ làm sạch hiện đại'],
    steps: STEPS,
    benefits: [
      'Thư giãn thoải mái trong không gian dễ chịu',
      'An toàn cho mọi loại da, kể cả da nhạy cảm',
      'Mỹ phẩm chuyên dụng, nguồn gốc rõ ràng',
      'Kỹ thuật viên được đào tạo bài bản',
      'Hiệu quả nhìn thấy ngay sau buổi đầu tiên',
    ],
  },
  {
    slug: 'tre-hoa-nang-co',
    name: 'Trẻ hóa & nâng cơ',
    en: 'Skin Rejuvenation',
    tagline:
      'IPL, laser, HIFU nâng cơ — giúp da săn chắc, tươi trẻ hơn mà không cần phẫu thuật.',
    desc: 'Công nghệ không phẫu thuật giúp da tự sản sinh collagen, làm mờ nếp nhăn, da đều màu và săn chắc hơn — tươi trẻ mà không cần nghỉ dưỡng.',
    img: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=1200&auto=format&fit=crop',
    subs: [
      { name: 'Trẻ hóa da bằng IPL', en: 'IPL Rejuvenation', desc: 'Giúp da săn chắc, đều màu và sáng hơn.' },
      { name: 'Laser trẻ hóa da', en: 'Laser Resurfacing', desc: 'Làm mờ nếp nhăn, thâm nám — bề mặt da mịn màng hơn.' },
      { name: 'HIFU nâng cơ', en: 'HIFU Lifting', desc: 'Công nghệ siêu âm hội tụ — nâng cơ, xóa nhăn không phẫu thuật.' },
      { name: 'RF săn chắc da', en: 'RF Tightening', desc: 'Sóng radio tác động sâu, săn chắc vùng mặt và cổ.' },
    ],
    tech: ['HIFU', 'RF', 'IPL', 'Laser'],
    steps: STEPS,
    benefits: [
      'Không phẫu thuật, không cần nghỉ dưỡng',
      'Hiệu quả nâng cơ rõ rệt sau liệu trình',
      'Giúp cơ thể tự sản sinh collagen',
      'An toàn, ít tác dụng phụ',
      'Phù hợp cho cả nam và nữ',
    ],
  },
  {
    slug: 'massage-thu-gian',
    name: 'Dưỡng sinh thảo dược',
    en: 'Massage',
    tagline:
      'Giải tỏa căng thẳng, làm dịu cơ thể và phục hồi năng lượng sau những ngày dài mệt mỏi.',
    desc: 'Massage giúp cơ thể thư giãn sâu, giảm mệt mỏi và căng thẳng. Kết hợp kỹ thuật massage chuyên nghiệp với tinh dầu thiên nhiên, bạn sẽ thấy dễ chịu và khỏe khoắn hơn.',
    img: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=1200&auto=format&fit=crop',
    subs: [
      { name: 'Massage body toàn thân', en: 'Full Body Massage', desc: 'Giảm căng thẳng, giúp cơ thể khỏe khoắn, dễ chịu.' },
      { name: 'Massage mặt', en: 'Facial Massage', desc: 'Thư giãn cơ mặt, giảm nếp nhăn do căng thẳng.' },
      { name: 'Trị liệu hương thơm', en: 'Aromatherapy', desc: 'Tinh dầu thiên nhiên — thư giãn tinh thần sâu.' },
      { name: 'Massage đá nóng', en: 'Hot Stone Massage', desc: 'Đá nóng kết hợp kỹ thuật massage — giảm đau mỏi hiệu quả.' },
    ],
    tech: ['Kỹ thuật massage chuyên sâu', 'Tinh dầu thiên nhiên'],
    steps: STEPS,
    benefits: [
      'Thư giãn sâu, giảm căng thẳng tức thì',
      'Giảm đau mỏi, cải thiện tuần hoàn máu',
      'Tinh dầu thiên nhiên nguyên chất',
      'Không gian sạch sẽ, yên tĩnh',
      'Liệu trình linh hoạt theo nhu cầu',
    ],
  },
  {
    slug: 'combo-uu-dai',
    name: 'Combo ưu đãi',
    en: 'Best Value Packages',
    tagline:
      'Gói combo chăm sóc toàn diện với mức giá ưu đãi hấp dẫn — dành riêng cho khách đặt lịch online.',
    desc: 'Hi Medical thiết kế các combo trọn gói kết hợp nhiều liệu trình, giúp khách hàng chăm sóc bản thân đầy đủ với chi phí tiết kiệm. Mỗi combo được tư vấn riêng theo nhu cầu của từng người.',
    img: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1200&auto=format&fit=crop',
    subs: [
      { name: 'Combo chăm sóc da toàn diện', desc: 'Kết hợp làm sạch sâu + dưỡng ẩm + đắp mặt nạ.' },
      { name: 'Combo triệt lông + chăm sóc da', desc: 'Trọn gói làm đẹp cho kỳ nghỉ hoặc dịp đặc biệt.' },
      { name: 'Combo điều trị mụn trọn liệu trình', desc: 'Gói nhiều buổi — điều trị dứt điểm, tiết kiệm hơn.' },
      { name: 'Gói ưu đãi đặt lịch online', desc: 'Ưu đãi riêng dành cho khách đặt lịch qua website.' },
    ],
    tech: ['Kết hợp mọi công nghệ theo nhu cầu'],
    steps: STEPS,
    benefits: [
      'Tiết kiệm hơn so với mua lẻ từng liệu trình',
      'Trọn gói, không lo phát sinh chi phí',
      'Linh hoạt theo nhu cầu và thời gian',
      'Tư vấn riêng trước khi chọn combo',
      'Ưu đãi riêng cho khách đặt lịch online',
    ],
    special: true,
  },
];

export function getService(slug: string) {
  return SERVICES.find((s) => s.slug === slug);
}

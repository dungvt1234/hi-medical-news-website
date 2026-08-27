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
    desc: 'Chuyên gia kiểm tra tình trạng da/cơ thể, tư vấn phác đồ phù hợp nhất.',
  },
  {
    name: 'Làm sạch & chuẩn bị',
    desc: 'Vệ sinh vùng điều trị, đảm bảo vô khuẩn và thoải mái tối đa.',
  },
  {
    name: 'Thực hiện liệu trình',
    desc: 'Kỹ thuật viên chuyên môn thực hiện với công nghệ hiện đại, chuẩn y khoa.',
  },
  {
    name: 'Chăm sóc & dặn dò',
    desc: 'Hướng dẫn chăm sóc tại nhà và lịch tái khám để đạt kết quả tốt nhất.',
  },
];

export const SERVICES: Service[] = [
  {
    slug: 'triet-long-cong-nghe-cao',
    name: 'Triệt lông công nghệ cao',
    en: 'SMART OPT IDPL DELUXE Hair Removal',
    tagline:
      'Nách, tay, chân, mặt, bikini, toàn thân — sạch lông an toàn, êm ái, hiệu quả lâu dài theo chuẩn y khoa.',
    desc: 'Triệt lông bằng công nghệ SMART OPT IDPL DELUXE tác động sâu vào nang lông, làm suy yếu và ngừng phát triển lông mà không gây tổn thương da xung quanh. Liệu trình được cá nhân hóa theo vùng da và mật độ lông của từng khách hàng.',
    img: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=1200&auto=format&fit=crop',
    subs: [
      { name: 'Triệt lông nách', en: 'Underarm', desc: 'Vùng nhạy cảm, thấm mồ hôi — làm sạch nhanh, ít đau, không để lại vết thâm.' },
      { name: 'Triệt lông tay', en: 'Arms', desc: 'Cánh tay mịn màng tự nhiên, phù hợp cả nam và nữ.' },
      { name: 'Triệt lông chân', en: 'Legs', desc: 'Nửa chân hoặc toàn chân — loại bỏ lông cứng, da mịn lâu dài.' },
      { name: 'Triệt lông mặt', en: 'Face', desc: 'Ria mép, cằm, má, lông mày — phù hợp nam giới, xử lý vùng lông dày hiệu quả.' },
      { name: 'Triệt lông bikini', en: 'Bikini Line', desc: 'Vùng nhạy cảm nhất — êm ái, riêng tư, an toàn tuyệt đối.' },
      { name: 'Triệt lông lưng – ngực – bụng', en: 'Back & Chest', desc: 'Kỹ thuật tỉ mỉ cho vùng da nhạy cảm.' },
      { name: 'Combo triệt lông toàn thân', en: 'Full Body', desc: 'Gói trọn toàn thân với mức ưu đãi hấp dẫn, tiết kiệm thời gian.' },
    ],
    tech: ['SMART OPT IDPL DELUXE', 'IPL'],
    steps: STEPS,
    benefits: [
      'An toàn, chuẩn y khoa — không tổn thương da',
      'Êm ái, ít đau nhờ công nghệ làm mát',
      'Hiệu quả lâu dài, lông mọc lại thưa và mềm hơn',
      'Không xâm lấn, không nghỉ dưỡng',
      'Phù hợp mọi vùng cơ thể, mọi loại da',
    ],
  },
  {
    slug: 'dieu-tri-da-chuyen-sau',
    name: 'Hỗ trợ cải thiện các vấn đề da',
    en: 'Acne & Pigmentation Treatment',
    tagline:
      'Mụn, nám, thâm, sẹo, quầng thâm mắt — phác đồ chuẩn y khoa với công nghệ laser & IPL hiện đại.',
    desc: 'Mỗi làn da có một câu chuyện riêng. Hi Medical xây dựng phác đồ điều trị cá nhân hóa sau khi thăm khám bởi đội ngũ chuyên gia da liễu, kết hợp công nghệ laser, IPL và dược mỹ phẩm cao cấp để xử lý tận gốc các vấn đề về da.',
    img: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?q=80&w=1200&auto=format&fit=crop',
    subs: [
      { name: 'Điều trị mụn', en: 'Acne Treatment', desc: 'Mụn viêm, mụn bọc, mụn đầu đen — phác đồ chuẩn y khoa, ngăn ngừa tái phát.' },
      { name: 'Điều trị nám & tàn nhang', en: 'Melasma & Pigmentation', desc: 'Nám chân sâu, tàn nhang, đồi mồi — làm mờ rõ rệt sau liệu trình.' },
      { name: 'Điều trị thâm & sẹo', en: 'Dark Spots & Scars', desc: 'Sẹo rỗ, sẹo lồi, thâm mụn — tái tạo bề mặt da mịn màng.' },
      { name: 'Trị quầng thâm mắt', en: 'Eye Brightening', desc: 'Công nghệ IPL — giảm thâm quầng, trả lại ánh mắt tươi sáng.' },
      { name: 'Điều trị da dầu & lỗ chân lông to', en: 'Oily Skin & Pores', desc: 'Cân bằng tiết dầu, se khít lỗ chân lông, da thông thoáng hơn.' },
    ],
    tech: ['Laser', 'IPL', 'Peel hóa học', 'Lăn kim (Microneedling)'],
    steps: STEPS,
    benefits: [
      'Phác đồ cá nhân hóa theo từng làn da',
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
      'Facial làm sạch sâu, dưỡng ẩm phục hồi, đắp mặt nạ cao cấp và chăm sóc da body trọn vẹn.',
    desc: 'Những khoảnh khắc chăm sóc bản thân là liều thuốc quý cho cả làn da lẫn tinh thần. Hi Medical mang đến quy trình chăm sóc da thư giãn với sản phẩm dược mỹ phẩm cao cấp và đôi tay kỹ thuật viên chuyên nghiệp.',
    img: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=1200&auto=format&fit=crop',
    subs: [
      { name: 'Chăm sóc da mặt cơ bản', en: 'Basic Facial', desc: 'Làm sạch sâu, tẩy da chết, massage và đắp mặt nạ thư giãn.' },
      { name: 'Chăm sóc da chuyên sâu', en: 'Deep Cleansing', desc: 'Cho da mụn, da dầu, lỗ chân lông to — làm sạch tận sâu.' },
      { name: 'Dưỡng ẩm & phục hồi', en: 'Hydration Therapy', desc: 'Da khô, da mất nước, da nhạy cảm — phục hồi hàng rào bảo vệ da.' },
      { name: 'Đắp mặt nạ cao cấp', en: 'Luxury Mask', desc: 'Collagen, vàng 24K, thảo dược — nuôi dưỡng làn da rạng rỡ.' },
      { name: 'Chăm sóc da body', en: 'Body Care', desc: 'Dưỡng trắng, tẩy da chết toàn thân — da mềm mại từ đầu đến chân.' },
      { name: 'Massage mặt thư giãn', en: 'Facial Massage', desc: 'Giảm căng cơ, thư giãn tinh thần, cải thiện tuần hoàn.' },
    ],
    tech: ['Dược mỹ phẩm cao cấp', 'Công nghệ làm sạch hiện đại'],
    steps: STEPS,
    benefits: [
      'Thư giãn tuyệt đối trong không gian sang trọng',
      'An toàn cho mọi loại da, kể cả da nhạy cảm',
      'Sản phẩm dược mỹ phẩm cao cấp, nguồn gốc rõ ràng',
      'Kỹ thuật viên được đào tạo bài bản',
      'Hiệu quả nhìn thấy ngay sau buổi đầu tiên',
    ],
  },
  {
    slug: 'tre-hoa-nang-co',
    name: 'Trẻ hóa & nâng cơ',
    en: 'Skin Rejuvenation',
    tagline:
      'IPL, laser tái tạo bề mặt da, HIFU nâng cơ săn chắc — trả lại vẻ tươi trẻ không cần phẫu thuật.',
    desc: 'Công nghệ trẻ hóa không xâm lấn giúp kích thích sản sinh collagen tự nhiên, làm mờ nếp nhăn, cải thiện sắc tố và nâng cơ săn chắc — trả lại vẻ tươi trẻ rạng rỡ mà không cần nghỉ dưỡng.',
    img: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=1200&auto=format&fit=crop',
    subs: [
      { name: 'Trẻ hóa da bằng IPL', en: 'IPL Rejuvenation', desc: 'Kích thích collagen, cải thiện sắc tố, da săn chắc tươi sáng.' },
      { name: 'Laser tái tạo bề mặt da', en: 'Laser Resurfacing', desc: 'Làm mờ nếp nhăn, thâm nám — bề mặt da mịn màng hơn.' },
      { name: 'HIFU nâng cơ', en: 'HIFU Lifting', desc: 'Công nghệ siêu âm hội tụ — nâng cơ, xóa nhăn không phẫu thuật.' },
      { name: 'RF săn chắc da', en: 'RF Tightening', desc: 'Sóng radio tác động sâu, săn chắc vùng mặt và cổ.' },
    ],
    tech: ['HIFU', 'RF', 'IPL', 'Laser'],
    steps: STEPS,
    benefits: [
      'Không phẫu thuật, không nghỉ dưỡng',
      'Hiệu quả nâng cơ rõ rệt sau liệu trình',
      'Kích thích collagen tự nhiên của cơ thể',
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
    desc: 'Không chỉ là massage, đây là liệu pháp chữa lành cho cơ thể và tinh thần. Kết hợp kỹ thuật massage chuyên sâu cùng tinh dầu thiên nhiên, giúp lưu thông khí huyết, giải tỏa mọi căng thẳng.',
    img: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=1200&auto=format&fit=crop',
    subs: [
      { name: 'Massage body toàn thân', en: 'Full Body Massage', desc: 'Giải tỏa căng thẳng, đánh thức năng lượng toàn cơ thể.' },
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
      'Không gian sang trọng, yên tĩnh',
      'Liệu trình linh hoạt theo nhu cầu',
    ],
  },
  {
    slug: 'combo-uu-dai',
    name: 'Combo ưu đãi',
    en: 'Best Value Packages',
    tagline:
      'Gói combo chăm sóc toàn diện với mức giá ưu đãi hấp dẫn — dành riêng cho khách đặt lịch online.',
    desc: 'Hi Medical thiết kế các combo trọn gói kết hợp nhiều liệu trình, giúp khách hàng chăm sóc bản thân toàn diện với chi phí tối ưu. Mỗi combo đều được tư vấn riêng dựa trên nhu cầu của từng khách hàng.',
    img: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1200&auto=format&fit=crop',
    subs: [
      { name: 'Combo chăm sóc da toàn diện', desc: 'Kết hợp làm sạch sâu + dưỡng ẩm + mặt nạ cao cấp.' },
      { name: 'Combo triệt lông + chăm sóc da', desc: 'Trọn gói làm đẹp cho kỳ nghỉ hoặc dịp đặc biệt.' },
      { name: 'Combo điều trị mụn trọn liệu trình', desc: 'Gói nhiều buổi — điều trị dứt điểm, tiết kiệm hơn.' },
      { name: 'Gói ưu đãi đặt lịch online', desc: 'Ưu đãi riêng dành cho khách đặt lịch qua website.' },
    ],
    tech: ['Kết hợp mọi công nghệ theo nhu cầu'],
    steps: STEPS,
    benefits: [
      'Tiết kiệm tối đa so với mua lẻ từng liệu trình',
      'Trọn gói, không lo phát sinh chi phí',
      'Linh hoạt theo nhu cầu và thời gian',
      'Tư vấn riêng trước khi chọn combo',
      'Ưu đãi độc quyền cho khách đặt lịch online',
    ],
    special: true,
  },
];

export function getService(slug: string) {
  return SERVICES.find((s) => s.slug === slug);
}

// ============================================================
// Dữ liệu bài viết mẫu — Trang Tin tức & Sự kiện
// ============================================================

export type ArticleSection = {
  heading?: string;
  paragraphs: string[];
};

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
  video?: string;
  content: ArticleSection[];
};

// Danh mục tabs (khớp với CategoryBar)
export const CATEGORIES = [
  { key: 'all', label: 'Tất cả' },
  { key: 'press', label: 'ĐÓN NHỊP XU HƯỚNG LÀM ĐẸP TOÀN CẦU – CHỌN LỌC ĐỂ PHÙ HỢP VỚI NGƯỜI VIỆT' },
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
    image: '/images/triet-long-cover.jpg',
    date: '2026-08-18',
    dateLabel: '18/08/2026',
    readTime: '6 phút đọc',
    featured: true,
    video: 'https://drive.google.com/file/d/1QbZohaPbadfq7hY7gpnlYhZnXzyDt3Nm/preview',
    content: [
      {
        heading: 'Triệt lông không còn là nỗi lo',
        paragraphs: [
          'Từ lâu, triệt lông luôn là bài toán khó với nhiều chị em: phương pháp cũ gây đau rát, lông mọc lại nhanh, thậm chí để lại kích ứng, viêm nang lông. Với sự ra đời của công nghệ SMART OPT IDPL DELUXE, tất cả những lo lắng đó đã có lời giải.',
          'SMART OPT IDPL DELUXE sử dụng bước sóng ánh sáng xung mạnh thông minh, tác động chọn lọc vào nang lông mà không gây tổn thương vùng da xung quanh. Cảm giác khi triệt êm ái như có luồng hơi ấm nhẹ lướt qua, hoàn toàn khác biệt so với các phương pháp truyền thống.',
        ],
      },
      {
        heading: 'Vì sao chị em tin chọn SMART OPT IDPL DELUXE?',
        paragraphs: [
          'Đầu tiên là tính an toàn: công nghệ này đã được kiểm định và ứng dụng rộng rãi tại nhiều quốc gia, phù hợp với nhiều loại da, kể cả da nhạy cảm. Thứ hai là hiệu quả lâu dài — sau một liệu trình đầy đủ theo phác đồ chuẩn y khoa, lông mọc lại rất chậm, mảnh và nhạt hơn hẳn, giúp chị em tiết kiệm thời gian và chi phí về lâu dài.',
          'Ngoài ra, máy còn được tích hợp cơ chế làm mát bề mặt da liên tục, giảm tối đa cảm giác nóng, giúp buổi triệt lông trở thành khoảng thời gian thư giãn thực sự.',
        ],
      },
      {
        heading: 'Quy trình triệt lông chuẩn y khoa tại Hi Medical',
        paragraphs: [
          'Mỗi ca triệt lông tại Hi Medical đều bắt đầu bằng việc thăm khám, tư vấn và xác định loại da, tình trạng lông để chọn mức năng lượng phù hợp. Kỹ thuật viên sẽ vệ sinh vùng điều trị, cạo sạch lông bề mặt rồi tiến hành chiếu sáng theo từng vùng nhỏ, đảm bảo phủ đều và an toàn tuyệt đối.',
          'Sau buổi triệt, đội ngũ chuyên môn sẽ hướng dẫn chi tiết cách chăm sóc da tại nhà: tránh nắng gắt, không tẩy da chết mạnh, dưỡng ẩm đầy đủ để da nhanh phục hồi và đạt kết quả tốt nhất.',
        ],
      },
      {
        heading: 'Lưu ý trước và sau khi triệt lông',
        paragraphs: [
          'Trước buổi triệt khoảng 2-3 ngày, chị em không nên nhổ hoặc wax lông vì sẽ làm mất gốc nang lông — thứ mà tia sáng cần tác động. Hạn chế tiếp xúc trực tiếp với ánh nắng mặt trời và không dùng mỹ phẩm chứa acid mạnh trên vùng điều trị.',
          'Sau triệt, da có thể hơi ửng hồng nhẹ trong vài giờ — đây là phản ứng bình thường. Bôi kem dưỡng dịu nhẹ, mặc quần áo thoáng mát và kiên trì theo đúng lịch hẹn tái khám để đạt hiệu quả tối ưu nhất.',
        ],
      },
    ],
  },
  {
    id: 'a2',
    slug: '30-tuoi-chong-lao-hoa-co-muon-khong',
    title: '30 tuổi mới bắt đầu chống lão hoá có muộn không?',
    excerpt:
      'Chống lão hoá không phải làm thật nhiều treatment hay chọn phương pháp thật mạnh — điều quan trọng là hiểu làn da đang cần gì. Hi Medical chia sẻ cách trẻ hoá chủ động, đúng lúc và đúng nhu cầu da.',
    category: 'Bí quyết làm đẹp',
    categoryKey: 'tips',
    image: '/images/chong-lao-hoa-30-cover.jpg',
    date: '2026-09-13',
    dateLabel: '13/09/2026',
    readTime: '3 phút đọc',
    content: [
      {
        heading: 'Chống lão hoá không phải làm thật nhiều',
        paragraphs: [
          'Thật ra, chống lão hoá không có nghĩa là phải làm thật nhiều treatment hay lựa chọn phương pháp thật mạnh.',
          'Điều quan trọng hơn là hiểu làn da đang cần gì.',
        ],
      },
      {
        heading: 'Một kế hoạch chăm sóc da tại Hi Medical bắt đầu từ',
        paragraphs: [
          'Soi da → Đánh giá tình trạng → Xác định ưu tiên → Lựa chọn sản phẩm/công nghệ phù hợp → Theo dõi đáp ứng → Điều chỉnh.',
          'Bởi mỗi làn da có một “điểm xuất phát” khác nhau.',
        ],
      },
      {
        heading: 'Mỗi làn da có một “điểm xuất phát” khác nhau',
        paragraphs: [
          'Có người cần ưu tiên phục hồi hàng rào bảo vệ da.',
          'Có người cần cải thiện độ ẩm, độ săn chắc và đàn hồi.',
          'Có người cần tập trung vào sắc tố và những dấu hiệu tổn thương do ánh nắng.',
          'Làn da cần chăm sóc phù hợp và duy trì đều đặn.',
        ],
      },
      {
        heading: 'Trẻ hoá đúng lúc, đúng nhu cầu',
        paragraphs: [
          'Trẻ hoá tốt không phải là cố làm cho da trẻ hơn thật nhanh. Mà là biết chăm sóc đúng lúc, đúng nhu cầu và đúng với tình trạng da của mình.',
          '30 tuổi không muộn để bắt đầu. Nhưng nếu có thể bắt đầu sớm hơn, hãy trẻ hoá chủ động khi làn da vẫn còn đẹp.',
          'Hi! Medical Skincare & Beauty — Chăm sóc da khoa học, cá nhân hoá, hiệu quả bền vững.',
        ],
      },
    ],
  },
  {
    id: 'a3',
    slug: 'cham-soc-da-mun-o-tuoi-day-thi',
    title: 'Chăm sóc da mụn ở tuổi dậy thì: 5 sai lầm khiến mụn "không bao giờ biến mất"',
    excerpt:
      'Rửa mặt quá nhiều, nặn mụn tại nhà, lạm dụng sản phẩm tẩy da chết… là những sai lầm phổ biến. Chuyên gia da liễu Hi Medical chỉ ra cách điều trị đúng chuẩn.',
    category: 'Bí quyết làm đẹp',
    categoryKey: 'tips',
    image: '/images/mun-tuoi-day-thi-cover.jpg',
    date: '2026-08-12',
    dateLabel: '12/08/2026',
    readTime: '5 phút đọc',
    content: [
      {
        heading: 'Sai lầm 1: Rửa mặt quá nhiều lần',
        paragraphs: [
          'Nhiều bạn nghĩ da mụn là do bẩn nên rửa mặt liên tục, thậm chí 4-5 lần mỗi ngày. Thực tế, việc này làm mất lớp màng bảo vệ tự nhiên, khiến da càng tiết dầu nhiều hơn để bù đắp — mụn vì thế càng nặng. Chỉ nên rửa mặt tối đa 2 lần/ngày với sữa rửa mặt dịu nhẹ, phù hợp da dầu mụn.',
          'Nước rửa quá nóng cũng là kẻ thù của da mụn. Hãy dùng nước mát hoặc nước ấm nhẹ, lau khô bằng khăn sạch riêng, tránh cọ xát mạnh làm tổn thương các nốt mụn.',
        ],
      },
      {
        heading: 'Sai lầm 2: Nặn mụn tại nhà',
        paragraphs: [
          'Nặn mụn bằng tay hoặc dụng cụ không vô trùng là nguyên nhân hàng đầu gây viêm nặng, nhiễm trùng và để lại sẹo lõm vĩnh viễn. Đặc biệt với mụn viêm, mụn bọc ở vùng chữ T, việc tự nặn còn có thể đẩy vi khuẩn vào sâu hơn, khiến ổ viêm lan rộng.',
          'Nếu cần lấy nhân mụn, hãy đến cơ sở y tế uy tín để được thực hiện bằng dụng cụ vô trùng và kỹ thuật chuẩn, kết hợp với các bước điều trị chuyên sâu.',
        ],
      },
      {
        heading: 'Sai lầm 3: Lạm dụng tẩy da chết và sản phẩm khô cồn',
        paragraphs: [
          'Tẩy da chết quá thường xuyên hoặc dùng sản phẩm chứa cồn nồng độ cao khiến da khô căng, bong tróc, mất hàng rào bảo vệ. Da lúc này phản ứng bằng cách tiết dầu nhiều hơn, tạo điều kiện cho vi khuẩn P.acnes phát triển — vòng luẩn quẩn mụn cứ thế tiếp diễn.',
          'Hãy chọn sản phẩm dịu nhẹ, ưu tiên thành phần kiềm dầu, kháng viêm lành tính và luôn dưỡng ẩm đầy đủ. Da đủ ẩm mới có thể tự cân bằng và phục hồi.',
        ],
      },
      {
        heading: 'Sai lầm 4 & 5: Tự ý dùng thuốc và "để yên cho tự hết"',
        paragraphs: [
          'Tự mua thuốc bôi, thuốc uống trị mụn mà không có chỉ định là rất nguy hiểm, có thể gây kháng kháng sinh, rối loạn nội tiết hoặc kích ứng nặng. Ngược lại, nhiều bạn lại chủ quan nghĩ mụn tuổi dậy thì "lớn lên sẽ tự hết" mà bỏ lỡ giai đoạn vàng điều trị, để lại sẹo và thâm lâu năm.',
          'Điều trị mụn đúng chuẩn cần phác đồ cá nhân hóa: làm sạch, kiểm soát dầu, kháng viêm, kết hợp công nghệ ánh sáng và chế độ ăn uống, sinh hoạt khoa học. Chuyên gia da liễu sẽ đánh giá tình trạng da và xây dựng lộ trình phù hợp nhất cho từng bạn.',
        ],
      },
    ],
  },
  {
    id: 'a4',
    slug: 'hanh-trinh-xoa-tan-nam-3-thang',
    title: 'Hành trình xóa nám 3 tháng của chị Thu Hà: "Tôi đã tìm lại làn da trắng sáng sau 10 năm"',
    excerpt:
      'Chị Thu Hà (38 tuổi, TP.HCM) chia sẻ hành trình điều trị nám chân sâu với công nghệ laser hiện đại và phác đồ chuẩn y khoa tại Hi Medical.',
    category: 'Câu chuyện thành công',
    categoryKey: 'stories',
    image: '/images/xoa-nam-thu-ha-cover.jpg',
    date: '2026-08-10',
    dateLabel: '10/08/2026',
    readTime: '7 phút đọc',
    content: [
      {
        heading: '10 năm sống chung với nám',
        paragraphs: [
          '"Tôi bị nám từ sau sinh bé thứ hai, ban đầu chỉ vài đốm nhỏ rồi lan rộng thành mảng hai bên gò má. 10 năm qua tôi thử đủ loại kem trộn, thuốc uống không rõ nguồn gốc, có lúc da còn tệ hơn trước", chị Thu Hà (38 tuổi, TP.HCM) mở đầu câu chuyện của mình.',
          'Điều khiến chị quyết tâm tìm giải pháp triệt để là cảm giác tự ti mỗi khi gặp gỡ khách hàng trong công việc. "Làn da là thứ đầu tiên người khác nhìn thấy, tôi không thể cứ mãi che chắn bằng lớp trang điểm dày như thế".',
        ],
      },
      {
        heading: 'Quyết định điều trị tại Hi Medical',
        paragraphs: [
          'Tại Hi Medical, chị Thu Hà được thăm khám bằng hệ thống soi da chuyên sâu, xác định nám chân sâu kết hợp nám mảng. Bác sĩ xây dựng phác đồ kết hợp laser bước sóng kép, lăn kim siêu vi điểm và bộ dưỡng da chuyên biệt, chia thành 3 giai đoạn trong 3 tháng.',
          '"Tôi ấn tượng nhất là sự tận tâm và minh bạch. Từng bước điều trị đều được giải thích rõ ràng, tôi hiểu mình đang làm gì và vì sao. Không hề có cảm giác bị bán liệu trình, mà là được đồng hành thực sự", chị chia sẻ.',
        ],
      },
      {
        heading: 'Kết quả sau 3 tháng',
        paragraphs: [
          'Sau 3 tháng kiên trì, các mảng nám của chị Thu Hà mờ trên 80%, bề mặt da mịn màng, đều màu và sáng hơn hẳn. Kết quả được đo lường cụ thể qua máy phân tích da trước và sau điều trị, không chỉ là cảm nhận chủ quan.',
          '"Giờ tôi chỉ cần kem chống nắng và một lớp nền mỏng là đủ tự tin. Cảm giác nhẹ nhõm sau 10 năm thật khó diễn tả. Tôi chỉ ước mình đến sớm hơn để không phải mất nhiều năm như vậy", chị Thu Hà cười nói.',
        ],
      },
      {
        heading: 'Lời khuyên từ chuyên gia',
        paragraphs: [
          'Các bác sĩ da liễu Hi Medical nhấn mạnh: điều trị nám cần sự kiên trì và phác đồ đúng nguyên nhân. Nám không thể hết trong 1-2 buổi, nhưng với công nghệ hiện đại và sự tuân thủ của khách hàng, kết quả rõ rệt hoàn toàn có thể đạt được trong 3-6 tháng.',
          'Đặc biệt, kem chống nắng là "vũ khí" quan trọng nhất chống nám tái phát. Hãy thoa lại sau mỗi 2-3 giờ nếu hoạt động ngoài trời và kết hợp che chắn vật lý để bảo vệ thành quả điều trị lâu dài.',
        ],
      },
    ],
  },
  {
    id: 'a5',
    slug: 'uu-dai-thang-8-combo-lam-dep',
    title: 'Ưu đãi tháng 8: Combo chăm sóc da + triệt lông, số lượng có hạn',
    excerpt:
      'Chương trình ưu đãi đặc biệt dành riêng cho khách hàng đặt lịch online trong tháng 8. Nhanh tay đăng ký để nhận combo làm đẹp toàn diện với giá cực hấp dẫn.',
    category: 'Chương trình khuyến mãi',
    categoryKey: 'promo',
    image: '/images/combo-uu-dai-cover.jpg',
    date: '2026-08-08',
    dateLabel: '08/08/2026',
    readTime: '3 phút đọc',
    content: [
      {
        heading: 'Combo làm đẹp tháng 8',
        paragraphs: [
          'Chào mừng tháng 8, Hi Medical triển khai chương trình ưu đãi đặc biệt dành riêng cho khách hàng đặt lịch online: combo chăm sóc da mặt chuyên sâu kết hợp triệt lông vùng nhỏ. Mức giá ưu đãi áp dụng cho khách hàng mới và khách hàng thân thiết giới thiệu bạn bè.',
          'Combo bao gồm: buổi trị liệu chăm sóc da làm sạch sâu, cấp ẩm, se khít lỗ chân lông cùng kỹ thuật viên giàu kinh nghiệm và 1 vùng triệt lông nhỏ bằng công nghệ SMART OPT IDPL DELUXE êm ái, an toàn.',
        ],
      },
      {
        heading: 'Đối tượng áp dụng',
        paragraphs: [
          'Chương trình áp dụng cho tất cả khách hàng đặt lịch qua website, hotline hoặc Zalo trong tháng 8/2026. Mỗi khách hàng chỉ được sử dụng ưu đãi một lần, số lượng suất ưu đãi có hạn và được phân bổ theo ngày.',
          'Để đảm bảo trải nghiệm tốt nhất, chúng tôi khuyến khích khách hàng đặt lịch trước ít nhất 1 ngày. Đội ngũ chăm sóc khách hàng sẽ liên hệ xác nhận và tư vấn liệu trình phù hợp với tình trạng da của bạn.',
        ],
      },
      {
        heading: 'Cách đăng ký nhanh nhất',
        paragraphs: [
          'Bạn chỉ cần gọi hotline 0799 390 790, nhắn tin Zalo hoặc bấm nút "Đặt lịch trải nghiệm" trên website để lại thông tin. Nhân viên Hi Medical sẽ phản hồi trong vòng 15 phút trong giờ hành chính.',
          'Đừng bỏ lỡ cơ hội trải nghiệm dịch vụ chuẩn y khoa với mức giá ưu đãi nhất trong năm. Số lượng có hạn — hãy nhanh tay để dành cho mình một suất nhé!',
        ],
      },
    ],
  },
  {
    id: 'a6',
    slug: 'dieu-tri-tham-quang-duoi-mat',
    title: 'Trị thâm quầng mắt bằng công nghệ IPL: trả lại ánh nhìn tươi trẻ sau 2 liệu trình',
    excerpt:
      'Quầng thâm mắt khiến gương mặt luôn mệt mỏi, già hơn tuổi. Công nghệ IPL bước sóng kép giúp mờ thâm, kích thích collagen, trả lại vùng da mắt sáng khỏe.',
    category: 'Bí quyết làm đẹp',
    categoryKey: 'tips',
    image: '/images/tham-quang-mat-cover.jpg',
    date: '2026-08-05',
    dateLabel: '05/08/2026',
    readTime: '5 phút đọc',
    video: 'https://drive.google.com/file/d/1TqRPXaEi6z7Nl0S-jSuJTwHO_XULt4If/preview',
    content: [
      {
        heading: 'Nguyên nhân gây quầng thâm mắt',
        paragraphs: [
          'Quầng thâm mắt đến từ nhiều nguyên nhân: thiếu ngủ, căng thẳng kéo dài, di truyền, lão hóa làm mỏng da vùng mắt hoặc tình trạng tăng sắc tố. Vùng da quanh mắt mỏng và nhạy cảm nhất trên cơ thể nên chỉ cần một chút thay đổi là lộ rõ sắc thâm.',
          'Ngoài ra, việc trang điểm mắt thường xuyên, tẩy trang không kỹ khiến sắc tố tích tụ lâu ngày cũng góp phần làm vùng da dưới mắt ngày càng thâm sạm, kém tươi sáng.',
        ],
      },
      {
        heading: 'Công nghệ IPL bước sóng kép hoạt động thế nào?',
        paragraphs: [
          'IPL (Intense Pulsed Light) bước sóng kép phát ra ánh sáng xung cường độ cao, được chọn lọc để phá vỡ sắc tố melanin dư thừa dưới da, đồng thời kích thích sản sinh collagen — nền tảng giúp da mắt dày hơn, săn chắc hơn và che đi các mạch máu giãn gây thâm tím.',
          'Với thiết kế đầu phát nhỏ gọn chuyên dụng cho vùng quanh mắt, công nghệ này tác động chính xác mà vẫn đảm bảo an toàn cho nhãn cầu nhờ kính bảo hộ chuyên dụng. Cảm giác trong buổi điều trị chỉ hơi ấm nhẹ, không đau, không nghỉ dưỡng.',
        ],
      },
      {
        heading: 'Kết quả sau 2 liệu trình',
        paragraphs: [
          'Nhiều khách hàng ghi nhận vùng thâm mắt sáng rõ sau 2 liệu trình, mỗi liệu trình cách nhau 3-4 tuần. Ánh nhìn trở nên tươi tỉnh hơn hẳn, quầng thâm giảm từ 50-70% tùy cơ địa và mức độ nặng nhẹ.',
          'Bên cạnh điều trị, chuyên gia khuyên kết hợp kem dưỡng mắt chứa vitamin C, retinol nồng độ thấp và duy trì giấc ngủ đủ 7-8 tiếng để kéo dài hiệu quả, ngăn thâm quay trở lại.',
        ],
      },
      {
        heading: 'Ai nên điều trị IPL vùng mắt?',
        paragraphs: [
          'Phương pháp phù hợp với người bị thâm mắt do tăng sắc tố, mạch máu giãn hoặc lão hóa nhẹ. Trước khi điều trị, bác sĩ sẽ thăm khám để loại trừ các trường hợp thâm mắt do bệnh lý và tư vấn phác đồ phù hợp nhất.',
          'Nếu bạn đang cảm thấy mệt mỏi vì đôi mắt lúc nào cũng "ngủ không đủ giấc", hãy đến Hi Medical để được soi da, phân tích tình trạng và nhận giải pháp cá nhân hóa ngay hôm nay.',
        ],
      },
    ],
  },
  {
    id: 'a7',
    slug: 'cau-chuyen-hi-medical-10-nam',
    title: 'Câu chuyện Hi Medical: 10 năm kiến tạo hành trình làm đẹp an toàn',
    excerpt:
      'Cập nhật xu hướng làm đẹp thế giới, chọn lọc để phù hợp với người Việt — 10 năm Hi Medical kiến tạo hành trình chăm sóc da an toàn, cá nhân hoá và hiệu quả bền vững.',
    category: 'ĐÓN NHỊP XU HƯỚNG LÀM ĐẸP TOÀN CẦU – CHỌN LỌC ĐỂ PHÙ HỢP VỚI NGƯỜI VIỆT',
    categoryKey: 'press',
    image: '/images/cau-chuyen-hi-medical-cover.jpg',
    date: '2026-09-01',
    dateLabel: '01/09/2026',
    readTime: '5 phút đọc',
    content: [
      {
        heading: '🌿 HÀNH TRÌNH 10 NĂM XÂY DỰNG HI MEDICAL',
        paragraphs: [
          'Nơi chăm sóc da & làm đẹp an toàn — cá nhân hoá — hiệu quả bền vững.',
          '10 năm là một hành trình đủ dài để một thương hiệu trưởng thành, nhưng cũng đủ để chúng tôi hiểu rằng: làm đẹp chưa bao giờ chỉ là làm cho một người đẹp hơn.',
          'Đó còn là hành trình xây dựng niềm tin, tiêu chuẩn và sự an tâm cho mỗi khách hàng khi lựa chọn gửi gắm làn da của mình.',
          'Từ những ngày đầu tiên, Hi Medical bắt đầu với một mong muốn rất giản dị: xây dựng một nơi chăm sóc da và làm đẹp chuyên nghiệp, nơi khách hàng được tư vấn dựa trên nhu cầu thực tế của làn da thay vì những xu hướng nhất thời.',
          '10 năm qua, mong muốn ấy ngày càng được hoàn thiện bằng kiến thức, công nghệ, quy trình và những trải nghiệm thực tế cùng hàng nghìn làn da khác nhau.',
        ],
      },
      {
        heading: '💜 CẬP NHẬT TINH HOA LÀM ĐẸP THEO XU HƯỚNG THẾ GIỚI',
        paragraphs: [
          'Thế giới làm đẹp không ngừng thay đổi.',
          'Những công nghệ mới liên tục xuất hiện, những tiêu chuẩn mới về an toàn và hiệu quả ngày càng được nâng cao, và khách hàng hiện đại cũng không còn tìm kiếm một vẻ đẹp thay đổi quá mức. Họ mong muốn đẹp hơn nhưng vẫn là chính mình.',
          'Hi Medical vì thế luôn chủ động cập nhật những xu hướng chăm sóc da và làm đẹp hiện đại trên thế giới, từ công nghệ, sản phẩm đến phương pháp và dịch vụ, với mục tiêu lựa chọn những giải pháp phù hợp để ứng dụng vào hành trình chăm sóc khách hàng.',
          'Không chạy theo mọi xu hướng — chúng tôi chọn lọc xu hướng.',
          'Không phải công nghệ mới nào cũng phù hợp với mọi làn da. Chúng tôi lựa chọn dựa trên tính an toàn, tính phù hợp và giá trị lâu dài.',
        ],
      },
      {
        heading: '✨ CÔNG NGHỆ MỚI — TRẢI NGHIỆM HIỆN ĐẠI',
        paragraphs: [
          'Một trong những định hướng Hi Medical theo đuổi trong suốt hành trình phát triển là đưa những giải pháp làm đẹp hiện đại, ít ảnh hưởng đến sinh hoạt thường ngày vào trải nghiệm của khách hàng.',
          'Từ những sản phẩm chăm sóc da thế hệ mới đến các công nghệ và phương pháp chăm sóc chuyên sâu, chúng tôi liên tục cập nhật để mang đến những lựa chọn hiện đại, nhẹ nhàng và phù hợp với nhịp sống ngày càng bận rộn.',
          'Bởi chúng tôi tin rằng vẻ đẹp hiện đại không nhất thiết phải đi cùng sự can thiệp quá mức.',
          'Đẹp tự nhiên hơn. An toàn hơn. Thông minh hơn. Và bền vững hơn.',
          '10 năm qua, Hi Medical xây dựng nền tảng.',
          '10 năm tiếp theo, chúng tôi tiếp tục hướng về phía trước — cập nhật những tinh hoa của ngành làm đẹp thế giới, chọn lọc công nghệ và sản phẩm thế hệ mới, để mỗi khách hàng có thể tiếp cận những giải pháp chăm sóc da hiện đại ngay trong hành trình của mình.',
        ],
      },
      {
        heading: 'HI MEDICAL — Medical Skincare & Beauty',
        paragraphs: [
          'AN TOÀN • CÁ NHÂN HOÁ • HIỆU QUẢ BỀN VỮNG',
          'Đẹp theo xu hướng thế giới — phù hợp với chính bạn.',
        ],
      },
    ],
  },
  {
    id: 'a8',
    slug: 'hop-tac-quoc-te',
    title: 'Hi Medical mở rộng hợp tác quốc tế về công nghệ và mỹ phẩm chuyên sâu',
    excerpt:
      'Mạng lưới đối tác quốc tế mang đến cho khách hàng công nghệ làm đẹp tiên tiến và dòng sản phẩm chăm sóc da chuyên sâu được chuyển giao chính hãng.',
    category: 'Đối tác',
    categoryKey: 'partner',
    image: '/images/hop-tac-quoc-te-cover.jpg',
    date: '2026-09-13',
    dateLabel: '13/09/2026',
    readTime: '3 phút đọc',
    video: 'https://drive.google.com/file/d/1uEkZ0t-FdZwQrIK4uT7d6UyH7BsC4rtL/preview',
    content: [
      {
        heading: 'Bước tiến trong chiến lược hợp tác quốc tế',
        paragraphs: [
          'Hi Medical chính thức mở rộng mạng lưới hợp tác quốc tế với các hãng công nghệ thẩm mỹ và mỹ phẩm chuyên sâu từ những cường quốc làm đẹp trên thế giới. Theo thỏa thuận, Hi Medical được chuyển giao chính hãng công nghệ, sản phẩm và quy trình đào tạo để ứng dụng trực tiếp trong liệu trình điều trị.',
          'Sự hợp tác này đánh dấu bước tiến quan trọng trong chiến lược nâng cao chất lượng dịch vụ, mang đến cho khách hàng những giải pháp làm đẹp tiên tiến, đạt chuẩn quốc tế.',
        ],
      },
      {
        heading: 'Công nghệ và sản phẩm chuyển giao chính hãng',
        paragraphs: [
          'Các dòng sản phẩm và thiết bị trong khuôn khổ hợp tác được nghiên cứu, kiểm nghiệm nghiêm ngặt theo tiêu chuẩn quốc tế: chiết xuất thảo dược, peptide phục hồi và hoạt chất chuyên sâu cho từng loại da, phù hợp cả làn da nhạy cảm và da đang trong liệu trình điều trị.',
          'Đội ngũ chuyên môn của Hi Medical được đối tác đào tạo bài bản, từ soi da, xây dựng phác đồ đến vận hành công nghệ — đảm bảo mỗi liệu trình đạt đúng chuẩn của hãng.',
        ],
      },
      {
        heading: 'Lợi ích cho khách hàng',
        paragraphs: [
          'Khách hàng của Hi Medical được trải nghiệm công nghệ và sản phẩm quốc tế chính hãng trong các liệu trình cao cấp, với phác đồ cá nhân hoá theo tình trạng da của từng người.',
          'Bên cạnh đó, các chương trình ưu đãi dành cho khách hàng thân thiết khi trải nghiệm liệu trình mới sẽ được công bố trong thời gian tới. Hãy theo dõi website và fanpage để không bỏ lỡ nhé!',
        ],
      },
    ],
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
    content: [
      {
        heading: 'Vì sao cuối tuần nên dành cho bản thân?',
        paragraphs: [
          'Một tuần làm việc với lịch trình dày đặc, áp lực công việc và những mối lo thường nhật khiến cơ thể tích tụ căng thẳng. Nếu không được "xả" kịp thời, stress sẽ biểu hiện qua làn da xỉn màu, quầng thâm mắt, mụn viêm và cảm giác mệt mỏi kéo dài.',
          'Dành 60-90 phút cuối tuần cho một liệu trình spa không phải là xa xỉ, mà là khoản đầu tư thông minh cho sức khỏe thể chất lẫn tinh thần — để bạn bước vào tuần mới với năng lượng tràn đầy.',
        ],
      },
      {
        heading: 'Liệu trình gợi ý cho kỳ nghỉ ngắn',
        paragraphs: [
          'Tại Hi Medical, gợi ý hoàn hảo cho cuối tuần là kết hợp liệu trình chăm sóc da mặt chuyên sâu với massage thư giãn toàn thân. Quy trình làm sạch, tẩy da chết nhẹ nhàng, đắp mặt nạ dưỡng ẩm và massage vùng vai gáy giúp giải phóng mọi căng thẳng tích tụ.',
          'Nếu có nhiều thời gian hơn, bạn có thể nâng cấp lên gói trị liệu toàn diện bao gồm cả chăm sóc cơ thể, giúp làn da mềm mại, săn chắc và tinh thần thư thái tuyệt đối.',
        ],
      },
      {
        heading: 'Mẹo để trọn vẹn ngày thư giãn',
        paragraphs: [
          'Để buổi spa đạt hiệu quả tốt nhất, hãy đến sớm 10-15 phút, uống đủ nước trước đó và hạn chế caffeine. Sau liệu trình, tránh trang điểm ngay, để da "thở" và tiếp tục bổ sung nước, ngủ sớm để cơ thể phục hồi sâu.',
          'Quan trọng nhất: hãy tắt điện thoại trong thời gian trị liệu. Đó là khoảng thời gian hiếm hoi thuộc về riêng bạn — tận hưởng trọn vẹn để nạp lại năng lượng cho một tuần mới hiệu quả hơn.',
        ],
      },
    ],
  },
];

export function getFeatured(articles: Article[] = ARTICLES): Article {
  return articles.find((a) => a.featured) ?? articles[0];
}

export function getSidebar(articles: Article[] = ARTICLES): Article[] {
  return articles.filter((a) => !a.featured);
}

export function getArticleBySlug(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

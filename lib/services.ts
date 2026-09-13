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
    name: 'ThÄƒm khÃ¡m & tÆ° váº¥n',
    desc: 'ChuyÃªn viÃªn kiá»ƒm tra tÃ¬nh tráº¡ng da/cÆ¡ thá»ƒ, tÆ° váº¥n liá»‡u trÃ¬nh phÃ¹ há»£p.',
  },
  {
    name: 'LÃ m sáº¡ch & chuáº©n bá»‹',
    desc: 'Vá»‡ sinh sáº¡ch sáº½ vÃ¹ng cáº§n lÃ m, giÃºp báº¡n thoáº£i mÃ¡i vÃ  an toÃ n.',
  },
  {
    name: 'Thá»±c hiá»‡n liá»‡u trÃ¬nh',
    desc: 'Ká»¹ thuáº­t viÃªn cÃ³ tay nghá» thá»±c hiá»‡n báº±ng cÃ´ng nghá»‡ hiá»‡n Ä‘áº¡i, an toÃ n.',
  },
  {
    name: 'ChÄƒm sÃ³c & dáº·n dÃ²',
    desc: 'HÆ°á»›ng dáº«n chÄƒm sÃ³c táº¡i nhÃ  vÃ  háº¹n lá»‹ch tiáº¿p theo Ä‘á»ƒ Ä‘áº¡t káº¿t quáº£ tá»‘t.',
  },
];

export const SERVICES: Service[] = [
  {
    slug: 'triet-long-cong-nghe-cao',
    name: 'Triá»‡t lÃ´ng cÃ´ng nghá»‡ cao',
    en: 'SMART OPT IDPL DELUXE Hair Removal',
    tagline:
      'NÃ¡ch, tay, chÃ¢n, máº·t, bikini, toÃ n thÃ¢n â€” triá»‡t lÃ´ng an toÃ n, Ãªm Ã¡i, hiá»‡u quáº£ lÃ¢u dÃ i.',
    desc: 'CÃ´ng nghá»‡ SMART OPT IDPL DELUXE tÃ¡c Ä‘á»™ng vÃ o chÃ¢n lÃ´ng, giÃºp lÃ´ng yáº¿u dáº§n vÃ  háº¡n cháº¿ má»c láº¡i, khÃ´ng lÃ m háº¡i vÃ¹ng da xung quanh. Liá»‡u trÃ¬nh Ä‘Æ°á»£c Ä‘iá»u chá»‰nh theo tá»«ng vÃ¹ng da vÃ  Ä‘á»™ dÃ y cá»§a lÃ´ng.',
    img: '/images/triet-long-cong-nghe-cao.jpg',
    subs: [
      { name: 'Triá»‡t lÃ´ng nÃ¡ch', en: 'Underarm', desc: 'VÃ¹ng nháº¡y cáº£m, hay ra má»“ hÃ´i â€” lÃ m nhanh, Ã­t Ä‘au, khÃ´ng Ä‘á»ƒ láº¡i váº¿t thÃ¢m.' },
      { name: 'Triá»‡t lÃ´ng tay', en: 'Arms', desc: 'CÃ¡nh tay má»‹n mÃ ng tá»± nhiÃªn, phÃ¹ há»£p cáº£ nam vÃ  ná»¯.' },
      { name: 'Triá»‡t lÃ´ng chÃ¢n', en: 'Legs', desc: 'Ná»­a chÃ¢n hoáº·c toÃ n chÃ¢n â€” loáº¡i bá» lÃ´ng cá»©ng, da má»‹n lÃ¢u dÃ i.' },
      { name: 'Triá»‡t lÃ´ng máº·t', en: 'Face', desc: 'Ria mÃ©p, cáº±m, mÃ¡, lÃ´ng mÃ y â€” phÃ¹ há»£p nam giá»›i, xá»­ lÃ½ vÃ¹ng lÃ´ng dÃ y hiá»‡u quáº£.' },
      { name: 'Triá»‡t lÃ´ng bikini', en: 'Bikini Line', desc: 'VÃ¹ng nháº¡y cáº£m nháº¥t â€” Ãªm Ã¡i, riÃªng tÆ°, an toÃ n.' },
      { name: 'Triá»‡t lÃ´ng lÆ°ng â€“ ngá»±c â€“ bá»¥ng', en: 'Back & Chest', desc: 'Ká»¹ thuáº­t tá»‰ má»‰ cho vÃ¹ng da nháº¡y cáº£m.' },
      { name: 'Combo triá»‡t lÃ´ng toÃ n thÃ¢n', en: 'Full Body', desc: 'GÃ³i trá»n toÃ n thÃ¢n vá»›i má»©c Æ°u Ä‘Ã£i háº¥p dáº«n, tiáº¿t kiá»‡m thá»i gian.' },
    ],
    tech: ['SMART OPT IDPL DELUXE', 'IPL'],
    steps: STEPS,
    benefits: [
      'An toÃ n, khÃ´ng lÃ m háº¡i da',
      'ÃŠm Ã¡i, Ã­t Ä‘au nhá» cÃ´ng nghá»‡ lÃ m mÃ¡t',
      'Hiá»‡u quáº£ lÃ¢u dÃ i, lÃ´ng má»c láº¡i thÆ°a vÃ  má»m hÆ¡n',
      'KhÃ´ng cáº§n nghá»‰ dÆ°á»¡ng, sinh hoáº¡t bÃ¬nh thÆ°á»ng',
      'PhÃ¹ há»£p má»i vÃ¹ng cÆ¡ thá»ƒ, má»i loáº¡i da',
    ],
  },
  {
    slug: 'dieu-tri-da-chuyen-sau',
    name: 'Há»— trá»£ cáº£i thiá»‡n cÃ¡c váº¥n Ä‘á» da',
    en: 'Acne & Pigmentation Treatment',
    tagline:
      'Má»¥n, nÃ¡m, thÃ¢m, sáº¹o, quáº§ng thÃ¢m máº¯t â€” liá»‡u trÃ¬nh an toÃ n vá»›i cÃ´ng nghá»‡ laser & IPL hiá»‡n Ä‘áº¡i.',
    desc: 'Má»—i ngÆ°á»i cÃ³ má»™t tÃ¬nh tráº¡ng da khÃ¡c nhau. Sau khi thÄƒm khÃ¡m, chuyÃªn gia da liá»…u sáº½ tÆ° váº¥n liá»‡u trÃ¬nh phÃ¹ há»£p, káº¿t há»£p cÃ´ng nghá»‡ laser, IPL vÃ  dÆ°á»£c má»¹ pháº©m Ä‘á»ƒ cáº£i thiá»‡n rÃµ rá»‡t cÃ¡c váº¥n Ä‘á» vá» da.',
    img: '/images/dieu-tri-da-chuyen-sau.jpg',
    subs: [
      { name: 'Äiá»u trá»‹ má»¥n', en: 'Acne Treatment', desc: 'Má»¥n viÃªm, má»¥n bá»c, má»¥n Ä‘áº§u Ä‘en â€” liá»‡u trÃ¬nh an toÃ n, háº¡n cháº¿ má»¥n quay láº¡i.' },
      { name: 'Äiá»u trá»‹ nÃ¡m & tÃ n nhang', en: 'Melasma & Pigmentation', desc: 'NÃ¡m chÃ¢n sÃ¢u, tÃ n nhang, Ä‘á»“i má»“i â€” lÃ m má» rÃµ rá»‡t sau liá»‡u trÃ¬nh.' },
      { name: 'Äiá»u trá»‹ thÃ¢m & sáº¹o', en: 'Dark Spots & Scars', desc: 'Sáº¹o rá»—, sáº¹o lá»“i, thÃ¢m má»¥n â€” lÃ m da má»m má»‹n hÆ¡n.' },
      { name: 'Trá»‹ quáº§ng thÃ¢m máº¯t', en: 'Eye Brightening', desc: 'CÃ´ng nghá»‡ IPL (Ã¡nh sÃ¡ng xung cÆ°á»ng Ä‘á»™ cao) â€” tÃ¡c Ä‘á»™ng nháº¹ nhÃ ng, giÃºp giáº£m thÃ¢m quáº§ng vÃ  lÃ m sÃ¡ng vÃ¹ng da quanh máº¯t.' },
      { name: 'Äiá»u trá»‹ da dáº§u & lá»— chÃ¢n lÃ´ng to', en: 'Oily Skin & Pores', desc: 'Giáº£m nhá»n, se nhá» lá»— chÃ¢n lÃ´ng, da thÃ´ng thoÃ¡ng hÆ¡n.' },
    ],
    tech: ['Laser', 'IPL', 'Peel hÃ³a há»c', 'LÄƒn kim (Microneedling)'],
    steps: STEPS,
    benefits: [
      'Liá»‡u trÃ¬nh Ä‘Æ°á»£c thiáº¿t káº¿ theo tá»«ng loáº¡i da',
      'ThÄƒm khÃ¡m bá»Ÿi chuyÃªn gia da liá»…u',
      'CÃ´ng nghá»‡ laser & IPL hiá»‡n Ä‘áº¡i',
      'Káº¿t quáº£ rÃµ rá»‡t, an toÃ n lÃ¢u dÃ i',
      'Theo dÃµi vÃ  Ä‘iá»u chá»‰nh qua tá»«ng buá»•i',
    ],
  },
  {
    slug: 'cham-soc-da',
    name: 'ChÄƒm sÃ³c da',
    en: 'Luxury Skincare',
    tagline:
      'LÃ m sáº¡ch sÃ¢u, dÆ°á»¡ng áº©m phá»¥c há»“i, Ä‘áº¯p máº·t náº¡ vÃ  chÄƒm sÃ³c da toÃ n thÃ¢n.',
    desc: 'ChÄƒm sÃ³c da Ä‘á»u Ä‘áº·n giÃºp da khá»e hÆ¡n vÃ  tinh tháº§n thoáº£i mÃ¡i hÆ¡n. Hi Medical mang Ä‘áº¿n quy trÃ¬nh chÄƒm sÃ³c da thÆ° giÃ£n vá»›i dÆ°á»£c má»¹ pháº©m vÃ  ká»¹ thuáº­t viÃªn cÃ³ tay nghá».',
    img: '/images/cham-soc-da.jpg',
    subs: [
      { name: 'CHÄ‚M SÃ“C DA CHUáº¨N HÃ€N', en: 'Basic Facial', desc: 'CÄƒng bÃ³ng mÆ°á»›t má»‹n' },
      { name: 'NGáº¬M TRáº®NG HOÃ€N Háº¢O', en: 'Body Care', desc: 'WHITENING COMPLEX' },
      { name: 'SUPER DETOX SKIN', en: 'Deep Cleansing', desc: 'Cho da má»¥n, da dáº§u, lá»— chÃ¢n lÃ´ng to â€” lÃ m sáº¡ch táº­n sÃ¢u.' },
      { name: 'Há»’I SINH DA', en: 'Hydration Therapy', desc: 'NHIá»„M Äá»˜C - Dá»Š á»¨NG' },
      { name: 'TRá»Š Má»¤N CÃ”NG NGHá»† CAO', desc: 'Má»¥n viÃªm, má»¥n bá»c, má»¥n Ä‘áº§u Ä‘en â€” cÃ´ng nghá»‡ hiá»‡n Ä‘áº¡i, háº¡n cháº¿ má»¥n quay láº¡i.' },
      { name: 'Cáº¤P áº¨M ÄA Táº¦NG', desc: 'Cáº¥p áº©m sÃ¢u tá»« nhiá»u lá»›p â€” da cÄƒng má»ng, má»m máº¡i.' },
      { name: 'LUXURY GOLD THERAPY', en: 'Luxury Mask', desc: 'DÃ¡t vÃ ng 24K chÄƒm sÃ³c nÃ¢ng cÆ¡' },
      { name: 'TÃI SINH DA HÃ€N QUá»C', desc: 'TÃ¡i sinh lÃ n da theo cÃ´ng nghá»‡ HÃ n Quá»‘c â€” da tÆ°Æ¡i má»›i, khá»e khoáº¯n.' },
    ],
    tech: ['DÆ°á»£c má»¹ pháº©m', 'CÃ´ng nghá»‡ lÃ m sáº¡ch hiá»‡n Ä‘áº¡i'],
    steps: STEPS,
    benefits: [
      'ThÆ° giÃ£n thoáº£i mÃ¡i trong khÃ´ng gian dá»… chá»‹u',
      'An toÃ n cho má»i loáº¡i da, ká»ƒ cáº£ da nháº¡y cáº£m',
      'DÆ°á»£c má»¹ pháº©m, nguá»“n gá»‘c rÃµ rÃ ng',
      'Ká»¹ thuáº­t viÃªn Ä‘Æ°á»£c Ä‘Ã o táº¡o bÃ i báº£n',
      'Hiá»‡u quáº£ nhÃ¬n tháº¥y ngay sau buá»•i Ä‘áº§u tiÃªn',
    ],
  },
  {
    slug: 'tre-hoa-nang-co',
    name: 'Tráº» hÃ³a & nÃ¢ng cÆ¡',
    en: 'Skin Rejuvenation',
    tagline:
      'IPL, laser, Micro needle shoot â€” giÃºp da sÄƒn cháº¯c, tÆ°Æ¡i tráº» hÆ¡n mÃ  khÃ´ng cáº§n pháº«u thuáº­t.',
    desc: 'CÃ´ng nghá»‡ khÃ´ng pháº«u thuáº­t giÃºp da tá»± sáº£n sinh collagen, lÃ m má» náº¿p nhÄƒn, da Ä‘á»u mÃ u vÃ  sÄƒn cháº¯c hÆ¡n â€” tÆ°Æ¡i tráº» mÃ  khÃ´ng cáº§n nghá»‰ dÆ°á»¡ng.',
    img: '/images/tre-hoa-nang-co.jpg',
    subs: [
      { name: 'Tráº» hÃ³a da báº±ng IPL', en: 'IPL Rejuvenation', desc: 'GiÃºp da sÄƒn cháº¯c, Ä‘á»u mÃ u vÃ  sÃ¡ng hÆ¡n.' },
      { name: 'Laser tráº» hÃ³a da', en: 'Laser Resurfacing', desc: 'LÃ m má» náº¿p nhÄƒn, thÃ¢m nÃ¡m â€” bá» máº·t da má»‹n mÃ ng hÆ¡n.' },
      { name: 'Micro needle shoot', en: 'Micro Needle Shoot', desc: 'CÃ´ng nghá»‡ lÄƒn kim siÃªu vi Ä‘iá»ƒm â€” kÃ­ch thÃ­ch collagen, giÃºp da sÄƒn cháº¯c, má» náº¿p nhÄƒn.' },
      { name: 'RF sÄƒn cháº¯c da', en: 'RF Tightening', desc: 'SÃ³ng radio tÃ¡c Ä‘á»™ng sÃ¢u, sÄƒn cháº¯c vÃ¹ng máº·t vÃ  cá»•.' },
    ],
    tech: ['Micro needle shoot', 'RF', 'IPL', 'Laser'],
    steps: STEPS,
    benefits: [
      'KhÃ´ng pháº«u thuáº­t, khÃ´ng cáº§n nghá»‰ dÆ°á»¡ng',
      'Hiá»‡u quáº£ nÃ¢ng cÆ¡ rÃµ rá»‡t sau liá»‡u trÃ¬nh',
      'GiÃºp cÆ¡ thá»ƒ tá»± sáº£n sinh collagen',
      'An toÃ n, Ã­t tÃ¡c dá»¥ng phá»¥',
      'PhÃ¹ há»£p cho cáº£ nam vÃ  ná»¯',
    ],
  },
  {
    slug: 'massage-thu-gian',
    name: 'DÆ°á»¡ng sinh tháº£o dÆ°á»£c',
    en: 'Massage',
    tagline:
      'Giáº£i tá»a cÄƒng tháº³ng, lÃ m dá»‹u cÆ¡ thá»ƒ vÃ  phá»¥c há»“i nÄƒng lÆ°á»£ng sau nhá»¯ng ngÃ y dÃ i má»‡t má»i.',
    desc: 'Massage giÃºp cÆ¡ thá»ƒ thÆ° giÃ£n sÃ¢u, giáº£m má»‡t má»i vÃ  cÄƒng tháº³ng. Káº¿t há»£p ká»¹ thuáº­t massage chuyÃªn nghiá»‡p vá»›i tinh dáº§u thiÃªn nhiÃªn, báº¡n sáº½ tháº¥y dá»… chá»‹u vÃ  khá»e khoáº¯n hÆ¡n.',
    img: '/images/duong-sinh-thao-moc.jpg',
    subs: [
      { name: 'Gá»™i Ä‘áº§u dÆ°á»¡ng sinh', en: 'Herbal Hair Wash', desc: 'Tháº£o dÆ°á»£c thiÃªn nhiÃªn â€” lÃ m sáº¡ch da Ä‘áº§u, thÆ° giÃ£n, giÃºp tÃ³c cháº¯c khá»e.' },
      { name: 'Massage máº·t', en: 'Facial Massage', desc: 'ThÆ° giÃ£n cÆ¡ máº·t, giáº£m náº¿p nhÄƒn do cÄƒng tháº³ng.' },
      { name: 'Trá»‹ liá»‡u hÆ°Æ¡ng thÆ¡m', en: 'Aromatherapy', desc: 'Tinh dáº§u thiÃªn nhiÃªn â€” thÆ° giÃ£n tinh tháº§n sÃ¢u.' },
    ],
    tech: ['Ká»¹ thuáº­t massage chuyÃªn sÃ¢u', 'Tinh dáº§u thiÃªn nhiÃªn'],
    steps: STEPS,
    benefits: [
      'ThÆ° giÃ£n sÃ¢u, giáº£m cÄƒng tháº³ng tá»©c thÃ¬',
      'Giáº£m Ä‘au má»i, cáº£i thiá»‡n tuáº§n hoÃ n mÃ¡u',
      'Tinh dáº§u thiÃªn nhiÃªn nguyÃªn cháº¥t',
      'KhÃ´ng gian sáº¡ch sáº½, yÃªn tÄ©nh',
      'Liá»‡u trÃ¬nh linh hoáº¡t theo nhu cáº§u',
    ],
  },
  {
    slug: 'combo-uu-dai',
    name: 'Combo Æ°u Ä‘Ã£i',
    en: 'Best Value Packages',
    tagline:
      'GÃ³i combo chÄƒm sÃ³c toÃ n diá»‡n vá»›i má»©c giÃ¡ Æ°u Ä‘Ã£i háº¥p dáº«n â€” dÃ nh riÃªng cho khÃ¡ch Ä‘áº·t lá»‹ch online.',
    desc: 'Hi Medical thiáº¿t káº¿ cÃ¡c combo trá»n gÃ³i káº¿t há»£p nhiá»u liá»‡u trÃ¬nh, giÃºp khÃ¡ch hÃ ng chÄƒm sÃ³c báº£n thÃ¢n Ä‘áº§y Ä‘á»§ vá»›i chi phÃ­ tiáº¿t kiá»‡m. Má»—i combo Ä‘Æ°á»£c tÆ° váº¥n riÃªng theo nhu cáº§u cá»§a tá»«ng ngÆ°á»i.',
    img: '/images/combo-uu-dai.jpg',
    subs: [
      { name: 'Combo chÄƒm sÃ³c da toÃ n diá»‡n', desc: 'Káº¿t há»£p lÃ m sáº¡ch sÃ¢u + dÆ°á»¡ng áº©m + Ä‘áº¯p máº·t náº¡.' },
      { name: 'Combo triá»‡t lÃ´ng + chÄƒm sÃ³c da', desc: 'Trá»n gÃ³i lÃ m Ä‘áº¹p cho ká»³ nghá»‰ hoáº·c dá»‹p Ä‘áº·c biá»‡t.' },
      { name: 'Combo Ä‘iá»u trá»‹ má»¥n trá»n liá»‡u trÃ¬nh', desc: 'GÃ³i nhiá»u buá»•i â€” Ä‘iá»u trá»‹ dá»©t Ä‘iá»ƒm, tiáº¿t kiá»‡m hÆ¡n.' },
      { name: 'GÃ³i Æ°u Ä‘Ã£i Ä‘áº·t lá»‹ch online', desc: 'Æ¯u Ä‘Ã£i riÃªng dÃ nh cho khÃ¡ch Ä‘áº·t lá»‹ch qua website.' },
    ],
    tech: ['Káº¿t há»£p má»i cÃ´ng nghá»‡ theo nhu cáº§u'],
    steps: STEPS,
    benefits: [
      'Tiáº¿t kiá»‡m hÆ¡n so vá»›i mua láº» tá»«ng liá»‡u trÃ¬nh',
      'Trá»n gÃ³i, khÃ´ng lo phÃ¡t sinh chi phÃ­',
      'Linh hoáº¡t theo nhu cáº§u vÃ  thá»i gian',
      'TÆ° váº¥n riÃªng trÆ°á»›c khi chá»n combo',
      'Æ¯u Ä‘Ã£i riÃªng cho khÃ¡ch Ä‘áº·t lá»‹ch online',
    ],
    special: true,
  },
];

export function getService(slug: string) {
  return SERVICES.find((s) => s.slug === slug);
}

export const metadata = {  title: 'Tin tức & Kiến thức làm đẹp',
  description:
    'Cập nhật xu hướng làm đẹp, bí quyết chăm sóc da từ chuyên gia và ưu đãi tại Hi Medical TP.HCM: triệt lông, trị nám, trẻ hoá da.',
  alternates: { canonical: '/journal' },
  openGraph: {
    title: 'Tin tức & Kiến thức làm đẹp | Hi Medical',
    description:
      'Bí quyết chăm sóc da, triệt lông, trị nám và ưu đãi mới nhất từ Hi Medical TP.HCM.',
  },
};

export default function JournalLayout({ children }: { children: React.ReactNode }) {
  return children;
}

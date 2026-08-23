import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingWidgets from '@/components/FloatingWidgets';

export const metadata: Metadata = {
  title: 'Hi Medical Spa — Midnight Luxury Skincare & Beauty',
  description:
    'Trải nghiệm spa cao cấp giữa ánh trăng — liệu trình chăm sóc da, thư giãn và phục hồi đẳng cấp tại Hi Medical Skincare & Beauty. Đặt lịch ngay hôm nay.',
  keywords: [
    'spa cao cấp',
    'skincare',
    'Hi Medical',
    'liệu trình làm đẹp',
    'midnight luxury spa',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Manrope:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body text-ink antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <FloatingWidgets />
      </body>
    </html>
  );
}

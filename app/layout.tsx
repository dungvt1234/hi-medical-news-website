import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingWidgets from '@/components/FloatingWidgets';

export const metadata: Metadata = {
  title: 'Tin tức & Sự kiện — Hi Medical Skincare & Beauty',
  description:
    'Cập nhật những xu hướng làm đẹp mới nhất, bí quyết chăm sóc da từ chuyên gia và các chương trình ưu đãi hấp dẫn tại Hi Medical Skincare & Beauty.',
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
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700;800&family=Be+Vietnam+Pro:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body text-ink antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
        <FloatingWidgets />
      </body>
    </html>
  );
}

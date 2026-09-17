import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingWidgets from '@/components/FloatingWidgets';
import FlipProvider from '@/components/FlipProvider';
import { SalonJsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  metadataBase: new URL('https://himedicalskin.com'),
  title: {
    default: 'Triệt lông, Trị nám & Spa tại Vũng Tàu | Hi Medical',
    template: '%s | Hi Medical',
  },
  description:
    'Hi Medical Skincare & Beauty — 49 Nguyễn Bỉnh Khiêm, Vũng Tàu. Triệt lông SMART OPT IDPL, trị mụn/nám, trẻ hoá chuẩn y khoa. Đặt lịch: 0799 390 790.',
  keywords: [
    'spa cao cấp',
    'skincare',
    'Hi Medical',
    'liệu trình làm đẹp',
    'lavender glow spa',
    'triệt lông TP.HCM',
    'trị nám TP.HCM',
    'chăm sóc da TP.HCM',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    siteName: 'Hi Medical Skincare & Beauty',
    title: 'Triệt lông, Trị nám & Spa tại Vũng Tàu | Hi Medical',
    description:
      'Trải nghiệm spa cao cấp tại Vũng Tàu — triệt lông, điều trị da và trẻ hoá chuẩn y khoa. Đặt lịch: 0799 390 790.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Hi Medical Skincare & Beauty' }],
  },
  twitter: {
    card: 'summary',
    title: 'Triệt lông, Trị nám & Spa tại Vũng Tàu | Hi Medical',
    description:
      'Triệt lông, trị nám, trẻ hoá và chăm sóc da chuẩn y khoa tại Vũng Tàu. Đặt lịch: 0799 390 790.',
    images: ['/og-image.jpg'],
  },
  robots: { index: true, follow: true },
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
        <SalonJsonLd />
        <FlipProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <FloatingWidgets />
        </FlipProvider>
      </body>
    </html>
  );
}

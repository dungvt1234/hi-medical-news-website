import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import Introduction from '@/components/Introduction';
import Treatments from '@/components/Treatments';
import SpaExperience from '@/components/SpaExperience';
import WhyUs from '@/components/WhyUs';
import RitualProcess from '@/components/RitualProcess';
import Testimonial from '@/components/Testimonial';
import Gallery from '@/components/Gallery';
import CTASection from '@/components/CTASection';

/**
 * Midnight Luxury Spa — Hi Medical Skincare & Beauty
 * Cấu trúc: Navbar → Hero → Introduction → Treatments → Experience
 * → Why Us → Ritual Process → Testimonial → Gallery → CTA → Footer
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <Introduction />
      <Treatments />
      <SpaExperience />
      <WhyUs />
      <RitualProcess />
      <Testimonial />
      <Gallery />
      <CTASection />
    </>
  );
}

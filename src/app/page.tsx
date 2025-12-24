import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { HeroSection } from '@/components/landing/hero-section';
import { AboutSection } from '@/components/landing/about-section';
import { MenuHighlightsSection } from '@/components/landing/menu-highlights-section';
import { GallerySection } from '@/components/landing/gallery-section';
import { TestimonialsSection } from '@/components/landing/testimonials-section';
import { BookingContactSection } from '@/components/landing/booking-contact-section';

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <MenuHighlightsSection />
        <GallerySection />
        <TestimonialsSection />
        <BookingContactSection />
      </main>
      <Footer />
    </div>
  );
}

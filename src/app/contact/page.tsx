import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { BookingContactSection } from '@/components/landing/booking-contact-section';

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <BookingContactSection />
      </main>
      <Footer />
    </div>
  );
}

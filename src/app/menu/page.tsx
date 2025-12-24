import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { MenuHighlightsSection } from '@/components/landing/menu-highlights-section';

export default function MenuPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <MenuHighlightsSection />
      </main>
      <Footer />
    </div>
  );
}

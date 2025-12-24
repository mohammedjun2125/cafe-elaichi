import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { GallerySection } from '@/components/landing/gallery-section';

export default function GalleryPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <GallerySection />
      </main>
      <Footer />
    </div>
  );
}

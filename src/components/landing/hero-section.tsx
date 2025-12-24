import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const heroImage = PlaceHolderImages.find(p => p.id === 'hero-bg');

export function HeroSection() {
  return (
    <section id="home" className="relative w-full h-[80vh] min-h-[500px] flex items-center justify-center">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          className="object-cover"
          priority
          data-ai-hint={heroImage.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative container px-4 md:px-6 text-center text-white z-10">
        <div className="space-y-4 max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl font-headline">
            Welcome to Cafe Elaichi
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/80">
             A Refreshing Café Experience with fresh beverages, signature chai, and a cozy ambiance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button asChild size="lg">
              <Link href="#menu">View Menu</Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href="#reservations">Book a Table</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

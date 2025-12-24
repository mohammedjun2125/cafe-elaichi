import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const galleryImages = PlaceHolderImages.filter(p => p.id.startsWith("gallery-"));

export function GallerySection() {
  return (
    <section id="gallery" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary font-medium">
              Moments
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Our Gallery
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Explore the ambiance, delectable treats, and happy moments captured at Cafe Elaichi.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
            {galleryImages.map((image, index) => (
                <div key={image.id} className={cn(
                    "group relative overflow-hidden rounded-xl",
                    index === 0 && "md:col-span-2 md:row-span-2",
                    index === 5 && "lg:col-span-2"
                )}>
                    <Image
                        src={image.imageUrl}
                        alt={image.description}
                        width={index === 0 ? 600 : 300}
                        height={index === 0 ? 600 : 300}
                        className="h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                        data-ai-hint={image.imageHint}
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
            ))}
        </div>
      </div>
    </section>
  );
}

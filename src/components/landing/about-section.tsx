import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Coffee, Leaf, Users, Wifi } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const features = [
  {
    icon: <Leaf className="h-8 w-8 text-primary" />,
    title: "Signature Elaichi Chai",
    description: "Experience our unique blend of spiced cardamom tea, a house specialty.",
  },
  {
    icon: <Coffee className="h-8 w-8 text-primary" />,
    title: "Diverse Menu",
    description: "From artisanal coffees to light bites, there's something for every palate.",
  },
  {
    icon: <Users className="h-8 w-8 text-primary" />,
    title: "Relaxing Vibe",
    description: "A perfect spot for friends, dates, or quiet work sessions.",
  },
  {
    icon: <Wifi className="h-8 w-8 text-primary" />,
    title: "Premium Ingredients",
    description: "We source the freshest ingredients for the highest quality taste.",
  },
];

const aboutImage = PlaceHolderImages.find(p => p.id === 'about-1');

export function AboutSection() {
  return (
    <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-secondary/50">
      <div className="container px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-4">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary font-medium">
              Our Story
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              More Than Just a Café
            </h2>
            <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Cafe Elaichi is a cozy, premium café with a focus on warm
              hospitality, quality beverages, and a relaxing environment. Our
              passion is to serve the perfect cup, whether it's our signature
              Elaichi chai, a rich espresso, or a refreshing smoothie.
            </p>
            <div className="grid gap-6 pt-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-4">
                  {feature.icon}
                  <div className="grid gap-1">
                    <h3 className="text-lg font-bold">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-center">
            {aboutImage && (
                <Image
                src={aboutImage.imageUrl}
                alt={aboutImage.description}
                width={550}
                height={550}
                className="mx-auto aspect-square overflow-hidden rounded-xl object-cover"
                data-ai-hint={aboutImage.imageHint}
                />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

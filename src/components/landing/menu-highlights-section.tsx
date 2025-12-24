import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const menuItems = [
  { id: "menu-1", category: "Signature Drinks", name: "Elaichi Chai", description: "Our classic spiced cardamom tea.", price: "4.50", imageHint: "chai tea" },
  { id: "menu-2", category: "Signature Drinks", name: "Artisanal Coffee", description: "Rich, aromatic, single-origin beans.", price: "5.00", imageHint: "latte art" },
  { id: "menu-3", category: "Signature Drinks", name: "Mango Lassi Smoothie", description: "A creamy yogurt and mango blend.", price: "6.00", imageHint: "fruit smoothie" },
  { id: "menu-4", category: "Snacks & Light Bites", name: "Avocado Toast", description: "Smashed avocado on sourdough.", price: "8.50", imageHint: "avocado toast" },
  { id: "menu-5", category: "Snacks & Light Bites", name: "Samosa Platter", description: "Crispy pastries with savory filling.", price: "7.00", imageHint: "indian food" },
  { id: "menu-6", category: "Desserts & Specials", name: "Pistachio Cake", description: "A slice of heaven with rose icing.", price: "6.50", imageHint: "cake slice" },
];

export function MenuHighlightsSection() {
  const itemsWithImages = menuItems.map(item => {
    const placeholder = PlaceHolderImages.find(p => p.id === item.id);
    return { ...item, imageUrl: placeholder?.imageUrl, imageDescription: placeholder?.description };
  });

  return (
    <section id="menu" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary font-medium">
              Our Menu
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Taste the Difference
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Handcrafted drinks, savory bites, and sweet treats made with the finest ingredients.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-10">
          {itemsWithImages.map((item) => (
            <Card key={item.id} className="flex flex-col overflow-hidden group">
              {item.imageUrl && (
                <div className="overflow-hidden">
                    <Image
                        src={item.imageUrl}
                        alt={item.imageDescription || item.name}
                        width={400}
                        height={250}
                        className="w-full h-48 object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                        data-ai-hint={item.imageHint}
                    />
                </div>
              )}
              <CardHeader>
                <CardTitle>{item.name}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow" />
              <CardFooter className="flex justify-between items-center">
                <span className="text-lg font-semibold text-primary">${item.price}</span>
                <Button variant="ghost">Add to Order</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="mt-12 text-center">
            <Button size="lg" asChild>
                <Link href="#">Explore Full Menu</Link>
            </Button>
        </div>
      </div>
    </section>
  );
}

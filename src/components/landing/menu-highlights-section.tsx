import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCart, type CartItem } from "@/context/cart-context";
import { useToast } from "@/hooks/use-toast";

const menuCategories = [
  {
    name: "Chai",
    items: [
      { id: "menu-1", name: "Elaichi Chai", description: "Our classic spiced cardamom tea.", price: 150, imageHint: "chai tea" },
      { id: "menu-7", name: "Masala Chai", description: "Traditional spiced milk tea.", price: 160, imageHint: "masala chai" },
      { id: "menu-8", name: "Ginger Chai", description: "Zesty and warming ginger-infused tea.", price: 160, imageHint: "ginger tea" },
    ]
  },
  {
    name: "Coffee",
    items: [
      { id: "menu-2", name: "Artisanal Coffee", description: "Rich, aromatic, single-origin beans.", price: 180, imageHint: "latte art" },
      { id: "menu-9", name: "Espresso", description: "A strong and bold shot of coffee.", price: 120, imageHint: "espresso shot" },
      { id: "menu-10", name: "Cappuccino", description: "Espresso with steamed milk foam.", price: 200, imageHint: "cappuccino cup" },
    ]
  },
  {
    name: "Pizza",
    items: [
      { id: "menu-11", name: "Margherita Pizza", description: "Classic tomato, mozzarella, and basil.", price: 450, imageHint: "margherita pizza" },
      { id: "menu-12", name: "Pepperoni Pizza", description: "A crowd-pleasing favorite.", price: 550, imageHint: "pepperoni pizza" },
      { id: "menu-13", name: "Veggie Pizza", description: "Loaded with fresh vegetables.", price: 500, imageHint: "veggie pizza" },
    ]
  },
  {
    name: "Drinks",
    items: [
       { id: "menu-3", name: "Mango Lassi Smoothie", description: "A creamy yogurt and mango blend.", price: 220, imageHint: "fruit smoothie" },
       { id: "menu-14", name: "Fresh Juice", description: "Seasonal fresh-pressed juice.", price: 180, imageHint: "fresh juice" },
       { id: "menu-15", name: "Iced Tea", description: "Refreshing and cool.", price: 140, imageHint: "iced tea" },
    ]
  },
  {
    name: "Pastas",
    items: [
      { id: "menu-16", name: "Penne Alfredo", description: "Creamy white sauce pasta.", price: 400, imageHint: "alfredo pasta" },
      { id: "menu-17", name: "Spaghetti Bolognese", description: "Rich meat sauce with spaghetti.", price: 450, imageHint: "spaghetti bolognese" },
      { id: "menu-18", name: "Pesto Pasta", description: "Basil pesto with pine nuts.", price: 420, imageHint: "pesto pasta" },
    ]
  }
];

const menuHighlights = [
  { id: "menu-1", category: "Signature Drinks", name: "Elaichi Chai", description: "Our classic spiced cardamom tea.", price: 150, imageHint: "chai tea" },
  { id: "menu-2", category: "Signature Drinks", name: "Artisanal Coffee", description: "Rich, aromatic, single-origin beans.", price: 180, imageHint: "latte art" },
  { id: "menu-3", category: "Signature Drinks", name: "Mango Lassi Smoothie", description: "A creamy yogurt and mango blend.", price: 220, imageHint: "fruit smoothie" },
  { id: "menu-4", category: "Snacks & Light Bites", name: "Avocado Toast", description: "Smashed avocado on sourdough.", price: 300, imageHint: "avocado toast" },
  { id: "menu-5", category: "Snacks & Light Bites", name: "Samosa Platter", description: "Crispy pastries with savory filling.", price: 250, imageHint: "indian food" },
  { id: "menu-6", category: "Desserts & Specials", name: "Pistachio Cake", description: "A slice of heaven with rose icing.", price: 280, imageHint: "cake slice" },
];


export function MenuHighlightsSection({ isMenuPage = false }: { isMenuPage?: boolean }) {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (item: Omit<CartItem, 'quantity'>) => {
    addToCart({ ...item, quantity: 1 });
    toast({
      title: "Added to cart",
      description: `${item.name} has been added to your order.`,
    });
  };

  const itemsToDisplay = isMenuPage ? menuCategories.flatMap(c => c.items) : menuHighlights;

  const itemsWithImages = itemsToDisplay.map(item => {
    const placeholder = PlaceHolderImages.find(p => p.id === item.id);
    return { ...item, imageUrl: placeholder?.imageUrl, imageDescription: placeholder?.description };
  });

  const renderMenuItemCard = (item: (typeof itemsWithImages)[0]) => (
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
        <span className="text-lg font-semibold text-primary">₹{item.price}</span>
        <Button variant="ghost" onClick={() => handleAddToCart({id: item.id, name: item.name, price: item.price, image: item.imageUrl})}>Add to Order</Button>
      </CardFooter>
    </Card>
  );

  if (isMenuPage) {
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
          <Tabs defaultValue={menuCategories[0].name.toLowerCase()} className="mt-10">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-5">
              {menuCategories.map(category => (
                <TabsTrigger key={category.name} value={category.name.toLowerCase()}>{category.name}</TabsTrigger>
              ))}
            </TabsList>
            {menuCategories.map(category => (
              <TabsContent key={category.name} value={category.name.toLowerCase()}>
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-6">
                  {category.items.map(item => {
                     const itemWithImage = itemsWithImages.find(i => i.id === item.id);
                     return itemWithImage ? renderMenuItemCard(itemWithImage) : null;
                  })}
                 </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>
    )
  }


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
          {itemsWithImages.map(renderMenuItemCard)}
        </div>
        <div className="mt-12 text-center">
            <Button size="lg" asChild>
                <Link href="/menu">Explore Full Menu</Link>
            </Button>
        </div>
      </div>
    </section>
  );
}

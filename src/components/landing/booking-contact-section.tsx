import { ContactForm } from "@/components/contact-form";
import { ReservationForm } from "@/components/reservation-form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const mapImage = PlaceHolderImages.find(p => p.id === 'location-map');

export function BookingContactSection() {
  return (
    <section id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-secondary/50">
      <div className="container px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-8">
             <div className="space-y-2 text-center lg:text-left">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Visit or Contact Us</h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed mx-auto lg:mx-0">
                    We'd love to hear from you or see you at our café.
                </p>
            </div>
            
            {mapImage && (
                <Card className="overflow-hidden">
                    <CardContent className="p-0">
                        <Image
                            src={mapImage.imageUrl}
                            alt="Map to Cafe Elaichi"
                            width={800}
                            height={400}
                            className="w-full aspect-video object-cover"
                            data-ai-hint={mapImage.imageHint}
                        />
                    </CardContent>
                </Card>
            )}

            <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                    <h3 className="font-semibold text-lg flex items-center gap-2"><MapPin className="text-primary"/> Address</h3>
                    <p className="text-muted-foreground">123 Chai Lane, Flavor Town, FT 54321</p>
                </div>
                 <div className="space-y-2">
                    <h3 className="font-semibold text-lg flex items-center gap-2"><Phone className="text-primary"/> Phone</h3>
                    <p className="text-muted-foreground">(123) 456-7890</p>
                </div>
                 <div className="space-y-2">
                    <h3 className="font-semibold text-lg flex items-center gap-2"><Mail className="text-primary"/> Email</h3>
                    <p className="text-muted-foreground">contact@cafeelaichi.com</p>
                </div>
                 <div className="space-y-2">
                    <h3 className="font-semibold text-lg">Operating Hours</h3>
                    <p className="text-muted-foreground">Mon - Fri: 7am - 7pm</p>
                    <p className="text-muted-foreground">Sat - Sun: 8am - 8pm</p>
                </div>
            </div>
             <Separator />
            <Card>
                <CardHeader>
                    <CardTitle>Get in Touch</CardTitle>
                    <CardDescription>Have a question or feedback? Let us know.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ContactForm />
                </CardContent>
            </Card>

          </div>
          <div className="flex flex-col justify-center space-y-4" id="reservations">
            <Card className="lg:sticky lg:top-24">
                <CardHeader>
                    <CardTitle className="text-2xl">Book a Table</CardTitle>
                    <CardDescription>Reserve your spot for a cozy café experience.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ReservationForm />
                </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

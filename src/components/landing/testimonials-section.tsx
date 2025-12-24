"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { StarIcon } from "@/components/icons";

const testimonials = [
  {
    name: "Sarah L.",
    avatar: "SL",
    image: "https://picsum.photos/seed/avatar1/40/40",
    rating: 5,
    review: "The Elaichi Chai is absolutely divine! The cozy atmosphere makes it the perfect place to unwind after a long day. I can't recommend it enough.",
  },
  {
    name: "Michael B.",
    avatar: "MB",
    image: "https://picsum.photos/seed/avatar2/40/40",
    rating: 5,
    review: "A true gem! I had a work session here and the Wi-Fi was fast, the coffee was strong, and the staff were incredibly friendly. My new favorite spot.",
  },
  {
    name: "Jessica P.",
    avatar: "JP",
    image: "https://picsum.photos/seed/avatar3/40/40",
    rating: 4,
    review: "Lovely place for a date. The lighting is just right and the desserts are to die for. We tried the pistachio cake and it was heavenly.",
  },
  {
    name: "David C.",
    avatar: "DC",
    image: "https://picsum.photos/seed/avatar4/40/40",
    rating: 5,
    review: "Finally, a cafe that understands what 'premium' means. From the quality of the ingredients to the excellent service, everything was top-notch.",
  },
];

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-0.5 text-primary">
    {[...Array(5)].map((_, i) => (
      <StarIcon
        key={i}
        className={`h-5 w-5 ${i < rating ? "fill-current" : ""}`}
      />
    ))}
  </div>
);

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary font-medium">
              Reviews
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              What Our Customers Say
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              We pride ourselves on providing an exceptional experience. Here's what our patrons have to say.
            </p>
          </div>
        </div>
        <Carousel
          opts={{ align: "start", loop: true }}
          className="w-full max-w-4xl mx-auto mt-10"
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1 h-full">
                  <Card className="h-full flex flex-col">
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <Avatar>
                          <AvatarImage src={testimonial.image} alt={testimonial.name} />
                          <AvatarFallback>{testimonial.avatar}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold">{testimonial.name}</p>
                          <StarRating rating={testimonial.rating} />
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-muted-foreground">
                        "{testimonial.review}"
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
      </div>
    </section>
  );
}

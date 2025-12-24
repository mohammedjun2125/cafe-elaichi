
'use client';

import Image from 'next/image';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { useCart } from '@/context/cart-context';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

function PaymentIcon({ name }: { name: string }) {
    // In a real app, you'd use actual icons.
    // For now, this is a placeholder.
    return <span className="text-2xl font-bold">{name}</span>;
}

export default function CheckoutPage() {
  const { cartItems, totalPrice, cartItems: { length: cartItemCount } } = useCart();

  return (
    <div className="flex min-h-screen flex-col bg-secondary/50">
      <Header />
      <main className="flex-1 py-12 md:py-16 lg:py-20">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-lg">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Confirm Your Order</CardTitle>
                <CardDescription>
                  Review your items and proceed to payment.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {cartItemCount > 0 ? (
                  <>
                    <div className="space-y-4 max-h-64 overflow-y-auto pr-2">
                        {cartItems.map((item) => (
                            <div key={item.id} className="flex items-center gap-4">
                                <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
                                    {item.image ? (
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            fill
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="h-full w-full bg-secondary" />
                                    )}
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold">{item.name}</h3>
                                    <p className="text-sm text-muted-foreground">
                                        {item.quantity} x ₹{item.price.toFixed(2)}
                                    </p>
                                </div>
                                <p className="font-semibold">
                                    ₹{(item.price * item.quantity).toFixed(2)}
                                </p>
                            </div>
                        ))}
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>₹{totalPrice.toFixed(2)}</span>
                    </div>
                  </>
                ) : (
                    <div className="text-center text-muted-foreground py-8">
                        Your cart is empty.
                    </div>
                )}
              </CardContent>
              {cartItemCount > 0 && (
                <CardFooter className="flex-col items-stretch gap-4">
                    <p className="text-center text-sm text-muted-foreground">Choose a payment method</p>
                    <div className="grid grid-cols-3 gap-4">
                        <Button variant="outline" className="h-20 flex-col gap-2">
                             <PaymentIcon name="GPay" />
                             <span>Google Pay</span>
                        </Button>
                         <Button variant="outline" className="h-20 flex-col gap-2">
                             <PaymentIcon name="PP" />
                             <span>PhonePe</span>
                        </Button>
                         <Button variant="outline" className="h-20 flex-col gap-2">
                             <PaymentIcon name="Paytm" />
                             <span>Paytm</span>
                        </Button>
                    </div>
                    <Button size="lg" className="w-full">Pay Now</Button>
                </CardFooter>
              )}
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

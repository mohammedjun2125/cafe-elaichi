'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { useCart } from '@/context/cart-context';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

type PaymentMethod = 'gpay' | 'phonepe' | 'paytm';

function PaymentIcon({ name }: { name: string }) {
    // In a real app, you'd use actual icons.
    // For now, this is a placeholder.
    return <span className="text-2xl font-bold">{name}</span>;
}

export default function CheckoutPage() {
  const { cartItems, totalPrice, cartItems: { length: cartItemCount } } = useCart();
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod | null>(null);
  const { toast } = useToast();

  const handlePayment = () => {
    if (!selectedPayment) {
      toast({
        variant: "destructive",
        title: "No payment method selected",
        description: "Please choose a payment method to proceed.",
      });
      return;
    }

    // --- IMPORTANT ---
    // In a real application, you should also verify the payment on a backend server.
    const upiId = '7995849217@naviaxis';
    const payeeName = 'Cafe Elaichi';
    const transactionId = `ELAICHI-${Date.now()}`; // Generate a unique ID for each transaction
    const transactionNote = 'Order from Cafe Elaichi';

    let paymentUrl = '';

    switch (selectedPayment) {
      case 'gpay':
        paymentUrl = `gpay://upi/pay?pa=${upiId}&pn=${encodeURIComponent(payeeName)}&tr=${transactionId}&tn=${encodeURIComponent(transactionNote)}&am=${totalPrice.toFixed(2)}&cu=INR`;
        break;
      case 'phonepe':
        paymentUrl = `phonepe://pay?pa=${upiId}&pn=${encodeURIComponent(payeeName)}&tr=${transactionId}&tn=${encodeURIComponent(transactionNote)}&am=${totalPrice.toFixed(2)}&cu=INR`;
        break;
      case 'paytm':
        paymentUrl = `paytmmp://pay?pa=${upiId}&pn=${encodeURIComponent(payeeName)}&tr=${transactionId}&tn=${encodeURIComponent(transactionNote)}&am=${totalPrice.toFixed(2)}&cu=INR`;
        break;
    }

    // On mobile, this will attempt to open the corresponding payment app.
    // On desktop, it will likely do nothing.
    window.location.href = paymentUrl;

    // You should also have a backend service to verify the payment status
    // using the transactionId. This part is not implemented here.
  };

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
                    <RadioGroup 
                        value={selectedPayment || ''} 
                        onValueChange={(value) => setSelectedPayment(value as PaymentMethod)}
                        className="grid grid-cols-3 gap-4"
                    >
                        <Label htmlFor="gpay" className={cn(
                            "flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer",
                            selectedPayment === 'gpay' && "border-primary"
                        )}>
                            <RadioGroupItem value="gpay" id="gpay" className="sr-only" />
                            <PaymentIcon name="GPay" />
                            <span className="mt-2 text-sm font-medium">Google Pay</span>
                        </Label>
                        <Label htmlFor="phonepe" className={cn(
                            "flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer",
                             selectedPayment === 'phonepe' && "border-primary"
                        )}>
                            <RadioGroupItem value="phonepe" id="phonepe" className="sr-only" />
                             <PaymentIcon name="PP" />
                             <span className="mt-2 text-sm font-medium">PhonePe</span>
                        </Label>
                        <Label htmlFor="paytm" className={cn(
                            "flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer",
                             selectedPayment === 'paytm' && "border-primary"
                        )}>
                            <RadioGroupItem value="paytm" id="paytm" className="sr-only" />
                             <PaymentIcon name="Paytm" />
                             <span className="mt-2 text-sm font-medium">Paytm</span>
                        </Label>
                    </RadioGroup>
                    <Button size="lg" className="w-full" onClick={handlePayment}>Pay Now</Button>
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

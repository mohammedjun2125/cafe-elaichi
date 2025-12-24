"use client";

import Image from "next/image";
import { useCart } from "@/context/cart-context";
import { Button } from "@/components/ui/button";
import { SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Minus, Plus, Trash2 } from "lucide-react";

export function Cart() {
  const { cartItems, removeFromCart, updateQuantity, clearCart, totalPrice } = useCart();

  return (
    <div className="flex h-full flex-col">
      <SheetHeader>
        <SheetTitle>My Order ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})</SheetTitle>
      </SheetHeader>
      <Separator className="my-4" />
      {cartItems.length > 0 ? (
        <>
          <ScrollArea className="flex-1 pr-4">
            <div className="flex flex-col gap-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-4">
                  <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md">
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
                    <p className="text-sm text-muted-foreground">₹{item.price}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 0)}
                        className="h-6 w-12 text-center"
                        min="0"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </ScrollArea>
          <Separator className="my-4" />
          <SheetFooter className="sm:flex-col sm:space-x-0">
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>₹{totalPrice.toFixed(2)}</span>
            </div>
            <Button className="w-full mt-4">Proceed to Checkout</Button>
            <Button variant="outline" className="w-full mt-2" onClick={clearCart}>
                Clear Cart
            </Button>
          </SheetFooter>
        </>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center text-center">
            <h3 className="text-lg font-semibold">Your cart is empty</h3>
            <p className="text-muted-foreground text-sm mt-1">Add some items from the menu to get started.</p>
        </div>
      )}
    </div>
  );
}

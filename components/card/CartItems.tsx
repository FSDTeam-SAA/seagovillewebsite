"use client";
import { useCart } from "@/hooks/use-cart";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { ArrowLeft, Clock, ShoppingCart } from "lucide-react";
import { CartItemCard } from "./cart-item-card";

const CartItems = () => {
  const { cart, removeItem, updateQuantity, totalPrice, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <div className="flex-1 flex items-center justify-center py-20">
          <div className="text-center">
            <ShoppingCart className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
            <p className="text-muted-foreground mb-8 max-w-md">
              Start building your perfect pizza or browse our menu to get
              started
            </p>

            <div className="flex gap-4 justify-center">
              <Link href="/menu">
                <Button variant="outline">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Menu
                </Button>
              </Link>
              <Link href="/builder">
                <Button className="bg-primary hover:bg-primary/90">
                  Build Pizza
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
  console.log("cart images", cart);
  return (
    <section>
      <div className="container mx-auto">
        <div className="text-center from-primary/10 to-accent/10 py-8 md:py-12">
          <div className=" mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-sm font-medium text-[#D62828] bg-[#FBEAEA] border py-2 px-4 rounded-sm  inline-block border-[#F2BCBC]  tracking-wider leading-[150%]">
              Quick & Easy
            </p>
            <div className="flex items-center justify-center gap-3 mb-4">
              <ShoppingCart className="w-8 h-8 text-primary" />
              <h1 className="text-2xl md:text-3xl  font-bold font-lobster text-secondary">
                Order Online
              </h1>
            </div>
            <p className="text-gary  text-xs md:text-sm font-normal leading-tight ">
              Complete your order in just a few clicks
            </p>
          </div>
        </div>

        <div className="py-8 md:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="bg-card rounded-lg border border-border p-6">
                  <h2 className="text-2xl font-bold mb-6">
                    Your Cart ({cart.length} items)
                  </h2>

                  <div>
                    {cart.map((item) => (
                      <CartItemCard
                        key={item.id}
                        item={item}
                        onUpdateQuantity={(quantity) =>
                          updateQuantity(item.id, quantity)
                        }
                        onRemove={() => removeItem(item.id)}
                      />
                    ))}
                  </div>

                  <div className="mt-6 pt-6 border-t border-border flex gap-4">
                    <Link href="/menu" className="flex-1">
                      <Button
                        variant="outline"
                        className="w-full bg-transparent"
                      >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Continue Shopping
                      </Button>
                    </Link>
                    <Button
                      onClick={clearCart}
                      variant="ghost"
                      className="text-destructive hover:bg-destructive/10"
                    >
                      Clear Cart
                    </Button>
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 bg-card rounded-lg border border-border p-6">
                  <h3 className="text-xl font-bold mb-6">Order Summary</h3>

                  <div className="space-y-4 mb-6 pb-6 border-b border-border">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Tax (8%)</span>
                      <span>${(totalPrice * 0.08).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Delivery</span>
                      <span>Free</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mb-6">
                    <span className="font-bold">Total</span>
                    <span className="text-2xl font-bold text-primary">
                      ${(totalPrice * 1.08).toFixed(2)}
                    </span>
                  </div>

                  <Link href="/checkout" className="block">
                    <Button
                      size="lg"
                      className="w-full bg-[#D62828] hover:bg-[#d62828f6] cursor-pointer"
                    >
                      Proceed to Checkout
                    </Button>
                  </Link>

                  {cart.map((item, inex) => (
                    <div key={inex}>
                      <p className="text-sm md:text-base text- text-[#1F9854] text-start mt-4 flex gap-1 ">
                        <Clock />
                        {item.name}: {item.time ? `${item.time}` : "45"} minutes
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CartItems;

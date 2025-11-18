/* eslint-disable react-hooks/purity */
/**
 * Checkout page - Delivery details and order confirmation
 */

"use client";

import type React from "react";

import { useState } from "react";

import { Button } from "@/components/ui/button";

import { MapPin, Clock, CreditCard } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import Link from "next/link";

import { Footer } from "@/components/shared/footer";

export default function CheckoutPage() {
  const { cart, totalPrice, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
    instructions: "",
  });

  if (cart.length === 0) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-lg mb-4">Your cart is empty</p>
            <Link href="/menu">
              <Button>Back to Menu</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setOrderPlaced(true);
    setLoading(false);
    clearCart();
  };

  if (orderPlaced) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <div className="flex-1 flex items-center justify-center py-20">
          <div className="text-center max-w-md">
            <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-3xl mx-auto mb-6">
              ✓
            </div>
            <h1 className="text-3xl font-bold mb-4">Order Confirmed!</h1>
            <p className="text-muted-foreground mb-8">
              Thank you for your order. Your delicious pizza will be delivered
              in 30-40 minutes.
            </p>

            <div className="bg-card border border-border rounded-lg p-6 mb-8 text-left">
              <p className="text-sm text-muted-foreground mb-2">Order Number</p>
              <p className="text-2xl font-bold font-mono">
                #SGP{Math.random().toString(36).substring(7).toUpperCase()}
              </p>
            </div>

            <div className="space-y-4 text-left mb-8">
              <div className="flex gap-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">
                    Delivery Address
                  </p>
                  <p className="font-semibold">{formData.address}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">
                    Estimated Delivery
                  </p>
                  <p className="font-semibold">30-40 minutes</p>
                </div>
              </div>
            </div>

            <Link href="/">
              <Button
                size="lg"
                className="w-full bg-primary hover:bg-primary/90"
              >
                Back to Home
              </Button>
            </Link>
          </div>
        </div>

        <Footer />
      </div>
    );
  }

  const tax = totalPrice * 0.08;
  const total = totalPrice + tax;

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <section className="bg-gradient-to-r from-primary/10 to-accent/10 py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Checkout</h1>
          <p className="text-muted-foreground">
            Complete your delivery details
          </p>
        </div>
      </section>

      <section className="py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Delivery Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Delivery Details */}
                <div className="bg-card border border-border rounded-lg p-6">
                  <h2 className="text-xl font-bold mb-6">Delivery Details</h2>

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="+1 (555) 000-0000"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Address
                        </label>
                        <input
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="123 Main Street"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          City
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="Seagoville"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Zip Code
                        </label>
                        <input
                          type="text"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="75159"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Special Instructions (Optional)
                      </label>
                      <textarea
                        name="instructions"
                        value={formData.instructions}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                        rows={3}
                        placeholder="Any special instructions for delivery..."
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="bg-card border border-border rounded-lg p-6">
                  <h2 className="text-xl font-bold mb-6">Payment Method</h2>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 p-4 border-2 border-primary bg-primary/10 rounded-lg cursor-pointer">
                      <input
                        type="radio"
                        name="payment"
                        value="card"
                        defaultChecked
                        className="w-4 h-4"
                      />
                      <div className="flex items-center gap-2">
                        <CreditCard className="w-5 h-5" />
                        <span className="font-semibold">Credit/Debit Card</span>
                      </div>
                    </label>
                    <label className="flex items-center gap-3 p-4 border-2 border-border rounded-lg cursor-pointer hover:border-primary/50">
                      <input
                        type="radio"
                        name="payment"
                        value="cash"
                        className="w-4 h-4"
                      />
                      <span className="font-semibold">Cash on Delivery</span>
                    </label>
                  </div>

                  <div className="mt-6 p-4 bg-secondary/50 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-4">
                      For this demo, payments are simulated. In production,
                      integrate with Stripe or another payment processor.
                    </p>
                  </div>
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  disabled={loading}
                  size="lg"
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  {loading ? "Processing..." : "Place Order"}
                </Button>
              </form>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-card border border-border rounded-lg p-6">
                <h3 className="text-xl font-bold mb-6">Order Summary</h3>

                <div className="space-y-3 mb-6 pb-6 border-b border-border max-h-64 overflow-y-auto">
                  {cart.map((item) => (
                    <div key={String(item.id)} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {item.name} x{item.quantity}
                      </span>
                      <span className="font-medium">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 mb-6 pb-6 border-b border-border">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax (8%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Delivery</span>
                    <span>Free</span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="font-bold">Total</span>
                  <span className="text-2xl font-bold text-primary">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

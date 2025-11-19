/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/purity */
/**
 * Checkout page - Delivery details and order confirmation
 */

"use client";

import type React from "react";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

import { MapPin, Clock } from "lucide-react";

import Link from "next/link";

import { useMutation, useQuery } from "@tanstack/react-query";
import { getCartItems, newOrder, payment } from "@/lib/api";
import { useCart } from "@/context/cartContext";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import StripePayment from "../StripePayment";
import { PaymentData } from "@/lib/cartType";

interface DeliveryDetails {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
  note: string;
}

interface OrderItem {
  cartId: string;
  quantity: number;
  totalPrice: number;
}

export default function CheckoutPage() {
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState<string>('');
  const searchParams = useSearchParams();
  const [promoCode, setPromoCode] = useState('');
  const [paymentData,setPyementData]=useState<PaymentData |null>(null)
  const [formData, setFormData] = useState<DeliveryDetails>({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
    note: "",
  });

  useEffect(() => {
    const couponCode = searchParams.get('couponCode');
    if (couponCode) {
      setPromoCode(couponCode);
    }
  }, []);

  const { data: cart = [] } = useQuery({
    queryKey: ['cart'],
    queryFn: () => getCartItems()
  });

  const { orderData } = useCart();

  // Payment mutation
  const paymentMutation = useMutation({
    mutationFn: payment,
    onSuccess: (data) => {
      setLoading(false);
      toast.success(`${data.message}`);
      setPyementData({
        clientSecret: data?.data?.clientSecret,
        paymentId: data?.data?.paymentId,
      })
      
      // i want to this filed use stripe my clientsecrect and paymentorderid in here: paymentData
      setOrderPlaced(true);
    },
    onError: (error: Error) => {
      setLoading(false);
      toast.error(error.message || "Payment failed");
    }
  });

  console.log('payment data',paymentData)

  // Order mutation
  const ordersMutation = useMutation({
    mutationFn: newOrder,
    onSuccess: (data) => {
      console.log('Order created successfully:', data);
      
      // Extract order ID from response
      const createdOrderId = data?.data?._id || data?.data?.id;
      
      if (createdOrderId) {
        setOrderId(createdOrderId);
        
        // Process payment after order is created
        paymentMutation.mutate(createdOrderId);
      } else {
        setLoading(false);
        toast.error("Order created but no order ID received");
      }
    },
    onError: (error: Error) => {
      setLoading(false);
      toast.error(error.message || "Failed to place order");
    }
  });

  // Calculate total from cart items
  const total = cart.reduce((sum: number, item: any) => sum + (item.totalPrice || 0), 0);

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

    // Prepare order data according to backend API
    const orderPayload = {
      type: "multi",
      ...(promoCode && { couponCode: promoCode }),
      cart: orderData.length > 0 ? orderData : cart.map((item: any) => ({
        cartId: item._id,
        quantity: item.quantity,
        totalPrice: item.totalPrice
      })),
      deliveryDetails: {
        fullName: formData.fullName,
        email: formData.email,
        address: formData.address,
        phone: formData.phone,
        note: formData.note
      }
    };

    console.log('Order payload:', orderPayload);
    ordersMutation.mutate(orderPayload);
  };
   if (paymentData?.clientSecret) {
        return (
          <div className="max-w-lg mx-auto mt-20">
            <h1 className="text-2xl font-bold mb-4 text-center">Complete Payment</h1>

            <StripePayment clientSecret={paymentData.clientSecret} />
          </div>
        );
      }
  // if (orderPlaced) {
  //   return (
  //     <div className="flex flex-col min-h-screen bg-background">
  //       <div className="flex-1 flex items-center justify-center py-20">
  //         <div className="text-center max-w-md">
  //           <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-3xl mx-auto mb-6">
  //             ✓
  //           </div>
  //           <h1 className="text-3xl font-bold mb-4">Order Confirmed!</h1>
  //           <p className="text-muted-foreground mb-8">
  //             Thank you for your order. Your delicious pizza will be delivered
  //             in 30-40 minutes.
  //           </p>

  //           <div className="bg-card border border-border rounded-lg p-6 mb-8 text-left">
  //             <p className="text-sm text-muted-foreground mb-2">Order Number</p>
  //             <p className="text-2xl font-bold font-mono">
  //               {orderId ? `#${orderId}` : `#SGP${Math.random().toString(36).substring(7).toUpperCase()}`}
  //             </p>
  //           </div>

  //           <div className="space-y-4 text-left mb-8">
  //             <div className="flex gap-3">
  //               <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
  //               <div>
  //                 <p className="text-sm text-muted-foreground">
  //                   Delivery Address
  //                 </p>
  //                 <p className="font-semibold">{formData.address}</p>
  //               </div>
  //             </div>
  //             <div className="flex gap-3">
  //               <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
  //               <div>
  //                 <p className="text-sm text-muted-foreground">
  //                   Estimated Delivery
  //                 </p>
  //                 <p className="font-semibold">30-40 minutes</p>
  //               </div>
  //             </div>
  //           </div>

  //           <Link href="/">
  //             <Button
  //               size="lg"
  //               className="w-full bg-primary hover:bg-primary/90"
  //             >
  //               Back to Home
  //             </Button>
  //           </Link>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

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
                        name="note"
                        value={formData.note}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                        rows={3}
                        placeholder="Any special instructions for delivery..."
                      />
                    </div>
                  </div>
                </div>

                {/* Promo Code Display */}
                {promoCode && (
                  <div className="bg-card border border-border rounded-lg p-6">
                    <h2 className="text-xl font-bold mb-4">Promo Code Applied</h2>
                    <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                      <span className="text-green-700 font-medium">{promoCode}</span>
                      <span className="text-green-600">✓ Applied</span>
                    </div>
                  </div>
                )}

                {/* Submit */}
                <Button
                  type="submit"
                  disabled={loading || ordersMutation.isPending || paymentMutation.isPending}
                  size="lg"
                  className="w-full bg-[#D62828] cursor-pointer hover:bg-[#ff7878]"
                >
                  {loading || ordersMutation.isPending || paymentMutation.isPending 
                    ? "Processing..." 
                    : "Place Order"}
                </Button>
              </form>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-card border border-border rounded-lg p-6">
                <h3 className="text-xl font-bold mb-6">Order Summary</h3>

                <div className="space-y-3 mb-6 pb-6 border-b border-border max-h-64 overflow-y-auto">
                  {cart.map((item: any) => (
                    <div key={item._id} className="flex justify-between text-sm">
                      <div>
                        <span className="font-medium">
                          {item.type === 'menu' && item.menu ? item.menu.menuId.name : 'Custom Pizza'}
                        </span>
                        <span className="text-muted-foreground ml-2">
                          x{item.quantity}
                        </span>
                      </div>
                      <span className="font-medium">
                        ${item.totalPrice.toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 mb-6 pb-6 border-b border-border">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  
                  {promoCode && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Promo Code ({promoCode})</span>
                      <span>-${(total * 0.05).toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax (8%)</span>
                    <span>${(total * 0.08).toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Delivery</span>
                    <span>Free</span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="font-bold">Total</span>
                  <span className="text-2xl font-bold text-primary">
                    ${(total + (total * 0.08)).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
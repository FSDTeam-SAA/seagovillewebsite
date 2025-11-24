"use client";
import Link from "next/link";
import React, { useState, useMemo } from "react";
import { Button } from "../ui/button";
import { ArrowLeft, Clock, ShoppingCart } from "lucide-react";
import { CartItemCard } from "./cart-item-card";
import { Input } from "../ui/input";
import { toast } from "sonner";
import {
  decrementCartItem,
  getCartItems,
  incrementCartItem,
  removeCartItem,
} from "@/lib/api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { CartItem } from "@/lib/cartType";

const CartItems = () => {
  const queryClient = useQueryClient();
  const [promoCode, setPromo] = useState("");
  const [optimisticCart, setOptimisticCart] = useState<CartItem[]>([]);

  // Fetch cart items
  const { data: cart = [], isLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: getCartItems,
  });

  // Derive optimisticCart from cart data (no useEffect needed)
  const derivedOptimisticCart = useMemo(() => {
    return cart.length > 0 ? cart : optimisticCart;
  }, [cart, optimisticCart]);

  // Derive orderData from optimisticCart (no useEffect needed)
  // const orderData = useMemo(() => {
  //   return derivedOptimisticCart.map((item: { _id: string; quantity: number; totalPrice: number; }) => ({
  //     cartId: item._id,
  //     quantity: item.quantity,
  //     totalPrice: item.totalPrice
  //   }));
  // }, [derivedOptimisticCart]);
  // Remove item mutation
  const removeItemMutation = useMutation({
    mutationFn: removeCartItem,
    onMutate: async (itemId: string) => {
      // Optimistically update UI
      setOptimisticCart((prev) => prev.filter((item) => item._id !== itemId));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success("Item removed from cart");
    },
    onError: (error: Error, itemId: string) => {
      // Revert optimistic update on error
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.error(error.message);
    },
  });

  // Increment quantity mutation
  const incrementMutation = useMutation({
    mutationFn: incrementCartItem,
    onMutate: async (itemId: string) => {
      // Optimistically update UI
      setOptimisticCart((prev) =>
        prev.map((item) =>
          item._id === itemId
            ? {
                ...item,
                quantity: item.quantity + 1,
                totalPrice: calculateNewTotalPrice(item, "increment"),
              }
            : item
        )
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error: Error) => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.error(error.message);
    },
  });

  // Decrement quantity mutation
  const decrementMutation = useMutation({
    mutationFn: decrementCartItem,
    onMutate: async (itemId: string) => {
      // Optimistically update UI
      setOptimisticCart((prev) =>
        prev.map((item) =>
          item._id === itemId && item.quantity > 1
            ? {
                ...item,
                quantity: item.quantity - 1,
                totalPrice: calculateNewTotalPrice(item, "decrement"),
              }
            : item
        )
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error: Error) => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.error(error.message);
    },
  });

  // Helper function to calculate new total price
  const calculateNewTotalPrice = (
    item: CartItem,
    operation: "increment" | "decrement"
  ): number => {
    if (item.type === "menu" && item.menu) {
      const basePrice = getBasePrice(item);
      const newQuantity =
        operation === "increment" ? item.quantity + 1 : item.quantity - 1;
      return basePrice * newQuantity;
    } else if (item.type === "ownPizza" && item.ownPizzaId) {
      const basePrice = item.ownPizzaId.totalPrice / item.quantity;
      const newQuantity =
        operation === "increment" ? item.quantity + 1 : item.quantity - 1;
      return basePrice * newQuantity;
    }
    return item.totalPrice;
  };

  // Helper function to get base price for menu items
  const getBasePrice = (item: CartItem): number => {
    if (item.type === "menu" && item.menu) {
      return item.totalPrice / item.quantity;
    }
    return item.totalPrice / item.quantity;
  };

  const removeItem = (itemId: string) => {
    removeItemMutation.mutate(itemId);
  };

  const updateQuantity = (itemId: string, newQuantity: number) => {
    const item = derivedOptimisticCart.find(
      (i: { _id: string }) => i._id === itemId
    );
    if (!item) return;

    const currentQuantity = item.quantity;

    if (newQuantity > currentQuantity) {
      // Increment
      incrementMutation.mutate(itemId);
    } else if (newQuantity < currentQuantity && newQuantity > 0) {
      // Decrement
      decrementMutation.mutate(itemId);
    } else if (newQuantity === 0) {
      // Remove item if quantity becomes 0
      removeItem(itemId);
    }
  };

  // Calculate total price from optimistic cart
  const totalPrice = derivedOptimisticCart.reduce(
    (sum: number, item: { totalPrice: number }) => sum + item.totalPrice,
    0
  );

  const handlePromoCode = () => {
    toast.success("Thank you for use your Promo code");
  };

  // const handleOrderPage = () => {
  //   router.push(`/checkout?couponCode:${promoCode}`);
  // };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <ShoppingCart className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50 animate-pulse" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  const displayCart =
    derivedOptimisticCart.length > 0 ? derivedOptimisticCart : [];

    console.log("chudlinkponk data",displayCart)

  if (displayCart.length === 0) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <div className="flex-1 flex items-center justify-center py-20">
          <div className="text-center">
            <ShoppingCart className="w-16 h-16  mx-auto mb-4 text-[#D62828]" />
            <h1 className="text-3xl font-bold mb-4 font-lobster">
              Your Cart is Empty
            </h1>
            <p className="text-muted-foreground mb-8 max-w-md">
              Start building your perfect pizza or browse our menu to get
              started
            </p>

            <div className="flex gap-4 justify-center">
              <Link href="/menu" className="">
                <Button
                  variant="outline"
                  className="border border-[#D62828] cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4 mr-2  " />
                  Back to Menu
                </Button>
              </Link>

              {/* <Link href="/builder">
                <Button className="bg-[#D62828] hover:bg-primary/90 cursor-pointer">
                  Build Pizza
                </Button>
              </Link> */}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section>
      <div className="container mx-auto">
        <div className="text-center from-primary/10 to-accent/10 py-8 md:py-12">
          <div className="mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-sm font-medium text-[#D62828] bg-[#FBEAEA] border py-2 px-4 rounded-sm inline-block border-[#F2BCBC] tracking-wider leading-[150%]">
              Quick & Easy
            </p>
            <div className="flex items-center justify-center gap-3 mb-4">
              <ShoppingCart className="w-8 h-8 text-primary" />
              <h1 className="text-2xl md:text-3xl font-bold font-lobster text-secondary">
                Order Online
              </h1>
            </div>
            <p className="text-gray-600 text-xs md:text-sm font-normal leading-tight">
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
                    Your Cart ({displayCart.length} items)
                  </h2>

                  <div>
                    {displayCart.map((item: CartItem) => (
                      <CartItemCard
                        key={item._id}
                        item={item}
                        onUpdateQuantity={(quantity) =>
                          updateQuantity(item._id, quantity)
                        }
                        onRemove={() => removeItem(item._id)}
                        isUpdating={
                          incrementMutation.isPending ||
                          decrementMutation.isPending ||
                          removeItemMutation.isPending
                        }
                      />
                    ))}
                  </div>

                  <div className="mt-6 pt-6 border-t border-border flex gap-4">
                    <Link href="/menu" className="flex-1">
                      <Button
                        variant="outline"
                        className="w-full bg-transparent cursor-pointer"
                      >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Continue Shopping
                      </Button>
                    </Link>
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
                    {/* <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Tax (8%)</span>
                      <span>${(totalPrice * 0.08).toFixed(2)}</span>
                    </div> */}
                    {/* <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Delivery</span>
                      <span>Free</span>
                    </div> */}
                  </div>

                  <div className="flex gap-1 my-5">
                    <Input
                      value={promoCode}
                      onChange={(e) => setPromo(e.target.value)}
                      type="text"
                      placeholder="If you Have Promo Code please Use"
                    />
                    <Button
                      onClick={handlePromoCode}
                      className="text-white bg-[#D62828] cursor-pointer rounded-sm"
                    >
                      Apply
                    </Button>
                  </div>

                  <div className="flex justify-between items-center mb-6">
                    <span className="font-bold">Total</span>
                    <span className="text-2xl font-bold text-primary">
                      ${(totalPrice * 1.08).toFixed(2)}
                    </span>
                  </div>

                  <a
                    href={`https://order.toasttab.com/online/craving-pizza-seagoville-208-hall-road`}
                    target="_blank"
                  >
                    <Button
                      // onClick={handleOrderPage}
                      className="w-full bg-[#D62828] text-white cursor-pointer"
                    >
                      Order Now
                    </Button>
                  </a>

                  <div className="mt-4 space-y-2">
                    {displayCart.map(
                      (item: {
                        _id: React.Key | null | undefined;
                        type: string;
                        menu: { menuId: { name: string } };
                      }) => (
                        <p
                          key={item._id}
                          className="text-sm md:text-base text-[#1F9854] flex gap-1 items-center"
                        >
                          <Clock className="w-4 h-4" />
                          {item.type === "menu" && item.menu
                            ? `${item.menu.menuId.name}: 45 minutes`
                            : `Custom Pizza: 45 minutes`}
                        </p>
                      )
                    )}
                  </div>
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

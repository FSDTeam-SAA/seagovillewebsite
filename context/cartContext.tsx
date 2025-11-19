"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCartItems } from "@/lib/api"; // your API function

// Types
export interface CartItem {
  _id: string;
  name: string;
  quantity: number;
  totalPrice: number;
}

interface CartContextType {
  optimisticCart: CartItem[];
  setOptimisticCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  derivedCart: CartItem[];
  orderData: {
    cartId: string;
    quantity: number;
    totalPrice: number;
  }[];
}

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [optimisticCart, setOptimisticCart] = useState<CartItem[]>([]);

  // Fetch server cart items
  const { data: cart = [] } = useQuery<CartItem[]>({
    queryKey: ["cart"],
    queryFn: getCartItems,
  });

  // Derived cart: server cart → fallback optimistic cart
  const derivedCart = useMemo(() => {
    return cart.length > 0 ? cart : optimisticCart;
  }, [cart, optimisticCart]);

  // Order data derived automatically
  const orderData = useMemo(() => {
    return derivedCart.map((item) => ({
      cartId: item._id,
      quantity: item.quantity,
      totalPrice: item.totalPrice,
    }));
  }, [derivedCart]);

  return (
    <CartContext.Provider
      value={{
        optimisticCart,
        setOptimisticCart,
        derivedCart,
        orderData,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Hook for easy use
export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
};

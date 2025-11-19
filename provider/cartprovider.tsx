"use client";

import { CartProvider } from "@/context/cartContext";



export default function AppProviders({ children }: { children: React.ReactNode }) {
  return <CartProvider>{children}</CartProvider>;
}

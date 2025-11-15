"use client"


import { useState, useCallback } from "react"
import type { CartItem } from "@/lib/types"

const STORAGE_KEY = "pizza-cart"

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") return []

    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : []
    } catch (error) {
      console.error(" Error loading cart from storage:", error)
      return []
    }
  })

  const saveCart = useCallback((items: CartItem[]) => {
    setCart(items)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch (error) {
      console.error(" Error saving cart to storage:", error)
    }
  }, [])

  const addItem = useCallback(
    (item: CartItem) => {
      setCart((prev) => {
        const updated = [...prev]
        const existingIndex = updated.findIndex(
          (i) => i.id === item.id && JSON.stringify(i.customizations) === JSON.stringify(item.customizations),
        )

        if (existingIndex >= 0) {
          updated[existingIndex].quantity += item.quantity
        } else {
          updated.push(item)
        }

        saveCart(updated)
        return updated
      })
    },
    [saveCart],
  )

  const removeItem = useCallback(
    (itemId: string) => {
      setCart((prev) => {
        const updated = prev.filter((item) => item.id !== itemId)
        saveCart(updated)
        return updated
      })
    },
    [saveCart],
  )

  const updateQuantity = useCallback(
    (itemId: string, quantity: number) => {
      setCart((prev) => {
        const updated = prev.map((item) => (item.id === itemId ? { ...item, quantity: Math.max(1, quantity) } : item))
        saveCart(updated)
        return updated
      })
    },
    [saveCart],
  )

  const clearCart = useCallback(() => {
    saveCart([])
  }, [saveCart])

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)

  return {
    cart,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    totalPrice,
    totalItems,
  }
}

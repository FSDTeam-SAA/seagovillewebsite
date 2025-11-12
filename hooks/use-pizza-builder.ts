"use client"

/**
 * Custom hook for managing pizza builder state
 * Handles size, crust, sauce, cheese, and toppings selection
 */

import { useState } from "react"
import type { PizzaBuilderState, Size, Crust, Sauce, Cheese, Topping } from "@/lib/types"
import { SIZES } from "@/lib/constants"

export function usePizzaBuilder() {
  const [state, setState] = useState<PizzaBuilderState>({
    size: SIZES[2], // Default to Large
    crust: null,
    sauce: null,
    cheese: null,
    toppings: [],
  })

  const setSize = (size: Size) => {
    setState((prev) => ({ ...prev, size }))
  }

  const setCrust = (crust: Crust) => {
    setState((prev) => ({ ...prev, crust }))
  }

  const setSauce = (sauce: Sauce) => {
    setState((prev) => ({ ...prev, sauce }))
  }

  const setCheese = (cheese: Cheese) => {
    setState((prev) => ({ ...prev, cheese }))
  }

  const addTopping = (topping: Topping) => {
    setState((prev) => ({
      ...prev,
      toppings: [...prev.toppings, topping],
    }))
  }

  const removeTopping = (toppingId: string) => {
    setState((prev) => ({
      ...prev,
      toppings: prev.toppings.filter((t) => t.id !== toppingId),
    }))
  }

  const reset = () => {
    setState({
      size: SIZES[2],
      crust: null,
      sauce: null,
      cheese: null,
      toppings: [],
    })
  }

  return {
    state,
    setSize,
    setCrust,
    setSauce,
    setCheese,
    addTopping,
    removeTopping,
    reset,
  }
}

"use client"
import { useState } from "react"
import type { Size, Crust, Sauce, Cheese, Topping } from "@/lib/types"
import type { PizzaBuilderState } from "@/lib/PizzaBuilderState"

export function usePizzaBuilder() {
  const [state, setState] = useState<PizzaBuilderState>({
    size: null,
    crust: null,
    sauce: null,
    cheese: null,
    toppings: [],
  })

  const setSize = (size: Size | null) => {
    setState((prev) => ({ ...prev, size }))
  }

  const setCrust = (crust: Crust | null) => {
    setState((prev) => ({ ...prev, crust }))
  }

  const setSauce = (sauce: Sauce | null) => {
    setState((prev) => ({ ...prev, sauce }))
  }

  const setCheese = (cheese: Cheese | null) => {
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
      toppings: prev.toppings.filter((t) => t._id !== toppingId),
    }))
  }

  const reset = () => {
    setState({
      size: null,
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

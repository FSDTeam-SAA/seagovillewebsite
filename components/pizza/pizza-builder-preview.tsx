"use client"
import type { PizzaBuilderState } from "@/lib/types"

interface PizzaBuilderPreviewProps {
  state: PizzaBuilderState
}

export function PizzaBuilderPreview({ state }: PizzaBuilderPreviewProps) {
  const basePrice = 12.99
  const sizePrice = state.size?.price || 0
  const crustPrice = state.crust?.price || 0
  const saucePrice = state.sauce?.price || 0
  const cheesePrice = state.cheese?.price || 0
  const toppingsPrice = state.toppings.reduce((sum, t) => sum + t.price, 0)

  const totalPrice =
    basePrice + sizePrice + crustPrice + saucePrice + cheesePrice + toppingsPrice

  return (
    <div className="bg-card rounded-lg p-6 border border-border">
      <h3 className="font-bold text-lg mb-6">Your Pizza</h3>

      {/* Pizza Visualization */}
      <div className="mb-6 flex justify-center">
        <div className="relative w-40 h-40 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-400 shadow-lg flex items-center justify-center">
          <div className="absolute inset-2 rounded-full bg-yellow-400 flex items-center justify-center text-2xl">
            🍕
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="space-y-3 text-sm mb-6 pb-6 border-b border-border">
        {state.size && (
          <div className="flex justify-between">
            <span className="text-muted-foreground">Size:</span>
            <span className="font-medium">{state.size.name}</span>
          </div>
        )}

        {state.crust && (
          <div className="flex justify-between">
            <span className="text-muted-foreground">Crust:</span>
            <span className="font-medium">{state.crust.name}</span>
          </div>
        )}

        {state.sauce && (
          <div className="flex justify-between">
            <span className="text-muted-foreground">Sauce:</span>
            <span className="font-medium">{state.sauce.name}</span>
          </div>
        )}

        {state.cheese && (
          <div className="flex justify-between">
            <span className="text-muted-foreground">Cheese:</span>
            <span className="font-medium">{state.cheese.name}</span>
          </div>
        )}

        {state.toppings.length > 0 && (
          <div className="flex justify-between">
            <span className="text-muted-foreground">Toppings:</span>
            <span className="font-medium">{state.toppings.length}</span>
          </div>
        )}
      </div>

      {/* Price */}
      <div className="flex justify-between items-center">
        <span className="font-semibold">Total:</span>
        <span className="text-2xl font-bold text-[#D62828]">
          ${totalPrice.toFixed(2)}
        </span>
      </div>
    </div>
  )
}

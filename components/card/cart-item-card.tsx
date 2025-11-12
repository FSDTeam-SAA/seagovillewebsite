"use client"

/**
 * Cart item card component
 * Displays item with quantity controls
 */

import { Trash2, Minus, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { CartItem } from "@/lib/types"

interface CartItemCardProps {
  item: CartItem
  onUpdateQuantity: (quantity: number) => void
  onRemove: () => void
}

export function CartItemCard({ item, onUpdateQuantity, onRemove }: CartItemCardProps) {
  return (
    <div className="flex gap-4 py-4 border-b border-border last:border-b-0">
      <div className="flex-1">
        <h3 className="font-semibold mb-1">{item.name}</h3>
        <p className="text-sm text-muted-foreground mb-3">${item.price.toFixed(2)} each</p>

        {item.customizations && (
          <div className="text-xs text-muted-foreground mb-3 space-y-1">
            {item.customizations.size && <p>Size: {item.customizations.size.name}</p>}
            {item.customizations.crust && <p>Crust: {item.customizations.crust.name}</p>}
            {item.customizations.toppings.length > 0 && (
              <p>Toppings: {item.customizations.toppings.map((t) => t.name).join(", ")}</p>
            )}
          </div>
        )}

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => onUpdateQuantity(Math.max(1, item.quantity - 1))}
            className="h-8 w-8 p-0"
          >
            <Minus className="w-3 h-3" />
          </Button>
          <span className="text-sm font-semibold w-8 text-center">{item.quantity}</span>
          <Button
            size="sm"
            variant="outline"
            onClick={() => onUpdateQuantity(item.quantity + 1)}
            className="h-8 w-8 p-0"
          >
            <Plus className="w-3 h-3" />
          </Button>
        </div>
      </div>

      <div className="flex flex-col items-end justify-between">
        <p className="text-lg font-bold text-primary">${(item.price * item.quantity).toFixed(2)}</p>
        <Button size="sm" variant="ghost" onClick={onRemove} className="text-destructive hover:bg-destructive/10">
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}

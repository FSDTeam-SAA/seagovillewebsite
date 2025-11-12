"use client"
import { Star, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Pizza } from "@/lib/types"


interface PizzaCardProps {
  pizza: Pizza
  onAddToCart?: () => void
}

export function PizzaCard({ pizza, onAddToCart }: PizzaCardProps) {
  return (
    <div className="bg-card rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      <div className="relative aspect-square bg-muted overflow-hidden">
        <img
          src={pizza.image || "/placeholder.svg"}
          alt={pizza.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
          <Star className="w-4 h-4 fill-current" />
          {pizza.rating}
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1 line-clamp-1">{pizza.name}</h3>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{pizza.description}</p>

        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-primary">${pizza.price.toFixed(2)}</span>
          <Button size="sm" onClick={onAddToCart} className="bg-primary hover:bg-primary/90">
            <ShoppingCart className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

"use client"

import { Trash2, Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

import Image from "next/image"
import { CartItem } from "@/lib/cartType"

interface CartItemCardProps {
  item: CartItem
  onUpdateQuantity: (quantity: number) => void
  onRemove: () => void
  isUpdating?: boolean // Add this line
}

export function CartItemCard({ item, onUpdateQuantity, onRemove, isUpdating }: CartItemCardProps) {
  // Get item details based on type
  const getItemDetails = () => {
    if (item.type === 'menu' && item.menu) {
      return {
        name: item.menu.menuId.name,
        image: item.menu.menuId.images[0]?.url || '/images/default.jpg',
        type: item.menu.types,
        category: item.menu.menuId.category
      };
    } else if (item.type === 'ownPizza' && item.ownPizzaId) {
      return {
        name: "Custom Pizza",
        image: '/images/default.jpg',
        type: item.ownPizzaId.size.name,
        category: "Custom"
      };
    }
    return {
      name: "Unknown Item",
      image: '/images/default.jpg',
      type: "",
      category: ""
    };
  };

  const itemDetails = getItemDetails();

  return (
    <div className="flex gap-4 py-4 border-b items-center border-border last:border-b-0">
      <div>
        <Image 
          src={itemDetails.image} 
          alt={itemDetails.name} 
          width={80} 
          height={80} 
          className="rounded-2xl w-20 h-20 object-cover" 
        />
      </div>
      
      <div className="flex-1">
        <h3 className="font-semibold mb-1">{itemDetails.name}</h3>
        <p className="text-sm text-muted-foreground mb-1 capitalize">
          {itemDetails.type} • {itemDetails.category}
        </p>
        <p className="text-sm font-semibold text-primary mb-3">
          ${item.totalPrice.toFixed(2)} total
        </p>

        {/* Show custom pizza details */}
        {item.type === 'ownPizza' && item.ownPizzaId && (
          <div className="text-xs text-muted-foreground mb-3 space-y-1">
            <p>Crust: {item.ownPizzaId.crust.name}</p>
            <p>Size: {item.ownPizzaId.size.name}</p>
            {item.ownPizzaId.toppings.length > 0 && (
              <p>
                Toppings: {item.ownPizzaId.toppings.slice(0, 2).map(t => t.toppingId.name).join(", ")}
                {item.ownPizzaId.toppings.length > 2 && ` and ${item.ownPizzaId.toppings.length - 2} more`}
              </p>
            )}
          </div>
        )}

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => onUpdateQuantity(Math.max(0, item.quantity - 1))}
            className="h-8 w-8 p-0"
            disabled={isUpdating || item.quantity <= 1} // Add this line
          >
            <Minus className="w-3 h-3" />
          </Button>
          <span className="text-sm font-semibold w-8 text-center">{item.quantity}</span>
          <Button
            size="sm"
            variant="outline"
            onClick={() => onUpdateQuantity(item.quantity + 1)}
            className="h-8 w-8 p-0"
            disabled={isUpdating} // Add this line
          >
            <Plus className="w-3 h-3" />
          </Button>
        </div>
      </div>

      <div className="flex flex-col items-end justify-between h-full">
        <Button 
          size="sm" 
          variant="ghost" 
          onClick={onRemove} 
          className="text-destructive hover:bg-destructive/10"
          disabled={isUpdating} // Add this line
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
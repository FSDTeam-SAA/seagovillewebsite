/**
 * Filter tabs for pizza categories
 */

"use client"

import { Button } from "@/components/ui/button"

interface PizzaFilterTabsProps {
  activeCategory: string
  onCategoryChange: (category: string) => void
}

const categories = [
  { id: "all", label: "All Pizzas" },
  { id: "classic", label: "Classic" },
  { id: "specialty", label: "Specialty" },
  { id: "meat", label: "Meat Lovers" },
  { id: "veggie", label: "Veggie" },
]

export function PizzaFilterTabs({ activeCategory, onCategoryChange }: PizzaFilterTabsProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {categories.map((category) => (
        <Button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          variant={activeCategory === category.id ? "default" : "outline"}
          className={activeCategory === category.id ? "bg-primary hover:bg-primary/90 text-primary-foreground" : ""}
        >
          {category.label}
        </Button>
      ))}
    </div>
  )
}

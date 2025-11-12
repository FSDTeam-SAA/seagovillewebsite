"use client"
import { Check } from "lucide-react"

interface SelectionItem {
  id: string
  name: string
  description?: string
  priceModifier?: number
}

interface SelectionGridProps<T extends SelectionItem> {
  items: T[]
  selectedId?: string
  onSelect: (item: T) => void
  columns?: number
}

export function SelectionGrid<T extends SelectionItem>({
  items,
  selectedId,
  onSelect,
  columns = 2,
}: SelectionGridProps<T>) {
  return (
    <div className={`grid grid-cols-${columns} gap-4`}>
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => onSelect(item)}
          className={`
            p-4 rounded-lg border-2 transition-all text-left
            ${selectedId === item.id ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"}
          `}
        >
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <p className="font-semibold text-sm">{item.name}</p>
              {item.description && <p className="text-xs text-muted-foreground mt-1">{item.description}</p>}
            </div>
            {selectedId === item.id && <Check className="w-5 h-5 text-primary flex-shrink-0" />}
          </div>
          {item.priceModifier !== undefined && item.priceModifier !== 0 && (
            <p className="text-xs text-primary font-semibold mt-2">+${item.priceModifier.toFixed(2)}</p>
          )}
        </button>
      ))}
    </div>
  )
}

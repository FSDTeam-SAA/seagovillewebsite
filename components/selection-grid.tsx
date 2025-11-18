"use client"
import { CustomizationItem, singledata, SizeResponse, SizeResponseData } from '@/lib/cusomizetype'
import { Check } from 'lucide-react'


interface SelectionGridProps {
  items: CustomizationItem[] | { data?: CustomizationItem[] }
  selectedId?: string
  onSelect: (item: CustomizationItem) => void
  columns?: number
}

export function SelectionGrid({
  items,
  selectedId,
  onSelect,
  columns = 2,
}: SelectionGridProps) {

// Normalize whether items is an array or an object with `data`
const list: CustomizationItem[] = Array.isArray(items) ? items : (items?.data ?? [])
console.log(items, list, 'show data')


  return (
    <div className={`grid grid-cols-${columns} gap-4`}>
      {list?.map((item:CustomizationItem) => (
        <button
          key={item._id}
          onClick={() => onSelect(item)}
          disabled={!item.isAvailable}
          className={`
            p-4 rounded-lg border-2 transition-all text-left
            ${
              selectedId === item._id
                ? "border-[#D62828] bg-[#D62828]/10"
                : "border-border hover:border-[#D62828]/50"
            }
            ${!item.isAvailable ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
          `}
          aria-pressed={selectedId === item._id}
          aria-disabled={!item.isAvailable}
        >
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <p className="font-semibold text-sm">{item.name}</p>
              {item.description && (
                <p className="text-xs text-muted-foreground mt-1">
                  {item.description}
                </p>
              )}
            </div>
            {selectedId === item._id && (
              <Check className="w-5 h-5 text-[#D62828] flex-shrink-0" />
            )}
          </div>
          {item.price !== undefined && item.price !== 0 && (
            <p className="text-xs text-[#D62828] font-semibold mt-2">
              +${item.price.toFixed(2)}
            </p>
          )}
          {!item.isAvailable && (
            <p className="text-xs text-destructive mt-1">Out of Stock</p>
          )}
        </button>
      ))}
    </div>
  )
}

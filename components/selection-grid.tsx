"use client";
import { Check } from "lucide-react";
import React from "react";

interface BaseItem {
  _id: string;
  name: string;
  description?: string;
  isAvailable?: boolean;
  price: number;
  include?:string;
}

interface SelectionGridProps<T extends BaseItem> {
  items?: T[] | { data: T[] };
  selectedId?: string;
  onSelect: (item: T) => void;
  columns?: number;
}

export function SelectionGrid<T extends BaseItem>({
  items,
  selectedId,
  onSelect,
  
}: SelectionGridProps<T>) {
  // Normalize whether items is an array or an object with `data`
  const list: T[] = Array.isArray(items) ? items : items?.data ?? [];
  // console.log(items, list, "show build  data");

  return (
    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-4`}>
      {list?.map((item: T) => (
        <button
          key={item._id}
          onClick={() => onSelect(item)}
          disabled={!item.isAvailable}
          className={`
            p-4 rounded-none border-2  transition-all text-left
            ${
              selectedId === item._id
                ? "border-[#D62828] bg-[#D62828]/10"
                : "border-border hover:border-[#D62828]/50"
            }
            ${
              !item.isAvailable
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer"
            }
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
              <div className="flex gap-1 items-center bg-[#D0F5E1] px-3 py-1 border border-[#1F9854]">
                <Check className="w-5 h-5 text-[#1F9854] flex-shrink-0" />
                <p className="text-[#1F9854] text-xs leading-[150%] font-medium">
                  Selected
                </p>
              </div>
            )}
          </div>
          {item.price !== undefined && item.price !== 0 && (
            <p className="text-xs md:text-md lg:text-[32px] text-[#D62828] font-semibold mt-2">
              +${item.price.toFixed(2)}
            </p>
          )}
          {item.include == undefined && item.price == 0 &&(
            <p className="text-xs md:text-md lg:text-[32px] text-[#D62828] font-semibold mt-2">
              Included
            </p>
          )}
          {!item.isAvailable && (
            <p className="text-xs text-destructive mt-1">Out of Stock</p>
          )}
        </button>
      ))}
    </div>
  );
}

"use client";
import { Star, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Pizza } from "@/lib/types";
import Image from "next/image";

interface PizzaCardProps {
  pizza: Pizza;
  onAddToCart?: () => void;
}

export function PizzaCard({ pizza, onAddToCart }: PizzaCardProps) {
  return (
    <div className="bg-card rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      <div className="relative aspect-square bg-muted overflow-hidden">
        <Image
          src={pizza.image || "/placeholder.svg"}
          alt={pizza.name}
          width={496}
          height={464}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="p-4">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-base md:text-xl leading-[150%] mb-1 line-clamp-1">
            {pizza.name}
          </h3>
          <div className=" px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
            <Star className="w-4 h-4 fill-current text-amber-300" />
            {pizza.rating}
          </div>
        </div>
        <p className="text-sm md:text-base text-[#6C757D] mb-6 md:mb-10 line-clamp-2">
          {pizza.description}
        </p>

        <div className="flex items-center justify-between">
          <span className=" flex gap-2 items-center text-base md:text-2xl font-bold text-[#D62828] leading-[150%]">
            ${pizza.price.toFixed(2)}
            <span className="text-[#6C757D] line-through text-xs md:text-sm ">
              ${pizza.price.toFixed(2) + 5}
            </span>
          </span>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              onClick={onAddToCart}
              className="bg-transparent cursor-pointer border border-[#D62828] hover:bg-primary/90"
            >
              <ShoppingCart className="w-4 h-4 text-[#D62828]" />
            </Button>
            <Button className="bg-[#D62828] cursor-pointer text-sm md:text-base leading-[150%] text-[#F8F9FA]">Order Now</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

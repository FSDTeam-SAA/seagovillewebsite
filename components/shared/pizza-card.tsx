"use client";
import {  ShoppingCart, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product } from "@/lib/types";
import Image from "next/image";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import Link from "next/link";

interface PizzaCardProps {
  pizza: Product;
  onAddToCart?: () => void;
  onOrder?: () => void;
  selectedSize?: "small" | "medium" | "large";
  onSizeChange?: (size: "small" | "medium" | "large") => void;
  onConfirmAction?: () => void;
  isDialogOpen?: boolean;
  onCloseDialog?: () => void;
  dialogType?: "cart" | "order";
  isPending?: boolean;
}

export function PizzaCard({
  pizza,
  onAddToCart,
  onOrder,
  selectedSize = "small",
  onSizeChange,
  onConfirmAction,
  isDialogOpen = false,
  onCloseDialog,
  dialogType = "cart",
  isPending = false,
}: PizzaCardProps) {
  const imageUrl = pizza.images?.[0]?.url || "/placeholder.svg";
  const smallPrice = pizza.price?.small || 0;

  const handleSizeSelect = (size: "small" | "medium" | "large") => {
    onSizeChange?.(size);
  };

  const getCurrentPrice = () => {
    return pizza.price[selectedSize] || smallPrice;
  };

  const handleOrderNowClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onOrder?.();
  };

  const handleAddToCartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart?.();
  };

  const getDialogTitle = () => {
    return dialogType === "cart"
      ? "Select size for adding to cart"
      : "Select size for ordering";
  };

  const getActionButtonText = () => {
    const price = pizza.price[selectedSize]?.toFixed(2);
    if (dialogType === "cart") {
      return `Add to Cart - $${price}`;
    } else {
      return `Order Now - $${price}`;
    }
  };

  const getActionButtonIcon = () => {
    return dialogType === "cart" ? (
      <ShoppingCart className="w-4 h-4 mr-2" />
    ) : null;
  };

  return (
    <>
      <div className="bg-card rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
        <Link href={`/menu/${pizza._id}`}>
          <div className="relative aspect-square bg-muted overflow-hidden">
            <Image
              src={imageUrl}
              alt={pizza.name}
              width={496}
              height={464}
              className="w-full h-full object-cover  hover:scale-105 transition-transform duration-300"
            />
          </div>
        </Link>

        <div className="p-4">
          <Link href={`/menu/${pizza._id}`}>
            <h3 className="font-semibold text-base md:text-xl leading-[150%] mb-1 line-clamp-1">
              {pizza.name}
            </h3>

            <p className="text-sm md:text-base text-[#6C757D] mb-6 md:mb-10 line-clamp-2">
              {pizza.description}
            </p>
          </Link>

          <div className="flex items-center justify-between">
            <span className="flex gap-2 items-center text-base lg:text-2xl font-bold text-[#D62828] leading-[150%]">
              ${getCurrentPrice().toFixed(2)}
              <span className="text-[#6C757D] line-through text-xs lg:text-sm">
                ${(getCurrentPrice() + 5).toFixed(2)}
              </span>
            </span>

            <div className="flex items-center gap-2">
              <Button
                size="sm"
                onClick={handleAddToCartClick}
                className="bg-transparent rounded-none cursor-pointer border hover:text-white border-[#D62828] hover:bg-red-200 "
              >
                <ShoppingCart className="w-4 h-4 text-[#D62828] " />
              </Button>

              <a
                href={`https://order.toasttab.com/online/craving-pizza-seagoville-208-hall-road`}
                target="_blank"
                // onClick={handleOrderNowClick}
              >
                <Button className="bg-[#D62828] hover:bg-red-500 rounded-none cursor-pointer text-sm lg:text-base leading-[150%] text-[#F8F9FA]">
                  Order Now
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Size Selection Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={onCloseDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{getDialogTitle()}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div
              onClick={() => handleSizeSelect("small")}
              className={`grid gap-3 p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                selectedSize === "small"
                  ? "border-[#D62828] bg-red-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <p className="font-semibold">Small</p>
              <h2 className="text-lg font-bold text-[#D62828]">
                ${pizza.price.small?.toFixed(2)}
              </h2>
            </div>
            <div
              onClick={() => handleSizeSelect("medium")}
              className={`grid gap-3 p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                selectedSize === "medium"
                  ? "border-[#D62828] bg-red-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <p className="font-semibold">Medium</p>
              <h2 className="text-lg font-bold text-[#D62828]">
                ${pizza.price.medium?.toFixed(2)}
              </h2>
            </div>
            <div
              onClick={() => handleSizeSelect("large")}
              className={`grid gap-3 p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                selectedSize === "large"
                  ? "border-[#D62828] bg-red-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <p className="font-semibold">Large</p>
              <h2 className="text-lg font-bold text-[#D62828]">
                ${pizza.price.large?.toFixed(2)}
              </h2>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" className="cursor-pointer">
                Cancel
              </Button>
            </DialogClose>
            <Button
              onClick={onConfirmAction}
              disabled={isPending}
              className="bg-[#D62828] hover:bg-[#b51e1e] cursor-pointer text-white"
            >
              {isPending ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                getActionButtonIcon()
              )}
              {isPending ? "Processing..." : getActionButtonText()}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

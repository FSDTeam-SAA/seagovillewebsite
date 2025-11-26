"use client";
import { ShoppingCart, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

interface PizzaCardProps {
  pizza: Product;

  selectedSize?: number;
  onSizeChange?: (sizeIndex: number) => void;

  isDialogOpen?: boolean;

  dialogType?: "cart" | "order";
  isPending?: boolean;
}

export function PizzaCard({
  pizza,

  selectedSize = 0,
  onSizeChange,



}: PizzaCardProps) {
  const imageUrl = pizza.images?.[0]?.url || "/placeholder.svg";

  // Safe price handling with fallbacks
  const getCurrentPrice = () => {
    if (
      !pizza?.price ||
      !Array.isArray(pizza?.price) ||
      pizza?.price.length === 0
    ) {
      return 0; // Default price if price array is empty or undefined
    }
    return pizza?.price[selectedSize] || pizza?.price[0] || 0;
  };

  // Get size label safely
  const getSizeLabel = (index: number) => {
    const sizes = pizza?.sizes || [];
    return sizes[index] || "Small";
  };

  // const handleAddToCartClick = (e: React.MouseEvent) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   onAddToCart?.();
  // };

  // const handleOrderNowClick = (e: React.MouseEvent) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   onOrder?.();
  // };

  const currentPrice = getCurrentPrice();

  return (
    <>
      <div className="bg-card rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
        <Link href={`/menu/${pizza?._id}`}>
          <div className="relative aspect-square bg-muted overflow-hidden">
            <Image
              src={imageUrl}
              alt={pizza.name}
              width={496}
              height={464}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        </Link>

        <div className="p-4">
          <Link href={`/menu/${pizza?._id}`}>
            <h3 className="font-semibold text-base md:text-xl leading-[150%] mb-1 line-clamp-1">
              {pizza?.name}
            </h3>

            <p className="text-sm md:text-base text-[#6C757D] mb-6 md:mb-10 line-clamp-2">
              {pizza?.description}
            </p>
          </Link>

          {/* Size Selector (if multiple prices available) */}
          {pizza?.price && pizza?.price.length > 1 && (
            <div className="mb-4">
              <div className="flex gap-2 flex-wrap">
                {pizza?.sizes?.map((price, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onSizeChange?.(index);
                    }}
                    className={`px-3 py-1 text-sm rounded border transition-colors ${
                      selectedSize === index
                        ? "border-[#D62828] bg-red-50 text-[#D62828] font-semibold"
                        : "border-gray-300 text-gray-600 hover:border-gray-400"
                    }`}
                  >
                    {getSizeLabel(index)}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center justify-between">
            <span className="flex gap-2 items-center text-base lg:text-2xl font-bold text-[#D62828] leading-[150%]">
              ${currentPrice.toFixed(2)}
              {currentPrice > 0 && (
                <span className="text-[#6C757D] line-through text-xs lg:text-sm">
                  ${(currentPrice + 5).toFixed(2)}
                </span>
              )}
            </span>

            <div className="flex items-center gap-2">
              <Link
                href="https://order.toasttab.com/online/craving-pizza-seagoville-208-hall-road"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="sm"
                  // onClick={handleAddToCartClick}
                  className="bg-transparent rounded-none cursor-pointer border hover:text-white border-[#D62828] hover:bg-red-200"
                >
                  <ShoppingCart className="w-4 h-4 text-[#D62828]" />
                </Button>
              </Link>
              <Link
                href="https://order.toasttab.com/online/craving-pizza-seagoville-208-hall-road"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  // onClick={handleOrderNowClick}
                  className="bg-[#D62828] hover:bg-red-500 rounded-none cursor-pointer text-sm lg:text-base leading-[150%] text-[#F8F9FA]"
                >
                  Order Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Size Selection Dialog (commented out but corrected) */}
      {/* <Dialog open={isDialogOpen} onOpenChange={onCloseDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {dialogType === "cart" 
                ? "Select size for adding to cart" 
                : "Select size for ordering"
              }
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {pizza.price?.map((price, index) => (
              <div
                key={index}
                onClick={() => onSizeChange?.(index)}
                className={`grid gap-3 p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                  selectedSize === index
                    ? "border-[#D62828] bg-red-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <p className="font-semibold">{getSizeLabel(index)}</p>
                <h2 className="text-lg font-bold text-[#D62828]">
                  ${price?.toFixed(2) || "0.00"}
                </h2>
              </div>
            ))}
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
              ) : dialogType === "cart" ? (
                <ShoppingCart className="w-4 h-4 mr-2" />
              ) : null}
              {isPending 
                ? "Processing..." 
                : `${dialogType === "cart" ? "Add to Cart" : "Order Now"} - $${(pizza.price?.[selectedSize] || 0)?.toFixed(2)}`
              }
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog> */}
    </>
  );
}

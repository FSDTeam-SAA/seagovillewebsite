"use client";

import React, { useState } from "react";
import { PizzaCard } from "../shared/pizza-card";
import { toast } from "sonner";
import { MenuItem } from "@/lib/types";
import { useAddToCartMutation } from "@/hooks/use-cart";
import { useRouter } from "next/navigation";

interface SimilarPizzaProps {
  similarPizzas?: MenuItem[];
}

export const SimilarPizza = ({ similarPizzas = [] }: SimilarPizzaProps) => {
  const [selectedSize, setSelectedSize] = useState<"small" | "medium" | "large">("small");
  const [selectedPizza, setSelectedPizza] = useState<MenuItem | null>(null);
  const [dialogType, setDialogType] = useState<"cart" | "order">("cart");
  const { mutate: addToCartMutation, isPending } = useAddToCartMutation();
  const router = useRouter();

  const handleAddToCart = (
    pizza: MenuItem,
    size: "small" | "medium" | "large" = "small",
    onSuccess?: () => void
  ) => {
    const price = pizza.price[size];

    if (!price) {
      toast.error("Selected size is not available for this pizza");
      return;
    }

    addToCartMutation(
      { menuId: pizza._id, size },
      {
        onSuccess: () => {
          toast.success("WoW! Successfully added the pizza to your cart");
          onSuccess?.();
        },
        onError: (error) => {
          toast.error(error?.message || "Failed to add to cart");
        },
      }
    );
  };

  const handleOpenSizeDialog = (pizza: MenuItem, type: "cart" | "order" = "cart") => {
    setSelectedPizza(pizza);
    setSelectedSize("small");
    setDialogType(type);
  };

  const handleConfirmAction = () => {
    if (selectedPizza) {
      if (dialogType === "order") {
        // For order: add to cart and then redirect to checkout
        handleAddToCart(selectedPizza, selectedSize, () => {
          router.push('/checkout');
          setSelectedPizza(null);
        });
      } else {
        // For cart: just add to cart
        handleAddToCart(selectedPizza, selectedSize, () => {
          setSelectedPizza(null);
        });
      }
    }
  };

  // Don't show the section if there are no similar pizzas
  if (!similarPizzas || similarPizzas.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-12 md:mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-[#343A40] mb-2 font-lobster">
            You Might Also Like
          </h2>
          <p className="text-gray-600">
            Discover more delicious pizzas from our menu
          </p>
        </div>

        {/* Pizza Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {similarPizzas.map((pizza: MenuItem) => (
            <PizzaCard
              key={pizza._id}
              pizza={pizza}
              onAddToCart={() => handleOpenSizeDialog(pizza, "cart")}
              onOrder={() => handleOpenSizeDialog(pizza, "order")}
              selectedSize={selectedSize}
              onSizeChange={setSelectedSize}
              onConfirmAction={handleConfirmAction}
              isDialogOpen={selectedPizza?._id === pizza._id}
              onCloseDialog={() => setSelectedPizza(null)}
              dialogType={dialogType}
              isPending={isPending}
            />
          ))}
        </div>

        {/* Optional: Show message if only a few similar pizzas
        {similarPizzas.length <= 3 && (
          <div className="text-center">
            <p className="text-gray-500 text-sm">
              Explore our full menu for more delicious options
            </p>
          </div>
        )} */}
      </div>
    </section>
  );
};

export default SimilarPizza;
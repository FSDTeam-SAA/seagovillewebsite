"use client";

import React, { useState } from "react";
import { PizzaCard } from "../shared/pizza-card";

import Link from "next/link";
import { Button } from "../ui/button";
import { toast } from "sonner";

import { useAppDispatch } from "@/lib/store/hooks";
import { addToCartApi } from "@/lib/store/slices/cardSlice";
import { MenuItem, Product } from "@/lib/types";
import { useAllMenuData } from "@/hooks/all-menudata";
import { addToCart } from "@/lib/api";

const SingnaturePizza = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedSize, setSelectedSize] = useState<
    "small" | "medium" | "large"
  >("small");
  const [selectedPizza, setSelectedPizza] = useState<MenuItem | null>(null);
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  // const limit = 10;

  const { data, isLoading, isError, error } = useAllMenuData(
    activeCategory,
    page,
    // limit
  );

  const handleAddToCart = async (
    pizza: MenuItem,
    size: "small" | "medium" | "large" = "small"
  ) => {
    const price = pizza.price[size];

    if (!price) {
      toast.error("Selected size is not available for this pizza");
      return;
    }

    const cartItem = await addToCart(pizza._id, size);

    if (cartItem) {
      toast.success("WoW! Successfully added the pizza to your cart");
    }
    // Error handling is done in the API function
  };
  const handleOpenSizeDialog = (pizza: MenuItem) => {
    setSelectedPizza(pizza);
    setSelectedSize("small"); // Reset to default size when opening dialog
  };

  const handleConfirmAddToCart = () => {
    if (selectedPizza) {
      handleAddToCart(selectedPizza, selectedSize);
      setSelectedPizza(null); // Close dialog after adding
    }
  };

  if (isError) {
    return (
      <div>
        <h1>Error</h1>
      </div>
    );
  }

  const pizzaData = data?.items;

  return (
    <section className="py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16 lg:mb-20">
          <h2 className="text-2xl md:text-4xl font-bold mb-2 leading-[120%] text-[#343A40] font-lobster">
            Our Signature Pizzas
          </h2>
          <p className="text-sm text-[#6C757D] font-normal leading-[150%]">
            Explore our crowd favorite pizzas crafted with fresh ingredients,
            irresistible flavors, and the perfect balance of taste in every
            slice.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pizzaData?.map((pizza: Product) => (
            <PizzaCard
              key={pizza._id}
              pizza={pizza}
              onAddToCart={() => handleOpenSizeDialog(pizza)}
              selectedSize={selectedSize}
              onSizeChange={setSelectedSize}
              onConfirmAddToCart={handleConfirmAddToCart}
              isDialogOpen={selectedPizza?._id === pizza._id}
              onCloseDialog={() => setSelectedPizza(null)}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/menu">
            <Button size="lg" variant="outline">
              View All Pizzas
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SingnaturePizza;

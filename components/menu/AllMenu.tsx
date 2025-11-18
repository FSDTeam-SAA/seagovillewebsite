"use client";
import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useAppDispatch } from "@/lib/store/hooks";
import {  addToCartApi } from "@/lib/store/slices/cardSlice";
import { useAllMenuData } from "@/hooks/all-menudata";
import { MenuItem, Product } from "@/lib/types";
import { PizzaFilterTabs } from "../pizza/pizza-filter-tabs";
import { PizzaCard } from "../shared/pizza-card";
import { Button } from "../ui/button";
import { addToCart } from "@/lib/api";

const AllMenu = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedSize, setSelectedSize] = useState<
    "small" | "medium" | "large"
  >("small");
  const [selectedPizza, setSelectedPizza] = useState<MenuItem | null>(null);
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading, isError, error } = useAllMenuData(
    activeCategory,
    page
    
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
    <section>
      <div className="container mx-auto">
        <section className="">
          <div className="px-4 sm:px-6 lg:px-8">
            <PizzaFilterTabs
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />

            {isLoading && (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
              </div>
            )}

            {error && (
              <div className="text-center py-12">
                <p className="text-lg text-destructive mb-4">
                  Error loading pizzas. Please try again.
                </p>
              </div>
            )}

            {!isLoading && !error && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
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

                {pizzaData?.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-lg text-muted-foreground mb-4">
                      No pizzas found in this category
                    </p>
                    <Button
                      onClick={() => setActiveCategory("all")}
                      variant="outline"
                    >
                      View All Pizzas
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
          {pizzaData?.length !== 0 ? (
            <div className="flex gap-2 items-center mt-4 justify-center">
              <Button
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
              >
                Previous
              </Button>

              <span>
                Page {data?.meta?.page} of {data?.meta?.totalPages}
              </span>

              <Button
                disabled={page >= (data?.meta?.totalPages || 1)}
                onClick={() => setPage((p) => p + 1)}
              >
                Next
              </Button>
            </div>
          ) : (
            ""
          )}
        </section>
      </div>
    </section>
  );
};

export default AllMenu;

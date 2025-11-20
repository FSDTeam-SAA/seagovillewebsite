"use client";
import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useAppDispatch } from "@/lib/store/hooks";
import { useAllMenuData } from "@/hooks/all-menudata";
import { MenuItem, Product } from "@/lib/types";
import { PizzaFilterTabs } from "../pizza/pizza-filter-tabs";
import { PizzaCard } from "../shared/pizza-card";
import { Button } from "../ui/button";
import { useAddToCartMutation } from "@/hooks/use-cart";
import { useRouter } from "next/navigation";
import Image from "next/image";

const AllMenu = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const { mutate: addToCartMutation, isPending } = useAddToCartMutation();
  const [selectedSize, setSelectedSize] = useState<
    "small" | "medium" | "large"
  >("small");
  const [selectedPizza, setSelectedPizza] = useState<MenuItem | null>(null);
  const [dialogType, setDialogType] = useState<"cart" | "order">("cart");
  const route = useRouter();
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading, isError, error } = useAllMenuData(
    activeCategory,
    page
  );

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

  const handleOpenSizeDialog = (
    pizza: MenuItem,
    type: "cart" | "order" = "cart"
  ) => {
    setSelectedPizza(pizza);
    setSelectedSize("small");
    setDialogType(type);
  };

  const handleConfirmAction = () => {
    if (selectedPizza) {
      if (dialogType === "order") {
        // For order: add to cart and then redirect to checkout
        handleAddToCart(selectedPizza, selectedSize, () => {
          route.push("/checkout");
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
                className="bg-transparent text-red-500  hover:bg-gray-300  cursor-pointer"
              >
                <ChevronLeft className="w-10! h-10! " />
              </Button>

              <span className="flex items-center gap-2">
                {Array.from({ length: data?.meta?.totalPages || 0 }).map(
                  (_, index) => {
                    const pageNumber = index + 1;
                    const isActive = pageNumber === page;

                    return (
                      <div key={index}>
                        {isActive ? (
                          <Image
                            src="/pagination.png"
                            width={20}
                            height={20}
                            alt="active-page"
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                        )}
                      </div>
                    );
                  }
                )}
              </span>

              <Button
                disabled={page >= (data?.meta?.totalPages || 1)}
                onClick={() => setPage((p) => p + 1)}
                className="bg-transparent text-red-500  hover:bg-gray-300 cursor-pointer"
              >
                <ChevronRight className="w-10! h-10!"/>
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

"use client";

import React, { useState } from "react";
import { PizzaCard } from "../shared/pizza-card";
import Link from "next/link";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useAppDispatch } from "@/lib/store/hooks";
import { MenuItem, Product } from "@/lib/types";
import { useAllMenuData } from "@/hooks/all-menudata";
import { useAddToCartMutation } from "@/hooks/use-cart";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Alert,
  AlertTitle,
  AlertDescription,
} from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";

const SingnaturePizza = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const { mutate: addToCartMutation, isPending } = useAddToCartMutation();
  const [selectedSize, setSelectedSize] = useState<"small" | "medium" | "large">("small");
  const [selectedPizza, setSelectedPizza] = useState<MenuItem | null>(null);
  const [dialogType, setDialogType] = useState<"cart" | "order">("cart");
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, error } = useAllMenuData(activeCategory, page);

  const handleAddToCart = (
    pizza: MenuItem,
    size: "small" | "medium" | "large" = "small",
    onSuccess?: () => void
  ) => {
    const price = pizza.price[0];

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

if (isError) {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Alert>
        <Card className="w-full">
          <CardContent className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <AlertTitle className="text-lg">Failed to load pizzas</AlertTitle>
              <AlertDescription>
                {error?.message ?? "Something went wrong while fetching the menu. Please try again."}
              </AlertDescription>
            </div>
            <div className="flex gap-2">
             
              <Button variant="outline" onClick={() => setActiveCategory("all")}>
                View All
              </Button>
            </div>
          </CardContent>
        </Card>
      </Alert>
    </div>
  );
}

if (isLoading) {
  // show skeleton grid similar to your final grid layout
  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        {/* category tabs skeleton */}
        <div className="flex gap-2">
          <Skeleton className="h-10 w-24 rounded-md" />
          <Skeleton className="h-10 w-28 rounded-md" />
          <Skeleton className="h-10 w-20 rounded-md" />
     
        </div>
      </div>

      {/* skeleton grid for pizza cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i} className="p-4">
            <div className="flex flex-col gap-4">
              <Skeleton className="h-44 w-full rounded-md" /> {/* image skeleton */}
              <div>
                <Skeleton className="h-6 w-3/4 rounded-md mb-2" /> {/* title skeleton */}
                <Skeleton className="h-4 w-1/2 rounded-md mb-3" /> {/* subtitle skeleton */}
                <div className="flex items-center gap-2">
                  <Skeleton className="h-8 w-20 rounded-md" /> {/* price / button skeleton */}
                  <Skeleton className="h-8 w-20 rounded-md" />
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}

  const pizzaData = data?.items;

  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
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
              onAddToCart={() => handleOpenSizeDialog(pizza, "cart")}
              onOrder={() => handleOpenSizeDialog(pizza, "order")}
              // selectedSize={selectedSize}
              // onSizeChange={setSelectedSize}
              // onConfirmAction={handleConfirmAction}
              // isDialogOpen={selectedPizza?._id === pizza._id}
              // onCloseDialog={() => setSelectedPizza(null)}
              // dialogType={dialogType}
              // isPending={isPending}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/menu">
            <Button size="lg" variant="outline" className=" border border-[#D62828] rounded-none cursor-pointer">
              View All Menu
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SingnaturePizza;
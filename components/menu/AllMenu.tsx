'use client'
import React, { useState } from "react";
import { Loader2 } from "lucide-react";

import { toast } from "sonner";
import { useCart } from "@/hooks/use-cart";
import { usePizzasByCategoryQuery } from "@/hooks/use-pizzas-query";
import { PizzaFilterTabs } from "../pizza/pizza-filter-tabs";
import { PizzaCard } from "../shared/pizza-card";
import { Button } from "../ui/button";
const AllMenu = () => {
      const [activeCategory, setActiveCategory] = useState("all");
  const { addItem } = useCart();

  const {
    data: pizzas = [],
    isLoading,
    error,
  } = usePizzasByCategoryQuery(
    activeCategory === "all" ? null : activeCategory
  );

  const handleAddToCart = (pizza: (typeof pizzas)[0]) => {
    toast.success("WoW Succesfuly added the pizza in your cart");
    addItem({
      id: `${pizza.id}`,
      pizzaId: pizza.id,
      name: pizza.name,
      price: pizza.price,
      quantity: 1,
      time: "40",
    });
  };
  return (
    <section>
      <div className="container mx-auto">
        <section className="">
          <div className="  px-4 sm:px-6 lg:px-8">
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
                  {pizzas.map((pizza) => (
                    <PizzaCard
                      key={pizza.id}
                      pizza={pizza}
                      onAddToCart={() => handleAddToCart(pizza)}
                    />
                  ))}
                </div>

                {pizzas.length === 0 && (
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
        </section>
      </div>
    </section>
  );
};

export default AllMenu;

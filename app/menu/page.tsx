/**
 * Menu page - Browse all pizzas with filtering and TanStack Query
 */

"use client";

import { useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { usePizzasByCategoryQuery } from "@/hooks/use-pizzas-query";

import { PizzaFilterTabs } from "@/components/pizza/pizza-filter-tabs";
import { PizzaCard } from "@/components/sheard/pizza-card";
import { Footer } from "@/components/sheard/footer";

export default function MenuPage() {
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
    addItem({
      id: `${pizza.id}`,
      pizzaId: pizza.id,
      name: pizza.name,
      price: pizza.price,
      quantity: 1,
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 to-accent/10 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Our Menu</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Discover our delicious selection of handcrafted pizzas, made with
            the finest ingredients
          </p>
        </div>
      </section>

      {/* Menu Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Create Your Own Pizza
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Build your own pizza with unlimited topping combinations
          </p>
          <Link href="/builder">
            <Button
              size="lg"
              variant="secondary"
              className="bg-background text-foreground hover:bg-secondary"
            >
              Build Pizza
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}

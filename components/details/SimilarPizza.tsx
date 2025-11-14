"use client";

import React from "react";

import { PizzaCard } from "../sheard/pizza-card";
import { useCart } from "@/hooks/use-cart";
import { toast } from "sonner";
import { FEATURED_PIZZAS } from "@/lib/constants";

interface PizzaCard {
  id: string;
  name: string;
  description: string;
  rating: number;
  price: number;
  image: string;
  time: string;
  category: string;
}

export const SimilarPizza = () => {
  const { addItem } = useCart();
 

  const handleAddToCart = (pizza: (typeof FEATURED_PIZZAS)[0]) => {
    toast.success("WoW Succesfuly added the pizza in your cart");
    addItem({
      id: `${pizza.id}`,
      pizzaId: pizza.id,
      name: pizza.name,
      price: pizza.price,
      quantity: 1,
      time: "30",
    });
  };
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Similar Pizza
          </h2>
          <p className="text-gray-600">
            Discover our delicious pizzas. Pizzas, toppings, and more
          </p>
        </div>

        {/* Pizza Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {FEATURED_PIZZAS.map((pizza) => (
            <PizzaCard
              key={pizza.id}
              pizza={pizza}
              onAddToCart={() => handleAddToCart(pizza)}
            />
          ))}
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center items-center gap-2">
          <button className="text-gray-300 hover:text-gray-400">&lt;</button>
          {[...Array(5)].map((_, i) => (
            <button
              key={i}
              className={`w-2 h-2 rounded-full transition-colors ${
                i === 0 ? "bg-red-600 w-8" : "bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
          <button className="text-gray-300 hover:text-gray-400">&gt;</button>
        </div>
      </div>
    </section>
  );
};

export default SimilarPizza;

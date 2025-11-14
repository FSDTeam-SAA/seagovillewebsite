import React from "react";
import { PizzaCard } from "../sheard/pizza-card";
import { FEATURED_PIZZAS } from "@/lib/constants";
import Link from "next/link";
import { Button } from "../ui/button";
import { useCart } from "@/hooks/use-cart";
import { toast } from "sonner";

const SingnaturePizza = () => {
  const { addItem } = useCart();
  const handleAddToCart = (pizza: (typeof FEATURED_PIZZAS)[0]) => {
    toast.success("WoW Succesfuly added the pizza in your cart");
    addItem({
      id: `${pizza.id}`,
      pizzaId: pizza.id,
      name: pizza.name,
      price: pizza.price,
      quantity: 1,
      time:'30',
    });
  };

  return (
    <section className="py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16 lg:mb-20">
          {/* <span className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4"></span> */}
          <h2 className="text-2xl md:text-4xl font-bold mb-2 leading-[120%] text-[#343A40] font-lobster ">
            Our Signature Pizzas
          </h2>
          <p className="text-sm text-[#6C757D] font-normal leading-[150%]">
            Explore our crowd favorite pizzas crafted with fresh ingredients,
            irresistible flavors, and the perfect balance of taste in every
            slice.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURED_PIZZAS.map((pizza) => (
            <PizzaCard
              key={pizza.id}
              pizza={pizza}
              onAddToCart={() => handleAddToCart(pizza)}
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

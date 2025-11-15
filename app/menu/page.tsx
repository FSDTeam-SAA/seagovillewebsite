/**
 * Menu page - Browse all pizzas with filtering and TanStack Query
 */

import Link from "next/link";

import { Button } from "@/components/ui/button";

import MenuHero from "@/components/menu/MenuHero";
import AllMenu from "@/components/menu/AllMenu";

export default function MenuPage() {


  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Hero Section */}
      <MenuHero/>

      {/* Menu Section */}
     <AllMenu />

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
    </div>
  );
}

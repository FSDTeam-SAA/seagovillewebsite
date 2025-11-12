/**
 * Home page - Features hero section and featured pizzas
 */

"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/use-cart"
import { Header } from "@/components/sheard/header"
import { PizzaCard } from "@/components/pizza/pizza-card"
import { Footer } from "@/components/sheard/footer"
import { FEATURED_PIZZAS } from "@/lib/constants"
import Image from "next/image"


export default function Home() {
  const { addItem } = useCart()

  const handleAddToCart = (pizza: (typeof FEATURED_PIZZAS)[0]) => {
    addItem({
      id: `${pizza.id}-${Date.now()}`,
      pizzaId: pizza.id,
      name: pizza.name,
      price: pizza.price,
      quantity: 1,
    })
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/5 to-accent/5 py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Fresh, Hot, Made to Excite</h1>
              <p className="text-lg text-muted-foreground mb-8">
                Your Taste Buds! Discover our delicious selection of handcrafted pizzas, appetizers, and more.
              </p>

              <div className="flex gap-4">
                <Link href="/builder">
                  <Button size="lg" className="bg-primary hover:bg-primary/90">
                    Create Your Own Pizza
                  </Button>
                </Link>
                <Link href="/menu">
                  <Button size="lg" variant="outline">
                    View Menu
                  </Button>
                </Link>
              </div>

              <div className="mt-10 grid grid-cols-3 gap-6">
                <div>
                  <p className="text-2xl font-bold text-primary">30min</p>
                  <p className="text-sm text-muted-foreground">Average Delivery</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary">15+</p>
                  <p className="text-sm text-muted-foreground">Menu Items</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary">100%</p>
                  <p className="text-sm text-muted-foreground">Fresh Ingredients</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-primary/10 to-accent/10 rounded-full absolute inset-0" />
              <Image
              width={1999}
              height={700}
                src="/navbar.jpg"
                alt="Fresh Pizza"
                className="relative w-full aspect-square object-cover rounded-full shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Pizzas Section */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
              Our Signature Pizzas
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Discover Our Menu</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our delicious selection of handcrafted pizzas, made with the finest ingredients
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURED_PIZZAS.map((pizza) => (
              <PizzaCard key={pizza.id} pizza={pizza} onAddToCart={() => handleAddToCart(pizza)} />
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

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Create Your Perfect Pizza?</h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Build your own pizza with endless topping combinations. Choose your crust, sauce, cheese, and toppings.
          </p>
          <Link href="/builder">
            <Button size="lg" variant="secondary" className="bg-background text-foreground hover:bg-secondary">
              Start Building
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}

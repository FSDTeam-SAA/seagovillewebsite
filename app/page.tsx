/**
 * Home page - Features hero section and featured pizzas
 */

"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

import { Footer } from "@/components/sheard/footer";

import Image from "next/image";
import Navbar from "@/components/sheard/Navbar";
import Hero from "@/components/sheard/Hero";
import SingnaturePizza from "@/components/signaturepiczza/SingnaturePizza";
import CreateOwnPizza from "@/components/home/CreateOwnPizza";
import HotDealsCombos from "@/components/home/HotDealsCombos";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <Hero />
      <SingnaturePizza />
      <CreateOwnPizza />
      <HotDealsCombos />

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Create Your Perfect Pizza?
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Build your own pizza with endless topping combinations. Choose your
            crust, sauce, cheese, and toppings.
          </p>
          <Link href="/builder">
            <Button
              size="lg"
              variant="secondary"
              className="bg-background text-foreground hover:bg-secondary"
            >
              Start Building
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}

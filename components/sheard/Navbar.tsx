'use client'
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Menu, Search, ShoppingCart } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import Image from "next/image";

const Navbar = () => {
  const { totalItems } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50! bg-[#0000003b] backdrop-blur-3xl py-5 text-white  ">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="">
            <Image src={'/logo.png'} alt="logo" width={120} height={80}  className=" w-full aspect-square object-cover py-2.5 "/>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className=" hover:text-primary transition-colors">
              Home
            </Link>
            <Link
              href="/menu"
              className=" hover:text-primary transition-colors"
            >
              Menu
            </Link>
            <Link
              href="/builder"
              className=" hover:text-primary transition-colors"
            >
              Create Your Own
            </Link>
            <Link
              href="/about"
              className=" hover:text-primary transition-colors"
            >
              About Us
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="hidden sm:inline-flex"
            >
              <Search className="w-5 h-5" />
            </Button>

            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute top-1 right-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>

            <Button className="hidden sm:inline-flex bg-primary hover:bg-primary/90">
              Order Now
            </Button>

            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden pb-4 space-y-2 border-t border-border">
            <Link
              href="/"
              className="block px-4 py-2 text-foreground hover:bg-secondary rounded"
            >
              Home
            </Link>
            <Link
              href="/menu"
              className="block px-4 py-2 text-foreground hover:bg-secondary rounded"
            >
              Menu
            </Link>
            <Link
              href="/builder"
              className="block px-4 py-2 text-foreground hover:bg-secondary rounded"
            >
              Create Your Own
            </Link>
            <Link
              href="/about"
              className="block px-4 py-2 text-foreground hover:bg-secondary rounded"
            >
              About Us
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;

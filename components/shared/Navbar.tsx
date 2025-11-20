"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Menu, Search, ShoppingCart } from "lucide-react";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAppSelector } from "@/lib/store/hooks";
import SearchButton from "./SearchButton";
import { useQuery } from "@tanstack/react-query";
import { getCartItems } from "@/lib/api";

const Navbar = () => {
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchinput, setSearchInput] = useState(false);
  const pathname = usePathname();
  const {data:cart}=useQuery({
    queryKey:['cart'],
    queryFn:()=>getCartItems()
  })

  // console.log('cart data',cart)

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Menu", href: "/menu" },
    { name: "Create Your Own", href: "/builder" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];
  const totalItems = cart?.length || 0;
//  console.log('cart data in navbar',totalItems ,'and also dat',cart)
  const handelSearch = () => {
    setSearchInput(!searchinput);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0000003b] backdrop-blur-2xl py-5 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/">
            <Image
              src="/logo.png"
              alt="logo"
              width={120}
              height={80}
              className="w-full aspect-square object-cover py-2.5"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`pb-1 transition-colors ${
                    isActive
                      ? "text-red-500 border-b-2 border-red-500"
                      : "text-white hover:text-red-400"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            {/* <div className="relative flex gap-1.5 items-center">
              {searchinput && (
                <div className=" ">
                  <SearchButton />
                </div>
              )}

              <Button
                variant="ghost"
                size="icon"
                onClick={handelSearch}
                className="inline-flex"
              >
                <Search className="w-5 h-5 cursor-pointer" />
              </Button>
            </div> */}

            <Link href="/cart">
              <Button
                variant="ghost"
                size="icon"
                className="relative cursor-pointer"
              >
                <ShoppingCart className="w-6 h-6 md:w-8! md:h-8!" />
                {totalItems > 0 && (
                  <span className="absolute top-0 right-0 bg-[#D62828] text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>

            {/* <Button className="hidden sm:inline-flex bg-primary hover:bg-primary/90">
              Order Now
            </Button> */}

            <button
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="lg:hidden pb-4 space-y-2 border-t border-border">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block px-4 py-2 rounded ${
                    isActive
                      ? "text-red-500 border-b-2 border-red-500"
                      : "text-white hover:text-red-400"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;

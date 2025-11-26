"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import { MenuResponse } from "@/lib/detailstype";
import { MenuItem } from "@/lib/types";
import { useAddToCartMutation } from "@/hooks/use-cart";
import Link from "next/link";
import { Button } from "../ui/button";

export interface SizeOption {
  key: string;
  size: string;
  price: number;
  pieces?: number;
  description: string;
}

export const DetailsTop = ({ pizza }: { pizza: MenuResponse }) => {
  const { mutate: addToCartMutation } = useAddToCartMutation();
  const singlePizza = pizza?.data;
  const [selectedSize, setSelectedSize] = useState<
    "small" | "medium" | "large"
  >("small");

  const [mainImage, setMainImage] = useState(
    singlePizza?.images?.[0]?.url || "/detail2.jpg"
  );

  const descriptions = [
    "Perfect for one person",
    "Great for sharing",
    "Family size feast",
  ];

  // Create size options safely
  const sizeOptions: SizeOption[] =
    singlePizza?.sizes?.map((size, index) => ({
      key: size,
      size: size,
      price: singlePizza.price?.[index] || 0,
      pieces: singlePizza.pieces?.[index],
      description: descriptions[index] || "Delicious pizza size",
    })) || [];

  const ingredients =
    singlePizza?.ingredients && singlePizza.ingredients.length > 0
      ? singlePizza.ingredients
      : [
          "Fresh mozzarella cheese",
          "Premium tomato sauce",
          "Fresh herbs and spices",
          "Quality selected toppings",
          "Hand-tossed dough",
          "100% natural ingredients",
        ];

  // Use all available images or fallback
  const images =
    singlePizza?.images && singlePizza.images.length > 0
      ? singlePizza.images.map((img) => img.url)
      : [singlePizza?.images?.[0]?.url || "/placeholder.svg"];

  // const handleAddToCart = (
  //   pizza: MenuItem,
  //   size: "small" | "medium" | "large" = "small"
  // ) => {
  //   // Find the index of the selected size
  //   // const sizeIndex = singlePizza.sizes.findIndex(
  //   //   (s) => s.toLowerCase() === size
  //   // );

  //   // if (sizeIndex === -1 || !singlePizza.price?.[sizeIndex]) {
  //   //   toast.error("Selected size is not available for this pizza");
  //   //   return;
  //   // }

  //   addToCartMutation(
  //     { menuId: pizza._id, size },
  //     {
  //       onSuccess: () => {
  //         toast.success("WoW! Successfully added the pizza to your cart");
  //       },
  //       onError: (error: Error) => {
  //         toast.error(error?.message || "Failed to add to cart");
  //       },
  //     }
  //   );
  // };

  if (!singlePizza) {
    return <div>Loading...</div>;
  }

  return (
    <section className="py-12 from-white to-orange-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left: Pizza Image */}
          <div className="flex flex-col gap-4 w-full mx-auto px-4">
            {/* Main Image */}
            <div className="relative bg-white rounded-lg overflow-hidden shadow-lg w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]">
              <Image
                src={mainImage}
                alt={singlePizza.name}
                fill
                className="object-cover w-full h-full"
                priority
              />
            </div>

            {/* Thumbnails - Only show if multiple images available */}
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto py-2">
                {images.map((img, i) => (
                  <button
                    key={i}
                    className={`relative w-20 h-20 rounded-lg overflow-hidden shrink-0 border-2 transition-colors ${
                      mainImage === img
                        ? "border-red-500"
                        : "border-transparent"
                    }`}
                    onClick={() => setMainImage(img)}
                  >
                    <Image
                      src={img}
                      alt={`${singlePizza.name} view ${i + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Details */}
          <div className="flex flex-col gap-6">
            {/* Title & Rating */}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                {singlePizza.name}
              </h1>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Description
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {singlePizza.description}
              </p>
            </div>

            {/* Ingredients */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Ingredients
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {ingredients.map((ingredient, i) => (
                  <li key={i} className="flex items-center gap-2 text-gray-700">
                    <span className="text-red-500">•</span>
                    {ingredient}
                  </li>
                ))}
              </ul>
            </div>

            {/* Size Selection */}
            {/* Size Selection */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Sizes
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {singlePizza.sizes.map((option, index) => {
                  // const sizeKey = option.key.toLowerCase();
                  // let sizeValue = "";

                  // if (sizeKey.includes("small") || sizeKey.includes("21")) {
                  //   sizeValue = "small";
                  // } else if (
                  //   sizeKey.includes("medium") ||
                  //   sizeKey.includes("10")
                  // ) {
                  //   sizeValue = "medium";
                  // } else if (
                  //   sizeKey.includes("large") ||
                  //   sizeKey.includes("40")
                  // ) {
                  //   sizeValue = "large";
                  // }

                  return (
                    <button
                      key={index}
                     
                      className={`px-3 py-1 rounded-lg cursor-pointer border-2 text-center transition-all ${
                        selectedSize === option
                          ? "border-red-500 bg-red-50"
                          : "border-red-500 bg-red-50 hover:border-gray-300"
                      }`}
                    >
                      <p className="flex justify-evenly items-center">
                        <span className="font-semibold text-gray-900">
                          Size: {option}
                        </span>
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Slices
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {singlePizza.pieces.map((option, index) => {
                  // const sizeKey = option.key.toLowerCase();
                  // let sizeValue = "";

                  // if (sizeKey.includes("small") || sizeKey.includes("21")) {
                  //   sizeValue = "small";
                  // } else if (
                  //   sizeKey.includes("medium") ||
                  //   sizeKey.includes("10")
                  // ) {
                  //   sizeValue = "medium";
                  // } else if (
                  //   sizeKey.includes("large") ||
                  //   sizeKey.includes("40")
                  // ) {
                  //   sizeValue = "large";
                  // }

                  return (
                    <button
                      key={index}
                      // onClick={() =>
                      //   setSelectedSize(
                      //     sizeValue as "small" | "medium" | "large"
                      //   )
                      // }
                      className={`px-3 py-1 rounded-lg cursor-pointer border-2 text-center transition-all ${
                        option === option
                          ? "border-red-500 bg-red-50"
                          : "border-red-500 bg-red-50 hover:border-gray-300"
                      }`}
                    >
                      <p className="flex justify-evenly items-center">
                        {option && (
                          <span className="font-semibold text-gray-900">
                            Slice: {option}
                          </span>
                        )}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Prices
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {singlePizza.price.map((option, index) => {
                  // const sizeKey = option.key.toLowerCase();
                  // let sizeValue = "";

                  // if (sizeKey.includes("small") || sizeKey.includes("21")) {
                  //   sizeValue = "small";
                  // } else if (
                  //   sizeKey.includes("medium") ||
                  //   sizeKey.includes("10")
                  // ) {
                  //   sizeValue = "medium";
                  // } else if (
                  //   sizeKey.includes("large") ||
                  //   sizeKey.includes("40")
                  // ) {
                  //   sizeValue = "large";
                  // }

                  return (
                    <button
                      key={index}
                      // onClick={() =>
                      //   setSelectedSize(
                      //     sizeValue as "small" | "medium" | "large"
                      //   )
                      // }
                      className={`px-3 py-1 rounded-lg cursor-pointer border-2 text-center transition-all ${
                        option === option
                          ? "border-red-500 bg-red-50"
                          : "border-red-500 bg-red-50 hover:border-gray-300"
                      }`}
                    >
                      <p className="text-red-600 font-bold text-lg ">
                        ${option}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Availability */}
            <div
              className={`inline-flex items-center px-3 py-1 w-21 rounded-sm text-sm font-medium ${
                singlePizza.isAvailable
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {singlePizza.isAvailable ? "In Stock" : "Out of Stock"}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                className="flex-1 cursor-pointer  text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                href="https://order.toasttab.com/online/craving-pizza-seagoville-208-hall-road"
                target="_blank"
              >
                <button
                  // onClick={() => handleAddToCart(singlePizza, selectedSize)}
                  disabled={!singlePizza.isAvailable}
                  className="flex-1 cursor-pointer bg-white hover:bg-gray-50 text-red-600 border border-red-600 font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </button>
              </Link>
              <Link
                href="https://order.toasttab.com/online/craving-pizza-seagoville-208-hall-road"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 cursor-pointer  text-white font-semibold  rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Button  className="flex-1 cursor-pointer bg-red-600 hover:bg-red-700  text-white border border-red-600 font-semibold py-6 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">Order Now</Button>
              </Link>
            </div>

            {/* Additional Info */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="grid grid-cols-2 gap-4 text-sm lg:text-base">
                <div>
                  <span className="font-semibold">Category:</span>
                  <span className="ml-2 text-gray-600 capitalize">
                    {singlePizza.category}
                  </span>
                </div>
                <div>
                  <span className="font-semibold">Total Sold:</span>
                  <span className="ml-2 text-gray-600">
                    {singlePizza.totalSold || 0}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Description */}
        <div className="mt-16 border-t pt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Detailed Description
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            {singlePizza.description}
          </p>
          <ul className="space-y-2 text-gray-700">
            <li>• Made with fresh, high-quality ingredients</li>
            <li>• Perfectly baked to achieve the ideal crust</li>
            <li>• Generous toppings for maximum flavor</li>
            <li>• Prepared fresh when you order</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default DetailsTop;

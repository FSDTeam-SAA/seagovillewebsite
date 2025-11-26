"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import { MenuResponse } from "@/lib/detailstype";
import { MenuItem } from "@/lib/types";
import { useAddToCartMutation } from "@/hooks/use-cart";
// import { Toaster } from "sonner";

export interface SizeOption {
  key: string;
  size: string;
  price: number;
  description: string;
}

export const DetailsTop = ({ pizza }: { pizza: MenuResponse }) => {
  const { mutate: addToCartMutation } = useAddToCartMutation();
  const singlePizza = pizza?.data;
  const [selectedSize, setSelectedSize] = useState<
    "small" | "medium" | "large"
  >("small");

  const [mainImage, setMainImage] = useState(
    singlePizza?.images[0]?.url || "/detail2.jpg"
  );

  const descriptions = [
    "Perfect for one person",
    "Great for sharing",
    "Family size feast",
  ];

  const sizeKeys = ["small", "medium", "large"] as const;

  const sizeOptions: SizeOption[] = sizeKeys.map((key, index) => ({
    key,
    size: `${singlePizza.pieces[index]} Pieces`,
    price: singlePizza.price[index],
    description: descriptions[index],
  }));

  const ingredients =
    singlePizza.ingredients && singlePizza.ingredients.length > 0
      ? singlePizza.ingredients
      : [
          "Fresh mozzarella cheese",
          "Premium tomato sauce",
          "Fresh herbs and spices",
          "Quality selected toppings",
          "Hand-tossed dough",
          "100% natural ingredients",
        ];

  // Use all available images or fallback to multiple copies of the main image
  const images =
    singlePizza.images && singlePizza.images.length > 0
      ? singlePizza.images.map((img) => img.url)
      : [singlePizza.images[0]?.url || "/placeholder.svg"];

  const handleAddToCart = (
    pizza: MenuItem,
    size: "small" | "medium" | "large" = "small",
    onSuccess?: () => void
  ) => {
    const price = pizza.price[0];

    if (!price) {
      toast.error("Selected size is not available for this pizza");
      return;
    }

    addToCartMutation(
      { menuId: pizza._id, size },
      {
        onSuccess: () => {
          toast.success("WoW! Successfully added the pizza to your cart");
          onSuccess?.();
        },
        onError: (error) => {
          toast.error(error?.message || "Failed to add to cart");
        },
      }
    );
  };

  // const handleOrderNow = () => {
  //   handleAddToCart();
  //   // You can add navigation to cart or checkout here
  // };

  return (
    <section className="py-12  from-white to-orange-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left: Pizza Image */}
          <div className="flex flex-col gap-4 w-full  mx-auto px-4">
            {/* Main Image */}
            <div className="relative bg-white rounded-lg overflow-hidden shadow-lg w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]">
              <Image
                src={mainImage}
                alt={singlePizza.name}
                fill
                className="object-cover w-full  h-full"
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
              {/* <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <span className="text-gray-600 ml-2">
                  5.00 ({singlePizza.totalSold || 0} sold)
                </span>
              </div> */}
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
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Choose Your Size
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {sizeOptions.map((option) => (
                  <button
                    key={option.key}
                    // onClick={() => setSelectedSize(option.key)}
                    className={`p-3 rounded-lg cursor-pointer border-2 text-center transition-all ${
                      selectedSize === option.key
                        ? "border-red-500 bg-red-50"
                        : "border-gray-200 bg-white hover:border-gray-300"
                    }`}
                  >
                    <p className="font-semibold text-gray-900">{option.size}</p>
                    <p className="text-sm text-gray-500">
                      {option.description}
                    </p>
                    <p className="text-red-600 font-bold text-lg mt-2">
                      ${option.price}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div
              className={`inline-flex items-center px-3 py-1 w-21 rounded-full text-sm font-medium ${
                singlePizza.isAvailable
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {singlePizza.isAvailable ? "In Stock" : "Out of Stock"}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={
                  "https://order.toasttab.com/online/craving-pizza-seagoville-208-hall-road"
                }
                target="_blank"
                className="flex-1 cursor-pointer bg-white hover:bg-gray-50 text-red-600 border border-red-600 font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <button
                  // onClick={() => handleAddToCart(singlePizza!, selectedSize)} // Here we call handleAddToCart
                  disabled={!singlePizza.isAvailable}
                  className="flex-1 cursor-pointer bg-white hover:bg-gray-50 text-red-600 border border-red-600 font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </button>
              </a>
              <a
                href={
                  "https://order.toasttab.com/online/craving-pizza-seagoville-208-hall-road"
                }
                target="_blank"
                className="flex-1 cursor-pointer bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed "
              >
                <button
                // onClick={handleOrderNow}
                // disabled={!singlePizza.isAvailable}
                className="cursor-pointer"
                >
                  Order Now
                </button>
              </a>
            </div>

            {/* Additional Info */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
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

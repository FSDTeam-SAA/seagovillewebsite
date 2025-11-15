"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Star, ShoppingCart } from "lucide-react";

interface SizeOption {
  size: string;
  price: number;
  description: string;
}

export const DetailsTop = () => {
  const [selectedSize, setSelectedSize] = useState<string>("small");

  const sizeOptions: SizeOption[] = [
    { size: "Small Size", price: 12, description: "Light and crunchy" },
    { size: "Mid Size", price: 123, description: "Light and crunchy" },
    { size: "Large Size", price: 1234, description: "Light and crunchy" },
  ];

  const ingredients = [
    "Lorem ipsum ingredients",
    "Lorem ipsum ingredients",
    "Lorem ipsum ingredients",
    "Lorem ipsum ingredients",
    "Lorem ipsum ingredients",
    "Lorem ipsum ingredients",
  ];

  const selectedSizeData =
    sizeOptions[selectedSize === "small" ? 0 : selectedSize === "mid" ? 1 : 2];

  const images = [
    "/images/hot-deals.png",
    "/detail2.jpg",
    "/images/hot-deals.png",
    "/detail2.jpg",
    "/images/hot-deals.png",
    "/detail2.jpg",
   "/images/hot-deals.png",
  ];

  // State for the main image
  const [mainImage, setMainImage] = useState(images[0]);
  return (
    <section className="py-12 bg-gradient-to-b from-white to-orange-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left: Pizza Image */}
          <div className="flex flex-col gap-4 max-w-full mx-auto px-4">
            {/* Main Image */}
            <div className="relative bg-white rounded-lg overflow-hidden shadow-lg w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]">
              <Image
                src={mainImage}
                alt="Selected Pizza"
                fill
                className="object-cover"
              />
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3 overflow-x-auto py-2">
              {images.map((img, i) => (
                <button
                  key={i}
                  className={`relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-colors ${
                    mainImage === img ? "border-red-500" : "border-transparent"
                  }`}
                  onClick={() => setMainImage(img)}
                >
                  <Image
                    src={img}
                    alt={`Pizza view ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Details */}
          <div className="flex flex-col gap-6">
            {/* Title & Rating */}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                Classic Pepperoni
              </h1>
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <span className="text-gray-600 ml-2">5.00 (123 review)</span>
              </div>
            </div>

            {/* Ingredients */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Ingredients
              </h3>
              <ul className="grid grid-cols-2 gap-2">
                {ingredients.map((ingredient, i) => (
                  <li key={i} className="flex items-center gap-2 text-gray-700">
                    <span className="text-red-500">•</span>
                    {ingredient}
                    <span className="text-gray-500 ml-auto">• 52g</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Choose Your Size
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {sizeOptions.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() =>
                      setSelectedSize(
                        idx === 0 ? "small" : idx === 1 ? "mid" : "large"
                      )
                    }
                    className={`p-3 rounded-lg border-2 text-center transition-all ${
                      selectedSize ===
                      (idx === 0 ? "small" : idx === 1 ? "mid" : "large")
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

            {/* Order Button */}
            <button className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors">
              <ShoppingCart className="w-5 h-5" />
              Order Now
            </button>
          </div>
        </div>

        {/* Description */}
        <div className="mt-16 border-t pt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <ul className="space-y-2 text-gray-700">
            <li>
              • Lorem ipsum is simply dummy text of the printing and typesetting
              industry
            </li>
            <li>
              • Lorem ipsum is simply dummy text of the printing and typesetting
              industry
            </li>
            <li>
              • Lorem ipsum is simply dummy text of the printing and typesetting
              industry
            </li>
            <li>
              • Lorem ipsum is simply dummy text of the printing and typesetting
              industry
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default DetailsTop;

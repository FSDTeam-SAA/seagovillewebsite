import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const CreateOwnPizza = () => {
  return (
    <section
      className="relative py-20 md:py-32 overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #FEF2F2 0%, #FFF7ED 50%, #FEFCE8 100%)",
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-sm font-medium text-[#D62828] bg-transparent border py-2 px-4 rounded-sm  inline-block border-[#F2BCBC]  tracking-wider leading-[150%]">
                🎨 Unlimited Combinations
              </h2>
              <h1 className="text-2xl md:text-4xl  font-bold text-[#343A40] leading-tight font-lobster">
                Create Your <span className="text-amber-600">Own Pizza</span>
              </h1>
              <div>
                <p className="text-sm mb-4 md:mb-8 md:text-base text-[#6C757D] leading-relaxed font-normal">
                  Explore our crowd favorite pizza crafted with fresh
                  ingredients, irresistible flavors, and the perfect balance of
                  taste in every slice.
                </p>
                <p className="text-sm md:text-base text-[#6C757D] leading-relaxed font-normal">
                  Choose your crust, sauce, cheese, and up to 15 toppings. Build
                  your perfect pizza exactly the way you want it!
                </p>
              </div>
            </div>

            {/* Features Grid */}
            <div className=" flex flex-col gap-3">
              <div className="">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <div className=" bg-white text-[#D62828] rounded-md  p-2">
                    <Image
                      src={"/icon/earth-crust.svg"}
                      className=" object-cover"
                      alt="chosse-pizza"
                      width={60}
                      height={60}
                    />
                  </div>
                  <div>
                    Choose Your Crust
                    <p className="text-gray-600 text-sm">
                      Hand-tossed, Thin, or Deep Dish
                    </p>
                  </div>
                </h3>
              </div>

              <div className="">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <div className=" bg-white text-[#D62828] rounded-md  p-2">
                    <Image
                      src={"/icon/pizza.svg"}
                      className=" object-cover"
                      alt="chosse-pizza"
                      width={60}
                      height={60}
                    />
                  </div>
                  <div>
                    Pick Your Sauce
                    <p className="text-gray-600 text-sm">
                      Tomato, Alfredo, BBQ, or Garlic
                    </p>
                  </div>
                </h3>
              </div>

              <div className="">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <div className=" bg-white text-[#D62828] rounded-md  p-2">
                    <Image
                      src={"/icon/pizza (1).svg"}
                      className=" object-cover"
                      alt="chosse-pizza"
                      width={60}
                      height={60}
                    />
                  </div>
                  <div>
                    Select Cheese
                    <p className="text-gray-600 text-sm">
                      Mozzarella, Cheddar, Parmesan, or Mix
                    </p>
                  </div>
                </h3>
              </div>

              <div className="">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <div className=" bg-white text-[#D62828] rounded-md  p-2">
                    <Image
                      src={"/icon/ham.svg"}
                      className=" object-cover"
                      alt="chosse-pizza"
                      width={60}
                      height={60}
                    />
                  </div>
                  <div>
                    Add Toppings
                    <p className="text-gray-600 text-sm">
                      Choose from 15+ fresh toppings
                    </p>
                  </div>
                </h3>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-6">
              <Link href="/builder">
                <Button
                  size="lg"
                  className="bg-[#D62828] hover:bg-[#d64b28ee] text-white px-8 py-4 text-lg font-semibold rounded-md cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Start Customizing
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="relative rounded-2xl w-[85%] mx-auto xl:w-full  shadow-2xl transform hover:scale-105 transition-transform duration-500">
              <Image
                src="/creeateown.jpg"
                alt="Create your own pizza"
                width={600}
                height={600}
                className="w-full aspect-square object-cover rounded-2xl"
                priority
              />
              {/* Gradient overlay for better image blending */}
              <div className="absolute inset-0 bg-gradient-to-t from-amber-50/10 to-transparent"></div>

              {/* Tomato icon positioned in the middle at top */}
              <div className="absolute -top-6 left-[20%] transform -translate-x-[20%] bg-white p-2 rounded-md  shadow-lg z-50">
                <Image
                  src={"/icon/tomato.svg"}
                  alt="tomato"
                  width={50}
                  height={50}
                  className="w-8 h-8 md:w-10 md:h-10"
                />
              </div>
              {/* left mid   cheese*/}
              <div className="absolute bottom-[20%]  -left-6 -translate-y-[20%] bg-white p-2 rounded-md shadow-lg z-50">
                <Image
                  src={"/icon/cheese.svg"}
                  alt="tomato"
                  width={50}
                  height={50}
                  className="w-8 h-8 md:w-10 md:h-10"
                />
              </div>
              {/* right mid  */}
              <div className="absolute bottom-[40%]  -right-6 -translate-y-[20%] bg-white p-2 rounded-md shadow-lg z-50">
                <Image
                  src={"/icon/hot-dog.svg"}
                  alt="tomato"
                  width={50}
                  height={50}
                  className="w-8 h-8 md:w-10 md:h-10"
                />
              </div>
              {/* mushroom */}
              <div className="absolute -bottom-6  right-[50%] -translate-x-[50%] bg-white p-2 rounded-md shadow-lg z-50">
                <Image
                  src={"/icon/mushroom.svg"}
                  alt="tomato"
                  width={50}
                  height={50}
                  className="w-8 h-8 md:w-10 md:h-10"
                />
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-amber-200 rounded-full opacity-50 blur-xl"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-orange-200 rounded-full opacity-30 blur-xl"></div>
          </div>
        </div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-amber-100 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-40 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-100 rounded-full translate-x-1/3 translate-y-1/3 opacity-30 blur-3xl"></div>
    </section>
  );
};

export default CreateOwnPizza;

import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

const Hero = () => {
  return (
    <section className="relative top-0  bg-[url('/navbar.jpg')] bg-center md:bg-cover h-screen  flex items-center">
      {/* Optional overlay for better text readability */}
      {/* <div className="absolute inset-0 bg-black/20"></div> */}

      <div className="container relative px-4 sm:px-6 lg:px-8 mx-auto ">
        <div className="w-full lg:max-w-[50%] ">
         <p className="text-[#D62828] text-xs  font-medium leading-[150%] mb-3 md:mb-5 bg-[#F2BCBC] border border-[#F2BCBC]  px-4 py-2 rounded-xl  inline-block ">🔥 Delivery & Pickup Available</p>
          <h1 className="text-3xl sm:text-4xl font-lobster md:text-5xl lg:text-6xl font-medium mb-3  md:mb-5 font-lobster">
            Fresh. Hot. Made to Excite Your Taste Buds!
          </h1>
          <p className="text-base sm:text-lg  mb-8 md:mb-10 lg:mb-16  md:text-xl">
            Savor fresh ingredients, bold flavors, and artisan crafted pizzas
            made to perfection. Build your own or choose our signature
            creations.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <a
                href={`https://order.toasttab.com/online/craving-pizza-seagoville-208-hall-road`}
                target="_blank"
                // onClick={handleOrderNowClick}
              >
              <Button
                size="lg"
                className="w-full cursor-pointer hover:bg-[#D62828] rounded-none hover:text-white bg-white border text-[#D62828] border-[#D62828] font-medium text-sm md:text-base"
              >
                Create Your Own Pizza
              </Button>
            </a>
            <Link href="/menu" className="sm:flex-1">
              <Button
                size="lg"
                variant="outline"
                className="lg:w-62 w-full md:w-80 cursor-pointer bg-[#D62828] rounded-none hover:bg-[#d62828fa] hover:text-white text-white border-none  font-medium text-sm md:text-base leading-[150%]  "
              >
                Explore Menu
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-6 text-[#D62828]">
            <div>
              <p className="text-2xl md:text-4xl font-bold leading-[150%]">
                30min
              </p>
              <p className="text-sm md:text-sm font-normal leading-[150%] text-[#343A40]">
                Average Delivery
              </p>
            </div>
            <div>
              <p className="text-2xl md:text-4xl font-bold leading-[150%] ">15+</p>
              <p className="text-sm md:text-sm font-normal leading-[150%] text-[#343A40]">Menu Items</p>
            </div>
            <div>
              <p className="text-2xl md:text-4xl font-bold leading-[150%]">
                100%
              </p>
              <p className="text-sm md:text-sm font-normal leading-[150%] text-[#343A40]">
                Fresh Ingredients
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

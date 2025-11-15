import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";

const HotDealsCombos = () => {
  const deals = [
    {
      id: 1,
      title: "Buy 1 Get 1 50% Off",
      description:
        "Get double the deliciousness! Order one pizza and enjoy the second at 50% off for limited time.",
      tag: "Limited Time",
      buttonText: "Claim Now",
      bgColor: "#FBEAEA",
      icon: User,
    },
    {
      id: 2,
      title: "Family Combo",
      description:
        "Perfect for sharing. Enjoy a selection of our favorite pizzas, cookies and drinks for the whole family.",
      tag: "Best Value",
      buttonText: "Claim Now",
      bgColor: "#FBEAEA",
      icon: User,
    },
    {
      id: 3,
      title: "Student Special",
      description:
        "Delicious pizzas at incredible prices. Enjoy your favorite meals without breaking the budget.",
      tag: "Every Day",
      buttonText: "Claim Now",
      bgColor: "#FBEAEA",
      icon: User,
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-[#D62828] bg-transparent border py-2 px-4 rounded-sm  inline-block border-[#F2BCBC]  tracking-wider leading-[150%] mb-3 md:mb-4">
            {" "}
            🎉 Special Offers
          </p>
          <h1 className="text-3xl md:text-4xl  font-bold text-[#343A40] mb-2 font-lobster">
            Hot Deals & Combos
          </h1>
          <p className="text-xs md:text-sm text-[#6C757D]  leading-relaxed font-normal">
            Discover amazing offers and combinations crafted with fresh
            ingredients, perfect for every occasion and taste preference.
          </p>
        </div>

        {/* Deals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {deals.map((deal) => (
            <div
              key={deal.id}
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
            >
              {/* Image Container */}
              <div className="relative w-full  aspect-square overflow-hidden">
                <Image
                  src="/images/hot-deals.png"
                  alt={deal.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {/* Tag */}
                <div
                  className="absolute top-4 left-4 text-white px-3 py-1 rounded text-sm font-semibold flex items-center gap-1"
                  style={{
                    background:
                      "linear-gradient(135deg, #FB2C36 0%, #F6339A 100%)",
                    boxShadow:
                      "0 20px 25px -5px rgba(0, 0, 0, 0.10), 0 8px 10px -6px rgba(0, 0, 0, 0.10)",
                    borderRadius: "4px",
                  }}
                >
                  <deal.icon className="w-6 h-6" />
                
                </div>
                <div
                  className={`absolute top-4 right-4 bg-[#FBEAEA] text-[#D62828] px-3 py-2 rounded-sm text-xs font-semibold`}
                >
                  {deal.tag}
                </div>

                {/* Overlay Content - Shows on Hover */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end">
                  <div className="p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-[#FFFFFF] font-bold text-sm md:text-xl mb-1 leading-relaxed">
                      {deal.title}
                    </p>
                    <p className="text-xs md:text-sm font-normal  leading-relaxed  mb-4">
                      {deal.description}
                    </p>
                    <Link href="/deals" className="block">
                      <Button
                        size="sm"
                        className="bg-[#D62828] hover:bg-[#d64b28ee] text-white px-8 py-4 text-base font-semibold rounded-md cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 w-full"
                      >
                        {deal.buttonText}
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Bottom Content - Always Visible */}
              {/* <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {deal.title}
                </h3>
                <div className="flex justify-between items-center">
                  <Link href="/deals">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-amber-500 text-amber-600 hover:bg-amber-50"
                    >
                      View Details
                    </Button>
                  </Link>
                  <span className="text-sm text-gray-500">Limited Time</span>
                </div>
              </div> */}
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12">
          <Link href="/menu">
            <Button size="lg" className="bg-transparent text-primary border border-[#D62828] cursor-pointer">
              View All Deals
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HotDealsCombos;

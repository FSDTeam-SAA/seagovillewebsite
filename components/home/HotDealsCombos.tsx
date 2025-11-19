import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Percent } from "lucide-react";
import { Offer, useGetCupons } from "@/hooks/copons";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";

const HotDealsCombos = () => {
  const [couponCode, setCouponCode] = useState("");
  const [open, setOpen] = useState(false);
  const { data } = useGetCupons();

  const handleClaim = (deal: Offer) => {
    toast.success("Succesfuly Claim you Copun Code");
    setCouponCode(deal.code);
    setOpen(true);
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-[#D62828] bg-transparent border py-2 px-4 rounded-sm inline-block border-[#F2BCBC] tracking-wider leading-[150%] mb-3 md:mb-4">
            🎉 Special Offers
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-[#343A40] mb-2 font-lobster">
            Hot Deals & Combos
          </h1>
          <p className="text-xs md:text-sm text-[#6C757D] leading-relaxed font-normal">
            Discover amazing offers and combinations crafted with fresh
            ingredients, perfect for every occasion and taste preference.
          </p>
        </div>

        {/* Deals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data?.map((deal: Offer) => (
            <div
              key={deal._id}
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
            >
              <div className="relative w-full aspect-square overflow-hidden">
                <Image
                  src="/images/hot-deals.png"
                  alt={deal.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {/* Badge */}
                <div
                  className="absolute top-4 left-4 text-white px-3 py-1 rounded text-sm font-semibold flex items-center gap-1"
                  style={{
                    background:
                      "linear-gradient(135deg, #FB2C36 0%, #F6339A 100%)",
                    boxShadow:
                      "0 20px 25px -5px rgba(0, 0, 0, 0.10), 0 8px 10px -6px rgba(0, 0, 0, 0.10)",
                  }}
                >
                  <Percent className="w-6 h-6" />
                </div>

                <div className="absolute top-4 right-4 bg-[#FBEAEA] text-[#D62828] px-3 py-2 rounded-sm text-xs font-semibold">
                  {deal.discountType}
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end">
                  <div className="p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <p className="font-bold text-sm md:text-xl mb-1">
                      {deal.title}
                    </p>
                    <p className="text-xs md:text-sm mb-4">
                      {deal.description}
                    </p>

                    <Button
                      onClick={() => handleClaim(deal)}
                      size="sm"
                      className="bg-[#D62828] hover:bg-[#d64b28ee] text-white px-8 py-4 text-base font-semibold rounded-md w-full shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      Claim Now
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Your Coupon Code</DialogTitle>
            <DialogDescription className="text-lg font-semibold text-black">
              {couponCode}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default HotDealsCombos;

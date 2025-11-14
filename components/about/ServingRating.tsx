import { Plus, Star } from "lucide-react";
import React from "react";

interface ServiceRatingItem {
  num: string;
  icon: "plus" | "star";
  title: string;
  description: string;
}

const ServingRating = () => {
  const servicerating: ServiceRatingItem[] = [
    {
      num: "5",
      icon: "plus",
      title: "Years Serving",
      description: "Proudly serving Seagoville since 2010",
    },
    {
      num: "50K",
      icon: "plus",
      title: "Pizzas Made",
      description: "Handcrafted with care and quality.",
    },
    {
      num: "4.9",
      icon: "star",
      title: "Average Rating",
      description: "Based on 2,500+ customer reviews",
    },
  ];

  const getIcon = (icon: "plus" | "star") => {
    if (icon === "star") {
      return (
        <Star
          className="text-yellow-500 fill-current"
          stroke="none"
          strokeWidth={0}
          size={48}
        />
      );
    }
    return (
      <Plus
        className="text-[#D62828]"
        strokeWidth={4} 
        size={48}
      />
    );
  };

  return (
    <section>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {servicerating.map((value, index) => (
            <article
              key={index}
              className="shadow-2xl bg-white rounded-xl text-center p-6 hover:shadow-md transition-shadow duration-300"
            >
              <div className="text-[30px] md:text-[48px] font-bold flex justify-center items-center gap-3  px-3 tracking-wider leading-[150%] mb-2">
                <p className="text-[30px] md:text-[48px] text-[#D62828]">
                  {value.num}
                </p>
                {getIcon(value.icon)}
              </div>

              <h2 className="text-xl md:text-2xl font-bold text-[#343A40] mb-3 ">
                {value.title}
              </h2>

              <p className="text-sm text-[#6C757D] leading-relaxed font-normal">
                {value.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServingRating;

import { Heart } from "lucide-react";
import React from "react";

const OurMission = () => {
  return (
    <section className="my-10 md:my-20">
      <div className="container mx-auto">
        <header className="mb-8 md:mb-16 flex flex-col justify-center items-center">
          <p className="ttext-sm font-medium text-white bg-[#D62828] border py-3 px-3 rounded-full inline-block border-[#F2BCBC] tracking-wider leading-[150%] mb-3">
            <Heart />
          </p>
          <h1 className="text-3xl md:text-4xl  font-bold text-[#343A40] mb-3 md:mb-4 font-lobster">
            Our Mission
          </h1>
          <p className="text-xs md:text-sm text-[#6C757D] mb-3 md:mb-4  leading-relaxed font-normal text-center w-[90%] lg:w-full">
            At Craving Pizza, our story begins with a passion for authentic
            flavors, fresh ingredients, and a love for bringing people together
            over great food. We believe every pizza should be more than just a
            meal — it should be an experience that excites your taste buds and
            fills your heart with joy. From our handcrafted dough to our
            signature sauces and premium toppings, we focus on delivering
            quality you can taste in every slice. Our commitment to freshness,
            flavor, and consistency has shaped who we are and continues to
            inspire every pizza we create.
          </p>
        </header>
      </div>
    </section>
  );
};

export default OurMission;

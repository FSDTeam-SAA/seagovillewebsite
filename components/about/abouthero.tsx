import Image from "next/image";
import React from "react";

const AboutHero = () => {
  return (
    <section>
      <div className="container mx-auto my-10 lg:my-20">
        <header className="mb-8 md:mb-16 flex flex-col justify-center items-center">
          <p className="text-sm font-medium text-[#D62828] bg-[#FBEAEA] border py-2 px-4 rounded-sm  inline-block border-[#F2BCBC]  tracking-wider leading-[150%]">
            🧑 About Us
          </p>
          <h1 className="text-3xl md:text-4xl  font-bold text-[#343A40] mb-2 font-lobster">
            Crafted with Passion, Served with Love
          </h1>
          <p className="text-xs md:text-sm text-[#6C757D]  leading-relaxed font-normal">
            Discover our delicious selection of handcrafted pizzas, appetizers,
            and more
          </p>
        </header>
        <div>
          <Image
            src={"/images/about.jpg"}
            alt="about"
            width={1960}
            height={460}
            className="w-[95%] mx-auto md:w-full  object-cover rounded-2xl aspect-5/2 "
          />
        </div>
      </div>
    </section>
  );
};

export default AboutHero;

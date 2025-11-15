import React from "react";

const MenuHero = () => {
  return (
    <section className="contianer mx-auto my-10 lg:my-20">
      <div className="text-center mb-16">
        <p className="text-sm font-medium text-[#D62828] bg-transparent border py-2 px-4 rounded-sm mb-3 lg:mb-4  inline-block border-[#F2BCBC]  tracking-wider leading-[150%]">
          {" "}
          🍕 Full Menu
        </p>
        <h1 className="text-3xl md:text-4xl  font-bold text-[#343A40] mb-2 font-lobster">
          Our Menu
        </h1>
        <p className="text-xs md:text-sm text-[#6C757D]  leading-relaxed font-normal">
          Discover our delicious selection of handcrafted pizzas, appetizers,
          and more . 
        </p>
      </div>
    </section>
  );
};

export default MenuHero;

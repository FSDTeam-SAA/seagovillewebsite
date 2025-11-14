import { Heart, Users, Target, Award } from "lucide-react";
import React from "react";

const OurValues = () => {
  const values = [
    {
      icon: <Heart className="w-5 h-5" />,
      title: "Customer First",
      description:
        "We prioritize our customers' needs and satisfaction in every decision we make.",
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: "Collaboration",
      description:
        "We believe in the power of teamwork and building strong partnerships.",
    },
    {
      icon: <Target className="w-5 h-5" />,
      title: "Excellence",
      description:
        "We strive for the highest quality in everything we deliver to our clients.",
    },
    {
      icon: <Award className="w-5 h-5" />,
      title: "Innovation",
      description:
        "We continuously seek new and better ways to solve problems and create value.",
    },
  ];

  return (
    <section className="my-10 md:my-20" aria-labelledby="our-values-heading">
      <div className="container mx-auto px-4 sm:px-6">
        <header className="mb-8 md:mb-16 text-center">
          <div
            className="text-sm font-medium text-white bg-[#D62828] border py-2 px-3 rounded-full inline-block border-[#F2BCBC] tracking-wider leading-[150%] mb-4"
            aria-hidden="true"
          >
            <Heart className="w-4 h-4" />
          </div>

          <h1
            id="our-values-heading"
            className="text-3xl md:text-4xl font-bold text-[#343A40] mb-2 font-lobster"
          >
            Our Core Values
          </h1>

          <p className="text-xs md:text-sm text-[#6C757D] leading-relaxed font-normal max-w-2xl mx-auto">
            The fundamental principles that guide everything we do and shape our
            company culture
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-6 lg:gap-8">
          {values.map((value, index) => (
            <article
              key={index}
              className="shadow-2xl bg-white rounded-xl text-center p-6 hover:shadow-md transition-shadow duration-300"
            >
              <div
                className="text-sm font-medium text-white bg-[#D62828] border py-3 px-3 rounded-full inline-block border-[#F2BCBC] tracking-wider leading-[150%] mb-4"
                aria-hidden="true"
              >
                {value.icon}
              </div>

              <h2 className="text-xl md:text-2xl font-bold text-[#343A40] mb-3 font-lobster">
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

export default OurValues;

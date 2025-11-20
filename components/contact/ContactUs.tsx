import { Locate, Mail, Phone } from "lucide-react";
import React from "react";

const ContactUs = () => {
  const values = [
    {
      icon: Mail,
      title: "Email",
      link: "mailto:useremail@gmail.com",
      value: "useremail@gmail.com",
      description:
        "We believe in the power of teamwork and building strong partnerships.",
    },
    {
      icon: Locate,
      title: "Office",
      link: "https://maps.google.com/?q=Seagoville, New York",
      value: "Seagoville, New York",
      description:
        "We strive for the highest quality in everything we deliver to our clients.",
    },
    {
      icon: Phone,
      title: "Phone",
      link: "tel:+01923846389722",
      value: "+01923846389722",
      description:
        "We continuously seek new and better ways to solve problems and create value.",
    },
  ];

  return (
    <section className="my-10 md:my-20">
      <div className="container mx-auto">
        <header className="mb-8 md:mb-16 flex flex-col justify-center items-center">
          <p className="text-sm font-medium text-[#D62828] bg-[#FBEAEA] border py-2 mb-3 px-4 rounded-sm inline-block border-[#F2BCBC] tracking-wider leading-[150%]">
            🧑 Contact Us
          </p>

          <h1 className="text-3xl md:text-4xl font-bold text-[#343A40] mb-2 font-lobster">
            Contact Information
          </h1>

          <p className="text-xs md:text-sm text-[#6C757D] leading-relaxed font-normal text-center w-[80%] md:w-full">
            Discover our delicious selection of handcrafted pizzas, appetizers, and more.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <article
                key={index}
                className="shadow-xl bg-white rounded-xl text-center p-6 hover:shadow-md transition-shadow duration-300"
              >
                <div className="text-sm font-medium text-[#FB2C36] bg-[#F9DFDF] border py-3 px-3 rounded-full inline-block border-[#F2BCBC] tracking-wider leading-[150%] mb-4">
                  <Icon className="w-6 h-6" />
                </div>

                <h2 className="text-xl md:text-2xl font-bold text-[#343A40] mb-1 font-lobster">
                  {value.title}
                </h2>

                <a
                  href={value.link}
                  className="block text-sm text-[#D62828] font-semibold mb-2 hover:underline"
                >
                  {value.value}
                </a>

                <p className="text-sm text-[#6C757D] leading-relaxed font-normal">
                  {value.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ContactUs;

import React from "react";

const OurJourney = () => {
  const journey = [
    {
      year: "2012",
      side: "left",
      title: "The Beginning",
      description:
        "Seagoville Carryout Pizza opened its doors with a simple Mission: Serve the best pizza in town.",
    },
    {
      year: "2015",
      side: "right",
      title: "Community Favorite",
      description:
        'Named "Best Pizza in Seagoville" by local food critics and customers alike.',
    },
    {
      year: "2018",
      side: "left",
      title: "Online Ordering",
      description:
        "Launched our online ordering system to better serve our growing customer base.",
    },
    {
      year: "2025",
      side: "right",
      title: "Today",
      description:
        "Serving over 1,000 happy customers every week with the same dedication to quality.",
    },
  ];

  return (
    <section className="relative bg-[url('/images/journey.jpg') bg-cover bg-center py-24">
      {/* RED CENTER LINE */}

      <div className="max-w-6xl mx-auto relative">
        <header className="text-center mb-20">
          <h1 className="text-3xl md:text-4xl font-bold text-[#343A40] mb-2 font-lobster">
            Our Journey
          </h1>
          <p className="text-xs md:text-sm text-[#6C757D] leading-relaxed font-normal max-w-2xl mx-auto">
            From humble beginnings to community favorite
          </p>
        </header>

        <div className="relative space-y-16">
          <div className="hidden md:flex absolute left-1/2 top-0 h-full w-[3px]  -translate-x-1/2 bg-red-600"></div>

          {journey.map((item, i) => (
            <div
              key={i}
              className={`relative flex ${
                item.side === "left"
                  ? "justify-start md:pr-[48%] text-end"
                  : "justify-end md:pl-[48%]"
              }`}
            >
              {/* Timeline Dot */}
              <div className=" hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-5 w-5 bg-white border-4 border-red-600 rounded-full z-10"></div>

              {/* Card */}
              <div className="bg-white shadow-xl rounded-xl p-8 w-full md:w-[90%]">
                <span className="text-xs tracking-wider bg-red-100 text-red-500 py-1 px-3 rounded-full inline-block mb-3">
                  {item.year}
                </span>

                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {item.title}
                </h3>

                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurJourney;

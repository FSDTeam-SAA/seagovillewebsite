"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import Image from "next/image";

const SearchButton = () => {
  const [search, setSearch] = useState("");

  return (
    <div>
      <Input className="w-full h-full" />
      <div className="flex gap-3 absolute top-15  left-0 bg-gray-500 py-3 w-full rounded-xl px-3 cursor-pointer">
        <Image
          src={"/images/hot-deals3.png"}
          alt="search"
          width={40}
          height={40}
          className=" object-cover rounded-xl"
        />
        <div>
          <h2 className="text-xm md:text-base">Classic pepperoni</h2>
          <p className=" font-bold text-xl md:text-2xl">$55</p>
        </div>
      </div>
    </div>
  );
};

export default SearchButton;

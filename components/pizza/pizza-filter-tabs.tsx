"use client";

import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { getallDataForCatagory } from "@/lib/api";
import { Product } from "@/lib/types";

interface PizzaFilterTabsProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

interface CategoryApiResponse {
  items: Product[];
}

export function PizzaFilterTabs({
  activeCategory,
  onCategoryChange,
}: PizzaFilterTabsProps) {
  const { data, isLoading } = useQuery({
    queryKey: ["category"],
    queryFn: getallDataForCatagory,
  });

  // Extract unique categories
  const categories = [
    "all",
    ...(data?.items
      ?.map((item: Product): string => item.category)
      .filter((category: string | undefined): category is string => Boolean(category)) // type guard
      .filter((value: string, index: number, self: string[]) => self.indexOf(value) === index) ?? []),
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-8 bg-[#F1F2F3] py-4 px-5">
      {isLoading && <p>Loading categories...</p>}

      {!isLoading &&
        categories.map((category: string) => (
          <Button
            key={category}
            onClick={() => onCategoryChange(category)}
            variant={activeCategory === category ? "default" : "outline"}
            className={
              activeCategory === category
                ? "bg-[#D62828] hover:bg-[#d62828] text-[#F8F9FA] cursor-pointer rounded-none px-10"
                : "cursor-pointer bg-transparent text-[#6C757D] border-none shadow-none rounded-none px-10"
            }
          >
            {category}
          </Button>
        ))}
    </div>
  );
}

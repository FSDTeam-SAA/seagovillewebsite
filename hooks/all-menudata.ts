'use client'

import { getFacilities } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const useAllMenuData = (category: string, page: number) => {
  return useQuery({
    queryKey: ["all-menu", category, page, ],
    queryFn: () => getFacilities(category, page),
    
  });
};

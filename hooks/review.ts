import { getAllReview } from "@/lib/api"
import { useQuery } from "@tanstack/react-query"

export const useReview=()=>{
    return useQuery({
        queryKey:['review'],
        queryFn:getAllReview
    })
}

export interface Review {
  _id: string;
  name: string;
  comment: string;
  rating: number;
  status: string; 
  createdAt: string; 
  updatedAt: string; 
}
'use client'
import {  getCupone } from "@/lib/api"
import { useMutation, useQuery } from "@tanstack/react-query"

export const useGetCupons=()=>{
    return useQuery({
        queryKey:['coupons'],
        queryFn:getCupone
    })
}
// export const useClaimMutation = () => {
//   return useMutation({
//     mutationFn: claimCoupan,
//   });
// };


export type DiscountType = "BuyXGetY" | "Percentage" | "Flat" | string;

export interface Offer {
  _id: string;
  title: string;
  description: string;
  discountType: DiscountType;
  code: string;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  timesUsed: number;
}
export type OfferList = Offer[];

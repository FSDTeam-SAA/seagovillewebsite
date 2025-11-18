/**
 * TanStack Query hook for fetching pizzas
 * Can be easily connected to a real API endpoint
 */

import { useQuery, type UseQueryResult } from "@tanstack/react-query"
import type { Pizza } from "@/lib/types"

/**
 * Fetches all pizzas
 * Can be connected to: GET /api/pizzas
 */
// export function usePizzasQuery(): UseQueryResult<Pizza[], Error> {
//   return useQuery({
//     queryKey: ["pizzas"],
//     queryFn: async () => {
//       // Replace with real API call:
//       // const response = await fetch('/api/pizzas')
//       // return response.json()

//       // For now, we'll fetch from constants
//       // const { ALL_PIZZAS } = await import("@/lib/constants")
//       return ALL_PIZZAS
//     },
//     staleTime: 1000 * 60 * 5, // 5 minutes
//   })
// }

/**
 * Fetches a single pizza by ID
 * Can be connected to: GET /api/pizzas/[id]
 */
// export function usePizzaQuery(pizzaId: number | null) {
//   return useQuery({
//     queryKey: ["pizza", pizzaId],
//     queryFn: async () => {
//       if (!pizzaId) return null

//       // Replace with real API call:
//       // const response = await fetch(`/api/pizzas/${pizzaId}`)
//       // return response.json()

//       const { ALL_PIZZAS } = await import("@/lib/constants")
//       return ALL_PIZZAS.find((p) => p.id === pizzaId) || null
//     },
//     enabled: !!pizzaId,
//     staleTime: 1000 * 60 * 5, // 5 minutes
//   })
// }

/**
 * Fetches featured pizzas
 * Can be connected to: GET /api/pizzas?featured=true
 */
// export function useFeaturedPizzasQuery(): UseQueryResult<Pizza[], Error> {
//   return useQuery({
//     queryKey: ["pizzas", "featured"],
//     queryFn: async () => {
//       // Replace with real API call:
//       // const response = await fetch('/api/pizzas?featured=true')
//       // return response.json()

//       const { FEATURED_PIZZAS } = await import("@/lib/constants")
//       return FEATURED_PIZZAS
//     },
//     staleTime: 1000 * 60 * 10, // 10 minutes
//   })
// }

/**
 * Fetches pizzas by category
 * Can be connected to: GET /api/pizzas?category=[category]
 */
// export function usePizzasByCategoryQuery(category: string | null) {
//   return useQuery({
//     queryKey: ["pizzas", "category", category],
//     queryFn: async () => {
//       if (!category || category === "all") {
//         const { ALL_PIZZAS } = await import("@/lib/constants")
//         return ALL_PIZZAS
//       }

//       // Replace with real API call:
//       // const response = await fetch(`/api/pizzas?category=${category}`)
//       // return response.json()

//       const { ALL_PIZZAS } = await import("@/lib/constants")
//       return ALL_PIZZAS.filter((p) => p.category === category)
//     },
//     staleTime: 1000 * 60 * 5, // 5 minutes
//   })
// }

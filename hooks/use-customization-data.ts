"use client"
import { useState, useEffect } from "react"

import { fetchCheeses, fetchCrusts, fetchSauces, fetchSizes, fetchToppings } from "@/lib/api"
import { CustomizationItem } from "@/lib/cusomizetype"


export function useCustomizationData() {
  const [sizes, setSizes] = useState<CustomizationItem[]>([])
  const [crusts, setCrusts] = useState<CustomizationItem[]>([])
  const [sauces, setSauces] = useState<CustomizationItem[]>([])
  const [cheeses, setCheeses] = useState<CustomizationItem[]>([])
  const [toppings, setToppings] = useState<CustomizationItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadAllData = async () => {
      try {
        setLoading(true)
        setError(null)

        const [sizesData, crustsData, saucesData, cheesesData, toppingsData] =
          await Promise.all([
            fetchSizes(),
            fetchCrusts(),
            fetchSauces(),
            fetchCheeses(),
            fetchToppings(),
          ])

        setSizes(sizesData)
        setCrusts(crustsData)
        setSauces(saucesData)
        setCheeses(cheesesData)
        setToppings(toppingsData)
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to load customization options"
        setError(errorMessage)
        console.error("Error loading customization data:", err)
      } finally {
        setLoading(false)
      }
    }

    loadAllData()
  }, [])

  return {
    sizes,
    crusts,
    sauces,
    cheeses,
    toppings,
    loading,
    error,
  }
}

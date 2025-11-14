/**
 * Core type definitions for the pizza ordering application
 */

export interface Pizza {
  id: string
  name: string
  description: string
  time:string
  image: string
  price: number
  rating: number
  category: "classic" | "specialty" | "veggie" | "meat"
}

export interface Size {
  id: string
  name: string
  inches: number
  slices: number
  priceModifier: number
}

export interface Crust {
  id: string
  name: string
  description: string
  priceModifier: number
}

export interface Sauce {
  id: string
  name: string
  description: string
  priceModifier: number
}

export interface Cheese {
  id: string
  name: string
  description: string
  priceModifier: number
}

export interface Topping {
  id: string
  name: string
  category: "meat" | "vegetable" | "extra"
  price: number
  image?: string
}

export interface PizzaBuilderState {
  size: Size | null
  crust: Crust | null
  sauce: Sauce | null
  cheese: Cheese | null
  toppings: Topping[]
}

export interface CartItem {
  id: string
  time:string;
  pizzaId?: string
  name: string
  price: number
  quantity: number
  customizations?: PizzaBuilderState
}

export interface Order {
  id: string
  items: CartItem[]
  totalPrice: number
  status: "pending" | "confirmed" | "preparing" | "out_for_delivery" | "delivered"
  createdAt: Date
}

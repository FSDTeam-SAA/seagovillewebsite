/**
 * Application constants and static data
 */

import type { Size, Crust, Sauce, Cheese, Topping, Pizza } from "./types"

export const SIZES: Size[] = [
  { id: "small", name: 'Small 10"', inches: 10, slices: 4, priceModifier: 0 },
  { id: "medium", name: 'Medium 12"', inches: 12, slices: 6, priceModifier: 2.5 },
  { id: "large", name: 'Large 14"', inches: 14, slices: 8, priceModifier: 5 },
  { id: "xlarge", name: 'X-Large 16"', inches: 16, slices: 10, priceModifier: 7.5 },
]

export const CRUSTS: Crust[] = [
  { id: "hand-tossed", name: "Hand Tossed", description: "Classic, fluffy crust", priceModifier: 0 },
  { id: "thin-crispy", name: "Thin & Crispy", description: "Light and crunchy", priceModifier: 0 },
  { id: "deep-dish", name: "Deep Dish", description: "Thick and hearty", priceModifier: 2 },
  { id: "stuffed", name: "Stuffed Crust", description: "Cheese filled edge", priceModifier: 2 },
]

export const SAUCES: Sauce[] = [
  { id: "classic-tomato", name: "Classic Tomato", description: "Traditional pizza sauce", priceModifier: 0 },
  { id: "creamy-alfredo", name: "Creamy Alfredo", description: "Rich and creamy", priceModifier: 0.5 },
  { id: "bbq-sauce", name: "BBQ Sauce", description: "Sweet and tangy", priceModifier: 0.5 },
  { id: "garlic-butter", name: "Garlic Butter", description: "Aromatic and savory", priceModifier: 0.5 },
]

export const CHEESES: Cheese[] = [
  { id: "mozzarella", name: "Mozzarella", description: "Classic, fluffy", priceModifier: 0 },
  { id: "cheddar", name: "Cheddar", description: "Light and crunchy", priceModifier: 0.5 },
  { id: "mixed-cheese", name: "Mixed Cheese", description: "Perfect blend", priceModifier: 0.5 },
  { id: "no-cheese", name: "No Cheese", description: "Just sauce and toppings", priceModifier: -1.5 },
]

export const TOPPINGS: Topping[] = [
  // Meat
  { id: "pepperoni", name: "Pepperoni", category: "meat", price: 1 },
  { id: "sausage", name: "Italian Sausage", category: "meat", price: 1 },
  { id: "bacon", name: "Bacon", category: "meat", price: 1.5 },
  { id: "chicken", name: "Grilled Chicken", category: "meat", price: 1.25 },

  // Vegetables
  { id: "mushroom", name: "Mushrooms", category: "vegetable", price: 0.75 },
  { id: "onion", name: "Onions", category: "vegetable", price: 0.5 },
  { id: "bell-pepper", name: "Bell Peppers", category: "vegetable", price: 0.75 },
  { id: "olives", name: "Black Olives", category: "vegetable", price: 0.75 },
  { id: "spinach", name: "Fresh Spinach", category: "vegetable", price: 0.75 },

  // Extra
  { id: "extra-cheese", name: "Extra Cheese", category: "extra", price: 1 },
  { id: "garlic-knots", name: "Garlic Knots", category: "extra", price: 2 },
]

export const FEATURED_PIZZAS: Pizza[] = [
  {
    id: "classic-pepperoni",
    name: "Classic Pepperoni",
    description: "Traditional pepperoni with mozzarella cheese and our signature tomato sauce",
    image: "/pizza1.jpg",
    price: 12.99,
    rating: 4.8,
    category: "classic",
  },
  {
    id: "meat-lovers",
    name: "Meat Lovers",
    description: "Loaded with pepperoni, sausage, bacon, and chicken",
    image: "/pizza1.jpg",
    price: 16.99,
    rating: 4.9,
    category: "meat",
  },
  {
    id: "veggie-delight",
    name: "Veggie Delight",
    description: "Fresh spinach, mushrooms, olives, peppers, and onions",
    image: "/pizza1.jpg",
    price: 13.99,
    rating: 4.7,
    category: "veggie",
  },
  {
    id: "bbq-chicken",
    name: "BBQ Chicken",
    description: "Grilled chicken, bbq sauce, red onions, and cilantro",
    image: "/pizza1.jpg",
    price: 14.99,
    rating: 4.6,
    category: "specialty",
  },
  {
    id: "supreme",
    name: "Supreme",
    description: "Pepperoni, sausage, mushrooms, peppers, onions, olives",
    image: "/pizza1.jpg",
    price: 15.99,
    rating: 4.8,
    category: "specialty",
  },
  {
    id: "margherita",
    name: "Margherita",
    description: "Fresh mozzarella, basil, tomatoes, and olive oil",
    image: "/pizza1.jpg",
    price: 13.49,
    rating: 4.9,
    category: "classic",
  },
]

export const ALL_PIZZAS: Pizza[] = [
  ...FEATURED_PIZZAS,
  {
    id: "hawaiian",
    name: "Hawaiian",
    description: "Ham, pineapple, and mozzarella with tomato sauce",
    image: "/placeholder.svg?key=h8w1k",
    price: 14.49,
    rating: 4.5,
    category: "specialty",
  },
  {
    id: "white-pizza",
    name: "White Pizza",
    description: "Ricotta, mozzarella, garlic, and spinach",
    image: "/pizza1.jpg",
    price: 13.99,
    rating: 4.6,
    category: "specialty",
  },
  {
    id: "buffalo-chicken",
    name: "Buffalo Chicken",
    description: "Spicy buffalo chicken, blue cheese, and celery",
    image: "/pizza1.jpg",
    price: 15.49,
    rating: 4.7,
    category: "specialty",
  },
  {
    id: "philly-cheesesteak",
    name: "Philly Cheesesteak",
    description: "Sliced steak, bell peppers, onions, and cheese",
    image: "/pizza1.jpg",
    price: 15.99,
    rating: 4.8,
    category: "meat",
  },
]

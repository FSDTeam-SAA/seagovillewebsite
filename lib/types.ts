/**
 * Core type definitions for the pizza ordering application
 */

import { Key, ReactNode } from "react";

export interface Pizza {
  id: string;
  name: string;
  description: string;
  time: string;
  image: string;
  price: number;
  rating: number;
  category: "classic" | "specialty" | "veggie" | "meat";
}

export interface BaseItem {
  _id: string;
  name: string;
  description?: string;
  isAvailable?: boolean;
  price: number;
}

export interface Size extends BaseItem {
  _id: string;
  price: number;
  id: string;
  name: string;
  inches: number;
  slices: number;
  priceModifier: number;
  isAvailable?: boolean;
}

export interface Crust extends BaseItem {
  _id: string;
  price: number;
  id: string;
  name: string;
  description: string;
  priceModifier: number;
}

export interface Sauce extends BaseItem {
  _id: string;
  price: number;
  id: string;
  name: string;
  description: string;
  priceModifier: number;
}

export interface Cheese extends BaseItem {
  _id: string;
  price: number;
  id: string;
  name: string;
  description: string;
  priceModifier: number;
}

export interface Topping extends BaseItem {
  _id: string;

  name: string;
  category: "meat" | "vegetable" | "extra";
  price: number;
  image?: string;
  priceModifier?: number;
}

export interface PizzaBuilderState {
  size: Size | null;
  crust: Crust | null;
  sauce: Sauce | null;
  cheese: Cheese | null;
  toppings: Topping[];
}

export interface CartItem {
  [x: string]: unknown;
  name: ReactNode;

  price: number;
  _id: string;
  pizzaId?: string;
  quantity: number;
  size: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  totalPrice: number;
  status:
    | "pending"
    | "confirmed"
    | "preparing"
    | "out_for_delivery"
    | "delivered";
  createdAt: Date;
}

export interface MenuImage {
  public_id: string;
  url: string;
  _id: string;
}

export interface MenuItem {
  _id: string;
  name: string;
  category: string;
  description: string;

  price: number[];     // Array of prices [small, medium, large]
  pieces: number[];    // Array of pieces [small, medium, large]
  sizes: string[];     // Add this if missing

  images: MenuImage[];
  ingredients: string[]; // Add this if missing

  isAvailable: boolean;
  totalSold: number;    // Add this if missing
  
  createdAt: string;
  updatedAt: string;
}

export interface Meta {
  total: number;
  page: number;
  totalPages: number;
  limit: number;
}

export interface MenuApiResponse {
  success?: boolean;
  message?: string;
  statusCode?: number;
  data?: MenuItem[];
  meta?: Meta;
}

///

export interface ProductImage {
  public_id: string;
  url: string;
  _id: string;
}

export interface Product {
  _id: string;
  name: string;
  category: string;
  description: string;

  // Make price optional or provide default
  price?: number[];

  // sizes array: ["21", "10", "40", "3"]
  sizes: string[];

  // pieces array: [1, 15, 20]
  pieces: number[];

  images: ProductImage[];
  ingredients: string[];

  isAvailable: boolean;
  totalSold: number;

  createdAt: string;
  updatedAt: string;
}

///

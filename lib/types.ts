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

// lib/types.ts
export interface Image {
  _id: string;
  public_id: string;
  url: string;
}

export interface MenuItem {
  _id: string;
  name: string;
  category: string;
  description: string;
  price: number[];
  sizes: string[];
  pieces: number[];
  images: Image[];
  isAvailable: boolean;
  totalSold: number;
  createdAt: string;
  updatedAt: string;
  ingredients?: string[];
}

export interface MenuResponse {
  success: boolean;
  message: string;
  statusCode: number;
  data: MenuItem;
  similar: MenuItem[];
}

export interface MenuApiResponse {
  success?: boolean;
  message?: string;
  statusCode?: number;
  data?: MenuItem[];
  meta?: {
    total: number;
    page: number;
    totalPages: number;
    limit: number;
  };
}

// Alias for Product to maintain compatibility
export type Product = MenuItem;

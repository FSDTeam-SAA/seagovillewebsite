// lib/types.ts

// Base image interface
interface Image {
  public_id: string;
  url: string;
  _id: string;
}

// Menu item interface
interface Menu {
  _id: string;
  name: string;
  category: string;
  images: Image[];
}

// Size interface
interface Size {
  _id: string;
  name: string;
  price: number;
}

// Crust interface
interface Crust {
  _id: string;
  name: string;
  price: number;
}

// Topping interface
interface Topping {
  _id: string;
  name: string;
  category: string;
  price: number;
}

// Topping with quantity (for custom pizza)
interface ToppingItem {
  category: string;
  toppingId: Topping;
}

// Custom pizza interface
interface OwnPizza {
  _id: string;
  cheese: string;
  crust: Crust;
  sauce: string;
  size: Size;
  toppings: ToppingItem[];
  totalPrice: number;
  isDelivered: boolean;
}

// Main cart item interface
export interface CartItem {
  _id: string;
  deviceIp: string;
  quantity: number;
  totalPrice: number;
  type: "menu" | "ownPizza";
  
  // Conditional properties based on type
  menu?: {
    menuId: Menu;
    types: "small" | "medium" | "large";
  };
  
  ownPizzaId?: OwnPizza;
  
  // Timestamps
  createdAt?: string;
  updatedAt?: string;
}



// payment interface

export interface PaymentData {
  clientSecret: string;
  paymentId: string;
}

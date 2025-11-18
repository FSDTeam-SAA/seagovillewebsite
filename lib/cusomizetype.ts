// lib/types.ts or lib/cusomizetype.ts
export interface ItemImage {
  public_id: string;
  url: string;
}

// export interface CustomizationItem {
//   _id: string;
//   name: string;
//   price: number;
//   category: string;
//   isAvailable: boolean;
//   description: string;
//   image: ItemImage;
//   createdAt: string;
//   updatedAt: string;
// }

export interface PizzaBuilderState {
  size: CustomizationItem | null;
  crust: CustomizationItem | null;
  sauce: CustomizationItem | null;
  cheese: CustomizationItem | null;
  toppings: CustomizationItem[];
}

// For API responses
export interface SizeResponseData {
  categories: string[];
  data: CustomizationItem[];
}

export interface SizeResponse {
  data: SizeResponseData;
}


export interface ItemImage {
  public_id: string;
  url: string;
}

export interface CustomizationItem {
  _id: string;
  name: string;
  price: number;
  category: string;
  isAvailable: boolean;
  description?: string;
  image?: ItemImage;
  createdAt?: string;
  updatedAt?: string;
  
}



export interface PizzaBuilderState {
  size: CustomizationItem | null;
  crust: CustomizationItem | null;
  sauce: CustomizationItem | null;
  cheese: CustomizationItem | null;
  toppings: CustomizationItem[];
  
}

export interface SizeResponseData {
  categories: string[];
  data: CustomizationItem[];
}

export interface SizeResponse {
  data: SizeResponseData;
}
export interface singledata{
  data:CustomizationItem[]
}
// lib/detailstype.ts
export interface Image {
  _id: string;
  public_id: string;
  url: string;
}

export interface Price {
  small: number;
  medium: number;
  large: number;
}

export interface MenuItem {
  _id: string;
  name: string;
  category: string;
  description: string;
  images: Image[];
  price: Price;
  isAvailable: boolean;
  totalSold: number;
  createdAt: string;
  updatedAt: string;
  ingredients?: string[]; // Make this optional if it might not exist
}

export interface MenuResponse {
  success: boolean;
  message: string;
  statusCode: number;
  data: MenuItem;
  similar: MenuItem[];
}
// lib/detailstype.ts
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

  // API returns array, not object
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

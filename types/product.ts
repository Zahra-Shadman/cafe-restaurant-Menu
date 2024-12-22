export interface ProductDetails {
  _id: string;
  name: string;
  price: number;
  description?: string;
  images?: string[];
  category: {
    name: string;
  };
  subcategory: {
    name: string;
  };
  brand: string;
  quantity: number;
  thumbnail: string;
}

export interface ProductResponse {
  status: string;
  data: {
    product: ProductDetails;
  };
}

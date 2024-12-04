export interface IProductResponse {
  status: "success";
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: IProductData;
}

export interface IProductData {
  products: IProduct[];
}

export interface IProduct {
  _id: string;
  category: string;
  subcategory: string;
  name: string;
  price: number;
  quantity: number;
  brand: string;
  description: string;
  thumbnail: string;
  images: string[];
  slugname: string;
}

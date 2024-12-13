import { ReactNode } from "react";

export interface IRating {
  rate: number;
  count: number;
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

export interface IApiRes {
  status: string;
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: {
    products: IProduct[];
  };
}

export interface IcardProduct {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  images: string[];
}

export interface IcardApiRes {
  status: string;
  data: {
    products: IProduct[];
  };
  total_pages: number;
}
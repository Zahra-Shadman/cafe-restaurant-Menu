export interface Product {
  id?: string;
  product?: string;
  count?: number;
  quantity?: number;
}

export interface OrderData {
  user?: string;
  userId?: string;
  products: Product[];
}

export interface Order {
  user: string;
  userDetails: string;
  _id: string;
  totalPrice: number;
  deliveryStatus: boolean;
  deliveryDate: string;
  createdAt: string;
  products: Array<{
    product: string;
    count: number;
    _id: string;
  }>;
}

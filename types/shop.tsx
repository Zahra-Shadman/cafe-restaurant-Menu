export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface OrderResponse {
  data: {
    order: {
      _id: string;
    };
  };
}

export interface UserData {
  city: string;
  province: string;
  _id: string;
  firstname: string;
  lastname: string;
  phoneNumber: string;
  address: string;
}

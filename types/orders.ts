
export interface Order {
    user: any
    userDetails: any
    _id: string
    totalPrice: number
    deliveryStatus: boolean
    deliveryDate: string
    createdAt: string
    products: Array<{
      product: string
      count: number
      _id: string
    }>
  }
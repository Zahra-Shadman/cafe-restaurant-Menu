import { CartState, Product } from "@/types/redux";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const loadCartFromLocalStorage = (): CartState => {
  try {
    const NotRepitedItems = localStorage.getItem("cart");
    if (NotRepitedItems) return JSON.parse(NotRepitedItems);
    return { items: [], total: 0 };
  } catch (e) {
    return { items: [], total: 0 };
  }
};

const initialState: CartState = loadCartFromLocalStorage();

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }

      state.total = state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );

      localStorage.setItem("cart", JSON.stringify(state));
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      state.total = state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );

      localStorage.setItem("cart", JSON.stringify(state));
    },

    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const item = state.items.find((item) => item.id === action.payload.id);

      if (item) {
        item.quantity = action.payload.quantity;
        state.total = state.items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );

        localStorage.setItem("cart", JSON.stringify(state));
      }
    },

    clearCart: (state) => {
      state.items = [];
      state.total = 0;

      localStorage.removeItem("cart");
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;

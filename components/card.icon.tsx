"use client";

import { FaShoppingCart } from "react-icons/fa";
import { useAppSelector } from "@/redux/store";
import Link from "next/link";

const CartIcon = () => {
  const cartItems = useAppSelector((state) => state.cart.items);
  
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="relative cursor-pointer">
      <Link href="/Shop" className="flex items-center">
        <div className="relative">
          <FaShoppingCart className="w-6 h-6 text-green-700" />
          {totalItems > 0 && (
            <span 
              className="absolute -top-2 -right-2 bg-red-500 text-white 
              rounded-full w-5 h-5 flex items-center justify-center 
              text-xs font-bold"
            >
              {totalItems}
            </span>
          )}
        </div>
      </Link>
    </div>
  );
};

export default CartIcon;
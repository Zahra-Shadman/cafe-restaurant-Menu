import { useAppSelector, useAppDispatch } from "@/redux/store";
import { TiDelete } from "react-icons/ti";

import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { removeFromCart } from "@/redux/slices/cartSlice";

const CartIcon = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);
  const uniqueItemsCount = cartItems.length;

  const handleRemoveItem = (itemId: string) => {
    dispatch(removeFromCart(itemId));
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="relative cursor-pointer">
          <div className="flex items-center justify-center">
            <FaShoppingCart className="w-6 h-6 text-green-950 transition-colors duration-300 ease-in-out hover:text-breenbtn/70" />
            {uniqueItemsCount > 0 && (
              <span className="absolute -top-2 -right-2 flex items-center justify-center">
                <span className="absolute inline-flex h-4 w-4 rounded-full bg-green-400 opacity-75 animate-ping"></span>
                <span className="relative text-white inline-flex h-4 w-4 rounded-full bg-green-500 text-xs items-center justify-center">
                  {uniqueItemsCount}
                </span>
              </span>
            )}
          </div>
        </div>
      </SheetTrigger>
      <SheetContent
        className="w-[350px] transition-all duration-500 ease-in-out"
        style={{
          animation: "fadeIn 0.3s ease-out",
        }}
      >
        <SheetHeader>
          <SheetTitle className="text-center text-xl font-semibold text-gray-800">
            سبد خرید
          </SheetTitle>
        </SheetHeader>

        {cartItems.length === 0 ? (
          <p className="text-center mt-4 text-gray-500">
            هیچ محصولی در سبدخرید نیست.
          </p>
        ) : (
          <ul className="mt-4 space-y-2 max-h-[400px] overflow-y-auto">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="flex justify-between gap-6 items-center p-2 hover:bg-gray-50 rounded-md transition-colors duration-200"
              >
                <span className="text-gray-700">${item.price.toFixed(2)}</span>
                <span className="w-full text-center text-gray-600">
                  تعداد {item.quantity}
                </span>
                <span className="font-semibold w-full text-center text-gray-800">
                  {item.name}
                </span>
                <Button
                  onClick={() => handleRemoveItem(item.id)}
                  className="text-red-500 w-10 h-10"
                  variant="ghost"
                >
                  <TiDelete />
                </Button>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-4 flex gap-4">
          <Link href="/Shop" className="w-full block">
            <Button
              className="w-full bg-green-600 hover:bg-green-800 transition-colors duration-300 ease-in-out"
              variant="default"
            >
              مشاهده سبد خرید
            </Button>
          </Link>
          <Link href="/Shop/checkout" className="w-full block">
            <Button
              className="w-full bg-orange-500 hover:bg-orange-700 transition-colors duration-300 ease-in-out"
              variant="default"
            >
              تسویه حساب
            </Button>
          </Link>
        </div>

        <style jsx global>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateX(20px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
        `}</style>
      </SheetContent>
    </Sheet>
  );
};

export default CartIcon;

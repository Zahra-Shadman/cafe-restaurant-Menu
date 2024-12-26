"use client";

import { useAppSelector, useAppDispatch } from "@/redux/store";
import { removeFromCart, updateQuantity } from "@/redux/slices/cartSlice";
import Image from "next/image";

export default function CartPage() {
  const { items, total } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  return (
    <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
          Shopping Cart
        </h2>

        <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
          <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
            <div className="space-y-6">
              {items.length === 0 ? (
                <p className="text-center text-gray-500">Your cart is empty</p>
              ) : (
                items.map((item) => (
                  <div 
                    key={item.id} 
                    className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6"
                  >
                    <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                      {/* Product Image */}
                      <a href="#" className="shrink-0 md:order-1">
                        <Image 
                          src={item.image} 
                          alt={item.name} 
                          width={80} 
                          height={80} 
                          className="h-20 w-20 object-cover" 
                        />
                      </a>

                      {/* Quantity Control */}
                      <div className="flex items-center justify-between md:order-3 md:justify-end">
                        <div className="flex items-center">
                          <button 
                            type="button" 
                            className="decrement-button"
                            onClick={() => dispatch(updateQuantity({ 
                              id: item.id, 
                              quantity: Math.max(1, item.quantity - 1)
                            }))}
                          >
                            -
                          </button>
                          <input 
                            type="text" 
                            className="quantity-input w-12 text-center" 
                            value={item.quantity} 
                            readOnly 
                          />
                          <button 
                            type="button" 
                            className="increment-button"
                            onClick={() => dispatch(updateQuantity({ 
                              id: item.id, 
                              quantity: item.quantity + 1 
                            }))}
                          >
                            +
                          </button>
                        </div>
                        <div className="text-end md:order-4 md:w-32">
                          <p className="price font-bold">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>

                      {/* Product Details */}
                      <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                        <a href="#" className="product-name text-lg font-medium">
                          {item.name}
                        </a>

                        <div className="flex items-center gap-4">
                          <button 
                            type="button" 
                            className="remove-item text-red-500 hover:text-red-700"
                            onClick={() => dispatch(removeFromCart(item.id))}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
            <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
              <p className="text-xl font-semibold text-gray-900 dark:text-white">
                Order Summary
              </p>

              <div className="space-y-4">
                <dl className="flex items-center justify-between gap-4">
                  <dt>Subtotal</dt>
                  <dd className="subtotal">${total.toFixed(2)}</dd>
                </dl>

                <dl className="flex items-center justify-between gap-4 border-t pt-2">
                  <dt className="font-bold">Total</dt>
                  <dd className="total font-bold">${total.toFixed(2)}</dd>
                </dl>
              </div>

              <button 
                className="proceed-to-checkout w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
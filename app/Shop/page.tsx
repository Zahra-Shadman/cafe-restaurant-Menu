"use client";

import { useAppSelector, useAppDispatch } from "@/redux/store";
import { removeFromCart, updateQuantity } from "@/redux/slices/cartSlice";
import Image from "next/image";
import Link from "next/link";
import { TiDelete } from "react-icons/ti";

export default function CartPage() {
  const { items, total } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  return (
    <section
      className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16"
      dir="rtl"
    >
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl text-right">
          سبد خرید
        </h2>

        <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
          <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
            <div className="space-y-6">
              {items.length === 0 ? (
                <div className="mx-auto flex-1 flex flex-col items-center justify-center space-y-4">
                  <img src="/empty.svg" alt="empty" className="w-56" />
                  <p className="text-center text-gray-500">
                    سبد خرید شما خالی است
                  </p>
                  <Link
                    href={"/menu"}
                    className="text-primary-600 bg-green-600 hover:bg-green-700 p-2 rounded-md text-white "
                  >
                    رفتن به منو
                  </Link>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6"
                  >
                    <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                      <a href="#" className="shrink-0 md:order-1">
                        <div className="flex items-center gap-4">
                          <button
                            type="button"
                            className="remove-item text-red-500 hover:text-red-700"
                            onClick={() => dispatch(removeFromCart(item.id))}
                          >
                            <TiDelete className="w-12 h-6" />
                          </button>
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={80}
                            height={80}
                            className="h-20 w-20 object-cover rounded-full"
                          />
                        </div>
                      </a>
                      <div className="flex items-center justify-between md:order-3 md:justify-end">
                        <div className="flex items-center">
                          <button
                            type="button"
                            className="decrement-button bg-slate-200 w-8 font-bold py-1 px-2 rounded-lg"
                            onClick={() =>
                              dispatch(
                                updateQuantity({
                                  id: item.id,
                                  quantity: Math.max(1, item.quantity - 1),
                                })
                              )
                            }
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
                            className="increment-button bg-slate-200 w-8 font-bold py-1 px-2 rounded-lg"
                            onClick={() =>
                              dispatch(
                                updateQuantity({
                                  id: item.id,
                                  quantity: item.quantity + 1,
                                })
                              )
                            }
                          >
                            +
                          </button>
                        </div>
                        <div className="text-end md:order-4 md:w-32">
                          <p className="price font-bold">
                            {item.price * item.quantity} تومان
                          </p>
                        </div>
                      </div>

                      <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                        <a
                          href="#"
                          className="product-name text-lg font-medium text-right"
                        >
                          {item.name}
                        </a>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
            <div className="space-y-8 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
              <p className="text-xl font-medium text-green-800 dark:text-white text-center">
                خلاصه سفارش
              </p>

              <div className="space-y-7">
                <dl className="flex items-center justify-between gap-4">
                  <dt className="font-semibold text-gray-600">جمع جزئی</dt>
                  <dd className="font-nunito">{total} تومان</dd>
                </dl>
                <dl className="flex items-center justify-between gap-4">
                  <dt className="font-medium w-full text-gray-600 ">
              
                    حمل و نقل
                  </dt>
                  <dd className="text-gray-900 text-left ">
                    در هنگام پرداخت محاسبه می شود.
                  </dd>
                </dl>
                <dl className="flex items-center justify-between gap-4">
                  <dt className="font-medium w-full text-gray-600">
                
                    مالیات 10%
                  </dt>
                  <dd className="text-gray-900 w-full text-left  ">
                    {total * 0.1} تومان
                  </dd>
                </dl>
                <dl className="flex items-center justify-between gap-4 border-t pt-2">
                  <dt className="font-semibold text-gray-700">‌جمع کل‌</dt>
                  <dd className="total font-semibold">{total} تومان</dd>
                </dl>
              </div>

              <Link href={"/Shop/checkout"}>
                <button className="proceed-to-checkout w-full mt-4 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition">
                  تکمیل فرایند خرید
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

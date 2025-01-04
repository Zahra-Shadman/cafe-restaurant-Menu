"use client";

import { useAppSelector, useAppDispatch } from "@/redux/store";
import { removeFromCart } from "@/redux/slices/cartSlice";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import DiscountCode from "@/components/DiscountCode";

export default function CheckoutPage() {
  const { items } = useAppSelector((state) => state.cart);
 

  // State variables for user information
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [total, setTotal] = useState<number>(0); // State for total price

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem("userData");
    if (userData) {
      const user = JSON.parse(userData);
      setFirstName(user.firstname || ""); // Assuming user object has firstName
      setLastName(user.lastname || ""); // Assuming user object has lastName
      setPhoneNumber(user.phoneNumber || ""); // Assuming user object has phoneNumber
      setAddress(user.address || ""); // Assuming user object has address
    }
  }, []);

  useEffect(() => {
    // Calculate total price from items
    const calculatedTotal = items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotal(calculatedTotal);
  }, [items]);

  return (
    <div className="min-h-screen flex flex-col items-center py-10">
      <div className="w-full max-w-6xl bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-xl font-bold mb-8 text-gray-700 text-center ml-36">
          فرم تکمیل اطلاعات
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <form className="text-right">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block mb-2">نام خانوادگی</label>
                    <input
                      type="text"
                      className="w-full p-2 rounded border-2 text-right bg-gray-100 text-gray-900"
                      placeholder="نام خانوادگی خود را وارد کنید"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block mb-2 ">نام</label>
                    <input
                      type="text"
                      className="w-full p-2 rounded border-2 text-right bg-gray-100 text-gray-900"
                      placeholder="نام خود را وارد کنید"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block mb-2">شماره تلفن</label>
                  <div className="flex flex-row-reverse">
                    <input
                      type="text"
                      className="w-full p-2 rounded-r bg-gray-100 border-2 text-gray-900"
                      placeholder="0912-000-000"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                    <select className="p-2 rounded-l bg-gray-100 text-gray-900">
                      <option>+۹۸</option>
                    </select>
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block mb-2 ">آدرس ارسال</label>
                  <textarea
                    className="w-full p-2 rounded border-2 text-right bg-gray-100 text-gray-900"
                    placeholder="آدرس خود را وارد کنید"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  ></textarea>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block mb-2">شهر</label>
                    <select className="w-full p-2 border-2 text-right rounded bg-gray-100 text-gray-900">
                      <option>ایران</option>
                    </select>
                  </div>
                  <div>
                    <label className="block mb-2 ">استان</label>
                    <select className="w-full p-2 border-2 text-right rounded bg-gray-100 text-gray-900">
                      <option>تهران</option>
                    </select>
                  </div>
                </div>
                <div className="flex items-center justify-end">
                  <label htmlFor="saveAddress" className="ml-2">
                    ذخیره اطلاعات در لیست آدرس‌ها
                  </label>
                  <input type="checkbox" id="saveAddress" className="ml-2" />
                </div>
              </form>
            </div>
            <div className="p-6 rounded-lg text-right">
              <h2 className="text-xl font-semibold mb-4 text-right">
                جزئیات پرداخت
              </h2>
              <form className="text-right">
                <div className="flex items-center mb-4 justify-end">
                  <label htmlFor="bankCard" className="ml-4">
                    پرداخت آنلاین با کارت بانکی
                  </label>
                  <input
                    type="radio"
                    id="bankCard"
                    name="paymentType"
                    className="ml-2"
                  />
                </div>
                <div className="flex items-center mb-4 justify-end">
                  <label htmlFor="installments" className="ml-4">
                    اقساط آنلاین فلوبایت
                  </label>
                  <input
                    type="radio"
                    id="installments"
                    name="paymentType"
                    className="ml-2"
                  />
                </div>
                <p className="text-sm text-gray-400 mb-4 text-right">
                  شما از 1٪ در ماه تا 31 ژانویه 2024 بهره‌مند خواهید شد.
                </p>
                <div className="flex items-center mb-4 justify-end">
                  <label htmlFor="storeCard" className="ml-4">
                    پرداخت آنلاین با کارت ستاره فلوبایت
                  </label>
                  <input
                    type="radio"
                    id="storeCard"
                    name="paymentType"
                    className="ml-2"
                  />
                </div>
                <div className="flex items-center mb-4 justify-end">
                  <label htmlFor="paymentOrder">سفارش پرداخت</label>
                  <input
                    type="radio"
                    id="paymentOrder"
                    name="paymentType"
                    className="ml-2"
                  />
                </div>
              </form>
            </div>
          </div>
          <div>
            <div className="bg-gray-100 p-6 rounded-lg mb-6">
              <h2 className="text-xl font-semibold mb-4 text-center">
                آیتم های انتخابی
              </h2>
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center"
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={50}
                      height={50}
                      className="w-12 h-12 rounded"
                    />
                    <div className="flex-1 ml-4">
                      <p>{item.name}</p>
                    </div>
                    <div className="text-right">
                      <p>x{item.quantity}</p>
                      <p>{item.price * item.quantity} تومان</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg">
  <h2 className="text-xl font-semibold mb-4">Order summary</h2>
  <div className="space-y-2">
    <div className="flex justify-between">
      <p className="">{total} تومان</p>
      <p>جمع جز</p>
    </div>
    <div className="flex justify-between">
      <p className="">
        {total * 0.1} تومان
      </p>
      <p>مالیات %10</p>
    </div>
    <div className="flex justify-between font-semibold text-lg text-pink-700 py-8">
      <p>{total + total * 0.1} تومان</p> 
      <p>جمع کل مبلغ</p>
    </div>
  </div>
  <Link href={"/Shop/checkout/payment"}> <DiscountCode total={total} setTotal={setTotal} />
  <button className="w-full mt-6 py-2 bg-green-600  hover:bg-green-800 text-white rounded-lg">
   ادامه جهت پرداخت
  </button></Link>
  <Link
    href="/Shop"
    className="block mt-4 text-center text-green-500 hover:text-green-800"
  >
   بازگشت به سبد خرید 
  </Link>
</div>
          </div>
        </div>
      </div>
    </div>
  );
}

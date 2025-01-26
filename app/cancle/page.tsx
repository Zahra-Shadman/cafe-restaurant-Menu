"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

const OrderCancellation: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <Image
        src="/vecteezy_cancel.jpg"
        alt="Order Cancellation"
        className=" w-64 mb-6"
      />
      <h1 className="text-2xl font-semibold text-red-800 mb-4">
        سفارش شما کنسل شد
      </h1>
      <p className="text-gray-600 mb-6">
        با عرض پوزش به شما اطلاع می دهیم که سفارش شما لغو شده است
      </p>
      <Link href={"/"}>
   
        <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-blue-600 transition duration-200">
          بازگشت به صفحه اصلی
        </button>
      </Link>
    </div>
  );
};

export default OrderCancellation;

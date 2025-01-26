import Link from "next/link";
import React from "react";
import Image from "next/image";
const PaymentSuccess: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-50 to-green-50 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-2xl p-4 bg-white shadow-2xl dark:bg-gray-900 sm:p-10 sm:rounded-3xl">
        <div className="text-center">
          <div className="flex items-center justify-center w-36 h-46 mx-auto mb-6 bg-green-100  dark:bg-green-700">
            <Image src="/orderdone.jpg" alt="" />
          </div>
          <h1 className="text-4xl font-extrabold text-green-700 dark:text-green-400">
            !پرداخت با موفقیت انجام شد
          </h1>
          <p className="mt-4 text-lg text-gray-800 dark:text-gray-300">
            از خرید شما متشکریم
          </p>
        </div>
        <div className="flex gap-3 justify-center">
          <div className="mt-8 text-center">
            <Link href="/orders">
              <button className="inline-block px-6 py-2 text-lg font-medium text-white transition-transform rounded-lg shadow-lg bg-gradient-to-r from-green-600 to-green-600 hover:scale-105 hover:from-green-700 hover:to-green-700 dark:from-green-500 dark:to-green-500 dark:hover:from-green-600 dark:hover:to-green-600">
                مشاهده وضعیت صفارش
              </button>
            </Link>
          </div>
          <div className="mt-8 text-center">
            <Link href="/">
              <button className="inline-block px-6 py-2 text-lg font-medium text-white transition-transform rounded-lg shadow-lg bg-gradient-to-r from-green-600 to-green-600 hover:scale-105 hover:from-green-700 hover:to-green-700 dark:from-green-500 dark:to-green-500 dark:hover:from-green-600 dark:hover:to-green-600">
                بازگشت به صفحه اصلی
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;

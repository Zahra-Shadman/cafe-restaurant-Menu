"use client";

import { useAppDispatch } from "@/redux/store";
import { clearCart } from "@/redux/slices/cartSlice";
import axios from "axios";
import { OrderUrl } from "@/api/urls";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { OrderData, Product } from "@/types/payment";

const PaymentPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const [error, setError] = useState<string | null>(null);
  const orderDataParam = searchParams.get("orderData");
  const parsedOrderData: OrderData | null = orderDataParam
    ? JSON.parse(decodeURIComponent(orderDataParam))
    : null;

  const handlePayment = async () => {
    if (!parsedOrderData) {
      setError("اطلاعات سفارش یافت نشد");
      return;
    }

    const orderPayload = {
      user: parsedOrderData.user || parsedOrderData.userId,
      products: parsedOrderData.products.map((product: Product) => ({
        product: product.product || product.id,
        count: product.count || product.quantity,
      })),
    };

    try {
      const response = await axios.post(`${OrderUrl}`, orderPayload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      dispatch(clearCart());
      router.push("/done");
    } catch (error) {
      console.error("Order registration failed:", error);
      if (axios.isAxiosError(error)) {
        console.error("Error response:", error.response?.data);
      }
      setError("ثبت سفارش با خطا مواجه شد");
    }
  };

  const handleCancel = () => {
    dispatch(clearCart());
    router.push("/cancle");
  };

  if (!parsedOrderData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">اطلاعات سفارش نامعتبر است</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">تأیید پرداخت </h1>
      <p className="mb-4">آیا می‌خواهید سفارش خود را ثبت کنید؟</p>

      <div className="mb-6 p-4 bg-gray-100 rounded">
        <h2 className="text-lg font-semibold mb-2">خلاصه سفارش</h2>
        <p>تعداد محصولات: {parsedOrderData.products.length}</p>
      </div>

      {error && <div className="mb-4 text-red-500">{error}</div>}

      <div className="flex gap-4">
        <button
          onClick={handlePayment}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          پرداخت و ثبت سفارش
        </button>
        <button
          onClick={handleCancel}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
        >
          انصراف
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
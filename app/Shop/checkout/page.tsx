"use client";

import { useState, useEffect } from "react";
import { useAppSelector } from "@/redux/store";
import Image from "next/image";
import Link from "next/link";
import DiscountCode from "@/components/DiscountCode";
import { CartItem } from "@/types/redux";
import { UserData } from "@/types/shop";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import DeliveryDateTimePicker from "@/components/admin/ORDERS/DeliveryDateTimeSelector";

export const orderFormSchema = z.object({
  firstname: z.string().min(2, "نام الزامی است"),
  lastname: z.string().min(2, "نام خانوادگی الزامی است"),
  phone: z.string().min(10, "شماره تلفن الزامی است"),
  address: z.string().min(5, "آدرس دقیق الزامی است"),
  city: z.string(),
  province: z.string(),
  saveAddress: z.boolean().optional(),
});

export type OrderFormSchema = z.infer<typeof orderFormSchema>;

export default function CheckoutPage() {
  const router = useRouter();
  const { items } = useAppSelector((state) => state.cart);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string>("");
  const [total, setTotal] = useState<number>(0);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<OrderFormSchema>({
    resolver: zodResolver(orderFormSchema),
  });

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      try {
        const userData: UserData = JSON.parse(storedUserData);
        setUserId(userData._id);

        setValue("firstname", userData.firstname || "");
        setValue("lastname", userData.lastname || "");
        setValue("phone", userData.phoneNumber || "");
        setValue("address", userData.address || "");
        setValue("city", userData.city || "ایران");
        setValue("province", userData.province || "تهران");
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, [setValue]);

  useEffect(() => {
    const calculatedTotal = items.reduce(
      (acc, item: CartItem) => acc + item.price * item.quantity,
      0
    );
    setTotal(calculatedTotal);
  }, [items]);

  const onSubmit: SubmitHandler<OrderFormSchema> = async (data) => {
    const orderData = {
      user: userId,
      products: items.map((item: CartItem) => ({
        product: item.id,
        count: item.quantity,
      })),
      ...data,
    };

    const encodedOrderData = encodeURIComponent(JSON.stringify(orderData));

    router.push(`/payment?orderData=${encodedOrderData}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-10">
      <div className="w-full max-w-6xl bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-xl font-bold mb-8 text-gray-700 text-center ml-36">
          فرم تکمیل اطلاعات
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <form onSubmit={handleSubmit(onSubmit)} className="text-right">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block mb-2">نام خانوادگی</label>
                    <input
                      type="text"
                      {...register("lastname")}
                      className="w-full p-2 rounded border-2 text-right bg-gray-100 text-gray-900"
                      placeholder="نام خانوادگی خود را وارد کنید"
                    />
                    {errors.lastname && (
                      <p className="text-red-500 text-sm">
                        {errors.lastname.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block mb-2 ">نام</label>
                    <input
                      type="text"
                      {...register("firstname")}
                      className="w-full p-2 rounded border-2 text-right bg-gray-100 text-gray-900"
                      placeholder="نام خود را وارد کنید"
                    />
                    {errors.firstname && (
                      <p className="text-red-500 text-sm">
                        {errors.firstname.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block mb-2">شماره تلفن</label>
                  <div className="flex flex-row-reverse">
                    <input
                      type="text"
                      {...register("phone")}
                      className="w-full p-2 rounded-r bg-gray-100 border-2 text-gray-900"
                      placeholder="0912-000-000"
                    />
                    <select className="p-2 rounded-l bg-gray-100 text-gray-900">
                      <option>+۹۸</option>
                    </select>
                  </div>
                  {errors.phone && (
                    <p className="text-red-500 text-sm">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
                <div className="mb-4">
                  <label className="block mb-2 ">آدرس ارسال</label>
                  <textarea
                    {...register("address")}
                    className="w-full p-2 rounded border-2 text-right bg-gray-100 text-gray-900"
                    placeholder="آدرس خود را وارد کنید"
                  ></textarea>
                  {errors.address && (
                    <p className="text-red-500 text-sm">
                      {errors.address.message}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block mb-2">شهر</label>
                    <select
                      {...register("city")}
                      className="w-full p-2 border-2 text-right rounded bg-gray-100 text-gray-900"
                    >
                      <option>تهران</option>
                    </select>
                  </div>
                  <div>
                    <label className="block mb-2 ">استان</label>
                    <select
                      {...register("province")}
                      className="w-full p-2 border-2 text-right rounded bg-gray-100 text-gray-900"
                    >
                      <option>تهران</option>
                    </select>
                  </div>
                </div>
                <div className="flex items-center justify-end">
                  <label htmlFor="saveAddress" className="ml-2">
                    ذخیره اطلاعات در لیست آدرس‌ها
                  </label>
                  <input
                    type="checkbox"
                    {...register("saveAddress")}
                    className="ml-2"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoading || items.length === 0}
                  className="w-full mt-6 py-2 bg-green-600 hover:bg-green-800 text-white rounded-lg"
                >
                  {isLoading ? "در حال ثبت سفارش..." : "ثبت سفارش"}
                </button>
                <Link
                  href="/Shop"
                  className="block mt-4 text-center text-green-500 hover:text-green-800"
                >
                  بازگشت به سبد خرید
                </Link>
              </form>
            </div>
            <h2 className="text-xl font-semibold mb-4 text-right">
              بازه زمانی تحویل سفارش
            </h2>
            <div className="p-6 flex flex-col md:flex-row rounded-lg text-right bg-gray-100">
              <DeliveryDateTimePicker
                orderId={""}
                onUpdate={function (): void {
                  throw new Error("Function not implemented.");
                }}
              />
            </div>
          </div>
          <div>
            <div className="bg-gray-100 p-6 rounded-lg mb-6">
              <h2 className="text-xl font-semibold mb-4 text-center">
                آیتم های انتخابی
              </h2>
              <div className="space-y-4">
                {items.map((item: CartItem) => (
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
              <h2 className="text-xl font-semibold mb-4 text-center">
                خلاصه سفارش
              </h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <p className="">{total} تومان</p>
                  <p>جمع جز</p>
                </div>
                <div className="flex justify-between">
                  <p className="">{total * 0.1} تومان</p>
                  <p>مالیات %10</p>
                </div>
                <div className="flex justify-between font-semibold text-lg text-pink-700 py-8">
                  <p>{total + total * 0.1} تومان</p>
                  <p>جمع کل مبلغ</p>
                </div>
              </div>
              <DiscountCode total={total} setTotal={setTotal} />
            </div>
          </div>
        </div>
        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded-lg mt-4">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}

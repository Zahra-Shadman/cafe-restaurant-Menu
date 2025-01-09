import React from "react";
import { Order } from "@/types/orders";
import UserProfile from "./user-info";

interface OrderDetailsModalProps {
  order: Order;
  onClose: () => void;
  onUpdateDeliveryStatus: (orderId: string) => Promise<void>;
}

export const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({
  order,
  onClose,
  onUpdateDeliveryStatus,
}) => {
  return (
    <div className="fixed inset-0  bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 flex flex-col  rounded-lg w-[600px] max-h-[700px] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4 text-center">جزئیات سفارش</h2>
        <div className="mb-4 text-right">
          <h3 className="font-semibold">اطلاعات سفارش</h3>
          <p> {order._id} : شناسه سفارش</p>
          <p>{new Date(order.createdAt).toLocaleString()} : تاریخ ثبت سفارش </p>
          <p>تاریخ تحویل: {new Date(order.deliveryDate).toLocaleString()}</p>
          <p>
            وضعیت تحویل :
            {order.deliveryStatus ? " تحویل شده" : "در انتظار تحویل"}
          </p>
        </div>

        <UserProfile />

        <div className="mb-4">
          <h3 className="font-semibold text-right">محصولات سفارش</h3>
          {order.products.map((product) => (
            <div
              key={product._id}
              className="flex justify-between border-b py-2"
            >
              <span>تعداد: {product.count}</span>
              <span>شناسه محصول: {product.product}</span>
            </div>
          ))}
        </div>

        <div className="flex justify-center flex-col items-center">
          {!order.deliveryStatus && (
            <button
              onClick={() => onUpdateDeliveryStatus(order._id)}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
            >
              تغییر وضعیت به تحویل شده
            </button>
          )}

          <button
            onClick={onClose}
            className="mt-4 bg-gray-200 px-4  py-2 rounded hover:bg-gray-300 transition-colors"
          >
            بستن
          </button>
        </div>
      </div>
    </div>
  );
};

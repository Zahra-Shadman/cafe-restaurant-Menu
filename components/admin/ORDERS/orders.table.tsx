"use client";
import { GrCircleInformation } from "react-icons/gr";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { OrderUrl } from "@/api/urls";
import { Order } from "@/types/orders";
import { OrderDetailsModal } from "./orderDetail";

export const OrdersDataTable: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("All");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${OrderUrl}`);

        const ordersWithDetails = await Promise.all(
          response.data.data.orders.map(async (order: Order) => {
            try {
              const userResponse = await axios.get(`/api/users/${order.user}`);
              return {
                ...order,
                userDetails: userResponse.data.user,
              };
            } catch (userError) {
              console.error(
                `Error fetching user details for order ${order._id}:`,
                userError
              );
              return order;
            }
          })
        );

        setOrders(ordersWithDetails);
        setError(null);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setError("Failed to fetch orders");
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders(); 

  }, []); 
  const handleUpdateDeliveryStatus = async (orderId: string) => {
    try {
      await axios.patch(`${OrderUrl}/${orderId}`, {
        deliveryStatus: true,
      });

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, deliveryStatus: true } : order
        )
      );

      setSelectedOrder(null);
    } catch (error) {
      console.error("Error updating delivery status:", error);
    }
  };

  const filteredOrders = orders.filter((order) => {
    if (filterStatus === "Delivered") {
      return order.deliveryStatus === true;
    } else if (filterStatus === "Pending") {
      return order.deliveryStatus === false;
    }
    return true;
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div className="relative max-w-[1200px] ml-80 overflow-x-auto sm:rounded-lg">
        <div className="mb-4">
          <select
            id="filter"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border rounded px-3 float-end py-2 mb-3"
          >
            <option value="All">همه سفارشات</option>
            <option value="Delivered">تحویل داده شده</option>
            <option value="Pending">در انتظار تحویل</option>
          </select>
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
              <th scope="col" className="px-6 py-3">
                تاریخ ارسال
              </th>
              <th scope="col" className="px-6 py-3">
                وضعیت ارسال
              </th>
              <th scope="col" className="px-6 py-3">
                قیمت کل
              </th>
              <th scope="col" className="text-center">
                شناسه سفارش
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order._id} className="bg-white border-b">
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="font-medium text-blue-600 hover:underline"
                  >
                    <GrCircleInformation className="w-6 h-5 hover:text-blue-950" />
                  </button>
                </td>
                <td className="px-6 py-4">
                  {new Date(order.deliveryDate).toLocaleDateString("fa-IR")}
                </td>
                <td className="px-6 py-4">
                  {order.deliveryStatus ? "تحویل داده شده" : "در حال انتظار"}
                </td>
                <td className="px-6 py-4">
                  {new Intl.NumberFormat("fa-IR", {
                    style: "currency",
                    currency: "IRR",
                  }).format(order.totalPrice)}
                </td>
                <th scope="row" className="px-6 py-4 font-medium text-gray-800">
                  {order._id}
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onUpdateDeliveryStatus={handleUpdateDeliveryStatus}
        />
      )}
    </>
  );
};

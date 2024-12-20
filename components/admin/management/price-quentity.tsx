"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoIosSearch } from "react-icons/io";
import { MdNavigateNext } from "react-icons/md";
import { IoChevronBackSharp } from "react-icons/io5";
import { IProduct } from "@/types/category";

import { IApiRes } from "@/libs/api";
import EditModal from "./edit.modal";

export const EditTable: React.FC = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 9;

  const fetchProducts = async (page: number) => {
    setLoading(true);
    try {
      const response = await axios.get<IApiRes>(
        `http://localhost:8000/api/products?page=${page}&limit=${limit}&fields=-rating,-createdAt,-updatedAt,-__v&sort=price&quantity[gte]=8`
      );
      if (response.data.status === "success") {
        setProducts(response.data.data.products);
        setTotalPages(response.data.total_pages);
      }
    } catch (err) {
      setError("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
    <div className="relative px-32 ml-64">
      <table className="min-w-full text-center rounded-lg table-fixed">
        <thead className="top-0 z-10 text-gray-900">
          <tr>
            <th>
              <div className="relative flex items-center justify-between rounded-md">
                <IoIosSearch className="absolute left-2 block h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  name="search"
                  className="font-thin py-2 cursor-text rounded-md border border-gray-100 bg-gray-100 px-8 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  placeholder="Search by name, type ...."
                />
              </div>
            </th>
            <th>
              <select className="font-thin w-[190px] rounded-md border border-gray-100 bg-gray-100 p-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
                <option className="w-full">فیلتر بر اساس موجودی</option>
                <option>فیلتر براساس قیمت</option>
              </select>
            </th>
          </tr>
        </thead>
        <thead className="bg-green-900 text-gray-300">
          <tr>
            <th className="border border-gray-200 text-sm w-1/7">تصویر محصول</th>
            <th className="border border-gray-200 text-sm w-1/7">نام محصول</th>
            <th className="border border-gray-200 text-sm w-1/7">قیمت محصول</th>
            <th className="border border-gray-200 text-sm w-1/7">موجودی محصول</th>
            <th className="border border-gray-200 text-sm w-1/7">برند محصول</th>
            <th className="border border-gray-200 text-sm w-1/7">توضیحات محصول</th>
            <th className="border border-gray-200 text-sm w-1/7">اقدامات</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td className="border border-gray-300">
                <div className="flex justify-center">
                  {product.images && product.images.length > 0 && (
                    <img
                      src={`http://localhost:8000/images/products/images/${product.images[0]}`}
                      alt={product.name}
                      width={170}
                      height={170}
                      className="rounded-md"
                    />
                  )}
                </div>
              </td>
              <td className="border border-gray-300 p-2">{product.name}</td>
              <td className="border border-gray-300 p-2">{product.price}</td>
              <td className="border border-gray-300 p-2">{product.quantity}</td>
              <td className="border border-gray-300 p-2">{product.brand}</td>
              <td className="border border-gray-300 p-2">{product.description}</td>
              <td className="border border-gray-300">
                <EditModal Id={`${product._id}`} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center p-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="p-2 bg-green-800 text-white rounded disabled:opacity-50"
        >
          <IoChevronBackSharp />
        </button>
        <span className="self-center mx-2">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="p-2 bg-green-800 text-white rounded disabled:opacity-50"
        >
          <MdNavigateNext />
        </button>
      </div>
    </div>
  </div>
  );
};

export default EditTable;

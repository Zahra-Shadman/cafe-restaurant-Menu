"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdNavigateNext } from "react-icons/md";
import { IoChevronBackSharp } from "react-icons/io5";
import { IProduct } from "@/types/category";
import { IApiRes } from "@/types/api";
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
    <div className=" max-w-[1200px] ml-[350px]  sm:rounded-lg p-4">
      <table className="w-full text-sm text-right  text-gray-500">
        <thead className="text-xs text-gray-700  bg-gray-100">
          <tr>
            <th></th>
            <th scope="col" className="px-6 py-3">
              توضیحات
            </th>
            <th scope="col" className="px-6 py-3">
              برند
            </th>
            <th scope="col" className="px-6 py-3">
              تعداد
            </th>
            <th scope="col" className="px-6 py-3">
              قیمت
            </th>
            <th scope="col" className="px-6 py-3">
              نام محصول
            </th>
            <th scope="col" className="px-6 py-3">
              تصویر
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id} className="bg-white border-b">
              <td className="px-6 py-4 text-left">
                <EditModal Id={`${product._id}`} />
              </td>
              <td className="px-6 py-4 max-w-36">{product.description}</td>
              <td className="px-6 py-4">{product.brand}</td>
              <td className="px-6 py-4">{product.quantity}</td>
              <td className="px-6 py-4">{product.price}</td>
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                {product.name}
              </td>
              <td>
                {product.images && product.images.length > 0 && (
                  <img
                    src={`http://localhost:8000/images/products/images/${product.images[0]}`}
                    alt={product.name}
                    className="w-20 h-20 object-cover rounded-md p-1"
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-center p-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="p-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50 mx-2"
        >
          <IoChevronBackSharp />
        </button>
        <span className="self-center">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="p-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50 mx-2"
        >
          <MdNavigateNext />
        </button>
      </div>
    </div>
  );
};

export default EditTable;

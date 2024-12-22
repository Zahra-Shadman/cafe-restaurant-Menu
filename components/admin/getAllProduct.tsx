"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoIosSearch } from "react-icons/io";
import { MdNavigateNext } from "react-icons/md";
import { IoChevronBackSharp } from "react-icons/io5";
import { IProduct } from "@/types/category";
import AddItemsModel from "./CRAD/addNewItemModal";
import { IApiRes } from "@/types/api";
import { DeleteModalValidation } from "./CRAD/deleteModalValidation";

export const GetProductsTable: React.FC = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 9;
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [productIdToDelete, setProductIdToDelete] = useState<string | null>(null);

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

  const openDeleteModal = (id: string) => {
    setProductIdToDelete(id);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:8000/api/products/${id}`);
      fetchProducts(currentPage);
    } catch (err) {
      setError("Failed to delete product");
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

  function handleProductAdded(): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div>
      <div className="relative px-32 ml-64 ">
        <table className="min-w-full text-center rounded-lg ">
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
              <th className="p-2"></th>
              <th className="p-2"></th>
              <th className="p-2 w-[168px] "></th>
              <th className="font-thin w-full">
              <AddItemsModel onProductAdded={handleProductAdded} />
              </th>
              <th className="p-2 ">
                <div className="flex flex-col">
                  <input
                    type="date"
                    id="date"
                    className="font-thin block cursor-pointer rounded-md border border-gray-100 bg-gray-100 p-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                </div>
              </th>
              <th className="p-2">
                <select className="block font-thin w-[168px] rounded-md border border-gray-100 bg-gray-100 p-1 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
                  <option
                  className="w-full">فیلتر بر اساس موجودی</option>
                  <option>فیلتر براساس قیمت</option>
                </select>
              </th>
            </tr>
          </thead>
          <thead className="top-0 z-10 bg-green-900 text-gray-200 font-bold">
            <tr>
              <th className="border w-[200px] border-gray-200 p-2 ">
                تصویر محصول
              </th>
              <th className="border w-[150px] border-gray-200 p-2">
                نام محصول
              </th>
              <th className="border w-[250px] border-gray-200 p-2">
                قیمت محصول
              </th>
              <th className="border w-[150px] border-gray-200 p-2">
                موجودی محصول
              </th>
              <th className="border w-[150px] border-gray-200 p-2 ">
                برند محصول
              </th>
              <th className="border w-[150px] border-gray-200 p-2 ">
                توضیحات محصول
              </th>
              <th className="border w-[150px] border-gray-200 p-2">اقدامات</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td className="border border-gray-300 p-2">
                  <div className="flex justify-center">
                    {product.images && product.images.length > 0 && (
                      <img
                        src={`http://localhost:8000/images/products/images/${product.images[0]}`}
                        alt={product.name}
                        width={170}
                        height={170}
                        className="rounded-md w-32 h-24"
                      />
                    )}
                  </div>
                </td>
                <td className="border border-gray-300 p-2">{product.name}</td>
                <td className="border border-gray-300 items-center justify-center">
                  {product.price}
                  <button className="ml-2 text-blue-500"></button>
                </td>
                <td className="border border-gray-300 p-2 items-center justify-center">
                  {product.quantity}
                  <button className="ml-2 text-blue-700"></button>
                </td>
                <td className="border border-gray-300 p-2">{product.brand}</td>
                <td className="border border-gray-300 p-2 ">
                  {product.description}
                </td>

                <td className="border grid border-gray-300 p-2">
                  <button
                    type="button"
                    className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                  >
                    جزییات محصول
                  </button>
                  <button
                    type="button"
                    onClick={() => openDeleteModal(product._id)}
                    className="focus:outline-none text-white bg-blue-900 hover:bg-blue-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                  >
                    حذف
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-center p-2 ">
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
      {isModalOpen && (
        <DeleteModalValidation
          onClose={() => setIsModalOpen(false)}
          onConfirm={() => {
            if (productIdToDelete) {
              handleDelete(productIdToDelete);
              setProductIdToDelete(null);
              setIsModalOpen(false);
            }
          }}
        />
      )}
    </div>
  );
};

export default GetProductsTable;
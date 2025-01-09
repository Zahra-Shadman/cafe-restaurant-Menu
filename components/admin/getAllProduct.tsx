"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { IProduct } from "@/types/category";
import { IApiRes } from "@/types/api";

import { DeleteModalValidation } from "./CRAD/deleteModalValidation";
import AddItemsModel from "./CRAD/addNewItemModal";
import { IoEye } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";

export const GetProductsTable: React.FC = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 9;
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [productIdToDelete, setProductIdToDelete] = useState<string | null>(
    null
  );

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="relative max-w-[1000px] ml-[400px] overflow-x-auto sm:rounded-lg">
      <AddItemsModel
        onProductAdded={function (newProduct: any): void {
          throw new Error("Function not implemented.");
        }}
      />
      <table className="w-full text-sm text-right text-gray-500">
        <thead className="text-xs text-gray-900 uppercase bg-gray-200">
          <tr>
            <th scope="col" className="px-6 py-3">
              <span className="sr-only">Edit</span>
            </th>

            <th scope="col" className="px-6 py-3">
              قیمت
            </th>
            <th scope="col" className="px-6 py-3">
              برند
            </th>
            <th scope="col" className="px-6 py-3">
              موجودی
            </th>
            <th scope="col" className="px-6 py-3">
              نام محصول
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id} className="bg-white border-b">
              <td className="px-6 py-4 text-right">
                <div className="flex space-x-3 justify-end">
                  <Link
                    href={`/menu/${product._id}`}
                    className="font-medium text-blue-600 hover:underline"
                  >
                    <IoEye className="w-5 h-5  text-greenbtn hover:text-green-700" />
                  </Link>
                  <button
                    onClick={() => openDeleteModal(product._id)}
                    className="font-medium text-red-600 hover:underline"
                  >
                    <RiDeleteBin6Line className="w-5 h-5" />
                  </button>
                </div>
              </td>
              <td className="px-6 py-4">${product.price}</td>
              <td className="px-6 py-4">{product.brand}</td>
              <td className="px-6 py-4">{product.quantity}</td>
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                {product.name}
              </th>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-center p-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 mx-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="self-center">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-4 py-2 mx-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
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

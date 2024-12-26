"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { MdNavigateNext } from "react-icons/md";
import { IoBagAddOutline, IoChevronBackSharp } from "react-icons/io5";
import { IProduct } from "@/types/category";
import { IApiRes } from "@/types/api";
import { ImageUrl } from "@/api/urls";
import { FaRegHeart } from "react-icons/fa";
import { RiInformationLine } from "react-icons/ri";
import { useAppDispatch } from "@/redux/store";
import { addToCart } from "@/redux/slices/cartSlice";

const GetDefultProduct: React.FC = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const limit = 8;

  const dispatch = useAppDispatch();

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

  const handleAddToCart = (
    e: React.MouseEvent<HTMLButtonElement>,
    product: IProduct
  ): void => {
    e.stopPropagation();

    const cartProduct = {
      id: product._id,
      name: product.name,
      price: product.price,
      image:
        product.images && product.images.length > 0
          ? `${ImageUrl}${product.images[0]}`
          : "",
    };

    dispatch(addToCart(cartProduct));
  };

  return (
    <div className="px-32">
      <div className="min-w-full text-center rounded-lg">
        <div className="top-0 z-10 text-gray-900">
          <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {products.map((product) => (
              <div key={product._id} className="relative">
                <Link href={`/menu/${product._id}`} className="block">
                  <div className="bg-slate-100 p-3 rounded-lg shadow-md text-center cursor-pointer">
                    <div className="flex justify-center items-center mx-auto mb-4">
                      {product.images && product.images.length > 0 && (
                        <img
                          src={`${ImageUrl}${product.images[0]}`}
                          alt={product.name}
                          className="mx-auto mb-4"
                        />
                      )}
                    </div>
                    <h3 className="text-lg text-green-950 mb-2">
                      {product.name}
                    </h3>
                    <p className="text-lg font-semibold text-green-700 mb-4">
                      {product.price} تومان
                    </p>
                    <p className="text-gray-600 text-center p-1 text-sm mb-4 overflow-hidden whitespace-nowrap text-ellipsis">
                      {product.description.length > 30
                        ? `${product.description.substring(0, 35)}...`
                        : product.description}
                    </p>
                    <span className="rounded flex items-center justify-center gap-4 text-xs font-medium text-primary-800 mb-4">
                      <FaRegHeart className="w-4 h-4" />
                      <RiInformationLine className="w-5 h-6" />
                    </span>
                  </div>
                </Link>

                <div className="flex justify-center items-center absolute bottom-3 left-0 right-0">
                  <button
                    onClick={(e) => handleAddToCart(e, product)}
                    className="bg-greenbtn text-gray-200 w-46 flex items-center gap-2 mx-auto text-sm p-2 px-3 rounded-md hover:bg-green-950 transition duration-200"
                  >
                    <IoBagAddOutline className="w-5 h-5" /> افزودن به سبد خرید
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
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

export default GetDefultProduct;

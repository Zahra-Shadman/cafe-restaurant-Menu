"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import axios from "axios";
import { FaRegHeart } from "react-icons/fa";
import { IoBagAddOutline, IoInformationOutline } from "react-icons/io5";
import { FaStar } from "react-icons/fa6";
import { ImageUrl } from "@/api/urls";
import { ProductDetails, ProductResponse } from "@/types/product";
import Reviews from "@/components/PRODUCT-CMP/Reviews";
import { ProductDetailsSkeleton } from "@/components/SKETELONS/skeletonForProductDetailPage";

const ProductDetailsPage: React.FC = () => {
  const params = useParams();
  const productId = params?.id as string;

  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      if (productId) {
        try {
          const response = await axios.get<ProductResponse>(
            `http://localhost:8000/api/products/${productId}`
          );
          const fetchedProduct = response.data.data.product;
          setProduct(fetchedProduct);
          setSelectedImage(fetchedProduct.images?.[0] || null);
          setLoading(false);
        } catch (err) {
          setError("Failed to fetch product details");
          setLoading(false);
          console.error(err);
        }
      }
    };
    fetchProductDetails();
  }, [productId]);

  if (loading) return <ProductDetailsSkeleton />;
  if (error) return <p className="text-red-500 text-center py-10">{error}</p>;
  if (!product) return <p className="text-center py-10">No product found</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-10 max-w-7xl mx-auto">
        <div className="relative">
          <div className="rounded-lg p-4 flex flex-col items-center">
            <div className="w-full h-[400px] flex items-center justify-center overflow-hidden rounded-lg">
              {selectedImage && (
                <Image
                  src={`${ImageUrl}${selectedImage}`}
                  alt={product.name}
                  fill
                />
              )}
            </div>
          </div>
        </div>
        <div className="space-y-6 text-right">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              {product.name}
            </h2>
            <hr className="border-green-700 border-t-2 mb-4" />
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-2xl font-bold text-green-600">
                {product.price.toLocaleString()} تومان
              </p>
              <div className="flex space-x-1">
                {[...Array(4)].map((_, i) => (
                  <FaStar key={i} className="w-5 h-5 text-green-400" />
                ))}
                <FaStar className="w-5 h-5 text-gray-300" />
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">
              درباره محصول
            </h3>
            <p className="text-gray-600 text-sm md:text-base">
              {product.description}
            </p>
            <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
              <p className="font-semibold">
                زیر مجموعه: {product.subcategory.name}
              </p>
              <p className="font-semibold">
                دسته‌بندی: {product.category.name}
              </p>
              <p className="font-semibold">{product.brand} :برند</p>
              <p className="font-semibold">موجودی: {product.quantity} عدد</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button
              disabled={product.quantity === 0}
              className={`w-full sm:w-auto flex items-center justify-center gap-2 p-3 rounded-md transition duration-200 ${
                product.quantity > 0
                  ? "bg-green-800 text-white hover:bg-green-700"
                  : "bg-gray-400 text-gray-200 cursor-not-allowed"
              }`}
            >
              <IoBagAddOutline className="w-5 h-5" />
              {product.quantity > 0 ? "افزودن به سبد خرید" : "ناموجود"}
            </button>
            <div className="flex gap-3">
              <button className="p-3 bg-gray-100 rounded-md hover:bg-gray-200 transition">
                <FaRegHeart className="w-6 h-6 text-gray-600" />
              </button>
              <button className="p-3 bg-gray-100 rounded-md hover:bg-gray-200 transition">
                <IoInformationOutline className="w-6 h-6 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <Reviews />
    </div>
  );
};

export default ProductDetailsPage;

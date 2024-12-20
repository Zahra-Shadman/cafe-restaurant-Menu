"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation"; // Use useParams from next/navigation
import { ImageUrl } from "@/api/urls"; // Adjust the import based on your project structure
import { IcardProduct } from "@/components/menu-pages-component/ProductFetcher"; // Adjust the import based on your project structure
import { FaRegHeart } from "react-icons/fa";
import { IoBagAddOutline } from "react-icons/io5";
import { RiInformationLine } from "react-icons/ri";

const ProductDetailsPage: React.FC = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState<IcardProduct | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      if (id) {
        try {
          const response = await axios.get<IcardProduct>(
            `http://localhost:8000/api/products/${id}`
          ); // Adjust the API endpoint as needed
          setProduct(response.data);
        } catch (err) {
          setError("Failed to fetch product details");
          console.error(err);
        }
      }
    };

    fetchProductDetails();
  }, [id]);

  const handleAddToCart = (product: IcardProduct): void => {

    console.log("Adding to cart:", product);
  };

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-4">
      <div className="bg-slate-100 p-6 rounded-lg shadow-md text-center">
        <div className="flex justify-center items-center mx-auto mb-4">
          {product.images && product.images.length > 0 && (
            <img
              src={`${ImageUrl}${product.images[0]}`}
              alt={product.name}
              className="mx-auto mb-4"
            />
          )}
        </div>
        <h3 className="text-lg text-green-950 mb-2">{product.name}</h3>
        
        <p className="text-lg font-semibold text-gray-700 mb-4">
          {product.price} تومان
        </p>
        <p className="text-gray-600 text-center p-1 text-sm mb-4 overflow-hidden whitespace-nowrap text-ellipsis">
          {product.description && product.description.length > 0
            ? product.description.length > 30
              ? `${product.description.substring(0, 35)}...`
              : product.description
            : "No description available."}
        </p>
        <span className="rounded flex items-center justify-center gap-4 text-xs font-medium text-primary-800 mb-4">
          <FaRegHeart className="w-4 h-4" />
          <RiInformationLine className="w-5 h-6 " />
        </span>
        <div className="flex justify-center items-center">
          <button
            className="bg-greenbtn text-gray-200 w-46 flex items-center gap-2 mx-auto text-sm p-2 px-3 rounded-md hover:bg-green-950 transition duration-200"
            onClick={() => handleAddToCart(product)}
          >
            <IoBagAddOutline className="w-5 h-5 " /> افزودن به سبد خرید
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
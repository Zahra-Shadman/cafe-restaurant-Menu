import React, { useState, useEffect } from "react";
import axios from "axios";

// Define the types for the product and API response
export interface IcardProduct {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  brand: string;
  description: string;
  thumbnail: string;
  images: string[];
  // Add any other necessary properties here
}

export interface IcardApiRes {
  status: string;
  data: {
    products: IcardProduct[];
    total_pages: number;
  };
}

interface ProductFetcherProps {
  subcategoryId: string;
  categoryId: string; // Add categoryId prop
  limit?: number;
  onFetchSuccess: (products: IcardProduct[], totalPages: number) => void;
  onFetchError: (error: string) => void;
}

const ProductFetcher: React.FC<ProductFetcherProps> = ({
  subcategoryId,
  categoryId, // Receive categoryId as a prop
  limit = 9,
  onFetchSuccess,
  onFetchError,
}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const fetchProducts = async (page: number) => {
    setLoading(true);
    try {
      const response = await axios.get<IcardApiRes>(
        `http://localhost:8000/api/products?page=${page}&limit=${limit}&fields=-rating,-createdAt,-updatedAt,-__v&sort=price&quantity[gte]=8&subcategory=${subcategoryId}&category=${categoryId}` // Add categoryId to the URL
      );
      if (response.data.status === "success") {
        onFetchSuccess(response.data.data.products, response.data.data.total_pages);
      }
    } catch (err) {
      onFetchError("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage, subcategoryId, categoryId]); // Add subcategoryId and categoryId to dependencies

  if (loading) {
    return <div>Loading...</div>;
  }

  return null; // This component does not render anything itself
};

export default ProductFetcher;
'use client';

import React, { useState, useEffect } from 'react';
import { FaRegHeart, FaSortAlphaUp } from 'react-icons/fa';
import { LiaFilterSolid } from 'react-icons/lia';
import { MdAddShoppingCart, MdOutlineRemoveRedEye } from 'react-icons/md';
import { RiArrowDropDownLine } from 'react-icons/ri';
import NavForProduct from './product.page.navbar';
import ProductRate from './product.rate';

import axios from 'axios'; // Make sure to import axios
import Categories from './admin/get-categoryies';

// Define your types here
interface IProduct {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  images: string[];
}

interface IApiRes {
  status: string;
  data: {
    products: IProduct[];
  };
  total_pages: number;
}

export const GetProductsTable: React.FC = () => {
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

  return <ProductCard products={products} />;
};

const ProductCard: React.FC<{ products: IProduct[] }> = ({ products }) => {
  return (
    <div className="py-8 antialiased bg-gray-50 md:py-12">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        {/* <!-- Heading & Filters --> */}
        <div className="mb-4 items-end justify-between space-y-4 sm:flex sm:space-y-0 md:mb-8">
          <div>
            <NavForProduct />
            <Categories />
          </div>
          <div className="flex items-center space-x-4">
            <button data-modal-toggle="filterModal" data-modal-target="filterModal" type="button" className="flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 sm:w-auto">
              <LiaFilterSolid className="-ms-0.5 me-2 h-4 w-4" />
              Filters
              <FaSortAlphaUp className="-me-0.5 ms-2 h-4 w-4" />
            </button>
            <button id="sortDropdownButton1" data-dropdown-toggle="dropdownSort1" type="button" className="flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline none focus:ring-4 focus:ring-gray-100 sm:w-auto">
              Sort
              <RiArrowDropDownLine className="-me-0.5 ms-2 h-4 w-4" />
            </button>
          </div>
        </div>
        <div className="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <div key={product._id} className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <div className="h-56 w-full flex justify-center">
                {product.images && product.images.length > 0 && (
                  <img
                    src={`http://localhost:8000/images/products/images/${product.images[0]}`}
                    alt={product.name}
                    className=""
                  />
                )}
              </div>
              <div className="pt-6">
                <div className="mb-4 flex items-center justify-between gap-4">
                  <span className="me-2 rounded bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-800">Quantity: {product.quantity}</span>
                  <div className="flex items-center justify-end gap-1">
                    <button type="button" data-tooltip-target="tooltip-quick-look" className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900">
                      <MdOutlineRemoveRedEye className="h-5 w-5" />
                    </button>
                    <button type="button" data-tooltip-target="tooltip-add-to-favorites" className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900">
                      <FaRegHeart className="h-4 w-5" />
                    </button>
                  </div>
                </div>
                <a href="#" className="text-lg font-semibold leading-tight text-gray-900 hover:underline">{product.name}</a>
                <ProductRate />
                <ul className="mt-2 flex items-center gap-4">
                  <li className="flex items-center gap-2">
                    <p className="text-sm font-medium text-gray-500">Price: {product._id}</p>
                  </li>
                </ul>
               <div className="mt-4 flex items-center justify-between gap-4">
                   <p className="text-xl font-extrabold leading-tight  text-gray-900">
                   <span className='ml-2 '>تومان</span>
                   {product.price}
                   
                   </p>
                   
                   <button
                     type="button"
                     className="inline-flex items-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300"
                   >
                     <MdAddShoppingCart className="-ms-2 me-2 h-5 w-5" />
                     Add to cart
                   </button>
                 </div>
              </div>
            </div>
          ))}
          <div className="flex items-center space-x-4 rounded-b p-4 md:p-5">
            <button type="submit" className="rounded-lg bg-primary-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300">Show 50 results</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetProductsTable;
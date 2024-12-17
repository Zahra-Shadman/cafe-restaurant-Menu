"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  categoriesUrl,
  caticons,
  ImageUrl,
  subcategoriesUrl,
  subcategoriesUrltwo,
} from "@/api/urls";
import { ICategory, ISubcategory } from "@/types/category";
import ProductFetcher, {
  IcardProduct,
} from "@/components/menu-pages-component/ProductFetcher";
import { FaRegHeart } from "react-icons/fa";
import { IoBagAddOutline } from "react-icons/io5";
import { RiInformationLine } from "react-icons/ri";

const ProductsPage = () => {
  const [products, setProducts] = useState<IcardProduct[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [subcategories, setSubcategories] = useState<ISubcategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesResponse = await axios.get(`${categoriesUrl}`);
        const [subcategoriesResponseOne, subcategoriesResponseTwo] =
          await Promise.all([
            axios.get(`${subcategoriesUrl}`),
            axios.get(`${subcategoriesUrltwo}`),
          ]);

        setCategories(categoriesResponse.data.data.categories);

        const MixdSubcategories = [
          ...subcategoriesResponseOne.data.data.subcategories,
          ...subcategoriesResponseTwo.data.data.subcategories,
        ];

        setSubcategories(MixdSubcategories);
      } catch (err) {
        console.error("Failed to fetch categories or subcategories", err);
      }
    };

    fetchData();
  }, []);

  const handleFetchSuccess = (fetchedProducts: IcardProduct[]) => {
    setProducts(fetchedProducts);
  };

  const handleFetchError = (error: string) => {
    setError(error);
  };

  function handleAddToCart(product: IcardProduct): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="md:py-8 mx-auto max-w-full px-4">
      <h1 className="text-2xl text-center p-2 font-light">
        مشاهده منو
        <span className="text-green-600 font-bold block mt-2">
          _____________________________________________________________________________________________________________________
        </span>
      </h1>
      <div className="mb-4">
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((category) => (
            <button
              key={category._id}
              className="text-gray-800 p-4 font-semibold rounded-full hover:text-green-600"
              onClick={() => {
                setSelectedCategory(category._id);
                setSelectedSubcategory(null);
                setProducts([]);
              }}
            >
              <div className="flex flex-col items-center">
                <img
                  src={`${caticons}${category.icon}`}
                  alt={category.name}
                  className="w-12 mb-1"
                />
                <span className="text-sm">{category.name}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
      {selectedCategory && (
        <div className="mb-4">
          <div className="flex flex-wrap justify-center gap-4">
            {subcategories
              .filter((sub) => sub.category === selectedCategory)
              .map((subcategory) => (
                <button
                  key={subcategory._id}
                  className="text-gray-800 px-4 py-2 rounded-full hover:text-green-600"
                  onClick={() => {
                    setSelectedSubcategory(subcategory._id);
                    setProducts([]);
                  }}
                >
                  {subcategory.name}
                </button>
              ))}
          </div>
        </div>
      )}

      {selectedSubcategory && selectedCategory && (
        <ProductFetcher
          subcategoryId={selectedSubcategory}
          categoryId={selectedCategory}
          onFetchSuccess={handleFetchSuccess}
          onFetchError={handleFetchError}
        />
      )}

      <div>
        {error && <p className="text-red-500">{error}</p>}
        <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {products.map(( product) => (
            <div
              key={product._id}
              className="bg-slate-100 p-3 rounded-lg shadow-md text-center"
            >
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
                {product.description.length > 30
                  ? `${product.description.substring(0, 35)}...`
                  : product.description}
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
          ))}
        </div>
      </div>
    </div>
  );
};
export default ProductsPage;
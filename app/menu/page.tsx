"use client";

import { useEffect, useState } from "react";
import { ImageUrl, subcategoriesUrl } from "@/api/urls";
import { ISubcategory } from "@/types/category";
import ProductFetcher, {
  IcardProduct,
} from "@/components/MENU-CMP/ProductFetcher";
import { FaRegHeart } from "react-icons/fa";
import { IoBagAddOutline } from "react-icons/io5";
import { RiInformationLine } from "react-icons/ri";
import GetDefultProduct from "../../components/PRODUCT-CMP/ProductDefult";
import Link from "next/link";
import axios from "axios";
import CategorySubcategorySelector from "@/components/CATEGORY-SUBCATEGORY/getterForMenu";
import Skeleton from "@/components/SKETELONS/skeletonForMenu";

const ProductsPage = () => {
  const [products, setProducts] = useState<IcardProduct[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [defaultProductVisible, setDefaultProductVisible] = useState(true);
  const [subcategories, setSubcategories] = useState<ISubcategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleCategoryChange = async (categoryId: string | null) => {
    setSelectedCategory(categoryId);
    setSelectedSubcategory(null);
    setDefaultProductVisible(true);

    if (categoryId) {
      try {
        const response = await axios.get(subcategoriesUrl(categoryId));
        setSubcategories(response.data.data.subcategories);
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      }
    } else {
      setSubcategories([]);
    }
  };

  const handleSubcategoryChange = (subcategoryId: string | null) => {
    setSelectedSubcategory(subcategoryId);
    setDefaultProductVisible(subcategoryId === null);
  };

  const handleFetchSuccess = (fetchedProducts: IcardProduct[]) => {
    setProducts(fetchedProducts);
  };

  const handleFetchError = (error: string) => {
    setError(error);
  };

  if (loading) {
    return <Skeleton />;
  }

  return (
    <div className="md:py-8 mx-auto max-w-full px-4">
      <h1 className="text-2xl text-center p-2 font-semibold text-gray-700">
        مشاهده منو
        <span className="text-green-600 font-bold block mt-2">
          _____________________________________________________________________________________________________________________
        </span>
      </h1>

      <CategorySubcategorySelector
        onCategoryChange={handleCategoryChange}
        onSubcategoryChange={handleSubcategoryChange}
      />

      {defaultProductVisible ? (
        <GetDefultProduct />
      ) : (
        selectedSubcategory &&
        selectedCategory && (
          <ProductFetcher
            subcategoryId={selectedSubcategory}
            categoryId={selectedCategory}
            onFetchSuccess={handleFetchSuccess}
            onFetchError={handleFetchError}
          />
        )
      )}

      <div>
        {error && <p className="text-red-500">{error}</p>}
        <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {products.map((product) => (
            <Link key={product._id} href={`/menu/${product._id}`}>
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
                <h3 className="text-lg text-green-950 mb-2">{product.name}</h3>
                <p className="text-lg font-semibold text-green-800  mb-4">
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
                  <button className="bg-greenbtn text-gray-200 w-46 flex items-center gap-2 mx-auto text-sm p-2 px-3 rounded-md hover:bg-green-950 transition duration-200">
                    <IoBagAddOutline className="w-5 h-5 " /> افزودن به سبد خرید
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;

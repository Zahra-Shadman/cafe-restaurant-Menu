"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  categoriesUrl,
  subcategoriesUrl,
  subcategoriesUrltwo,
} from "@/api/urls";
import { ICategory, ISubcategory } from "@/types/category";
import ProductFetcher, {
  IcardProduct,
} from "@/components/menu-pages-component/ProductFetcher";

interface CatSelectorProps {
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  setSubcategory: React.Dispatch<React.SetStateAction<string>>;
}

const CatSelector: React.FC<CatSelectorProps> = ({
  setCategory,
  setSubcategory,
}) => {
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

        const mixedSubcategories = [
          ...subcategoriesResponseOne.data.data.subcategories,
          ...subcategoriesResponseTwo.data.data.subcategories,
        ];

        setSubcategories(mixedSubcategories);
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

  return (
    <div className="mx-auto max-w-full flex gap-2">
      <div>
        <label htmlFor="category-select" className="block mb-2">
          انتخاب مجموعه
        </label>
        <select
          id="category-select"
          value={selectedCategory || "slug"}
          onChange={(e) => {
            const categoryId = e.target.value;
            setSelectedCategory(categoryId);
            setSelectedSubcategory(null);
            setProducts([]);
            setCategory(categoryId);
          }}
          className="border bg-slate-50 rounded-lg p-2"
        >
          <option disabled>انتخاب مجموعه</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {selectedCategory && (
        <div className="mb-4">
          <label className="block mb-2">انتخاب زیر مجموعه</label>
          <select
            value={selectedSubcategory || ""}
            onChange={(e) => {
              const subcategoryId = e.target.value;
              setSelectedSubcategory(subcategoryId);
              setProducts([]);
              setSubcategory(subcategoryId);
            }}
            className="border bg-slate-50 rounded-lg p-2"
          >
            <option disabled>انتخاب زیر مجموعه</option>
            {subcategories
              .filter((sub) => sub.category === selectedCategory)
              .map((subcategory) => (
                <option key={subcategory._id} value={subcategory._id}>
                  {subcategory.name}
                </option>
              ))}
          </select>
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
    </div>
  );
};

export default CatSelector;

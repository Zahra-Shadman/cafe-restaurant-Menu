import React, { useEffect, useState } from "react";
import axios from "axios";
import { categoriesUrl, subcategoriesUrl } from "@/api/urls";

interface CategorySubcategorySelectorProps {
  onCategoryChange: (categoryId: string | null) => void;
  onSubcategoryChange: (subcategoryId: string | null) => void;
}

const CategorySubcategorySelector: React.FC<
  CategorySubcategorySelectorProps
> = ({ onCategoryChange, onSubcategoryChange }) => {
  const [categories, setCategories] = useState<any[]>([]);
  const [subcategories, setSubcategories] = useState<any[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null
  );
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState<
    string | null
  >(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(categoriesUrl);
        if (
          response.data.status === "success" &&
          Array.isArray(response.data.data.categories)
        ) {
          setCategories(response.data.data.categories);
        } else {
          console.error("Expected an array but got:", response.data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const categoryId = event.target.value;
    setSelectedCategoryId(categoryId);
    setSelectedSubcategoryId(null);
    onCategoryChange(categoryId);

    if (categoryId) {
      try {
        const response = await axios.get(subcategoriesUrl(categoryId));
        if (
          response.data.status === "success" &&
          Array.isArray(response.data.data.subcategories)
        ) {
          setSubcategories(response.data.data.subcategories);
        } else {
          console.error("Expected an array but got:", response.data);
        }
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      }
    } else {
      setSubcategories([]);
      onSubcategoryChange(null);
    }
  };

  const handleSubcategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const subcategoryId = event.target.value;
    setSelectedSubcategoryId(subcategoryId);
    onSubcategoryChange(subcategoryId);
  };

  return (
    <div>
      <h1 className="py-1 font-medium">دسته بندی</h1>

      <section className="flex flex-row gap-3">
        <div>
          <select
            className="p-2 border rounded-lg bg-gray-50"
            id="category-select"
            onChange={handleCategoryChange}
            value={selectedCategoryId || ""}
          >
            <option value="">انتخاب مجموعه</option>
            {Array.isArray(categories) &&
              categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
          </select>
        </div>

        <div>
          <label htmlFor="subcategory-select"></label>
          <select
            className="p-2 border rounded-lg bg-gray-50"
            id="subcategory-select"
            onChange={handleSubcategoryChange}
            value={selectedSubcategoryId || ""}
            disabled={!selectedCategoryId}
          >
            <option value="">نتخاب زیر مجموعه</option>
            {Array.isArray(subcategories) &&
              subcategories.map((subcategory) => (
                <option key={subcategory._id} value={subcategory._id}>
                  {subcategory.name}
                </option>
              ))}
          </select>
        </div>
      </section>
    </div>
  );
};

export default CategorySubcategorySelector;
 
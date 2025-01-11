import React, { useEffect, useState } from "react";
import axios from "axios";
import { categoriesUrl, caticons, subcategoriesUrl } from "@/api/urls";
import { ICategory } from "@/types/category";

interface CategorySubcategorySelectorProps {
  onCategoryChange: (categoryId: string | null) => void;
  onSubcategoryChange: (subcategoryId: string | null) => void;
}

const CategorySubcategorySelector: React.FC<
  CategorySubcategorySelectorProps
> = ({ onCategoryChange, onSubcategoryChange }) => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [subcategories, setSubcategories] = useState<ICategory[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null
  );

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
          console.error("err", response.data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryChange = async (categoryId: string) => {
    setSelectedCategoryId(categoryId);
    onCategoryChange(categoryId);
    onSubcategoryChange(null);

    if (categoryId) {
      try {
        const response = await axios.get(subcategoriesUrl(categoryId));
        if (
          response.data.status === "success" &&
          Array.isArray(response.data.data.subcategories)
        ) {
          setSubcategories(response.data.data.subcategories);
        } else {
          console.error("ree", response.data);
        }
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      }
    } else {
      setSubcategories([]);
    }
  };

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-4 mb-4">
        {categories.map((category) => (
          <button
            key={category._id}
            className="text-gray-800 p-4 font-semibold rounded-full hover:text-green-600"
            onClick={() => handleCategoryChange(category._id)}
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

      {selectedCategoryId && subcategories.length > 0 && (
        <div className="flex flex-wrap justify-center gap-4">
          {subcategories.map((subcategory) => (
            <button
              key={subcategory._id}
              className="text-gray-800 px-4 py-2 rounded-full hover:text-green-600"
              onClick={() => onSubcategoryChange(subcategory._id)}
            >
              {subcategory.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategorySubcategorySelector;

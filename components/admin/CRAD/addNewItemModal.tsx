import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import CategorySubcategorySelector from "@/components/CATEGORY-SUBCATEGORY/subcategoty.getter";

import { z } from "zod";
import { productSchema } from "@/lib/validation";

interface AddItemsModelProps {
  onProductAdded: (newProduct: any) => void;
}

const AddItemsModel: React.FC<AddItemsModelProps> = ({ onProductAdded }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [category, setCategory] = useState<string | null>(null);
  const [subcategory, setSubcategory] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<File | null>(null);

  const notifySuccess = () => toast("Product added successfully!");
  const notifyUnSuccess = () =>
    toast("Failed to add product. Please try again.");
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleCategoryChange = (categoryId: string | null) => {
    setCategory(categoryId);
  };

  const handleSubcategoryChange = (subcategoryId: string | null) => {
    setSubcategory(subcategoryId);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const productData = {
      category,
      subcategory,
      name,
      price,
      quantity,
      brand,
      description,
      images,
    };

    try {
      productSchema.parse(productData);

      const formData = new FormData();
      formData.append("category", category || "");
      formData.append("subcategory", subcategory || "");
      formData.append("name", name);
      formData.append("price", price.toString());
      formData.append("quantity", quantity.toString());
      formData.append("brand", brand);
      formData.append("description", description);
      if (images) {
        formData.append("images", images);
      }

      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.post(
        "http://localhost:8000/api/products",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      notifySuccess();
      onProductAdded(response.data);
      toggleModal();
    } catch (err) {
      if (err instanceof z.ZodError) {
        err.errors.forEach((error) => {
          toast.error(error.message);
        });
      } else {
        console.error(notifyUnSuccess, err);
      }
    }
  };

  return (
    <div>
      <button
        onClick={toggleModal}
        className="block text-white w-46 bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        type="button"
      >
        افزودن محصول جدید
      </button>

      <div
        className={`${
          isOpen ? "fixed" : "hidden"
        } top-0 right-0 left-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50`}
      >
        <div className="relative p-4 w-full max-w-[730px] max-h-full">
          <div className="relative bg-white rounded-lg shadow">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
              <h3 className="text-lg font-semibold text-gray-900 ">
                افزودن محصول جدید
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w -8 h-8 ms-auto inline-flex justify-center items-center"
                onClick={toggleModal}
              >
                ×<span className="sr-only">Close modal</span>
              </button>
            </div>

            <form className="p-4 md:p-5" onSubmit={handleSubmit}>
              <div className="grid gap-4 mb-4 grid-cols-2">
                <div className="col-span-2">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    نام محصول
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="brand"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    برند
                  </label>
                  <input
                    type="text"
                    name="brand"
                    id="brand"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="price"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    قیمت
                  </label>
                  <input
                    type="number"
                    name="price"
                    id="price"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 mt-3"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                  />
                </div>
                <div className="flex">
                  <label
                    htmlFor="category"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  ></label>
                  <CategorySubcategorySelector
                    onCategoryChange={handleCategoryChange}
                    onSubcategoryChange={handleSubcategoryChange}
                  />
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="description"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    توضیحات
                  </label>
                  <textarea
                    id="description"
                    className="block p-2.5 caret-green-500  w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Write product description here"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="quantity"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    تعداد موجودی
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    id="quantity"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="Enter quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                  />
                </div>
              </div>
              <div>
                <input
                  type="file"
                  name="images"
                  id="images"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600  border-primary-600 block w-full p-2.5"
                  onChange={(e) => {
                    if (e.target.files) {
                      setImages(e.target.files[0]);
                    }
                  }}
                />
              </div>
              <button
                onClick={toggleModal}
                type="submit"
                className="text-white inline-flex mt-4  items-center bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                افزودن
              </button>
            </form>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default AddItemsModel;

"use client";

import React, { useState, useEffect } from "react";
import CatSelector from "./cat-subcat-selector";
import axios from "axios";
import {
  categoriesUrl,
  subcategoriesUrl,
  subcategoriesUrltwo,
} from "@/api/urls";
import { ICategory, ISubcategory } from "@/types/category";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";


interface AddItemsModelProps {
  onProductAdded: () => void;
}

const AddItemsModel: React.FC<AddItemsModelProps> = ({ onProductAdded }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [subcategories, setSubcategories] = useState<ISubcategory[]>([]);
  const router = useRouter();

  const notifySuccess = () => toast("Product added successfully!");

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("category", category);
    formData.append("subcategory", subcategory);
    formData.append("name", name);
    formData.append("price", price.toString());
    formData.append("quantity", quantity.toString());
    formData.append("brand", brand);
    formData.append("description", description);
    if (images) {
      formData.append("images", images);
    }

    try {
      const accessToken = sessionStorage.getItem("accessToken");
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
      onProductAdded();
      toggleModal();
    } catch (err) {
      setError("Failed to add product. Please try again.");
      console.error("Error adding product:", err);
    }
  };

  useEffect(() => {
    const checkTokenExpiration = () => {
      const accessToken = sessionStorage.getItem("accessToken");
      if (accessToken) {
        const tokenPayload = JSON.parse(atob(accessToken.split(".")[1]));
        const isExpired = Date.now() >= tokenPayload.exp * 1000;

        if (isExpired) {
          router.push("/admin");
          sessionStorage.removeItem("accessToken");
          sessionStorage.removeItem("refreshToken");
        }
      }
    };

    checkTokenExpiration();
  }, [router]);

  useEffect(() => {
    const fetchCatData = async () => {
      try {
        const categoriesResponse = await axios.get(categoriesUrl);
        const [subcategoriesResponseOne, subcategoriesResponseTwo] =
          await Promise.all([
            axios.get(subcategoriesUrl),
            axios.get(subcategoriesUrltwo),
          ]);

        setCategories(categoriesResponse.data.data.categories);

        const mixedSubcategories: ISubcategory[] = [
          ...subcategoriesResponseOne.data.data.subcategories,
          ...subcategoriesResponseTwo.data.data.subcategories,
        ];

        setSubcategories(mixedSubcategories);
      } catch (err) {
        console.error("Failed to fetch categories or subcategories", err);
      }
    };

    fetchCatData();
  }, []);

  return (
    <div>
      <button
        onClick={toggleModal}
        className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
      >
        Add New Product
      </button>
      {isOpen && (
        <div className="fixed top-0 right-0 left-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
          <div className="relative p-4 w-full max-w-[730px] max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Add New Product
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
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
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="col-span-2">
                    <label
                      htmlFor="brand"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Brand
                    </label>
                    <input
                      type="text"
                      name="brand"
                      id="brand"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label
                      htmlFor="price"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Price
                    </label>
                    <input
                      type="number"
                      name="price"
                      id="price"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 mt-3 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      value={price}
                      onChange={(e) => setPrice(Number(e.target.value))}
                    />
                  </div>
                  <div className="flex">
                    <label
                      htmlFor="category"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    ></label>
                    <CatSelector
                      setCategory={setCategory}
                      setSubcategory={setSubcategory}
                    />
                  </div>
                  <div className="col-span-2">
                    <label
                      htmlFor="description"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Description
                    </label>
                    <textarea
                      id=" description"
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Write product description here"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                  </div>
                  <div className="col-span-2">
                    <label
                      htmlFor="quantity"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Quantity
                    </label>
                    <input
                      type="number"
                      name="quantity"
                      id="quantity"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
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
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    onChange={(e) => {
                      if (e.target.files) {
                        setImages(e.target.files[0]);
                      }
                    }}
                  />
                </div>
                <button
                  type="submit"
                  className="text-white inline-flex mt-4 items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Add
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
      {error && <p className="text-red-500">{error}</p>}
      <ToastContainer />
    </div>
  );
};

export default AddItemsModel;

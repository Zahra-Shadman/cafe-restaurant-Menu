import { useState } from "react";
import axios from "axios";
import { RiErrorWarningLine } from "react-icons/ri";

interface EditModalProps {
  Id: string;
}

export default function EditModal({ Id }: EditModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
    price: 0,
    description: "",
  });

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      const response = await axios.patch(
        `http://localhost:8000/api/products/${Id}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Product updated successfully:", response.data);
      toggleModal();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div>
      <div className="flex justify-center p-1">
        <button
          onClick={toggleModal}
          className="block text-gray-200  bg-green-800 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          type="button"
        >
          ویرایش اطلاعات
        </button>
      </div>

      {isOpen && (
        <div
          aria-hidden="true"
          className="fixed flex  top-0 right-0 left-0  justify-center items-center w-full h-full overflow-y-auto overflow-x-hidden bg-black bg-opacity-50"
        >
          <div className="relative p-4 w-full max-w-2xl h-full md:h-auto ">
            <div className="relative p-4 bg-white rounded-lg shadow  dark:bg-gray-800 sm:p-5">
              <div className="flex justify-between items-center  pb-4 mb-4 rounded-t border-b sm:mb-5">
                <h3 className=" font-semibold  text-gray-900">
                  <span className="ml-52"> ویرایش اطلاعات محصول</span>
                </h3>
                <button
                  type="button"
                  onClick={toggleModal}
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                >
                  x
                </button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4 mb-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      نام محصول
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="brand"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      موجودی محصول
                    </label>
                    <input
                      type="number"
                      name="quantity"
                      id="quantity"
                      value={formData.quantity}
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="price"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      قیمت محصول
                    </label>
                    <input
                      type="number"
                      name="price"
                      id="price"
                      value={formData.price}
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    />
                  </div>
                  <h1 className="flex flex-row gap-1 w-[600px] mt-6 p-2">
                    قیمت جدید محصول به تومان را وارد کنید
                    <RiErrorWarningLine className="mt-1 w-5 h-5 " />
                  </h1>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="description"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      توضیحات محصول
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                    ></textarea>
                  </div>
                  <div className=" ml-56 w-40 ">
                    <button
                      type="submit"
                      className="text-white bg-purple-800 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                      آپدیت اطلاعات
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

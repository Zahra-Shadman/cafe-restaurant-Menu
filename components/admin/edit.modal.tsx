"use client";

import { IProduct } from "@/types/product";
import { useState } from "react";

export const EditModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  product: IProduct;
  onSave: (updatedProduct: IProduct) => void;
}> = ({ isOpen, onClose, product, onSave }) => {
  const [price, setPrice] = useState<number>(product.price);
  const [quantity, setQuantity] = useState<number>(product.quantity);

  const handleSave = () => {
    onSave({ ...product, price, quantity });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <h2 className="text-lg font-bold text-center">Edit Product</h2>
        <div className="p-2 flex justify-center ">
          <label>
              قیمت: 
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="border border-gray-300 rounded-md p-2 ml-2 w-[208px]"
            />
          </label>
        </div>
        <div className="mt-4">
          <label>
            موجودی:
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="border rounded-md border-gray-300 p-2 ml-2 "
            />
          </label>
        </div>
        <div className="py-3 flex justify-center gap-4">
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white p-2 rounded-lg px-5"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="bg-red-500 text-white p-2 rounded-lg px-5"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

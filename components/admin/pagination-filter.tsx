
import { IApiRes } from '@/types/api';
import { IProduct } from '@/types/category';
import { useEffect, useState } from 'react';
import { LiaEdit } from 'react-icons/lia';
import { MdDelete } from 'react-icons/md';
import Image from 'next/image';

const ProductsTable = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const limit = 4;

  const fetchProducts = async (page: number) => {
    const response = await fetch(`http://localhost:8000/api/products?page=${page}&limit=${limit}&fields=-rating,-createdAt,-updatedAt,-__v&sort=price&quantity[gte]=8`);
    const data: IApiRes = await response.json();
    if (data.status === 'success') {
      setProducts(data.data.products);
      setTotalPages(data.total_pages);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  const handleEditClick = (product: IProduct) => {

    console.log('Edit product:', product);
  };

  const handleDeleteClick = (productId: string) => {

    console.log('Delete product with ID:', productId);
  };

  return (
    <div>
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Image</th>
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Price</th>
            <th className="border border-gray-300 p-2">Quantity</th>
            <th className="border border-gray-300 p-2">Brand</th>
            <th className="border border-gray-300 p-2">ID</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td className="border border-gray-300 p-2">
                <div className="flex justify-center">
                  {product.images && product.images.length > 0 && (
                    <Image
                      src={`http://localhost:8000/images/products/images/${product.images[0]}`}
                      alt={product.name}
                      width={170}
                      height={170}
                      className="rounded-md w-32 h-24"
                    />
                  )}
                </div>
              </td>
              <td className="border border-gray-300 p-2">{product.name}</td>
              <td className="border border-gray-300 p-2">
                {product.price}
                <button
                  onClick={() => handleEditClick(product)}
                  className="ml-2 text-blue-500"
                >
                  <LiaEdit />
                </button>
              </td>
              <td className="border border-gray-300 p-2">
                {product.quantity}
                <button
                  onClick={() => handleEditClick(product)}
                  className="ml-2 text-blue-700"
                >
                  <LiaEdit />
                </button>
              </td>
              <td className="border border-gray-300 p-2">{product.brand}</td>
              <td className="border border-gray-300 p-2">{product._id}</td>
              <td className="border border-gray-300 p-2">
                <button
                  onClick={() => handleDeleteClick(product._id)}
                  className="text-red-500"
                >
                  <MdDelete className="w-6 h-6" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="self-center mx-2">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductsTable; 
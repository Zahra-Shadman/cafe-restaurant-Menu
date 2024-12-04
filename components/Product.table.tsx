import { FiEdit } from "react-icons/fi";
import { MdMoreVert } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";

export default function AdminProductTable() {
  return (
    <div className="flex justify-center">
      <div className="overflow-x-auto w-full max-w-6xl"> {/* Set max width for the table */}
        <div className="py-10 px-4">
          <div className="overflow-hidden">
            <table className="min-w-full rounded-xl">
              <thead>
                <tr className="bg-gray-50">
                  <th scope="col" className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize rounded-t-xl"> id </th>
                  <th scope="col" className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"> name </th>
                  <th scope="col" className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"> category </th>
                  <th scope="col" className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"> subcategory </th>
                  <th scope="col" className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize rounded-t-xl"> Actions </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-300">
                <tr className="bg-white transition-all duration-500 hover:bg-gray-50">
                  <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900"> Louis Vuitton</td>
                  <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900"> 20010510 </td>
                  <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900"> Customer</td>
                  <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900"> Accessories</td>
                  <td className="p-5">
                    <div className="flex items-center gap-1">
                      <button className="p-2 rounded-full group transition-all duration-500 flex item-center">
                        <FiEdit className="cursor-pointer text-blue-600" />
                      </button>
                      <button className="p-2 rounded-full group transition-all duration-500 flex item-center">
                        <RiDeleteBin6Line className="cursor-pointer text-red-700" />
                      </button>
                      <button className="p-2 rounded-full group transition-all duration-500 flex item-center">
                        <MdMoreVert />
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
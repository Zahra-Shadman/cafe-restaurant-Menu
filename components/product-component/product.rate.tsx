"use claint";

import { FaStar } from "react-icons/fa";

export default function ProductRate() {
  return (
    <div className="mt-2 flex items-center gap-2">
      <div className="flex items-center">
        <FaStar className="h-4 w-4 text-yellow-400" />
        <FaStar className="h-4 w-4 text-yellow-400" />
        <FaStar className="h-4 w-4 text-yellow-400" />
        <FaStar className="h-4 w-4 text-yellow-400" />
        <FaStar className="h-4 w-4 text-yellow-400" />
      </div>
      <p className="text-sm font-medium text-gray-900">5.0</p>
      <p className="text-sm font-medium text-gray-500">(455)</p>
    </div>
  );
}

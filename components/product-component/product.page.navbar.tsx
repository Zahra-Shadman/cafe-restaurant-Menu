"use client";

import Link from "next/link";
import { AiFillHome } from "react-icons/ai";
import { FaChevronRight } from "react-icons/fa";

export default function NavForProduct() {
  return (
    <nav
      className="fixed top-0 right-0 w-full p-4 bg-white flex items-center justify-between"
      aria-label="Breadcrumb"
    >
      <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
        <li className="inline-flex items-center">
          <Link href={"/"}>
            <button className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-primary-600">
              <AiFillHome className="me-2.5 h-4 w-3" /> خانه
            </button>
          </Link>
        </li>
        <li>
          <div className="flex items-center">
            <FaChevronRight className="h-5 w-5 text-gray-400 rtl:rotate-180" />
            <a
              href="/menu"
              className="ms-1 text-sm font-medium text-gray-700 hover:text-primary-600 md:ms-2"
            >
              منو
            </a>
          </div>
        </li>
        <li aria-current="page">
          <div className="flex items-center">
            <FaChevronRight className="h-5 w-5 text-gray-400 rtl:rotate-180" />
            <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2"></span>
          </div>
        </li>
      </ol>
    </nav>
  );
}

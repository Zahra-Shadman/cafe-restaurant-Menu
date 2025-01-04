"use client";

import { FaRegHeart } from "react-icons/fa";
import CartIcon from "../card.icon";
import { IoPersonCircleOutline } from "react-icons/io5";
import Image from "next/image";

export default function NavForProduct() {
  return (
    <>
      <nav className=" h-[80px] text-white fixed w-full z-10">
        <div className="flex justify-between items-center h-full px-5 xl:px-12 max-w-screen-xl mx-auto">
          <a className="flex items-center h-full" href="#">
            <Image
              src={"/Screenshot%202024-12-27%20144726.svg"}
              alt={"logo"}
              width={200}
              height={90}
              style={{ objectFit: "contain" }}
              className="max-h-full"
            />
          </a>

          <div className="hidden xl:flex items-center space-x-5">
            <a
              className="text-gray-900 hover:text-gray-600 flex items-center"
              href="#"
            >
              <FaRegHeart className="h-5 w-5" />
            </a>
            <a
              className="flex items-center  hover:text-gray-600 relative"
              href="#"
            >
              <CartIcon />
            </a>

            <a className="flex items-center text-gray-900 " href="#">
              <IoPersonCircleOutline className="h-6 w-6" />
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}

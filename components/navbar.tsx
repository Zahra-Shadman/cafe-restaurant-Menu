"use client";

import React, { useState } from "react";
import { LuPizza } from "react-icons/lu";
import { AiOutlineLogin } from "react-icons/ai";
import { RiAdminLine } from "react-icons/ri";
import { TbMessageCircleQuestion } from "react-icons/tb";
import Image from "next/image";
import { HiMenu, HiX } from "react-icons/hi";
import { FaSearch } from "react-icons/fa";
import Link from "next/link";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header
      className={`h-20 px-4 py-4 mx-auto flex flex-col md:flex-row items-center justify-between relative ${
        isOpen ? "fixed top-0 left-0 right-0 bg-white z-50" : ""
      }`}
    >
      <div className="flex items-center w-full md:w-52 mb-2 md:mb-0">
        <div className="relative w-full">
          <input
            className="w-full rounded-md text-center p-2 pl-10"
            type="text"
            placeholder="محصول مورد نظر خود را وارد کنید"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>
        <button onClick={toggleMenu} className="text-gray-800 md:hidden ml-2">
          {isOpen ? (
            <HiX className="w-6 h-6" />
          ) : (
            <HiMenu className="w-6 h-6" />
          )}
        </button>
      </div>
      <Image
        src={"/Shake_Shack_logo.svg"}
        alt={"logo"}
        width={170}
        height={0}
      />

      <section
        className={`flex-col gap-2 md:flex-row md:flex md:items-center md:gap-3 text-gray-800 absolute md:static bg-white md:bg-transparent w-full md:w-auto transition-all duration-300 ease-in-out ${
          isOpen ? "flex" : "hidden"
        } md:flex`}
      >
        {isOpen && (
          <button
            onClick={toggleMenu}
            className="absolute top-4 right-4 text-gray-800 md:hidden"
          >
            <HiX className="w-6 h-6" />
          </button>
        )}

        <Link href={"/About-us"}>
          <button className="flex items-center justify-center shadow-md text-gray-500 hover:text-greentext font-semibold transition duration-500 ease-in-out hover:border-b-greenbtn border border-b-2 p-2 rounded-md text-sm w-full md:w-auto">
            <TbMessageCircleQuestion className="w-5 h-5" />
            درباه ما
          </button>
        </Link>
        <Link href={"/Login-user"}>
          <button className="flex items-center justify-center shadow-md text-gray-500 hover:text-greentext font-semibold transition duration-500 ease-in-out hover:border-b-greenbtn border border-b-2 p-2 rounded-md text-sm w-full md:w-auto">
            <AiOutlineLogin className="w-5 h-5" />
            ورود/ ثبت نام
          </button>
        </Link>
        <Link href={"/Admin"}>
          <button className="flex items-center justify-center shadow-md text-gray-500 hover:text-greentext font-semibold transition duration-500 ease-in-out hover:border-b-greenbtn border border-b-2 p-2 rounded-md text-sm w-full md:w-auto">
            <RiAdminLine className="w-5 h-5" />
            پنل ادمین
          </button>
        </Link>
        <Link href={"/Product"}>
          <button className="flex items-center justify-center shadow-md text-gray-500 hover:text-greentext font-semibold transition duration-500 ease-in-out hover:border-b-greenbtn border border-b-2 p-2 rounded-md text-sm w-full md:w-auto">
            <LuPizza className="w-5 h-5" />
            منو
          </button>
        </Link>
        <Link href={"/Shop"}></Link>
      </section>
    </header>
  );
}

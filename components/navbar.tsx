"use client";

import React, { useState } from "react";
import { LiaShoppingBagSolid } from "react-icons/lia";
import { AiOutlineLogin } from "react-icons/ai";
import { RiAdminLine } from "react-icons/ri";
import { TbMessageCircleQuestion } from "react-icons/tb";
import { TbPerfume } from "react-icons/tb";
import { HiMenu, HiX } from "react-icons/hi";
import { FaSearch } from "react-icons/fa";
import Link from "next/link";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-node h-20 px-4 py-4 mx-auto flex flex-col md:flex-row items-center justify-between relative">
      <div className="relative w-full md:w-52 mb-2 md:mb-0 md:text-[10px] lg:text-sm lg:w-72 ">
        <input
          className="w-full rounded-md text-center p-2 pl-10"
          type="text"
          placeholder="محصول مورد نظر خود را وارد کنید"
        />
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
      </div>
      <div className="md:hidden">
        <button onClick={toggleMenu} className="text-gray-800">
          {isOpen ? (
            <HiX className="w-6 h-6" />
          ) : (
            <HiMenu className="w-6 h-6" />
          )}
        </button>
      </div>
      <section
        className={`flex-col gap-2 md:flex-row md:flex md:items-center md:gap-3 text-gray-800 absolute md:static bg-white md:bg-transparent w-full md:w-auto transition-all duration-300 ease-in-out ${
          isOpen ? "flex" : "hidden"
        } md:flex`}
      >
        <Link href={"/About-us"}>
          <button className="bg-milky p-2 rounded-md text-sm font-semibold flex items-center gap-1">
            <TbMessageCircleQuestion className="w-5 h-5" />
            درباه ما
          </button>
        </Link>
        <Link href={"/Login-user"}>
          <button className="bg-milky p-2 rounded-md text-sm font-semibold flex items-center gap-1">
            <AiOutlineLogin className="w-5 h-5" />
            ورود/ ثبت نام
          </button>
        </Link>
        <Link href={"/Admin"}>
          <button className="bg-milky p-2 rounded-md text-sm font-semibold flex items-center gap-1">
            <RiAdminLine className="w-5 h-5" />
            پنل ادمین
          </button>
        </Link>
        <Link href={"/Product"}>
          <button className="bg-milky p-2 rounded-md text-sm font-semibold flex items-center gap-1">
            <TbPerfume className="w-5 h-5" />
            محصولات
          </button>
        </Link>
        <Link href={"/Shop"}>
          <button className="bg-milky p-2 rounded-md text-sm font-semibold flex items-center gap-1">
            <LiaShoppingBagSolid className="w-5 h-5" />
            سبد خرید
          </button>
        </Link>
        <button onClick={toggleMenu} className="mt-2 text-gray-800 md:hidden">
          <HiX className="w-6 h-6" />
        </button>
      </section>
    </header>
  );
}

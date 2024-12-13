"use client";

import React, { useState } from "react";
import Image from "next/image";
import { HiMenu, HiX } from "react-icons/hi";
import Link from "next/link";
import { SearshInput } from "./search-input";
import { RiArrowDropDownLine } from "react-icons/ri";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header
      className={`h-20 px-4 py-4 mx-auto flex flex-col md:flex-row items-center justify-between relative ${
        isOpen ? "fixed top-0 left-0 right-0 bg-white z-50" : ""
      }`}
    >
      <div className="flex items-center w-full md:w-52 mb-2 md:mb-0">
        <SearshInput />
        <button onClick={toggleMenu} className="text-gray-800 md:hidden ml-2">
          {isOpen ? (
            <HiX className="w-6 h-6" />
          ) : (
            <HiMenu className="w-6 h-6" />
          )}
        </button>
      </div>
      <Image
        className="lg:ml-32 flex"
        src={"/lucent-cafe.svg"}
        alt={"logo"}
        width={160}
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
            className="flex justify-center text-gray-800 md:hidden flex-col-reverse"
          >
            <HiX className="w-6 h-6" />
          </button>
        )}

        <Link href={"/About-us"}>
          <button className="flex items-center justify-center text-gray-500 hover:text-greentext font-semibold transition duration-500 ease-in-out hover:border-b-greenbtn border border-b-2 p-2 rounded-md text-sm w-full md:w-auto">
            درباه ما
          </button>
        </Link>
        <Link href={"/Login-user"}>
          <button className="flex items-center justify-center shadow-md text-gray-500 hover:text-greentext font-semibold transition duration-500 ease-in-out hover:border-b-greenbtn border border-b-2 p-2 rounded-md text-sm w-full md:w-auto">
            ورود/ ثبت نام
          </button>
        </Link>
        <Link href={"/admin"}>
          <button className="flex items-center justify-center shadow-md text-gray-500 hover:text-greentext font-semibold transition duration-500 ease-in-out hover:border-b-greenbtn border border-b-2 p-2 rounded-md text-sm w-full md:w-auto">
            پنل ادمین
          </button>
        </Link>
        
        <div className="relative inline-block text-left">
          <button
            onClick={toggleDropdown}
            className="flex items-center justify-center shadow-md text-gray-500 hover:text-greentext font-semibold transition duration-500 ease-in-out hover:border-b-greenbtn border border-b-2 p-2 rounded-md text-sm w-full md:w-auto"
          >
            <RiArrowDropDownLine className="w-5 h-5" /> منو
          </button>

 {isDropdownOpen && (
            <div
              id="dropdownNavbar"
              className="z-10 absolute right-0 mt-2 w-52 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-greenbtn"
            >
              <ul className="py-2 text-sm text-gray-700 dark:text-gray-100" aria-labelledby="dropdownLargeButton">
                <li>
                  <a href="#" className="block text-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-green-700 dark:hover:text-white">cafe/ کافه</a>
                </li>
                <li>
                  <a href="#" className="block text-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-green-700 dark:hover:text-white">Main dish / غذاهای اصلی</a>
                </li>
                <li>
                  <a href="#"className="block text-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-green-700 dark:hover:text-white">Appetizer / پیش غذا</a>
                </li>
                <li>
                  <a href="#" className="block text-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-green-700 dark:hover:text-white">Breackfast / صبحانه</a>
                </li>
                <li>
                  <a href="#" className="block text-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-green-700 dark:hover:text-white">Drinks / نوشیدنی ها</a>
                </li>
                <li>
                  <a href="#" className="block text-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-green-700 dark:hover:text-white">Special items / ویژه</a>
                </li>
                
              </ul>
            
            </div>
          )}
        </div>
        <Link href={"/Shop"}></Link>
      </section>
    </header>
  );
}
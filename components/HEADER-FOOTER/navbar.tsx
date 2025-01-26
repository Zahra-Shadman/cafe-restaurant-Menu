"use client";
import React, { useState, useEffect } from "react";
import { FaShoppingCart, FaHeart, FaBars, FaTimes } from "react-icons/fa";
import Image from "next/image";
import { RiUserSharedFill } from "react-icons/ri";
import { PiListChecksFill } from "react-icons/pi";
import Link from "next/link";
import Cookies from "js-cookie";
import { IoPersonCircleOutline } from "react-icons/io5";
import { MdOutlineArrowDropDown } from "react-icons/md";
import CartIcon from "../card.icon";
import { logoutSuccess } from "@/lib/toast/toasts";
import { ToastContainer } from "react-toastify";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = () => {
    const accessToken = Cookies.get("accessToken");
    const userData = localStorage.getItem("userData");

    if (accessToken && userData) {
      try {
        const user = JSON.parse(userData);
        setIsLoggedIn(true);
        setUsername(user.username);
      } catch (error) {
        console.error("Error parsing user data:", error);
        setIsLoggedIn(false);
        setUsername("");
      }
    } else {
      setIsLoggedIn(false);
      setUsername("");
    }
  };

  const handleLogout = () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    localStorage.removeItem("userData");
    logoutSuccess();
    setIsLoggedIn(false);
    setUsername("");
    setShowDropdown(false);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="relative flex items-center justify-between h-20">
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-600 hover:text-gray-900"
            >
              {isOpen ? (
                <FaTimes className="w-6 h-6" />
              ) : (
                <FaBars className="w-6 h-6" />
              )}
            </button>
          </div>

          <div className="absolute flex-1 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Image
              src={"/Screenshot%202024-12-27%20144726.svg"}
              alt={"logo"}
              width={250}
              height={50}
              style={{ objectFit: "contain" }}
              className="max-w-full"
            />
          </div>

          <div className="hidden md:flex  items-center w-full justify-between">
            <div className="flex-grow max-w-xs">
              <input
                type="text"
                className="w-full rounded-md border border-[#DDE2E4] px-3 py-2 text-sm text-right"
                placeholder=". . .محصول مورد نظر خود را جستجو کنید"
              />
            </div>

            <div className="flex items-center">
              <Link href="/orders">
                <div className="flex cursor-pointer items-center gap-x-1 rounded-md py-2 px-2 hover:bg-gray-100">
                  <PiListChecksFill className="h-5 w-5 text-green-950" />
                </div>
              </Link>

              <Link href="/favorite">
                <div className="flex cursor-pointer items-center gap-x-1 rounded-md py-2 px-2 hover:bg-gray-100">
                  <FaHeart className="h-5 w-5 text-green-950" />
                </div>
              </Link>

              <div className="flex cursor-pointer items-center gap-x-1 rounded-md py-2 px-2 hover:bg-gray-100">
                <CartIcon />
              </div>

              {isLoggedIn ? (
                <div className="relative">
                  <div
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="flex cursor-pointer text-green-950 font-bold items-center gap-x-1 rounded-md py-2 px-2 hover:bg-gray-100"
                  >
                    <IoPersonCircleOutline className="h-6 w-6 text-green-950" />
                    {username} <MdOutlineArrowDropDown />
                  </div>

                  {showDropdown && (
                    <div className="absolute text-center right-0 mt-2 w-48 bg-white border rounded-md shadow-lg">
                      <Link href="/profile">
                        <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                          پروفایل
                        </div>
                      </Link>
                      <Link href="/orders">
                        <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                          سفارشات
                        </div>
                      </Link>
                      <div
                        onClick={handleLogout}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-500"
                      >
                        خروج از حساب کاربری
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link href="/Login">
                  <div className="flex cursor-pointer items-center gap-x-1 rounded-md border py-2 px-2 hover:bg-gray-100 ml-2">
                    <RiUserSharedFill className="h-5 w-5 text-green-950" />
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <input
                type="text"
                className="w-full rounded-md border border-[#DDE2E4] px-3 py-2 mb-4 text-sm text-right"
                placeholder=". . .محصول مورد نظر خود را جستجو کنید"
              />

              <div className="flex justify-between items-center mb-4">
                <div className="flex space-x-5">
                  <Link href={"/orders"}>
                    <PiListChecksFill className="h-5 w-5 text-green-950" />
                  </Link>
                  <Link href={"/favorite"}>
                    <FaHeart className="h-5 w-5 text-green-950" />
                  </Link>
                  <Link href={"/Shop"}>
                    <CartIcon />
                  </Link>
                  {isLoggedIn ? (
                    <div className="relative">
                      <div
                        onClick={() => setShowDropdown(!showDropdown)}
                        className="flex cursor-pointer text-green-950 font-bold items-center gap-x-1 rounded-md py-2 px-2 hover:bg-gray-100"
                      >
                        <IoPersonCircleOutline className="h-6 w-6 text-green-950" />
                        {username} <MdOutlineArrowDropDown />
                      </div>

                      {showDropdown && (
                        <div className="absolute text-center right-0 mt-2 w-48 bg-white border rounded-md shadow-lg">
                          <Link href="/profile">
                            <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                              پروفایل
                            </div>
                          </Link>
                          <Link href="/orders">
                            <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                              سفارشات
                            </div>
                          </Link>
                          <div
                            onClick={handleLogout}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-500"
                          >
                            خروج از حساب کاربری
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link href="/Login">
                      <div className="flex cursor-pointer items-center gap-x-1 rounded-md border py-2 px-2 hover:bg-gray-100 ml-2">
                        <RiUserSharedFill className="h-5 w-5 text-green-950" />
                      </div>
                    </Link>
                  )}
                </div>
              </div>

              <div className="mt-5">
                <Link
                  href="/About-us"
                  className="text-gray-700 hover:bg-gray-100 block px-3 py-2 rounded-md"
                >
                  درباره ما
                </Link>
                <Link
                  href="/branches"
                  className="text-gray-700 hover:bg-gray-100 block px-3 py-2 rounded-md"
                >
                  آدرس شعب
                </Link>
                <Link
                  href="/shoping"
                  className="text-gray-700 hover:bg-gray-100 block px-3 py-2 rounded-md"
                >
                  فروشگاه محصولات
                </Link>
                <Link
                  href="/menu"
                  className="text-gray-700 hover:bg-gray-100 block px-4 py-3 rounded-md"
                >
                  منو
                </Link>
              </div>
            </div>
          </div>
        )}

        <div className="hidden md:flex justify-center mt-4 space-x-8">
          <Link
            href="/About-us"
            className="cursor-pointer rounded-md py-1  px-2 text-sm font-medium hover:bg-gray-100 hover:text-browntext"
          >
            درباره ما
          </Link>
          <Link
            href="/branches"
            className="cursor-pointer rounded-md py-1 px-2 text-sm font-medium hover:bg-gray-100 hover:text-browntext"
          >
            آدرس شعب
          </Link>
          <Link
            href="/shoping"
            className="cursor-pointer rounded-md py-1 px-2 text-sm font-medium hover:bg-gray-100 hover:text-browntext"
          >
            فروشگاه محصولات
          </Link>
          <Link
            href="/menu"
            className="cursor-pointer rounded-md py-1 px-2 text-sm font-medium hover:bg-gray-100 hover:text-browntext"
          >
            منو
          </Link>
        </div>
      </div>
      <ToastContainer />
    </nav>
  );
};

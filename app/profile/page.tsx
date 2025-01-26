"use client";

import Link from "next/link";
import React, { useState } from "react";
import { FaPhone, FaUser } from "react-icons/fa";
import { FaLocationDot, FaRegCircleUser } from "react-icons/fa6";
import { IoMdArrowBack } from "react-icons/io";
import Image from "next/image";

const UserProfile: React.FC = () => {
  const initialUserData = JSON.parse(localStorage.getItem("userData") || "{}");
  const [userData, setUserData] = useState(initialUserData);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstname: initialUserData.firstname,
    lastname: initialUserData.lastname,
    username: initialUserData.username,
    phoneNumber: initialUserData.phoneNumber,
    address: initialUserData.address,
  });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updatedUserData = { ...userData, ...formData };
    setUserData(updatedUserData);
    localStorage.setItem("userData", JSON.stringify(updatedUserData));
    setIsEditing(false);
  };

  return (
    <div className="bg-gradient-to-r from-indigo-800 to-blue-900 min-h-screen flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-4xl w-full p-8 transition-all duration-300 animate-fade-in">
        <div className="flex flex-col md:flex-row">
          <Link href={"/"}>
       
            <IoMdArrowBack className="w-5 h-5" />
          </Link>
          <div className="md:w-1/3 text-center mb-8 md:mb-0">
            <Image
              src="/user_icon_004.jpg"
              alt="Profile Picture"
              className="rounded-full w-48 h-48 mx-auto mb-4 border-4 border-indigo-800 dark:border-blue-900 transition-transform duration-300 hover:scale-105"
            />
            <h1 className="text-2xl font-bold text-indigo-800 dark:text-white mb-2">
              {userData.firstname} {userData.lastname}
            </h1>
            <button
              onClick={handleEditClick}
              className="mt-4 bg-indigo-800 text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition-colors duration-300"
            >
              ویرایش اطلاعات کاربری
            </button>
          </div>
          <div className="md:w-2/3 md:pr-8">
            {isEditing ? (
              <form onSubmit={handleSubmit}>
                <h2 className="text-xl text-right font-semibold text-indigo-800 dark:text-white mb-4">
                  ویرایش اطلاعات
                </h2>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-right dark:text-gray-300 mb-1"
                    htmlFor="firstname"
                  >
                    نام
                  </label>
                  <input
                    type="text"
                    name="firstname"
                    value={formData.firstname}
                    onChange={handleChange}
                    className="border rounded w-full text-right py-2 px-3 text-gray-700 dark:text-gray-300"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-right dark:text-gray-300 mb-1"
                    htmlFor="lastname"
                  >
                    نام خانوادگی
                  </label>
                  <input
                    type="text"
                    name="lastname"
                    value={formData.lastname}
                    onChange={handleChange}
                    className="border rounded w-full text-right py-2 px-3 text-gray-700 dark:text-gray-300"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-right text-gray-700 dark:text-gray-300 mb-1"
                    htmlFor="username"
                  >
                    نام کاربری
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="border rounded text-right w-full py-2 px-3 text-gray-700 dark:text-gray-300"
                    disabled
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-right dark:text-gray-300 mb-1"
                    htmlFor="phoneNumber"
                  >
                    شماره تماس
                  </label>
                  <input
                    type="text"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="border rounded w-full text-right py-2 px-3 text-gray-700 dark:text-gray-300"
                    disabled
                  />
                </div>
                <div className="mb-4 text-right">
                  <label
                    className="block text-gray-700 text-right dark:text-gray-300 mb-1"
                    htmlFor="address"
                  >
                    آدرس
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="border rounded text-right w-full py-2 px-3 text-gray-700 dark:text-gray-300"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="mt-4 bg-indigo-800 text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition-colors duration-300"
                >
                  ذخیره تغییرات
                </button>
              </form>
            ) : (
              <>
                <div>
                  <h2 className="text-xl text-center font-semibold text-indigo-800 dark:text-white mb-4">
                    اطلاعات کاربری
                  </h2>
                  <p className="text-gray-700  text-right gap-2  dark:text-gray-300 mb-6">
                    {userData.role}{" "}
                    <FaUser className=" float-right ml-2 mt-1" />
                  </p>
                  <ul className="space-y-2 text-right py-1 text-gray-700 dark:text-gray-300">
                    <li className="  text-right">
                      <FaRegCircleUser className=" float-right ml-2 mt-1" />
                      {userData.username}
                    </li>
                    <li className=" text-right py-4 items-center">
                      <FaPhone className=" float-right ml-2 mt-1" />
                      {userData.phoneNumber}
                    </li>
                    <li className=" text-right  items-center">
                      <FaLocationDot className=" float-right ml-2 mt-1" />
                      {userData.address}
                    </li>
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
        `}
      </style>
    </div>
  );
};

export default UserProfile;

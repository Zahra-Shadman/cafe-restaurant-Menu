"use client";

import React, { useState, useEffect } from "react";

interface UserData {
  firstname: string;
  lastname: string;
  phoneNumber: string;
  address: string;
}

const UserProfile: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");

    if (storedUserData) {
      try {
        const parsedUserData: UserData = JSON.parse(storedUserData);
        setUserData(parsedUserData);
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  if (!userData) {
    return (
      <div className="p-4">
        <p>Loading user profile...</p>
      </div>
    );
  }

  return (
    <div className="text-right py-5 ">
      <h1 className="font-bold">اطلاعات خریدار</h1>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">نام</label>
          <p className="mt-1 text-lg">{userData.firstname}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            نام خانوادگی
          </label>
          <p className="mt-1 text-lg">{userData.lastname}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            شماره تماس
          </label>
          <p className="mt-1 text-lg direction-ltr">{userData.phoneNumber}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            آدرس
          </label>
          <p className="mt-1 text-lg">{userData.address}</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

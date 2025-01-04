'use client';

import React, { useState } from "react";
import { IoAlertCircle } from "react-icons/io5";

interface Day {
  name: string;
  date: string;
  month: string;
}

interface Hour {
  label: string;
  range: string;
}

export default function SelectTime() {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedHour, setSelectedHour] = useState<number | null>(null);

  const days: Day[] = [
    { name: "چهارشنبه",date: "۱۹", month: "دی" },
    { name: "سه‌شنبه", date: "۱۸", month: "دی" },
    { name: "دوشنبه", date: "۱۷", month: "دی" },
    { name: "یکشنبه", date: "۱۶", month: "دی" },
  ];

  const hours: Hour[] = [
    { label: "ساعت", range: "۲۱ - ۱۸" },
    { label: "ساعت", range: "۱۸ - ۱۵" },
    { label: "ساعت", range: "۱۵ - ۱۲" },
    { label: "ساعت", range: "۱۲ - ۹" },
  ];

  return (
    <div>
      <div className="p-4">
        <div className="flex flex-col items-end">
          <div className="flex flex-col  mb-4">
           
            <span className="text-gray-700 text-xl py-3 text-right ">انتخاب روز و ساعت </span>

            <span className="text-red-600 flex items-center  rounded-sm py-1 px-"> کاربر گرامی ، توجه داشته باشید انتخاب روز های دیگر فقط برای محصولات فروشگاه قابل انجام است  <IoAlertCircle className="w-6 h-6 ml-2" /></span>

          </div>
          <div className="flex gap-5 mb-4 ">
            {days.map((day, index) => (
              <div
                key={index}
                className={`text-center px-4  py-2 rounded-lg cursor-pointer ${
                  selectedDay === index
                    ? "bg-green-900 text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
                onClick={() => setSelectedDay(index)}
              >
                <div>{day.name}</div>
                <div className="text-2xl font-bold">{day.date}</div>
                <div className="text-gray-500">{day.month}</div>
              </div>
            ))}
          </div>
          <div className="flex items-center mb-4">
            <i className="fas fa-clock text-gray-500 ml-2"></i>
            <span className="text-gray-700">زمان ارسال را انتخاب کنید</span>
          </div>
          <div className="flex space-x-2 space-x-reverse mb-4">
            {hours.map((hour, index) => (
              <div
                key={index}
                className={`text-center flex p-4 space-x-4 rounded-lg cursor-pointer ${
                  selectedHour === index
                    ? "bg-green-900 text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
                onClick={() => setSelectedHour(index)}
              >
               
                <div>{hour.range}</div>
                <div>{hour.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
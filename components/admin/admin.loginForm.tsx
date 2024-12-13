"use client";
import { FcGoogle } from "react-icons/fc";
import { GrApple } from "react-icons/gr";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { PiUser } from "react-icons/pi";
import { useState } from "react";
import { login } from "@/libs/Login";
import Image from "next/image";

export const AdminLoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const { accessToken, refreshToken } = await login(username, password);
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      window.location.href = "/admin/dashboard";
    } catch (err) {
      setError("Invalid credentials or server error");
    }
  };

  return (
    <div
      className="flex justify-center items-center font-[sans-serif] h-full min-h-screen p-4 relative"
      style={{
        backgroundImage: "url(/slide2.jpg)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <div className="max-w-md w-full mx-auto relative z-10">
        <form
          onSubmit={handleLogin}
          className="bg-opacity-70 bg-white rounded-2xl p-6 shadow-[0_2px_16px_-3px_rgba(6,81,237,0.3)]"
        >
          <div className="mb-12">
            <h3 className="text-gray-800 text-3xl  flex font-extralight justify-center">
              خوش آمدید{" "}
            </h3>
          </div>

          <div className="relative flex items-center mb-6">
            <PiUser className="absolute left-2 w-[18px] h-[18px] text-gray-700 cursor-pointer" />
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              name="username"
              type="text"
              className="bg-transparent   text-right w-full text-md text-gray-800 border-b border-gray-400 focus:border-gray-800 pl-8 py-3 outline-none placeholder:text-gray-800"
              placeholder="نام کاربری"
            />
          </div>

          <div className="relative flex items-center mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#333"
              stroke="#333"
              className="absolute left-2 w-[18px] h-[18px] text-gray-400 cursor-pointer"
              viewBox="0 0 128 128"
            >
              <path
                d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16- 7.178-16-16-16z"
                data-original="#000000"
              ></path>
            </svg>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              name="password"
              className="bg-transparent text-right w-full text-md text-gray-800 border-b border-gray-400 focus:border-gray-800 pl-8 py-3 outline-none placeholder:text-gray-800"
              placeholder="رمز عبور"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 mt-6">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 shrink-0 border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-3 block text-sm text-gray-800"
              >
                Remember me
              </label>
            </div>
            <div>
              <a
                href="javascript:void(0);"
                className="text-blue-600 text-sm font-thin hover:underline"
              >
                Forgot Password?
              </a>
            </div>
          </div>

          <div className="mt-12">
            <button
              type="submit"
              className="w-full py-2.5 px-4 text-sm font-semibold tracking-wider rounded-full text-white bg-gray-800 hover:bg-[#222] focus:outline-none"
            >
              ورود
            </button>
          </div>
          <hr className="my-6 border-gray-400" />
          <div className="space-x-8 flex justify-center">
            <button type="button" className="border-none outline-none">
              <FcGoogle className="w-7 h-7" />
            </button>
            <button type="button" className="border-none outline-none">
              <GrApple className="w-7 h-7" />
            </button>
            <button type="button" className="border-none outline-none">
              <MdOutlineAdminPanelSettings className="w-7 h-7" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

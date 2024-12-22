"use client";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { PiEyeLight, PiUser } from "react-icons/pi";
import { useState, useEffect } from "react";
import { login } from "@/api/Login";
import { useRouter } from "next/navigation";
import { Flip, ToastContainer } from "react-toastify";
import { GoingToDashoeard, loginSuccess } from "../TOAST/toasts";

export const AdminLoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const { token } = await login(username, password);
      localStorage.setItem("accessToken", token.accessToken);
      localStorage.setItem("refreshToken", token.refreshToken);

      console.log(token);
      loginSuccess();
      GoingToDashoeard();
      setTimeout(() => {
        window.location.href = "/admin/dashboard";
      }, 3000);
    } catch (err) {
      setError("server error");
    }
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      const tokenPayload = JSON.parse(atob(accessToken.split(".")[1]));
      const isExpired = Date.now() >= tokenPayload.exp * 1000; 

      if (isExpired) {
        window.location.href = "/admin";
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      }
    }
  }, [router]);
  return (
    <div
      className="flex justify-center items-center font-[sans-serif] h-full min-h-screen p-4 relative"
      style={{
        backgroundImage: "url(/slide2.jpg)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-70"></div>
      <div className="max-w-md w-full mx-auto relative z-10">
        <form
          onSubmit={handleLogin}
          className="bg-opacity-90 bg-gray-100 rounded-2xl p-6 shadow-[0_2px_16px_-3px_rgba(6,81,237,0.3)]"
        >
          <div className="mb-12">
            <h3 className="text-gray-800 text-3xl flex font-extralight justify-center">
              خوش آمدید
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
              className="bg-transparent text-right w-full text-md text-gray-800 border-b border-gray-400 focus:border-gray-800 pl-8 py-3 outline-none placeholder:text-gray-800"
              placeholder="نام کاربری"
            />
          </div>
          <div className="relative flex items-center mb-6">
            <PiEyeLight className="absolute left-2 w-[18px] h-[18px] text-gray-700 cursor-pointer" />
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
          <div className="flex flex-wrap items-center justify-between gap-4 mt-6"></div>
          <div className="mt-12">
            <button
              type="submit"
              className="w-full py-2.5 px 4 text-sm font-semibold tracking-wider rounded-full text-white bg-gray-800 hover:bg-[#222] focus:outline-none"
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
              <MdOutlineAdminPanelSettings className="w-7 h-7" />
            </button>
          </div>
        </form>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Flip}
      />
    </div>
  );
};

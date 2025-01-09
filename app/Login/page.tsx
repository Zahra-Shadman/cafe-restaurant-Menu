"use client";

import Link from "next/link";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { loginUrl } from "@/api/urls";
import { ToastContainer } from "react-toastify";
import { LoginSuccessful } from "@/lib/toast/toasts";
import Cookies from "js-cookie";

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const rawFormData = {
      username,
      password,
    };

    try {
      const response = await axios.post(loginUrl, rawFormData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.data.status === "success") {
        Cookies.set("accessToken", response.data.token.accessToken);
        Cookies.set("refreshToken", response.data.token.refreshToken);

        localStorage.setItem(
          "userData",
          JSON.stringify(response.data.data.user)
        );

        Cookies.set("userInfo", JSON.stringify(response.data.data.user), {
          expires: 1,
        });

        LoginSuccessful();
        router.push("/");
      }
    } catch (err: any) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.message || "Login failed");
      } else {
        setError("Error login");
      }
      console.error("Login error:", err);
    }
  };

  return (
    <section className="gradient-form min-h-screen bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center p-4">
      <div className=" w-full max-w-4xl">
        <div className="flex items-center justify-center text-neutral-800 dark:text-neutral-200">
          <div className="w-full">
            <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
              <div className="g-0 lg:flex lg:flex-wrap">
                <div className="px-4 md:px-0 lg:w-6/12">
                  <div className="md:mx-6 md:p-8 h-[400px]">
                    <div className="text-center">
                      <img
                        className="mx-auto w-48 h-auto"
                        src={"/Screenshot%202024-12-27%20144726.svg"}
                        alt="logo"
                      />
                      <h4 className="mb-6 mt-1 pb-1 text-xl font-semibold">
                        ! خوش آمدید
                      </h4>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">
                      <div className="space-y-3">
                        <input
                          type="text"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          required
                          className="w-full rounded text-right border-0 bg-transparent px-3 py-2 leading-[1.6] outline-none transition-all duration-200 ease-linear border-b-2 border-gray-300"
                          placeholder="نام کاربری"
                        />

                        <input
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          className="w-full text-right rounded border-0 bg-transparent px-3 py-2 leading-[1.6] outline-none transition-all duration-200 ease-linear border-b-2 border-gray-300"
                          placeholder="رمز عبور"
                        />
                      </div>

                      <div className="text-center mt-4">
                        <button
                          type="submit"
                          className=" w-full mt-8  rounded px-6 py-2.5 text-sm  font-semibold uppercase text-white shadow-dark-3 transition duration-150 ease-in-out"
                          style={{
                            background:
                              "linear-gradient(to right , #DFC196,#60401f)",
                          }}
                        >
                          ورود
                        </button>

                        {error && <p className="text-red-500 mt-2">{error}</p>}
                      </div>
                    </form>
                  </div>
                </div>

                <div
                  className="hidden lg:flex lg:w-1/2 items-center justify-center text-white"
                  style={{
                    background: "linear-gradient(to right , #DFC196,#c48e54)",
                  }}
                >
                  <div className="flex-row px-4 py-6 md:mx-6 text-white md:p-8">
                    <div className="flex items-center justify-between mt-36">
                      <Link
                        href="/signup"
                        className="inline-block mr-2 w-36 text-center rounded border-2 hover:bg-stone-700 py-2 px-5 text-xs font-medium text-danger"
                      >
                        ثبت نام
                      </Link>
                      <p className="text-sm font-semibold text-right">
                        کاربر گرامی در صورتی که حساب کاربری ندارید لطفا ابتدا
                        ثبت نام کنید
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default Login;

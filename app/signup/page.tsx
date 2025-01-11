"use client";

import Link from "next/link";
import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { signUpUrl } from "@/api/urls";
import { ToastContainer } from "react-toastify";
import { SignupSuccessful } from "@/lib/toast/toasts";

export const checkPhone = (number: string): boolean => {
  const regex = new RegExp("^(\\+98|0)?9\\d{9}$");
  return regex.test(number);
};

const SignUp: React.FC = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [isValidPhone, setIsValidPhone] = useState(true);
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!checkPhone(phoneNumber)) {
      setIsValidPhone(false);
      return;
    } else {
      setIsValidPhone(true);
    }

    const rawFormData = {
      firstname,
      lastname,
      username,
      password,
      phoneNumber,
      address,
    };

    const accessToken = localStorage.getItem("accessToken");
    try {
      const response = await axios.post(signUpUrl, rawFormData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.data.status === "success") {
        localStorage.setItem("accessToken", response.data.token.accessToken);
        localStorage.setItem("refreshToken", response.data.token.refreshToken);

        localStorage.setItem(
          "userData",
          JSON.stringify(response.data.data.user)
        );

        SignupSuccessful();
        router.push("/Login");
      }
    } catch (err) {
      const error = err as AxiosError; 
      if (error.response) {
        setError(error.message || "Signup failed");
      } else if (error.request) {
        setError("No response from server");
      }
      console.error("Signup error:", err);
    }
  };

  return (
    <section className="gradient-form min-h-screen bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center p-4">
      <div className="container w-full max-w-4xl">
        <div className="flex items-center justify-center text-neutral-800 dark:text-neutral-200">
          <div className="w-full">
            <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
              <div className="g-0 lg:flex lg:flex-wrap">
                <div className="px-4 md:px-0 lg:w-6/12">
                  <div className="md:mx-6 md:p-8">
                    <div className="text-center">
                      <img
                        className="mx-auto w-48 h-auto"
                        src={"/Screenshot%202024-12-27%20144726.svg"}
                        alt="logo"
                      />
                      <h4 className="mb-6 mt-1 pb-1 text-xl font-semibold">
                        We are The Darya Team
                      </h4>
                    </div>

                    <form onSubmit={handleSignUp} className="space-y-4">
                      <p className="mb-4 text-center">
                        لطفا ثبت نام خود را تکمیل کنید
                      </p>

                      <div className="space-y-3">
                        <input
                          type="text"
                          value={firstname}
                          onChange={(e) => setFirstname(e.target.value)}
                          required
                          className="w-full  text-right rounded border-0 bg-transparent px-3 py-2 leading-[1.6] outline-none transition-all duration-200 ease-linear border-b-2 border-gray-300"
                          placeholder="نام"
                        />

                        <input
                          type="text"
                          value={lastname}
                          onChange={(e) => setLastname(e.target.value)}
                          required
                          className="w-full  text-right rounded border-0 bg-transparent px-3 py-2 leading-[1.6] outline-none transition-all duration-200 ease-linear border-b-2 border-gray-300"
                          placeholder="نام خانوادگی"
                        />

                        <input
                          type="text"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          required
                          className="w-full  text-right rounded border-0 bg-transparent px-3 py-2 leading-[1.6] outline-none transition-all duration-200 ease-linear border-b-2 border-gray-300"
                          placeholder="نام کاربری"
                        />

                        <input
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          className="w-full  text-right rounded border-0 bg-transparent px-3 py-2 leading-[1.6] outline-none transition-all duration-200 ease-linear border-b-2 border-gray-300"
                          placeholder="رمز عبور"
                        />

                        <input
                          type="tel"
                          value={phoneNumber}
                          onChange={(e) => {
                            setPhoneNumber(e.target.value);
                            setIsValidPhone(checkPhone(e.target.value));
                          }}
                          required
                          className={`w-full  text-right rounded border-0 bg-transparent px-3 py-2 leading-[1.6] outline-none transition-all duration-200 ease-linear border-b-2 ${
                            isValidPhone ? "border-gray-300" : "border-red-500"
                          }`}
                          placeholder="شماره تلفن"
                        />
                        {!isValidPhone && (
                          <p className="text-red-500">شماره تلفن نامعتبر است</p>
                        )}

                        <input
                          type="text"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          required
                          className="w-full  text-right rounded border-0 bg-transparent px-3 py-2 leading-[1.6] outline-none transition-all duration-200 ease-linear border-b-2 border-gray-300"
                          placeholder="Address"
                        />
                      </div>

                      <div className="text-center mt-4">
                        <button
                          type="submit"
                          className="w-full  rounded px-6 py-2.5 text-xs font-medium uppercase text-white shadow-dark-3 transition duration-150 ease-in-out"
                          style={{
                            background:
                              "linear-gradient(to right , #DFC196,#60401f)",
                          }}
                        >
                          ثبت نام
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
                  <div className="px-4 py-6 md:mx-6 text-white md:p-8">
                    <p className="text-xl font-semibold text-right">
                      کاربر گرامی وب‌سایت دریا ، لطفا جهت استفاده از امکانات
                      وب‌سایت ابتدا ثبت نام کنید و یا وارد حساب کاربری خود شوید
                    </p>
                    <div className="flex items-center justify-between mt-10">
                      <Link
                        href="/Login"
                        className="inline-block rounded border-2 hover:bg-stone-400 py-2 px-5 text-xs font-medium text-danger"
                      >
                        ورود
                      </Link>
                      <p className=" ml-7 text-right">
                        در صورتی که قبلا ثبت نام کرده اید گزینه ورود را انتخاب
                        کنید
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

export default SignUp;

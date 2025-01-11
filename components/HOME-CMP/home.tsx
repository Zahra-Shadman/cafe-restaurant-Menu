import React from "react";
import Slideshow from "./slider-home";
import HomeFooter from "../HEADER-FOOTER/footer";
import Link from "next/link";
import { CiCoffeeBean } from "react-icons/ci";
import Image from 'next/image';

const ImageMainHome: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto py-2 mt-5">
      <div className=" flex items-center text-browni text-lg  mb-4 justify-center">
        <CiCoffeeBean className="w-5 h-7 mr-1 " /> مجموعه کافه و رستوران زنجیره
        ای گروه دریا
      </div>
      <Slideshow />
      <h1 className="text-center text-4xl font-bold text-teal-700 mt-8">
        I ENJOY
      </h1>
      <h1 className="text-center text-4xl font-bold text-teal-700">
        THEREFORE I AM
      </h1>
      <p className="text-center text-teal-700 mt-4">
        سرو قهوه فوق‌العاده، کیک‌ها و شیرینی‌های تازه و ارائه بهترین سرویس در
        فضاهای زنده و به‌یادماندنی از جمله ارزش‌های ما در مجموعه‌ دریا است. همه
        هدف ما، تلاش ما و امید ما ارائه بهترین محصول با بهترین قیمت و کیفیت است.
      </p>
      <div className="text-center mt-4">
        <Link href={"/menu"}>
          <button className="bg-teal-700 text-white py-2 px-4 rounded">
            سفارش آنلاین
          </button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        <div className="md:col-span-1">
          <Image
            src="/2222.jpg"
            alt="A table with various dishes and plants in the background"
            className="w-full h-auto rounded"
          />
          <p
            className="text-teal-700
text-left px-3 py-2 font-mono text-lg"
          >
            In the heart of the bustling city, a cozy café beckons with the
            aroma of freshly brewed coffee and the sweet scent of pastries. The
            warm, inviting atmosphere is adorned with soft lighting and rustic
            decor, making it the perfect spot to unwind. As you sip on a velvety
            cappuccino, the rich flavors dance on your palate, complemented by a
            slice of decadent chocolate cake. Each bite is a delightful
            experience, blending comfort and indulgence. Whether you're catching
            up with friends or enjoying a moment of solitude, this café is a
            haven for food lovers and dreamers alike.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <Image
            src="/555.jpg"
            alt="A bowl of food with garnish and bread"
            className="w-full h-auto rounded"
          />

          <Image
            src="/111.jpg"
            alt="A cozy cafe with plants and a person sitting"
            className="w-full h-auto rounded"
          />

          <Image
            src="slide4.jpg"
            alt="Coffee being brewed into a glass container"
            className="w-full h-auto rounded"
          />
        </div>
      </div>
      <HomeFooter />
    </div>
  );
};

export default ImageMainHome;

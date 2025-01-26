import { FaStar } from "react-icons/fa6";
import Image from 'next/image';

export default function Reviews() {
  return (
    <div>
      <div className="max-w-[500px] float-right sm:mr-0 lg:mr-20">
        <h3 className="text-xl font-bold text-gray-800"> (10) نظرات</h3>
        <div className="space-y-3 mt-4">
          <div className="flex items-center">
            <p className="text-sm text-gray-800 font-bold">5.0</p>
            <FaStar className="w-5 fill-green-400 ml-1" />

            <div className="bg-gray-300 rounded w-full h-2 ml-3">
              <div className="w-2/3 h-full rounded bg-green-400"></div>
            </div>
            <p className="text-sm text-gray-800 font-bold ml-3">66%</p>
          </div>

          <div className="flex items-center">
            <p className="text-sm text-gray-800 font-bold">4.0</p>
            <FaStar className="w-5 fill-green-400 ml-1" />

            <div className="bg-gray-300 rounded w-full h-2 ml-3">
              <div className="w-1/3 h-full rounded bg-green-400"></div>
            </div>
            <p className="text-sm text-gray-800 font-bold ml-3">33%</p>
          </div>

          <div className="flex items-center">
            <p className="text-sm text-gray-800 font-bold">3.0</p>
            <FaStar className="w-5 fill-green-400 ml-1" />

            <div className="bg-gray-300 rounded w-full h-2 ml-3">
              <div className="w-1/6 h-full rounded bg-green-400"></div>
            </div>
            <p className="text-sm text-gray-800 font-bold ml-3">16%</p>
          </div>

          <div className="flex items-center">
            <p className="text-sm text-gray-800 font-bold">2.0</p>
            <FaStar className="w-5 fill-green-400 ml-1" />

            <div className="bg-gray-300 rounded w-full h-2 ml-3">
              <div className="w-1/12 h-full rounded bg-green-400"></div>
            </div>
            <p className="text-sm text-gray-800 font-bold ml-3">8%</p>
          </div>

          <div className="flex items-center">
            <p className="text-sm text-gray-800 font-bold">1.0</p>
            <FaStar className="w-5 fill-green-400 ml-1" />

            <div className="bg-gray-300 rounded w-full h-2 ml-3">
              <div className="w-[6%] h-full rounded bg-green-400"></div>
            </div>
            <p className="text-sm text-gray-800 font-bold ml-3">6%</p>
          </div>
        </div>

        <div className="flex items-start mt-8">
          <Image
            src="https://readymadeui.com/team-2.webp"
            className="w-12 h-12 rounded-full border-2 border-white" alt={"red"}          />
          <div className="ml-3">
            <h4 className="text-sm font-bold">John Doe</h4>
            <div className="flex space-x-1 mt-1">
              <FaStar className="w-4 fill-green-400" />
              <FaStar className="w-4 fill-green-400" />
              <FaStar className="w-4 fill-green-400" />
              <FaStar className="w-4 fill-[#CED5D8]" />
              <FaStar className="w-4 fill-[#CED5D8]" />
              <p className="text-xs !ml-2 font-semibold">2 mins ago</p>
            </div>
            <p className="text-xs mt-4">
              The service was amazing. I never had to wait that long for my
              food. The staff was friendly and attentive, and the delivery was
              impressively prompt.
            </p>
          </div>
        </div>
        <button
          type="button"
          className="w-full mt-8 px-4 py-2.5 bg-transparent border border-green-400 text-gray-800 font-semibold rounded-lg"
        >
          Read all reviews
        </button>
      </div>
    </div>
  );
}

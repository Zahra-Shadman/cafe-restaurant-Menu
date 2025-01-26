import Link from "next/link";
import { CiShoppingBasket } from "react-icons/ci";
import { IoSettingsOutline } from "react-icons/io5";
import { LuLayoutList } from "react-icons/lu";
import { MdAutoMode, MdCurrencyExchange } from "react-icons/md";
import { RiDashboardFill } from "react-icons/ri";

export default function AdminSidebar() {
  return (
    <div>
      <aside className="flex fixed bg-stone-100">
        <div className="h-screen px-4 py-8 overflow-y-auto bg-gray-1 border-l border-r w-full">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3"></span>

            <input
              type="text"
              className="w-full py-1.5 pl-10 pr-4 text-gray-700 bg-white border rounded-md"
              placeholder="Search"
            />
          </div>

          <nav className="mt-4 -mx-3 space-y-6 ">
            <div className="space-y-3 ">
              <label className="px-3 text-xs text-gray-500 uppercase dark:text-gray-400">
                آنالیز فروشگاه
              </label>

              <Link
                className="flex items-center px-3 py-2 text-gray-600  hover:bg-gray-200"
                href="#"
              >
                <RiDashboardFill />
                <Link href={"/admin/dashboard"}>
                  <span className="mx-2 text-sm font-medium">
                    صفحه اصلی داشبورد
                  </span>
                </Link>
              </Link>
              <Link
                className="flex items-center px-3 py-2 text-gray-600  hover:bg-gray-200"
                href="/admin/dashboard/product-list"
              >
                <LuLayoutList />
                <span className="mx-2 text-sm font-medium">لیست محصولات</span>
              </Link>
              <Link
                className="flex items-center px-3 py-2 text-gray-600  hover:bg-gray-200"
                href="/admin/management"
              >
                <MdCurrencyExchange />

                <span className="mx-2 text-sm font-medium">مدیریت محصولات</span>
              </Link>
              <Link
                className="flex items-center px-3 py-2 text-gray-600  hover:bg-gray-200"
                href="/admin/dashboard/orders"
              >
                <CiShoppingBasket className="w-6 h-6" />

                <span className="mx-2 text-sm font-medium">مدیریت سفارشات</span>
              </Link>
            </div>

            <div className="space-y-3 ">
              <label className="px-3 text-xs text-gray-500 uppercase dark:text-gray-400">
                شخصی سازی
              </label>

              <Link
                className="flex items-center px-3 py-2 text-gray-600  hover:bg-gray-200"
                href="#"
              >
                <MdAutoMode />

                <span className="mx-2 text-sm font-medium">تم ها</span>
              </Link>

              <Link
                className="flex items-center px-3 py-2 text-gray-600  hover:bg-gray-200"
                href="#"
              >
                <IoSettingsOutline />

                <span className="mx-2 text-sm font-medium">تنظیمات</span>
              </Link>
            </div>
          </nav>
        </div>
      </aside>
    </div>
  );
}

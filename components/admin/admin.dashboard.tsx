import { FaUserPlus } from "react-icons/fa";
import { FaBasketShopping } from "react-icons/fa6";
import { AiFillProduct } from "react-icons/ai";

export default function DashComponent (){
    return(
        <div className="p-6 relative px-32 ml-64">

        <h1 className="text-2xl mb-6 text-right py-2 px-5">داشبورد مدیریت</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
                <div className="bg-purple-500 text-white p-4 rounded-full mr-4">
                <FaUserPlus className="w-5 h-5" />                </div>
                <div>
                    <h2 className="text-2xl font-bold">8,282</h2>
                    <p className="text-gray-600">کاربر جدید</p>
                </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
                <div className="bg-blue-500 text-white p-4 rounded-full mr-4">
                <FaBasketShopping className="w-5 h-5"/>                </div>
                <div>
                    <h2 className="text-2xl font-bold">200,521</h2>
                    <p className="text-gray-600">کلیه سفارشات</p>
                </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
                <div className="bg-pink-500 text-white p-4 rounded-full mr-4">


                <AiFillProduct className="w-5 h-5" />

                </div>
                <div>
                    <h2 className="text-2xl font-bold">215,542</h2>
                    <p className="text-gray-600">موجودی محصولات</p>
                </div>
            </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
            <table className="w-full">
                <thead>
                    <tr className="text-left text-gray-600">
                        <th className="pb-4">نام مدیران پنل</th>
                        <th className="pb-4">عنوان</th>
                        <th className="pb-4">حالت</th>
                        <th className="pb-4">نقش</th>
                        <th className="pb-4">اقدامات</th>
                    </tr>
                </thead>
                <tbody>
                    
                        <tr  className="border-t">
                            <td className="py-4 flex items-center">
                                <img src="https://placehold.co/40x40" alt="User profile" className="rounded-full mr-4" />
                                <div>
                                    <p className="font-bold">John Doe</p>
                                    <p className="text-gray-600">john@example.com</p>
                                </div>
                            </td>
                            <td className="py-4">
                                <p className="font-bold">Software Engineer</p>
                                <p className="text-gray-600">Web dev</p>
                            </td>
                            <td className="py-4">
                                <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-sm">Active</span>
                            </td>
                            <td className="py-4">Owner</td>
                            <td className="py-4 text-blue-500 cursor-pointer">Edit</td>
                        </tr>
                
                </tbody>
            </table>
        </div>
    </div>
    )
}
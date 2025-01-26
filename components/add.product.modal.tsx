
import { useState } from 'react';

interface ModalExampleProps {
    buttonText?: string;
    modalTitle?: string;
}

const AddProductModal: React.FC<ModalExampleProps> = ({ buttonText = "افزودن محصول", modalTitle = "ایجاد محصول جدید" }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <section>
         
            <button 
                onClick={openModal} 
                className="w-36 bg-gray-100 py-2 rounded-md hover:bg-gray-300"
            >
                {buttonText}
            </button>

            {/* Modal Structure */}
            {isModalOpen && (
                <div 
                    aria-hidden={!isModalOpen} 
                    className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50"
                >
                    <div className="relative p-4 w-full max-w-md">
                        <div className="relative bg-white rounded-lg shadow">
                            <div className="flex items-center justify-between p-4 border-b rounded-t">
                                <h3 className="text-lg font-semibold  text-gray-800">
                                    {modalTitle}
                                </h3>
                                <button 
                                    type="button" 
                                    onClick={closeModal} 
                                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm  inline-flex justify-center items-center"
                                >
                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                            <form className="p-4">
                                <div className="grid gap-4 mb-4 grid-cols-2">
                                    <div className="col-span-2">
                                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">نام محصول</label>
                                        <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Type product name" />
                                    </div>
                                    <div className="col-span-2 sm:col-span-1">
                                        <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900">قیمت</label>
                                        <input type="number" name="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="$2999" />
                                    </div>
                                    <div className="col-span-2 sm:col-span-1">
                                        <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900">دسته بندی</label>
                                        <select id="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500  w-full p-2.5">
                                            <option>انتخاب دسته بندی</option>
                                            <option value="Cafe">کافه</option>
                                            <option value="Main dish">غذای اصلی</option>
                                            <option value="Breackfast"> صبحانه</option>
                                            <option value="Drinks">نوشیدنی ها</option>
                                            <option value="Appetizer">پیش غذا</option>
                                            <option value="Special items">منوی ویژه</option>
                                    
                                        </select>
                                    </div>
                                    <div className="col-span-2">
                                        <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">Product Description</label>
                                        <textarea id="description" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Write product description here"></textarea>                    
                                    </div>
                                </div>
                                <button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                    <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path>
                                    </svg>
                                    Add new product
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default AddProductModal;
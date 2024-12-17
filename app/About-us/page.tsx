export default function Pro(){
    return(
        <div>
             <div className="p-4">
                    <header className="flex justify-between items-center mb-4">
                        <div className="flex items-center">
                            <button className="text-white text-2xl mr-4">
                                <i className="fas fa-bars"></i>
                            </button>
                            <button className="bg-red-200 text-red-600 px-4 py-2 rounded-full">
                                انتخاب آدرس
                            </button>
                        </div>
                        <div className="flex items-center">
                            <button className="text-white text-2xl mr-4">
                                <i className="fas fa-shopping-cart"></i>
                            </button>
                            <button className="text-white text-2xl mr-4">
                                <i className="fas fa-receipt"></i>
                            </button>
                            <button className="text-white text-2xl mr-4">
                                منو
                            </button>
                            <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                                <span className="text-white">جو</span>
                            </div>
                        </div>
                    </header>
                    <div className="flex items-center mb-4">
                        <button className="text-white text-2xl mr-4">
                            <i className="fas fa-chevron-down"></i>
                        </button>
                        <input type="text" placeholder="رستوران جو شهرک" className="bg-gray-800 text-white px-4 py-2 rounded-full w-full" />
                        <button className="text-white text-2xl ml-4">
                            <i className="fas fa-search"></i>
                        </button>
                    </div>
                    <div className="flex overflow-x-auto mb-4">
                        {['چای و دمنوش', 'محصولات', 'نوشیدنی', 'پیتزا', 'پاستا', 'لازانیا', 'گریل', 'سالاد', 'پیش غذا', 'نوشیدنی طبیعی'].map((category, index) => (
                            <div key={index} className="flex flex-col items-center mx-2">
                                <img src={`https://placehold.co/50x50`} alt={`Category ${category}`} className="w-12 h-12 rounded-full mb-2" />
                                <span>{category}</span>
                            </div>
                        ))}
                    </div>
                    <div className="mb-4">
                        <h2 className="text-xl mb-2">پیش غذا</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                                { name: 'دیپ بادمجان', description: 'دیپ بادمجان، بادمجان گریل شده، نان پیتا سرخ شده روغن زیتون', price: '189,900', image: 'https://placehold.co/100x100' },
                                { name: 'دیپ حمص', description: 'حمص نخود کنسروی، نان پیتا سرخ شده، روغن زیتون ادویه', price: '149,900', image: 'https://placehold.co/100x100' },
                                { name: 'دیپ حمص', description: 'حمص نخود کنسروی، نان پیتا سرخ شده، روغن زیتون ادویه', price: '329,900', image: 'https://placehold.co/100x100' }
                            ].map((item, index) => (
                                <div key={index} className="bg-gray-800 p-4 rounded-lg flex items-center">
                                    <img src={item.image} alt={item.name} className="w-20 h-20 rounded-full mr-4" />
                                    <div className="flex-1">
                                        <h3 className="text-lg mb-2">{item.name}</h3>
                                        <p className="text-gray-400 mb-2">{item.description}</p>
                                        <div className="flex items-center justify-between">
                                            <button className="bg-gray-700 text-white px-4 py-2 rounded-full">
                                                افزودن
                                            </button>
                                            <span>{item.price} تومان</span>
                                        </div>
                                    </div>
                                    <button className="text-white text-2xl ml-4">
                                        <i className="far fa-heart"></i>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
        </div>
    )
}
export default function AboutAs (){
    return(
        <div className="min-h-screen flex flex-col items-center py-10">
        <div className="w-full max-w-6xl bg-gray-800 p-8 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold mb-8 text-white">Checkout</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <div className="bg-gray-700 p-6 rounded-lg mb-6">
                        <h2 className="text-xl font-semibold mb-4">Billing address</h2>
                        <form>
                            <div className="flex items-center mb-4">
                                <input type="radio" id="individual" name="billingType" className="mr-2" />
                                <label htmlFor="individual" className="mr-4">Individual</label>
                                <input type="radio" id="company" name="billingType" className="mr-2" />
                                <label htmlFor="company">Company</label>
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2">Saved Address</label>
                                <select className="w-full p-2 rounded bg-gray-600 text-white">
                                    <option>Choose one of your saved address</option>
                                </select>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block mb-2">First Name*</label>
                                    <input type="text" className="w-full p-2 rounded bg-gray-600 text-white" placeholder="Enter your first name" />
                                </div>
                                <div>
                                    <label className="block mb-2">Last Name*</label>
                                    <input type="text" className="w-full p-2 rounded bg-gray-600 text-white" placeholder="Enter your last name" />
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2">Phone Number*</label>
                                <div className="flex">
                                    <select className="p-2 rounded-l bg-gray-600 text-white">
                                        <option>+1</option>
                                    </select>
                                    <input type="text" className="w-full p-2 rounded-r bg-gray-600 text-white" placeholder="123-456-7890" />
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2">Shipping Address*</label>
                                <textarea className="w-full p-2 rounded bg-gray-600 text-white" placeholder="Enter your address"></textarea>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block mb-2">Country*</label>
                                    <select className="w-full p-2 rounded bg-gray-600 text-white">
                                        <option>United States</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block mb-2">City*</label>
                                    <select className="w-full p-2 rounded bg-gray-600 text-white">
                                        <option>San Francisco</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <input type="checkbox" id="saveAddress" className="mr-2" />
                                <label htmlFor="saveAddress">Save the data in the address list</label>
                            </div>
                        </form>
                    </div>
                    <div className="bg-gray-700 p-6 rounded-lg mb-6">
                        <h2 className="text-xl font-semibold mb-4">Delivery address</h2>
                        <form>
                            <div className="flex items-center mb-4">
                                <input type="radio" id="sameAddress" name="deliveryType" className="mr-2" />
                                <label htmlFor="sameAddress" className="mr-4">Delivery to the same address</label>
                            </div>
                            <div className="flex items-center mb-4">
                                <input type="radio" id="anotherAddress" name="deliveryType" className="mr-2" />
                                <label htmlFor="anotherAddress" className="mr-4">Delivery to another address</label>
                            </div>
                            <div className="flex items-center mb-4">
                                <input type="radio" id="storePickup" name="deliveryType" className="mr-2" />
                                <label htmlFor="storePickup">Store pickup</label>
                            </div>
                            <p className="text-sm text-gray-400">Choose the store from which you want to pick up the products</p>
                        </form>
                    </div>
                    <div className="bg-gray-700 p-6 rounded-lg">
                        <h2 className="text-xl font-semibold mb-4">Payment details</h2>
                        <form>
                            <div className="flex items-center mb-4">
                                <input type="radio" id="bankCard" name="paymentType" className="mr-2" />
                                <label htmlFor="bankCard" className="mr-4">Online with bank card</label>
                            </div>
                            <div className="flex items-center mb-4">
                                <input type="radio" id="installments" name="paymentType" className="mr-2" />
                                <label htmlFor="installments" className="mr-4">Flowbite online installments</label>
                            </div>
                            <p className="text-sm text-gray-400 mb-4">You have interest from 1%/month until January 31, 2024.</p>
                            <div className="flex items-center mb-4">
                                <input type="radio" id="storeCard" name="paymentType" className="mr-2" />
                                <label htmlFor="storeCard" className="mr-4">Online with Flowbite STAR Card</label>
                            </div>
                            <div className="flex items-center mb-4">
                                <input type="radio" id="paymentOrder" name="paymentType" className="mr-2" />
                                <label htmlFor="paymentOrder">Payment order</label>
                            </div>
                        </form>
                    </div>
                    
                </div>
                <div>
                    <div className="bg-gray-700 p-6 rounded-lg mb-6">
                        <h2 className="text-xl font-semibold mb-4">Order summary</h2>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <img src="https://placehold.co/50x50" alt="PC system All in One APPLE iMac" className="w-12 h-12 rounded" />
                                <div className="flex-1 ml-4">
                                    <p>PC system All in One APPLE iMac (2023) mqr3r0/a, Apple M3, 24" Retina 4.5K, 8GB, SSD 256GB, 10-core GPU, macOS Sonoma, Blue, Keyboard layout INT</p>
                                </div>
                                <div className="text-right">
                                    <p>x1</p>
                                    <p>$1,499</p>
                                </div>
                            </div>
                            <div className="flex justify-between items-center">
                                <img src="https://placehold.co/50x50" alt="Restored Apple Watch Series 8" className="w-12 h-12 rounded" />
                                <div className="flex-1 ml-4">
                                    <p>Restored Apple Watch Series 8 (GPS) 41mm Midnight Aluminum Case with Midnight Sport Band</p>
                                </div>
                                <div className="text-right">
                                    <p>x2</p>
                                    <p>$598</p>
                                </div>
                            </div>
                            <div className="flex justify-between items-center">
                                <img src="https://placehold.co/50x50" alt="Sony Playstation 5 Digital Edition Console" className="w-12 h-12 rounded" />
                                <div className="flex-1 ml-4">
                                    <p>Sony Playstation 5 Digital Edition Console with Extra Blue Controller, White PULSE 3D Headset and Surge Dual Controller Charge Dock Bundle</p>
                                </div>
                                <div className="text-right">
                                    <p>x1</p>
                                    <p>$799</p>
                                </div>
                            </div>
                            <div className="flex justify-between items-center">
                                <img src="https://placehold.co/50x50" alt="Xbox Series X Diablo IV Bundle" className="w-12 h-12 rounded" />
                                <div className="flex-1 ml-4">
                                    <p>Xbox Series X Diablo IV Bundle + Xbox Wireless Controller Carbon Black</p>
                                </div>
                                <div className="text-right">
                                    <p>x1</p>
                                    <p>$699</p>
                                </div>
                            </div>
                            <div className="flex justify-between items-center">
                                <img src="https://placehold.co/50x50" alt="Apple iPhone 15 5G phone" className="w-12 h-12 rounded" />
                                <div className="flex-1 ml-4">
                                    <p>Apple iPhone 15 5G phone, 256GB, Gold</p>
                                </div>
                                <div className="text-right">
                                    <p>x3</p>
                                    <p>$2,997</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-700 p-6 rounded-lg">
                        <h2 className="text-xl font-semibold mb-4">Order summary</h2>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <p>Original price</p>
                                <p>$6,592.00</p>
                            </div>
                            <div className="flex justify-between">
                                <p>Savings</p>
                                <p className="text-green-500">-$299.00</p>
                            </div>
                            <div className="flex justify-between">
                                <p>Store Pickup</p>
                                <p>$99</p>
                            </div>
                            <div className="flex justify-between">
                                <p>Tax</p>
                                <p>$799</p>
                            </div>
                            <div className="flex justify-between font-bold text-lg">
                                <p>Total</p>
                                <p>$7,191.00</p>
                            </div>
                        </div>
                        <button className="w-full mt-6 py-2 bg-blue-600 text-white rounded-lg">Continue to payment</button>
                        <a href="#" className="block mt-4 text-center text-blue-400">Return to Shopping</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}
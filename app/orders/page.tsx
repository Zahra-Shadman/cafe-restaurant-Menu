'use client';
import React, { useState } from 'react';

// Define types for order status and order data
type OrderStatus = 'pre-order' | 'transit' | 'confirmed' | 'cancelled';

interface Order {
  id: string;
  date: string;
  price: number;
  status: OrderStatus;
}

// Status color and icon mapping
const statusConfig = {
  'pre-order': {
    color: 'bg-primary-100 text-primary-800',
    icon: (
      <svg className="me-1 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.5 4h-13m13 16h-13M8 20v-3.333a2 2 0 0 1 .4-1.2L10 12.6a1 1 0 0 0 0-1.2L8.4 8.533a2 2 0 0 1-.4-1.2V4h8v3.333a2 2 0 0 1-.4 1.2L13.957 11.4a1 1 0 0 0 0 1.2l1.643 2.867a2 2 0 0 1 .4 1.2V20H8Z" />
      </svg>
    )
  },
  'transit': {
    color: 'bg-yellow-100 text-yellow-800',
    icon: (
      <svg className="me-1 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h6l2 4m-8-4v8m0-8V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v9h2m8 0H9m4 0h2m4 0h2v-4m0 0h-5m3.5 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm-10 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z" />
      </svg>
    )
  },
  'confirmed': {
    color: 'bg-green-100 text-green-800',
    icon: (
      <svg className="me-1 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 11.917 9.724 16.5 19 7.5" />
      </svg>
    )
  },
  'cancelled': {
    color: 'bg-red-100 text-red-800',
    icon: (
      <svg className="me-1 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6" />
      </svg>
    )
  }
};

const MyOrders: React.FC = () => {
  const [orderType, setOrderType] = useState<OrderStatus | 'all'>('all');
  const [duration, setDuration] = useState<string>('this week');

  // Sample order data (replace with actual data source)
  const orders: Order[] = [
    { id: 'FWB127364372', date: '20.12.2023', price: 4756, status: 'pre-order' },
    { id: 'FWB125467980', date: '11.12.2023', price: 499, status: 'transit' },
    // Add more orders...
  ];

  const filteredOrders = orders.filter(order => 
    (orderType === 'all' || order.status === orderType)
  );

  return (
    <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div className="mx-auto max-w-5xl">
          <div className="gap-4 sm:flex sm:items-center sm:justify-between">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
              My orders
            </h2>

            <div className="mt-6 gap-4 space-y-4 sm:mt-0 sm:flex sm:items-center sm:justify-end sm:space-y-0">
              <select 
                value={orderType} 
                onChange={(e) => setOrderType(e.target.value as OrderStatus | 'all')}
                className="block w-full min-w-[8rem] rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
              >
                <option value="all">All orders</option>
                <option value="pre-order">Pre-order</option>
                <option value="transit">In transit</option>
                <option value="confirmed">Confirmed</option>
                <option value="cancelled">Cancelled</option>
              </select>

              <span className="inline-block text-gray-500 dark:text-gray-400">from</span>

              <select 
                value={duration} 
                onChange={(e) => setDuration(e.target.value)}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
              >
                <option value="this week">this week</option>
                <option value="this month">this month</option>
                <option value="last 3 months">the last 3 months</option>
                <option value="last 6 months">the last 6 months</option>
                <option value="this year">this year</option>
              </select>
            </div>
          </div>

          <div className="mt-6 flow-root sm:mt-8">
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredOrders.map((order) => (
                <div key={order.id} className="flex flex-wrap items-center gap-y-4 py-6">
                  <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                    <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Order ID:</dt>
                    <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                      <a href="#" className="hover:underline">#{order.id}</a>
                    </dd>
                  </dl>

                  <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                    <dt className="text-base font-medium text-gray-500 dark: text-gray-400">Date:</dt>
                    <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">{order.date}</dd>
                  </dl>

                  <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                    <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Price:</dt>
                    <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">${order.price.toLocaleString()}</dd>
                  </dl>

                  <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                    <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Status:</dt>
                    <dd className={`me-2 mt-1.5 inline-flex items-center rounded px-2.5 py-0.5 text-xs font-medium ${statusConfig[order.status].color}`}>
                      {statusConfig[order.status].icon}
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </dd>
                  </dl>

                  <div className="w-full grid sm:grid-cols-2 lg:flex lg:w-64 lg:items-center lg:justify-end gap-4">
                    <button type="button" className="w-full rounded-lg border border-red-700 px-3 py-2 text-center text-sm font-medium text-red-700 hover:bg-red-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-300 dark:border-red-500 dark:text-red-500 dark:hover:bg-red-600 dark:hover:text-white dark:focus:ring-red-900 lg:w-auto">Cancel order</button>
                    <a href="#" className="w-full inline-flex justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 lg:w-auto">View details</a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <nav className="mt-6 flex items-center justify-center sm:mt-8" aria-label="Page navigation example">
            <ul className="flex h-8 items-center -space-x-px text-sm">
              <li>
                <a href="#" className="ms-0 flex h-8 items-center justify-center rounded-s-lg border border-e-0 border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                  <span className="sr-only">Previous</span>
                  <svg className="h-4 w-4 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m15 19-7-7 7-7" />
                  </svg>
                </a>
              </li>
              <li>
                <a href="#" className="flex h-8 items-center justify-center border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
              </li>
              <li>
                <a href="#" className="flex h-8 items-center justify-center border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
              </li>
              <li>
                <a href="#" aria-current="page" className="z-10 flex h-8 items-center justify-center border border-primary-300 bg-primary-50 px-3 leading-tight text-primary-600 hover:bg-primary-100 hover:text-primary-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
              </li>
              <li>
                <a href="#" className ="flex h-8 items-center justify-center border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">...</a>
              </li>
              <li>
                <a href="#" className="flex h-8 items-center justify-center border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">100</a>
              </li>
              <li>
                <a href="#" className="flex h-8 items-center justify-center rounded-e-lg border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                  <span className="sr-only">Next</span>
                  <svg className="h-4 w-4 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m9 5 7 7-7 7" />
                  </svg>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
};

export default MyOrders; 
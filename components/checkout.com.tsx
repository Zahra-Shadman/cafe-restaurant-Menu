import { FaRegCircleCheck } from "react-icons/fa6";

export default function CheckProsess() {
  return (
    <ol className="items-center flex w-full max-w-2xl text-center text-sm font-medium text-gray-500 dark:text-gray-400 sm:text-base">
      <li className="after:border-1 flex items-center text-primary-700 after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-gray-200 dark:text-primary-500 dark:after:border-gray-700 sm:after:inline-block sm:after:content-[''] md:w-full xl:after:mx-10">
        <span className="flex items-center gap-2 text-green-500 font-semibold">
          <FaRegCircleCheck className="text-green-500 " />
          Cart
        </span>
      </li>

      <li className="after:border-1 flex items-center text-primary-700 after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-gray-200 dark:text-primary-500 dark:after:border-gray-700 sm:after:inline-block sm:after:content-[''] md:w-full xl:after:mx-10">
        <span className="flex items-center gap-2 text-blue-500">
          <FaRegCircleCheck className="text-blue-500" />
          Checkout
        </span>
      </li>

      <li className="flex items-center gap-2">
        <FaRegCircleCheck className="mt-1" />
        payment
      </li>
    </ol>
  );
}

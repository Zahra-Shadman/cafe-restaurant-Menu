interface DeleteModalValidationProps {
    onClose: () => void;
    onConfirm: () => void;
  }
  
  export const DeleteModalValidation: React.FC<DeleteModalValidationProps> = ({
    onClose,
    onConfirm,
  }) => {
    return (
      <div>
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button
                type="button"
                className="absolute top-3 right-3 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={onClose}
              >
                {/* Close button SVG or icon can go here */}
                <span className="sr-only">Close modal</span>
              </button>
              <div className="p-4 md:p-5 text-center">
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
           آیا از حذف کردن این محصول مطمئن هستید؟
                </h3>
                <button
                  onClick={onConfirm}
                  className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                >
              بله مطمئن هستم
                </button>
                <button
                  onClick={onClose}
                  className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
              خیر لغو شود
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
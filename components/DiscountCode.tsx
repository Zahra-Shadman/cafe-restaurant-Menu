import { DiscountCodeSuccessful } from "@/lib/toast/toasts";
import React, { useState } from "react";

interface DiscountCodeProps {
  total: number;
  setTotal: (newTotal: number) => void;
}

const DiscountCode: React.FC<DiscountCodeProps> = ({ total, setTotal }) => {
  const [discountCode, setDiscountCode] = useState<string>("");
  const [error, setError] = useState<string>("");

  const discountCodes: { [key: string]: number } = {
    ABCDE: 0.1,
    FGHIJ: 0.1,
    KLMNO: 0.2,
    PQRST: 0.2,
    UVWXY: 0.5,
  };

  const handleApplyDiscount = () => {
    setError("");

    if (discountCodes[discountCode]) {
      const discount = discountCodes[discountCode];
      const discountAmount = total * discount;
      setTotal(total - discountAmount);

      DiscountCodeSuccessful();
    } else {
      setError("کد تخفیف نامعتبر است");
    }

    setDiscountCode("");
  };

  return (
    <div className="mb-6">
      <h2 className="text-lg text-right mt-5 mb-4">کد تخفیف</h2>
      <div className="flex items-center gap-3">
        <button
          onClick={handleApplyDiscount}
          className="ml-2 p-2 bg-green-600 hover:bg-green-800 text-white rounded"
        >
          اعمال
        </button>
        <input
          type="text"
          value={discountCode}
          onChange={(e) => setDiscountCode(e.target.value)}
          placeholder="کد تخفیف را وارد کنید"
          className="w-full text-right p-2 rounded border border-gray-300"
        />
      </div>
      {error && <p className="text-red-500 mt-2 text-right">{error}</p>}
    </div>
  );
};

export default DiscountCode;

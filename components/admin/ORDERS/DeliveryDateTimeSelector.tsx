import React, { useState } from "react";
import axios from "axios";
import { OrderUrl } from "@/api/urls";
import MyDatePicker from "@/components/date-piker";

const DeliveryDateTimePicker: React.FC<{
  orderId: string;
  onUpdate: () => void;
}> = ({ orderId, onUpdate }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>("");

  const handleSubmit = async (date: Date) => {
    if (date) {
      const deliveryDateTime = new Date(date);
      try {
        await axios.patch(`${OrderUrl}/${orderId}`, {
          deliveryDate: deliveryDateTime.toISOString(),
        });
        onUpdate();
      } catch (error) {
        console.error("Error updating delivery date and time:", error);
      }
    }
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    if (date) {
      handleSubmit(date);
    }
  };

  return (
    <div className="flex-1 gap-16 mx-auto">
      <div className="mb-4 text-pink-600">با توجه  به سفارش شما از منوی رستوران ،تحویل تنها در بازه زمانی امروز امکان پذیر است</div>
      <MyDatePicker onChange={handleDateChange} />
      <h3 className="mx-auto py-3 text-pink-700">
        کاربر گرامی ، زمان تحویل سفارش شما پس از پرداخت به شما نمایش داده خواهد
        شد
      </h3>
    </div>
  );
};

export default DeliveryDateTimePicker;
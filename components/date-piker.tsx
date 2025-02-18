import { Calendar } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

interface MyDatePickerProps {
  onChange: (date: Date | null) => void;
}

interface DateObject {
  year: number;
  month: number;
  day: number;
}

export default function MyDatePicker({ onChange }: MyDatePickerProps) {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1); 

  const handleDateChange = (date: DateObject) => {
    const selectedDate = date
      ? new Date(date.year, date.month - 1, date.day)
      : null;
    onChange(selectedDate);
  };

  return (
    <div style={{ direction: "rtl" }}>
      <Calendar
        calendar={persian}
        locale={persian_fa}
        minDate={today}
        maxDate={tomorrow}
    
      />
    </div>
  );
}
interface DateTimeFieldsProps {
  date: string;
  time: string;
  onDateChange: (date: string) => void;
  onTimeChange: (time: string) => void;
}

export default function DateTimeFields({
  date,
  time,
  onDateChange,
  onTimeChange,
}: DateTimeFieldsProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Tanggal <span className="text-red-500">*</span>
        </label>

        <input
          type="date"
          value={date}
          onChange={(event) => onDateChange(event.target.value)}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Waktu Mulai <span className="text-red-500">*</span>
        </label>

        <input
          type="time"
          value={time}
          onChange={(event) => onTimeChange(event.target.value)}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
}
interface DurationSelectorProps {
  durations: number[];
  duration: number | "";
  onDurationChange: (duration: number) => void;
}

export default function DurationSelector({
  durations,
  duration,
  onDurationChange,
}: DurationSelectorProps) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Durasi (menit) <span className="text-red-500">*</span>
      </label>

      <div className="grid grid-cols-3 gap-2">
        {durations.map((item) => {
          const isActive = duration === item;

          return (
            <button
              key={item}
              onClick={() => onDurationChange(item)}
              className={`py-3 rounded-xl border-2 transition-colors ${isActive
                  ? "border-blue-500 bg-blue-50 text-blue-700 font-semibold"
                  : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                }`}
            >
              {item}
            </button>
          );
        })}
      </div>
    </div>
  );
}
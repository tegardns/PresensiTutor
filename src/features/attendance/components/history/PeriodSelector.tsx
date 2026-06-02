import { ChevronLeft, ChevronRight } from "lucide-react";

import { MONTH_NAMES } from "../../constants";

interface PeriodSelectorProps {
  selectedMonth: Date;
  isCurrentMonth: boolean;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
}

export default function PeriodSelector({
  selectedMonth,
  isCurrentMonth,
  onPreviousMonth,
  onNextMonth,
}: PeriodSelectorProps) {
  return (
    <div className="bg-white border-b border-gray-100 px-5 py-3">
      <div className="flex items-center justify-between">
        <button
          onClick={onPreviousMonth}
          className="p-2 hover:bg-gray-50 rounded-lg transition-colors"
        >
          <ChevronLeft className="size-5 text-gray-600" />
        </button>

        <h2 className="font-semibold text-gray-900">
          {MONTH_NAMES[selectedMonth.getMonth()]} {selectedMonth.getFullYear()}
        </h2>

        <button
          onClick={onNextMonth}
          disabled={isCurrentMonth}
          className="p-2 hover:bg-gray-50 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronRight className="size-5 text-gray-600" />
        </button>
      </div>
    </div>
  );
}
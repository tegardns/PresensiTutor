import type { SessionStatusFilter, StatusCounts } from "../../types";

interface StatusFilterTabsProps {
  selectedStatus: SessionStatusFilter;
  statusCounts: StatusCounts;
  onStatusChange: (status: SessionStatusFilter) => void;
}

const statusFilters: Array<{
  value: SessionStatusFilter;
  label: string;
}> = [
  {
    value: "all",
    label: "Semua",
  },
  {
    value: "diselesaikan",
    label: "Diselesaikan",
  },
  {
    value: "disetujui",
    label: "Disetujui",
  },
  {
    value: "tertunda",
    label: "Tertunda",
  },
  {
    value: "ditolak",
    label: "Ditolak",
  },
  {
    value: "selesai",
    label: "Selesai",
  },
];

export default function StatusFilterTabs({
  selectedStatus,
  statusCounts,
  onStatusChange,
}: StatusFilterTabsProps) {
  return (
    <div className="bg-white border-b border-gray-100 px-5 py-2.5 overflow-x-auto scrollbar-none">
      <div className="flex gap-1.5 min-w-max">
        {statusFilters.map((filter) => {
          const isActive = selectedStatus === filter.value;
          const count = statusCounts[filter.value] ?? 0;

          return (
            <button
              key={filter.value}
              onClick={() => onStatusChange(filter.value)}
              className={`px-3 py-1 text-xs font-semibold rounded-full border transition-all duration-150 whitespace-nowrap ${
                isActive
                  ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                  : "bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-800 border-slate-200/50"
              }`}
            >
              {filter.label} ({count})
            </button>
          );
        })}
      </div>
    </div>
  );
}
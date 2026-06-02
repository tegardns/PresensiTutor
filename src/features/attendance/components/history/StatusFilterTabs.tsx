import type { SessionStatusFilter, StatusCounts } from "../../types";

interface StatusFilterTabsProps {
  selectedStatus: SessionStatusFilter;
  statusCounts: StatusCounts;
  onStatusChange: (status: SessionStatusFilter) => void;
}

const statusFilters: Array<{
  value: SessionStatusFilter;
  label: string;
  activeClassName: string;
}> = [
    {
      value: "all",
      label: "Semua",
      activeClassName: "bg-blue-600 text-white",
    },
    {
      value: "diselesaikan",
      label: "Diselesaikan",
      activeClassName: "bg-gray-600 text-white",
    },
    {
      value: "disetujui",
      label: "Disetujui",
      activeClassName: "bg-green-600 text-white",
    },
    {
      value: "tertunda",
      label: "Tertunda",
      activeClassName: "bg-yellow-600 text-white",
    },
    {
      value: "selesai",
      label: "Selesai",
      activeClassName: "bg-blue-600 text-white",
    },
  ];

export default function StatusFilterTabs({
  selectedStatus,
  statusCounts,
  onStatusChange,
}: StatusFilterTabsProps) {
  return (
    <div className="bg-white border-b border-gray-100 px-5 py-3 overflow-x-auto">
      <div className="flex gap-2 min-w-max">
        {statusFilters.map((filter) => {
          const isActive = selectedStatus === filter.value;

          return (
            <button
              key={filter.value}
              onClick={() => onStatusChange(filter.value)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${isActive
                  ? filter.activeClassName
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
            >
              {filter.label} ({statusCounts[filter.value]})
            </button>
          );
        })}
      </div>
    </div>
  );
}
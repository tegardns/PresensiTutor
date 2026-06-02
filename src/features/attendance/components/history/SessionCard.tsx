import type { Session } from "../../types";
import {
  formatCurrency,
  formatDate,
  getStatusColor,
  getStatusLabel,
} from "../../utils";

interface SessionCardProps {
  session: Session;
  onViewDetail: (session: Session) => void;
}

export default function SessionCard({
  session,
  onViewDetail,
}: SessionCardProps) {
  const isFinished = session.status === "selesai";

  return (
    <div
      onClick={() => onViewDetail(session)}
      className={`bg-white rounded-xl p-3 sm:p-4 border border-gray-100 shadow-sm cursor-pointer hover:border-blue-200 transition-colors ${
        isFinished ? "opacity-50" : ""
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="text-left min-w-0 flex-1 pr-2">
          <p className="text-sm font-bold text-gray-900 truncate">{session.student}</p>
          <p className="text-xs text-gray-500 mt-0.5 truncate">{session.subject} &bull; {session.duration} menit</p>
          <p className="text-[10px] text-gray-400 font-mono mt-1">{session.sessionId} &bull; {formatDate(session.date)}</p>
        </div>
        
        <div className="text-right flex-shrink-0 flex flex-col items-end">
          <p className="text-sm font-bold text-gray-900 mb-1.5">{formatCurrency(session.amount)}</p>
          <span
            className={`px-2 py-0.5 rounded text-[10px] font-medium ${getStatusColor(
              session.status
            )}`}
          >
            {getStatusLabel(session.status)}
          </span>
        </div>
      </div>
    </div>
  );
}
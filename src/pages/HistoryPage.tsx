import { useState } from "react";

import HistoryHeader from "@/features/attendance/components/history/HistoryHeader";
import PeriodSelector from "@/features/attendance/components/history/PeriodSelector";
import SessionDetailModal from "@/features/attendance/components/history/SessionDetailModal";
import SessionList from "@/features/attendance/components/history/SessionList";
import StatusFilterTabs from "@/features/attendance/components/history/StatusFilterTabs";
import { MOCK_SESSIONS } from "@/features/attendance/constants";
import type {
  Session,
  SessionStatusFilter,
} from "@/features/attendance/types";
import {
  filterSessionsByStatus,
  getNextMonth,
  getPreviousMonth,
  getStatusCounts,
  isCurrentMonth,
  sortSessions,
} from "@/features/attendance/utils";

export default function HistoryPage() {
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [selectedStatus, setSelectedStatus] =
    useState<SessionStatusFilter>("all");
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);

  const sortedSessions = sortSessions(MOCK_SESSIONS);
  const filteredSessions = filterSessionsByStatus(
    sortedSessions,
    selectedStatus
  );
  const statusCounts = getStatusCounts(MOCK_SESSIONS);

  function handlePreviousMonth() {
    setSelectedMonth((currentMonth) => getPreviousMonth(currentMonth));
  }

  function handleNextMonth() {
    setSelectedMonth((currentMonth) => {
      const nextMonth = getNextMonth(currentMonth);
      const today = new Date();

      if (nextMonth <= today) {
        return nextMonth;
      }

      return currentMonth;
    });
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <HistoryHeader />

      <PeriodSelector
        selectedMonth={selectedMonth}
        isCurrentMonth={isCurrentMonth(selectedMonth)}
        onPreviousMonth={handlePreviousMonth}
        onNextMonth={handleNextMonth}
      />

      <StatusFilterTabs
        selectedStatus={selectedStatus}
        statusCounts={statusCounts}
        onStatusChange={setSelectedStatus}
      />

      <SessionList
        sessions={filteredSessions}
        onViewDetail={setSelectedSession}
      />

      {selectedSession && (
        <SessionDetailModal
          session={selectedSession}
          onClose={() => setSelectedSession(null)}
        />
      )}
    </div>
  );
}
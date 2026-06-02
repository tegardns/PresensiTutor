import { useState, useEffect } from "react";

import HistoryHeader from "@/features/attendance/components/history/HistoryHeader";
import PeriodSelector from "@/features/attendance/components/history/PeriodSelector";
import SessionDetailModal from "@/features/attendance/components/history/SessionDetailModal";
import SessionList from "@/features/attendance/components/history/SessionList";
import StatusFilterTabs from "@/features/attendance/components/history/StatusFilterTabs";
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
import api from "@/shared/lib/api";

interface HistoryPageProps {
  tutorProfile?: any;
}

export default function HistoryPage({ tutorProfile }: HistoryPageProps) {
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [selectedStatus, setSelectedStatus] =
    useState<SessionStatusFilter>("all");
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);

  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSessions = async () => {
    try {
      setLoading(true);
      const response = await api.get("/tutor/sessions");
      setSessions(response.data);
    } catch (error) {
      console.error("Gagal mengambil riwayat sesi:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  const isBankComplete = !!(
    tutorProfile?.noRek?.trim() &&
    tutorProfile?.namaBank?.trim() &&
    tutorProfile?.noRek !== "-" &&
    tutorProfile?.namaBank !== "-"
  );

  // Map session statuses dynamically based on whether bank details are filled
  const mappedSessions = sessions.map((s) => {
    if (!isBankComplete) {
      // If bank account is missing, all unpaid sessions count as "tertunda"
      if (s.status === "tertunda" || s.status === "disetujui" || s.status === "diselesaikan") {
        return { ...s, status: "tertunda" as const };
      }
    } else {
      // If bank account is complete, unapproved sessions count as "diselesaikan"
      if (s.status === "tertunda") {
        return { ...s, status: "diselesaikan" as const };
      }
    }
    return s;
  });

  // Filter sessions by selectedMonth
  const monthFilteredSessions = mappedSessions.filter((s) => {
    const sDate = new Date(s.date);
    return (
      sDate.getMonth() === selectedMonth.getMonth() &&
      sDate.getFullYear() === selectedMonth.getFullYear()
    );
  });

  const sortedSessions = sortSessions(monthFilteredSessions);
  const filteredSessions = filterSessionsByStatus(
    sortedSessions,
    selectedStatus
  );
  const statusCounts = getStatusCounts(monthFilteredSessions);

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

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center pb-24">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-xs text-slate-500 font-semibold">Memuat riwayat sesi...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-24 animate-in fade-in duration-300">
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
          onSessionUpdated={() => {
            fetchSessions();
            setSelectedSession(null);
          }}
        />
      )}
    </div>
  );
}
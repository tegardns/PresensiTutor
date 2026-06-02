import { useState, useEffect } from "react";

import DashboardHeader from "@/features/dashboard/components/DashboardHeader";
import EarningsSummary from "@/features/dashboard/components/EarningsSummary";
import PeriodSelector from "@/features/dashboard/components/PeriodSelector";
import PayoutTransactionList from "@/features/dashboard/components/PayoutTransactionList";
import StatsGrid from "@/features/dashboard/components/StatsGrid";
import { useCurrentDateTime } from "@/features/dashboard/hooks/useCurrentDateTime";
import type { HomePageProps, DashboardSession, PayoutTransaction } from "@/features/dashboard/types";
import {
  getDashboardSummary,
  getNextMonth,
  getPreviousMonth,
  isCurrentMonth,
} from "@/features/dashboard/utils";
import api from "@/shared/lib/api";

export default function HomePage({
  tutorName,
  tutorPhoto,
  tutorProfile,
  onNavigateToSettings,
  onLogout,
}: HomePageProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  
  const [sessions, setSessions] = useState<DashboardSession[]>([]);
  const [payouts, setPayouts] = useState<PayoutTransaction[]>([]);
  const [settings, setSettings] = useState<{ logoUrl?: string; namaBimbel?: string } | null>(null);
  const [loading, setLoading] = useState(true);

  const currentDateTime = useCurrentDateTime();

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [sessionsRes, payoutsRes, settingsRes] = await Promise.all([
        api.get("/tutor/sessions"),
        api.get("/tutor/payouts"),
        api.get("/tutor/settings").catch(() => ({ data: null })), // Catch errors if settings route is missing
      ]);
      setSessions(sessionsRes.data);
      setPayouts(payoutsRes.data);
      if (settingsRes.data) {
        setSettings(settingsRes.data);
      }
    } catch (error) {
      console.error("Gagal memuat data dashboard tutor:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const isBankComplete = !!(
    tutorProfile?.noRek?.trim() &&
    tutorProfile?.namaBank?.trim() &&
    tutorProfile?.noRek !== "-" &&
    tutorProfile?.namaBank !== "-"
  );

  // Filter sessions based on selectedMonth
  const filteredSessions = sessions.filter((s) => {
    const sDate = new Date(s.date);
    return (
      sDate.getMonth() === selectedMonth.getMonth() &&
      sDate.getFullYear() === selectedMonth.getFullYear()
    );
  });

  const summary = getDashboardSummary(filteredSessions, isBankComplete);

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
          <p className="text-xs text-slate-500 font-semibold">Memuat data dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-24 animate-in fade-in duration-300">
      <DashboardHeader
        tutorName={tutorName}
        tutorPhoto={tutorPhoto}
        tutorProfile={tutorProfile}
        currentDateTime={currentDateTime}
        showDropdown={showDropdown}
        onToggleDropdown={() => setShowDropdown((isOpen) => !isOpen)}
        onCloseDropdown={() => setShowDropdown(false)}
        onNavigateToSettings={onNavigateToSettings}
        onLogout={onLogout}
        logoUrl={settings?.logoUrl}
        namaBimbel={settings?.namaBimbel}
      />

      <PeriodSelector
        selectedMonth={selectedMonth}
        isCurrentMonth={isCurrentMonth(selectedMonth)}
        onPreviousMonth={handlePreviousMonth}
        onNextMonth={handleNextMonth}
      />

      <StatsGrid
        totalSessions={summary.totalSessions}
        totalHours={summary.totalHours}
      />

      <EarningsSummary
        settledAmount={summary.settledAmount}
        pendingAmount={summary.pendingAmount}
        approvedAmount={summary.approvedAmount}
      />

      <PayoutTransactionList transactions={payouts} />
    </div>
  );
}
import { useState } from "react";

import DashboardHeader from "@/features/dashboard/components/DashboardHeader";
import EarningsSummary from "@/features/dashboard/components/EarningsSummary";
import PeriodSelector from "@/features/dashboard/components/PeriodSelector";
import PayoutTransactionList from "@/features/dashboard/components/PayoutTransactionList";
import StatsGrid from "@/features/dashboard/components/StatsGrid";
import {
  MOCK_DASHBOARD_SESSIONS,
  MOCK_PAYOUT_TRANSACTIONS,
} from "@/features/dashboard/constants";
import { useCurrentDateTime } from "@/features/dashboard/hooks/useCurrentDateTime";
import type { HomePageProps } from "@/features/dashboard/types";
import {
  getDashboardSummary,
  getNextMonth,
  getPreviousMonth,
  isCurrentMonth,
} from "@/features/dashboard/utils";

export default function HomePage({
  tutorName,
  tutorPhoto,
  onNavigateToSettings,
  onLogout,
}: HomePageProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(new Date());

  const currentDateTime = useCurrentDateTime();
  const summary = getDashboardSummary(MOCK_DASHBOARD_SESSIONS);

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
      <DashboardHeader
        tutorName={tutorName}
        tutorPhoto={tutorPhoto}
        currentDateTime={currentDateTime}
        showDropdown={showDropdown}
        onToggleDropdown={() => setShowDropdown((isOpen) => !isOpen)}
        onCloseDropdown={() => setShowDropdown(false)}
        onNavigateToSettings={onNavigateToSettings}
        onLogout={onLogout}
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

      <PayoutTransactionList transactions={MOCK_PAYOUT_TRANSACTIONS} />
    </div>
  );
}
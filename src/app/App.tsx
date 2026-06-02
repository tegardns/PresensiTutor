import { useState } from "react";

import BottomNavigation from "@/app/components/BottomNavigation";
import SuccessToast from "@/app/components/SuccessToast";
import type { Page } from "@/app/types";
import type { AttendanceData } from "@/features/attendance/types";
import AddAttendancePage from "@/pages/AddAttendancePage";
import HistoryPage from "@/pages/HistoryPage";
import HomePage from "@/pages/HomePage";
import SettingsPage from "@/pages/SettingsPage";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const showBottomNav = currentPage === "home" || currentPage === "history";

  function handleSubmitAttendance(data: AttendanceData) {
    console.log("Submitting attendance:", data);

    setShowSuccessToast(true);
    setCurrentPage("home");

    window.setTimeout(() => {
      setShowSuccessToast(false);
    }, 3000);
  }

  function handleLogout() {
    const isConfirmed = window.confirm("Apakah Anda yakin ingin keluar?");

    if (isConfirmed) {
      window.alert("Logout berhasil");
    }
  }

  return (
    <div className="size-full bg-gray-50 max-w-md mx-auto relative">
      {currentPage === "home" && (
        <HomePage
          tutorName="Mellysa"
          onNavigateToSettings={() => setCurrentPage("settings")}
          onLogout={handleLogout}
        />
      )}

      {currentPage === "history" && <HistoryPage />}

      {currentPage === "add-attendance" && (
        <AddAttendancePage
          onBack={() => setCurrentPage("home")}
          onSubmit={handleSubmitAttendance}
        />
      )}

      {currentPage === "settings" && (
        <SettingsPage onBack={() => setCurrentPage("home")} />
      )}

      {showBottomNav && (
        <BottomNavigation
          currentPage={currentPage}
          onNavigate={setCurrentPage}
        />
      )}

      {showSuccessToast && (
        <SuccessToast message="Presensi berhasil disimpan" />
      )}
    </div>
  );
}
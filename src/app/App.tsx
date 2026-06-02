import { useState, useEffect } from "react";
import { Plus } from "lucide-react";

import BottomNavigation from "@/app/components/BottomNavigation";
import SuccessToast from "@/app/components/SuccessToast";
import type { Page } from "@/app/types";
import AddAttendancePage from "@/pages/AddAttendancePage";
import HistoryPage from "@/pages/HistoryPage";
import HomePage from "@/pages/HomePage";
import SettingsPage from "@/pages/SettingsPage";
import LoginPage from "@/pages/LoginPage";
import AISakaPage from "@/pages/AISakaPage";
import api from "@/shared/lib/api";
import { useAlertConfirm } from "@/shared/contexts/AlertConfirmContext";

export default function App() {
  const { showConfirm } = useAlertConfirm();
  const [currentPage, setCurrentPage] = useState<Page>("login");
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [tutorProfile, setTutorProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Fetch tutor profile if authenticated
  const fetchProfile = async () => {
    try {
      const response = await api.get("/tutor/profile");
      setTutorProfile(response.data);
      setIsAuthenticated(true);
      setCurrentPage("home");
    } catch (err) {
      console.error("Gagal mengambil profil:", err);
      handleLogout(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchProfile();
    } else {
      setIsAuthenticated(false);
      setCurrentPage("login");
      setLoading(false);
    }
  }, []);

  const handleLogin = async (username: string, password: string) => {
    try {
      setLoginError("");
      const response = await api.post("/auth/login", {
        email: username,
        password,
      });

      const { token } = response.data;
      const role = response.data.role || response.data.user?.role;

      if (role !== "tutor") {
        setLoginError("Akses ditolak. Aplikasi ini khusus untuk tutor.");
        return;
      }

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      
      // Fetch profile details
      const profileResponse = await api.get("/tutor/profile");
      setTutorProfile(profileResponse.data);
      setIsAuthenticated(true);
      setCurrentPage("home");
    } catch (error: any) {
      console.error("Login error:", error);
      setLoginError(error.response?.data?.message || "Email atau password salah");
    }
  };

  const handleLogout = async (confirm = true) => {
    if (confirm) {
      const isConfirmed = await showConfirm("Apakah Anda yakin ingin keluar?");
      if (!isConfirmed) return;
    }
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setTutorProfile(null);
    setIsAuthenticated(false);
    setCurrentPage("login");
  };

  const handleSubmitAttendanceSuccess = () => {
    setShowSuccessToast(true);
    setCurrentPage("home");

    window.setTimeout(() => {
      setShowSuccessToast(false);
    }, 3000);
  };

  const showBottomNav = isAuthenticated && (currentPage === "home" || currentPage === "history" || currentPage === "settings" || currentPage === "ai-saka");

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-50 max-w-md mx-auto">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-500 font-semibold text-sm">Menghubungkan ke server...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="size-full bg-slate-50 max-w-md mx-auto relative min-h-screen shadow-md border-x border-slate-100">
      {!isAuthenticated && (
        <LoginPage onLogin={handleLogin} error={loginError} />
      )}

      {isAuthenticated && currentPage === "home" && (
        <HomePage
          tutorName={tutorProfile?.nama || tutorProfile?.email || "Tutor"}
          tutorPhoto={tutorProfile?.fotoUrl}
          tutorProfile={tutorProfile}
          onNavigateToSettings={() => setCurrentPage("settings")}
          onLogout={() => handleLogout(true)}
        />
      )}

      {isAuthenticated && currentPage === "history" && (
        <HistoryPage tutorProfile={tutorProfile} />
      )}

      {isAuthenticated && currentPage === "add-attendance" && (
        <AddAttendancePage
          onBack={() => setCurrentPage("home")}
          onSubmitSuccess={handleSubmitAttendanceSuccess}
        />
      )}

      {isAuthenticated && currentPage === "settings" && (
        <SettingsPage 
          onBack={() => setCurrentPage("home")} 
          tutorProfile={tutorProfile}
          onProfileUpdate={setTutorProfile}
        />
      )}

      {isAuthenticated && currentPage === "ai-saka" && (
        <AISakaPage />
      )}

      {showBottomNav && (currentPage === "home" || currentPage === "history") && (
        <button
          onClick={() => setCurrentPage("add-attendance")}
          className="fixed bottom-20 right-5 z-40 size-14 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full shadow-lg hover:from-blue-700 hover:to-indigo-700 hover:scale-105 active:scale-95 transition-all flex items-center justify-center"
          title="Tambah Presensi"
        >
          <Plus className="size-6 stroke-[2.5]" />
        </button>
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
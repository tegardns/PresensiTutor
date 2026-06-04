import { useState, useEffect } from "react";

import DashboardHeader from "@/features/dashboard/components/DashboardHeader";
import EarningsSummary from "@/features/dashboard/components/EarningsSummary";
import PeriodSelector from "@/features/dashboard/components/PeriodSelector";
import PayoutTransactionList from "@/features/dashboard/components/PayoutTransactionList";
import StatsGrid from "@/features/dashboard/components/StatsGrid";
import PwaInstallBanner from "@/features/dashboard/components/PwaInstallBanner";
import { useCurrentDateTime } from "@/features/dashboard/hooks/useCurrentDateTime";
import type { HomePageProps, DashboardSession, PayoutTransaction } from "@/features/dashboard/types";
import {
  getDashboardSummary,
  getNextMonth,
  getPreviousMonth,
  isCurrentMonth,
} from "@/features/dashboard/utils";
import api from "@/shared/lib/api";
import { Bell } from "lucide-react";

export default function HomePage({
  tutorName,
  tutorPhoto,
  tutorProfile,
  onNavigateToSettings,
  onLogout,
  onNavigateToNotifications,
}: HomePageProps & { onNavigateToNotifications: () => void }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  
  const [sessions, setSessions] = useState<DashboardSession[]>([]);
  const [payouts, setPayouts] = useState<PayoutTransaction[]>([]);
  
  const [notifStatus, setNotifStatus] = useState<string>(() => localStorage.getItem("notif_simulated_status") || "inactive");
  const [registeringNotif, setRegisteringNotif] = useState(false);
  const [unreadCount, setUnreadCount] = useState<number>(0);

  const fetchUnreadCount = async () => {
    try {
      const res = await api.get("/notifications/tutor");
      const list = res.data || [];
      const saved = localStorage.getItem("tutor_read_notification_ids");
      const readIds = saved ? JSON.parse(saved) : [];
      const unread = list.filter((n: any) => !readIds.includes(n.id)).length;
      setUnreadCount(unread);
    } catch (err) {
      console.error("Gagal mengambil unread count:", err);
    }
  };

  // Helper to convert base64 VAPID public key to Uint8Array for PushManager subscription
  const urlBase64ToUint8Array = (base64String: string) => {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  };

  const enableNotifications = async (silent = false) => {
    if (!tutorProfile || !tutorProfile.id) return;
    try {
      // 1. Request native permission from device
      if ("Notification" in window) {
        const permission = await Notification.requestPermission();
        if (permission !== "granted") {
          if (!silent) alert("Izin notifikasi ditolak!");
          return;
        }
      } else {
        if (!silent) alert("Browser ini tidak mendukung push notifikasi.");
        return;
      }

      // 2. Register Web Push subscription via Service Worker
      if (!("serviceWorker" in navigator)) {
        if (!silent) alert("Service Worker PWA tidak aktif!");
        return;
      }

      const registration = await navigator.serviceWorker.ready;
      
      // VAPID Public Key generated from web-push
      const publicVapidKey = "BAJTmXrKXv-zzNrxCzby4nhQfbsAI-eYRfhfhqQVVvQzMy6IRSqTrRC3XXA5U7p5kyMYtIsm4TCUNDGDNLThE_8";
      const convertedVapidKey = urlBase64ToUint8Array(publicVapidKey);

      // Get or create push subscription
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: convertedVapidKey,
      });

      // 3. Register the VAPID subscription object to backend database
      await api.post("/notifications/register-token", {
        token: JSON.stringify(subscription),
        platform: "web",
        tutorId: tutorProfile.id
      });

      localStorage.setItem("notif_simulated_status", "active");
      setNotifStatus("active");

      if (!silent) {
        alert("Notifikasi berhasil diaktifkan!");
      }
    } catch (error) {
      console.error("Gagal mengaktifkan Web Push:", error);
      if (!silent) {
        alert("Gagal mengaktifkan notifikasi. Silakan coba lagi.");
      }
    }
  };

  const handleToggleNotifications = async () => {
    if (notifStatus === "active") {
      localStorage.setItem("notif_simulated_status", "inactive");
      setNotifStatus("inactive");
    } else {
      setRegisteringNotif(true);
      await enableNotifications(false);
      setRegisteringNotif(false);
    }
  };

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
    fetchUnreadCount();

    if (!tutorProfile || !tutorProfile.id) return;

    // Auto-prompt permission under user-gesture fallback
    if ("Notification" in window) {
      if (Notification.permission === "default") {
        const handleUserGesture = async () => {
          await enableNotifications(true);
        };
        
        // Listen to first tap anywhere on the screen as a user gesture (bypasses browser automatic prompt blocking)
        window.addEventListener("click", handleUserGesture, { once: true });
        window.addEventListener("touchstart", handleUserGesture, { once: true });

        return () => {
          window.removeEventListener("click", handleUserGesture);
          window.removeEventListener("touchstart", handleUserGesture);
        };
      } else if (Notification.permission === "granted") {
        if (localStorage.getItem("notif_simulated_status") !== "active") {
          enableNotifications(true); // Re-register subscription token silently
        }
      } else {
        // Denied, update status
        localStorage.setItem("notif_simulated_status", "inactive");
        setNotifStatus("inactive");
      }
    } else {
      // Fallback for browsers with no Notification support
      localStorage.setItem("notif_simulated_status", "active");
      setNotifStatus("active");
    }
  }, [tutorProfile]);

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
        notificationsEnabled={notifStatus === "active"}
        onToggleNotifications={handleToggleNotifications}
        onNavigateToNotifications={onNavigateToNotifications}
        unreadCount={unreadCount}
      />

      <PwaInstallBanner />

      <PeriodSelector
        selectedMonth={selectedMonth}
        isCurrentMonth={isCurrentMonth(selectedMonth)}
        onPreviousMonth={handlePreviousMonth}
        onNextMonth={handleNextMonth}
      />

      {/* PWA Notification Banner Removed As Per Request */}

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
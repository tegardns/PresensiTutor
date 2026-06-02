import { DAY_NAMES } from "./constants";
import type {
  DashboardSession,
  DashboardSummary,
  PayoutTransactionStatus,
} from "./types";

export function getDashboardSummary(
  sessions: DashboardSession[],
  isBankComplete: boolean
): DashboardSummary {
  const totalSessions = sessions.length;
  const totalHours =
    sessions.reduce((sum, session) => sum + session.duration, 0) / 60;

  let settledAmount = 0;
  let pendingAmount = 0;
  let approvedAmount = 0;

  sessions.forEach((session) => {
    if (!isBankComplete) {
      if (session.status === "tertunda" || session.status === "disetujui" || session.status === "diselesaikan") {
        pendingAmount += session.amount;
      }
    } else {
      if (session.status === "tertunda" || session.status === "diselesaikan") {
        settledAmount += session.amount;
      } else if (session.status === "disetujui") {
        approvedAmount += session.amount;
      }
    }
  });

  return {
    totalSessions,
    totalHours,
    settledAmount,
    pendingAmount,
    approvedAmount,
  };
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateStr: string) {
  const date = new Date(dateStr);

  return date.toLocaleDateString("id-ID", {
    timeZone: "Asia/Jakarta",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function formatCurrentDate(dateTime: Date) {
  const day = DAY_NAMES[dateTime.getDay()];
  const date = dateTime.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return `${day}, ${date}`;
}

export function getTransactionStatusColor(status: PayoutTransactionStatus) {
  switch (status) {
    case "diproses":
      return "bg-blue-500/10 text-blue-600";
    case "sudah-payout":
      return "bg-green-500/10 text-green-600";
    default:
      return "bg-gray-500/10 text-gray-600";
  }
}

export function getTransactionStatusLabel(status: PayoutTransactionStatus) {
  switch (status) {
    case "diproses":
      return "Diproses";
    case "sudah-payout":
      return "Sudah Payout";
    default:
      return status;
  }
}

export function isCurrentMonth(date: Date) {
  const today = new Date();

  return (
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

export function getPreviousMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth() - 1);
}

export function getNextMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth() + 1);
}
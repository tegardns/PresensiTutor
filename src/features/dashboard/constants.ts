import type { DashboardSession, PayoutTransaction } from "./types";

export const MONTH_NAMES = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

export const DAY_NAMES = [
  "Minggu",
  "Senin",
  "Selasa",
  "Rabu",
  "Kamis",
  "Jumat",
  "Sabtu",
];

export const MOCK_DASHBOARD_SESSIONS: DashboardSession[] = [
  {
    id: "1",
    date: "2026-04-18",
    sessionId: "SES-20260418-001",
    amount: 48000,
    status: "disetujui",
    student: "Ahmad",
    subject: "Matematika",
    duration: 90,
  },
  {
    id: "2",
    date: "2026-04-17",
    sessionId: "SES-20260417-002",
    amount: 64000,
    status: "disetujui",
    student: "Budi",
    subject: "Fisika",
    duration: 120,
  },
  {
    id: "3",
    date: "2026-04-16",
    sessionId: "SES-20260416-003",
    amount: 48000,
    status: "tertunda",
    student: "Citra",
    subject: "Matematika",
    duration: 90,
  },
  {
    id: "4",
    date: "2026-04-15",
    sessionId: "SES-20260415-004",
    amount: 32000,
    status: "diselesaikan",
    student: "Dedi",
    subject: "Fisika",
    duration: 60,
  },
];

export const MOCK_PAYOUT_TRANSACTIONS: PayoutTransaction[] = [
  {
    id: "1",
    transactionId: "TRX-20260420-W3",
    date: "2026-04-20",
    amount: 384000,
    status: "diproses",
  },
  {
    id: "2",
    transactionId: "TRX-20260413-W2",
    date: "2026-04-13",
    amount: 256000,
    status: "sudah-payout",
  },
  {
    id: "3",
    transactionId: "TRX-20260406-W1",
    date: "2026-04-06",
    amount: 512000,
    status: "sudah-payout",
  },
  {
    id: "4",
    transactionId: "TRX-20260330-W4",
    date: "2026-03-30",
    amount: 448000,
    status: "sudah-payout",
  },
];
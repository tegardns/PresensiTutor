export interface HomePageProps {
  tutorName: string;
  tutorPhoto?: string;
  onNavigateToSettings: () => void;
  onLogout: () => void;
}

export type DashboardSessionStatus =
  | "diselesaikan"
  | "tertunda"
  | "disetujui"
  | "selesai";

export interface DashboardSession {
  id: string;
  date: string;
  sessionId: string;
  amount: number;
  status: DashboardSessionStatus;
  student: string;
  subject: string;
  duration: number;
  notes?: string;
  photoUrl?: string;
}

export type PayoutTransactionStatus = "diproses" | "sudah-payout";

export interface PayoutTransaction {
  id: string;
  transactionId: string;
  date: string;
  amount: number;
  status: PayoutTransactionStatus;
}

export interface DashboardSummary {
  totalSessions: number;
  totalHours: number;
  settledAmount: number;
  pendingAmount: number;
  approvedAmount: number;
}
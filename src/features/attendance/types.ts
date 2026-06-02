export interface AddAttendancePageProps {
  onBack: () => void;
  onSubmitSuccess: () => void;
}

export interface AttendanceData {
  sessionId: string;
  student: string;
  date: string;
  time: string;
  subject: string;
  duration: number;
  photo: File | null;
  notes: string;
}

export interface Student {
  id: string;
  name: string;
  subjects: string[];
  level?: {
    name: string;
  };
}

export type SessionStatus =
  | "diselesaikan"
  | "tertunda"
  | "disetujui"
  | "selesai";

export interface Session {
  id: string;
  date: string;
  sessionId: string;
  amount: number;
  status: SessionStatus;
  student: string;
  subject: string;
  duration: number;
  notes?: string;
  photoUrl?: string;
}

export type SessionStatusFilter = SessionStatus | "all";

export type StatusCounts = Record<SessionStatusFilter, number>;
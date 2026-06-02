import type { Session, Student } from "./types";

export const MOCK_STUDENTS: Student[] = [
  {
    id: "1",
    name: "Ahmad Rizki",
    subjects: ["Matematika", "Fisika"],
  },
  {
    id: "2",
    name: "Budi Santoso",
    subjects: ["Matematika"],
  },
  {
    id: "3",
    name: "Citra Dewi",
    subjects: ["Fisika", "Kimia"],
  },
  {
    id: "4",
    name: "Dedi Prasetyo",
    subjects: ["Matematika", "Fisika"],
  },
];

export const ATTENDANCE_DURATIONS = [60, 90, 120, 150, 180];

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

export const MOCK_SESSIONS: Session[] = [
  {
    id: "1",
    date: "2026-04-18",
    sessionId: "SES-20260418-001",
    amount: 48000,
    status: "diselesaikan",
    student: "Ahmad Rizki",
    subject: "Matematika",
    duration: 90,
    notes: "Membahas integral dan diferensial",
  },
  {
    id: "2",
    date: "2026-04-17",
    sessionId: "SES-20260417-002",
    amount: 64000,
    status: "diselesaikan",
    student: "Budi Santoso",
    subject: "Fisika",
    duration: 120,
    notes: "Latihan soal gerak parabola",
  },
  {
    id: "4",
    date: "2026-04-15",
    sessionId: "SES-20260415-004",
    amount: 32000,
    status: "disetujui",
    student: "Dedi Prasetyo",
    subject: "Fisika",
    duration: 60,
  },
  {
    id: "5",
    date: "2026-04-14",
    sessionId: "SES-20260414-005",
    amount: 48000,
    status: "disetujui",
    student: "Ahmad Rizki",
    subject: "Fisika",
    duration: 90,
  },
  {
    id: "7",
    date: "2026-04-12",
    sessionId: "SES-20260412-007",
    amount: 48000,
    status: "selesai",
    student: "Citra Dewi",
    subject: "Kimia",
    duration: 90,
  },
  {
    id: "8",
    date: "2026-04-11",
    sessionId: "SES-20260411-008",
    amount: 32000,
    status: "selesai",
    student: "Dedi Prasetyo",
    subject: "Matematika",
    duration: 60,
  },
];
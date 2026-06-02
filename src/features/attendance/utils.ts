import type {
  Session,
  SessionStatus,
  SessionStatusFilter,
  StatusCounts,
  Student,
} from "./types";

export function generateSessionId() {
  const date = new Date().toISOString().split("T")[0].replace(/-/g, "");
  const randomCode = Math.random().toString(36).slice(2, 5).toUpperCase();

  return `SES-${date}-${randomCode}`;
}

export function getTodayDateInputValue() {
  return new Date().toISOString().split("T")[0];
}

export function getCurrentTimeInputValue() {
  return new Date().toTimeString().slice(0, 5);
}

export function filterStudentsByName(students: Student[], keyword: string) {
  return students.filter((student) =>
    student.name.toLowerCase().includes(keyword.toLowerCase())
  );
}

export function getSubjectsByStudentName(
  students: Student[],
  studentName: string
) {
  const selectedStudent = students.find(
    (student) => student.name === studentName
  );

  return selectedStudent?.subjects ?? [];
}

interface AttendanceFormValidationParams {
  student: string;
  date: string;
  time: string;
  subject: string;
  duration: number | "";
  photo: File | null;
}

export function isAttendanceFormValid({
  student,
  date,
  time,
  subject,
  duration,
  photo,
}: AttendanceFormValidationParams) {
  return Boolean(
    student &&
      date &&
      time &&
      subject &&
      typeof duration === "number" &&
      photo
  );
}

export function getStatusPriority(status: SessionStatus) {
  switch (status) {
    case "diselesaikan":
      return 1;
    case "disetujui":
      return 2;
    case "selesai":
      return 3;
    case "tertunda":
      return 4;
    default:
      return 5;
  }
}

export function sortSessions(sessions: Session[]) {
  return [...sessions].sort((a, b) => {
    const priorityDiff =
      getStatusPriority(a.status) - getStatusPriority(b.status);

    if (priorityDiff !== 0) {
      return priorityDiff;
    }

    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

export function filterSessionsByStatus(
  sessions: Session[],
  selectedStatus: SessionStatusFilter
) {
  if (selectedStatus === "all") {
    return sessions;
  }

  return sessions.filter((session) => session.status === selectedStatus);
}

export function getStatusCounts(sessions: Session[]): StatusCounts {
  return {
    all: sessions.length,
    diselesaikan: sessions.filter(
      (session) => session.status === "diselesaikan"
    ).length,
    disetujui: sessions.filter((session) => session.status === "disetujui")
      .length,
    tertunda: sessions.filter((session) => session.status === "tertunda")
      .length,
    selesai: sessions.filter((session) => session.status === "selesai").length,
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
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function getStatusColor(status: SessionStatus) {
  switch (status) {
    case "disetujui":
      return "bg-green-500/10 text-green-600";
    case "selesai":
      return "bg-blue-500/10 text-blue-600";
    case "tertunda":
      return "bg-yellow-500/10 text-yellow-600";
    case "diselesaikan":
      return "bg-gray-500/10 text-gray-600";
    default:
      return "bg-gray-500/10 text-gray-600";
  }
}

export function getStatusLabel(status: SessionStatus) {
  switch (status) {
    case "disetujui":
      return "Disetujui";
    case "tertunda":
      return "Tertunda";
    case "diselesaikan":
      return "Diselesaikan";
    case "selesai":
      return "Selesai";
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
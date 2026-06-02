import { useEffect, useState } from "react";

import AddAttendanceHeader from "@/features/attendance/components/add-attendance/AddAttendanceHeader";
import DateTimeFields from "@/features/attendance/components/add-attendance/DateTimeFields";
import DurationSelector from "@/features/attendance/components/add-attendance/DurationSelector";
import NotesField from "@/features/attendance/components/add-attendance/NotesField";
import PhotoUploadField from "@/features/attendance/components/add-attendance/PhotoUploadField";
import SessionIdField from "@/features/attendance/components/add-attendance/SessionIdField";
import StudentCombobox from "@/features/attendance/components/add-attendance/StudentCombobox";
import SubjectSelect from "@/features/attendance/components/add-attendance/SubjectSelect";
import SubmitAttendanceButton from "@/features/attendance/components/add-attendance/SubmitAttendanceButton";
import type { AddAttendancePageProps, Student } from "@/features/attendance/types";
import {
  generateSessionId,
  getCurrentTimeInputValue,
  getSubjectsByStudentName,
  getTodayDateInputValue,
  isAttendanceFormValid,
} from "@/features/attendance/utils";
import api from "@/shared/lib/api";
import { useAlertConfirm } from "@/shared/contexts/AlertConfirmContext";

export default function AddAttendancePage({
  onBack,
  onSubmitSuccess,
}: AddAttendancePageProps) {
  const { showAlert } = useAlertConfirm();
  const [sessionId] = useState(generateSessionId);
  const [student, setStudent] = useState("");
  const [searchStudent, setSearchStudent] = useState("");
  const [showStudentDropdown, setShowStudentDropdown] = useState(false);

  const [date, setDate] = useState(getTodayDateInputValue);
  const [time, setTime] = useState(getCurrentTimeInputValue);
  const [subject, setSubject] = useState("");
  const [duration, setDuration] = useState<number | "">("");

  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [notes, setNotes] = useState("");

  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        const res = await api.get("/tutor/students");
        setStudents(res.data);
      } catch (err) {
        console.error("Gagal mengambil data siswa:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  const availableSubjects = getSubjectsByStudentName(students, student);
  const selectedStudentObj = students.find((s) => s.name === student);
  
  let activeDurations = [90, 120];
  if (selectedStudentObj?.level?.name?.toLowerCase().includes("calistung")) {
    activeDurations = [75];
  }

  const isFormValid = isAttendanceFormValid({
    student,
    date,
    time,
    subject,
    duration,
    photo,
  });

  function handlePhotoSelect(file: File) {
    setPhoto(file);

    const reader = new FileReader();

    reader.onloadend = () => {
      setPhotoPreview(reader.result as string);
    };

    reader.readAsDataURL(file);
  }

  function handleRemovePhoto() {
    setPhoto(null);
    setPhotoPreview(null);
  }

  async function handleSubmit() {
    if (!isFormValid || typeof duration !== "number" || submitting) return;

    const selectedStudentObj = students.find((s) => s.name === student);
    if (!selectedStudentObj) {
      showAlert("Siswa yang dipilih tidak valid.", "error");
      return;
    }

    try {
      setSubmitting(true);
      const formData = new FormData();
      formData.append("studentId", selectedStudentObj.id);
      formData.append("subjectName", subject);
      formData.append("durationMin", String(duration));
      formData.append("notes", notes);
      formData.append("date", date);
      formData.append("time", time);
      if (photo) {
        formData.append("photo", photo);
      }

      await api.post("/tutor/attendances", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      onSubmitSuccess();
    } catch (err: any) {
      console.error("Gagal menyimpan presensi:", err);
      showAlert(err.response?.data?.message || "Gagal menyimpan data presensi ke server.", "error");
    } finally {
      setSubmitting(false);
    }
  }

  useEffect(() => {
    const subjects = getSubjectsByStudentName(students, student);

    if (student && subject && !subjects.includes(subject)) {
      setSubject("");
    }
  }, [student, subject, students]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-xs text-slate-500 font-semibold">Memuat data form...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 animate-in fade-in duration-300">
      <AddAttendanceHeader onBack={onBack} />

      <div className="px-5 py-6 space-y-5 pb-24">
        <SessionIdField sessionId={sessionId} />

        <StudentCombobox
          students={students}
          student={student}
          searchStudent={searchStudent}
          showDropdown={showStudentDropdown}
          onStudentChange={setStudent}
          onSearchStudentChange={setSearchStudent}
          onShowDropdownChange={setShowStudentDropdown}
        />

        <DateTimeFields
          date={date}
          time={time}
          onDateChange={setDate}
          onTimeChange={setTime}
        />

        <SubjectSelect
          student={student}
          subject={subject}
          availableSubjects={availableSubjects}
          onSubjectChange={setSubject}
        />

        <DurationSelector
          durations={activeDurations}
          duration={duration}
          onDurationChange={setDuration}
        />

        <PhotoUploadField
          photoPreview={photoPreview}
          onPhotoSelect={handlePhotoSelect}
          onRemovePhoto={handleRemovePhoto}
        />

        <NotesField notes={notes} onNotesChange={setNotes} />

        <SubmitAttendanceButton
          isFormValid={isFormValid}
          onSubmit={handleSubmit}
          submitting={submitting}
        />
      </div>
    </div>
  );
}
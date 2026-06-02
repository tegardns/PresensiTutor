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
import {
  ATTENDANCE_DURATIONS,
  MOCK_STUDENTS,
} from "@/features/attendance/constants";
import type { AddAttendancePageProps } from "@/features/attendance/types";
import {
  generateSessionId,
  getCurrentTimeInputValue,
  getSubjectsByStudentName,
  getTodayDateInputValue,
  isAttendanceFormValid,
} from "@/features/attendance/utils";

export default function AddAttendancePage({
  onBack,
  onSubmit,
}: AddAttendancePageProps) {
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

  const availableSubjects = getSubjectsByStudentName(MOCK_STUDENTS, student);

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

  function handleSubmit() {
    if (!isFormValid || typeof duration !== "number") return;

    onSubmit({
      sessionId,
      student,
      date,
      time,
      subject,
      duration,
      photo,
      notes,
    });
  }

  useEffect(() => {
    const subjects = getSubjectsByStudentName(MOCK_STUDENTS, student);

    if (student && subject && !subjects.includes(subject)) {
      setSubject("");
    }
  }, [student, subject]);

  return (
    <div className="min-h-screen bg-gray-50">
      <AddAttendanceHeader onBack={onBack} />

      <div className="px-5 py-6 space-y-5 pb-24">
        <SessionIdField sessionId={sessionId} />

        <StudentCombobox
          students={MOCK_STUDENTS}
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
          durations={ATTENDANCE_DURATIONS}
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
        />
      </div>
    </div>
  );
}
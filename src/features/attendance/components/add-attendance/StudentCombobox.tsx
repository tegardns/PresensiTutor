import type { Student } from "../../types";
import { filterStudentsByName } from "../../utils";

interface StudentComboboxProps {
  students: Student[];
  student: string;
  searchStudent: string;
  showDropdown: boolean;
  onStudentChange: (student: string) => void;
  onSearchStudentChange: (keyword: string) => void;
  onShowDropdownChange: (isVisible: boolean) => void;
}

export default function StudentCombobox({
  students,
  student,
  searchStudent,
  showDropdown,
  onStudentChange,
  onSearchStudentChange,
  onShowDropdownChange,
}: StudentComboboxProps) {
  const filteredStudents = filterStudentsByName(students, searchStudent);

  function handleSearchChange(value: string) {
    onSearchStudentChange(value);
    onStudentChange("");
    onShowDropdownChange(true);
  }

  function handleSelectStudent(studentName: string) {
    onStudentChange(studentName);
    onSearchStudentChange("");
    onShowDropdownChange(false);
  }

  return (
    <div className="relative">
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Pilih Siswa <span className="text-red-500">*</span>
      </label>

      <div className="relative">
        <input
          type="text"
          value={student || searchStudent}
          onChange={(event) => handleSearchChange(event.target.value)}
          onFocus={() => onShowDropdownChange(true)}
          placeholder="Cari siswa..."
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {showDropdown && filteredStudents.length > 0 && (
          <div className="absolute top-full mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-sm max-h-48 overflow-y-auto z-20">
            {filteredStudents.map((item) => (
              <button
                key={item.id}
                onClick={() => handleSelectStudent(item.name)}
                className="w-full px-4 py-3 text-left hover:bg-gray-50 text-sm"
              >
                {item.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
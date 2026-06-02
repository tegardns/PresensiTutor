interface SubjectSelectProps {
  student: string;
  subject: string;
  availableSubjects: string[];
  onSubjectChange: (subject: string) => void;
}

export default function SubjectSelect({
  student,
  subject,
  availableSubjects,
  onSubjectChange,
}: SubjectSelectProps) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Mata Pelajaran <span className="text-red-500">*</span>
      </label>

      <select
        value={subject}
        onChange={(event) => onSubjectChange(event.target.value)}
        disabled={!student}
        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-400"
      >
        <option value="">Pilih mata pelajaran</option>

        {availableSubjects.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>

      {!student && (
        <p className="text-xs text-gray-500 mt-1">
          Pilih siswa terlebih dahulu
        </p>
      )}
    </div>
  );
}
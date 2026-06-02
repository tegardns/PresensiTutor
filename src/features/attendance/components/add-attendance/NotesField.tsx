interface NotesFieldProps {
  notes: string;
  onNotesChange: (notes: string) => void;
}

export default function NotesField({
  notes,
  onNotesChange,
}: NotesFieldProps) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Catatan/Materi <span className="text-gray-400">(Opsional)</span>
      </label>

      <textarea
        value={notes}
        onChange={(event) => onNotesChange(event.target.value)}
        placeholder="Tulis catatan atau materi yang diajarkan..."
        rows={4}
        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
      />
    </div>
  );
}
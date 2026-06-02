interface SessionIdFieldProps {
  sessionId: string;
}

export default function SessionIdField({ sessionId }: SessionIdFieldProps) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        ID Sesi
      </label>

      <div className="bg-gray-50 rounded-xl px-4 py-3 font-mono text-sm text-gray-900 border border-gray-200">
        {sessionId}
      </div>
    </div>
  );
}
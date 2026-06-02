import { Filter } from "lucide-react";

export default function EmptySessionState() {
  return (
    <div className="text-center py-12">
      <Filter className="size-12 mx-auto text-gray-300 mb-3" />
      <p className="text-sm text-gray-500">
        Tidak ada sesi dengan status ini
      </p>
    </div>
  );
}
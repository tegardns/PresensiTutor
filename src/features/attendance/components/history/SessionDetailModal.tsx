import { useState } from "react";
import type { Session } from "../../types";
import {
  formatCurrency,
  formatDate,
  formatTime,
  getStatusColor,
  getStatusLabel,
} from "../../utils";
import api from "../../../../shared/lib/api";
import { Edit2, Loader2, Save, X, Trash2 } from "lucide-react";
import { useAlertConfirm } from "../../../../shared/contexts/AlertConfirmContext";

interface SessionDetailModalProps {
  session: Session;
  onClose: () => void;
  onSessionUpdated?: () => void;
}

export default function SessionDetailModal({
  session,
  onClose,
  onSessionUpdated,
}: SessionDetailModalProps) {
  const { showAlert, showConfirm } = useAlertConfirm();
  const [isEditing, setIsEditing] = useState(false);
  const [duration, setDuration] = useState(session.duration.toString());
  const [notes, setNotes] = useState(session.notes || "");
  const [submitting, setSubmitting] = useState(false);

  const canEdit = session.status === "tertunda" || session.status === "diselesaikan" || session.status === "disetujui";

  const handleSave = async () => {
    try {
      setSubmitting(true);
      const formData = new FormData();
      formData.append("durationMin", duration);
      formData.append("notes", notes);
      // Photo update skipped for simplicity, can be added later

      await api.put(`/tutor/attendances/${session.id}`, formData);
      if (onSessionUpdated) {
        onSessionUpdated();
      }
      setIsEditing(false);
    } catch (error: any) {
      console.error("Gagal update sesi:", error);
      showAlert(error.response?.data?.message || "Gagal menyimpan perubahan.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    const isConfirmed = await showConfirm("Apakah Anda yakin ingin menghapus sesi ini? Sesi yang dihapus tidak dapat dikembalikan.");
    if (!isConfirmed) return;
    try {
      setSubmitting(true);
      await api.delete(`/tutor/attendances/${session.id}`);
      if (onSessionUpdated) onSessionUpdated();
      onClose();
    } catch (error: any) {
      console.error("Gagal hapus sesi:", error);
      showAlert(error.response?.data?.message || "Gagal menghapus sesi.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-t-3xl sm:rounded-3xl w-full sm:max-w-md p-6 max-h-[80vh] overflow-y-auto"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-5">
          <h3 className="font-bold text-gray-900">
            {isEditing ? "Edit Sesi" : "Detail Sesi"}
          </h3>

          <div className="flex items-center gap-2">
            {!isEditing && canEdit && (
              <>
                <button
                  onClick={handleDelete}
                  className="text-red-600 hover:bg-red-50 p-1.5 rounded-lg transition-colors flex items-center gap-1 text-sm font-semibold"
                  disabled={submitting}
                >
                  <Trash2 className="w-4 h-4" /> Hapus
                </button>
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-blue-600 hover:bg-blue-50 p-1.5 rounded-lg transition-colors flex items-center gap-1 text-sm font-semibold"
                  disabled={submitting}
                >
                  <Edit2 className="w-4 h-4" /> Edit
                </button>
              </>
            )}
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 p-1.5 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {isEditing ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1">Tanggal</label>
                <input 
                  type="date"
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  value={session.date.split("T")[0]}
                  readOnly
                  title="Tanggal tidak bisa diedit langsung, hapus sesi untuk merubah jadwal"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1">Durasi (Menit)</label>
                <input 
                  type="number"
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1">Catatan</label>
              <textarea 
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none min-h-[100px]"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setIsEditing(false)}
                className="flex-1 py-2.5 px-4 bg-gray-100 text-gray-700 rounded-xl font-semibold text-sm hover:bg-gray-200 transition-colors"
                disabled={submitting}
              >
                Batal
              </button>
              <button
                onClick={handleSave}
                className="flex-1 py-2.5 px-4 bg-blue-600 text-white rounded-xl font-semibold text-sm hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Memproses...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Simpan
                  </>
                )}
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <p className="text-xs text-gray-500 mb-1">ID Sesi</p>
              <p className="text-sm font-mono text-gray-900">
                {session.sessionId}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">Tanggal</p>
                <p className="text-sm text-gray-900">{formatDate(session.date)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Jam</p>
                <p className="text-sm text-gray-900">{formatTime(session.date)}</p>
              </div>
            </div>

            <div>
              <p className="text-xs text-gray-500 mb-1">Siswa</p>
              <p className="text-sm font-medium text-gray-900">
                {session.student}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500 mb-1">Mata Pelajaran</p>
              <p className="text-sm font-medium text-gray-900">
                {session.subject}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500 mb-1">Durasi</p>
              <p className="text-sm font-medium text-gray-900">
                {session.duration} menit
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500 mb-1">Nominal</p>
              <p className="font-bold text-gray-900">
                {formatCurrency(session.amount)}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500 mb-1">Status Payout</p>
              <span
                className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                  session.status
                )}`}
              >
                {getStatusLabel(session.status)}
              </span>
            </div>

            {session.notes && (
              <div>
                <p className="text-xs text-gray-500 mb-1">Catatan</p>
                <p className="text-sm text-gray-900">{session.notes}</p>
              </div>
            )}

            {session.photoUrl && (
              <div>
                <p className="text-xs text-gray-500 mb-2">Foto Sesi</p>
                <img 
                  src={session.photoUrl} 
                  alt="Foto Sesi" 
                  className="w-full h-auto rounded-xl border border-gray-200 object-cover max-h-48"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
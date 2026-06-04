import { useState, useEffect } from "react";
import { ChevronLeft, Bell, Clock, MailOpen, Mail, X, CheckSquare } from "lucide-react";
import api from "@/shared/lib/api";

interface NotificationItem {
  id: string;
  title: string;
  body: string;
  target: string;
  tutorId: string | null;
  status: string;
  createdAt: string;
}

interface NotifikasiTutorPageProps {
  onBack: () => void;
  onNotificationsUpdated?: () => void;
}

export default function NotifikasiTutorPage({ onBack, onNotificationsUpdated }: NotifikasiTutorPageProps) {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [readIds, setReadIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("tutor_read_notification_ids");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  
  const [selectedNotif, setSelectedNotif] = useState<NotificationItem | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const res = await api.get("/notifications/tutor");
      setNotifications(res.data || []);
    } catch (err) {
      console.error("Gagal memuat notifikasi:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const saveReadIds = (newIds: string[]) => {
    setReadIds(newIds);
    localStorage.setItem("tutor_read_notification_ids", JSON.stringify(newIds));
    if (onNotificationsUpdated) {
      onNotificationsUpdated();
    }
  };

  const handleMarkAsRead = (id: string) => {
    if (!readIds.includes(id)) {
      const updated = [...readIds, id];
      saveReadIds(updated);
    }
  };

  const handleOpenDetail = (notif: NotificationItem) => {
    setSelectedNotif(notif);
    handleMarkAsRead(notif.id);
  };

  const handleMarkAllRead = () => {
    const allIds = notifications.map((n) => n.id);
    const updated = Array.from(new Set([...readIds, ...allIds]));
    saveReadIds(updated);
  };

  const isRead = (id: string) => readIds.includes(id);
  const unreadCount = notifications.filter((n) => !isRead(n.id)).length;

  return (
    <div className="min-h-screen bg-slate-50 pb-24 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-40 px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-xl transition-colors active:scale-95"
          >
            <ChevronLeft className="size-6" />
          </button>
          <div>
            <h1 className="text-lg font-bold text-slate-800 tracking-tight">Pemberitahuan</h1>
            <p className="text-[10px] text-slate-400 font-medium">Info penting dari Bimbel</p>
          </div>
        </div>

        {notifications.length > 0 && unreadCount > 0 && (
          <button
            onClick={handleMarkAllRead}
            className="text-[11px] font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors px-2 py-1.5 rounded-lg hover:bg-blue-50"
          >
            <CheckSquare className="size-3.5" />
            Semua Dibaca
          </button>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-5 space-y-4">
        {loading ? (
          <div className="py-20 text-center">
            <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
            <p className="text-xs text-slate-400 font-medium">Memuat notifikasi...</p>
          </div>
        ) : notifications.length === 0 ? (
          <div className="py-16 text-center space-y-4">
            <div className="size-16 bg-white rounded-3xl shadow-sm border border-slate-100 flex items-center justify-center mx-auto text-slate-300">
              <Bell className="size-8 stroke-[1.5]" />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-slate-700 text-sm">Tidak ada notifikasi</h3>
              <p className="text-[11px] text-slate-400 max-w-[200px] mx-auto leading-normal">
                Saat ini Anda belum menerima pengumuman atau notifikasi apa pun.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {notifications.map((notif) => {
              const read = isRead(notif.id);
              return (
                <div
                  key={notif.id}
                  onClick={() => handleOpenDetail(notif)}
                  className={`bg-white rounded-2xl p-4 border transition-all duration-200 cursor-pointer shadow-sm relative flex gap-3.5 items-start ${
                    read 
                      ? "border-slate-100/60 opacity-70 hover:opacity-100" 
                      : "border-blue-100/80 bg-blue-50/10 hover:bg-blue-50/20"
                  }`}
                >
                  {/* Unread indicator dot */}
                  {!read && (
                    <span className="absolute top-4 right-4 size-2 bg-blue-600 rounded-full animate-pulse" />
                  )}

                  {/* Mail icon */}
                  <div className={`size-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    read ? "bg-slate-100 text-slate-400" : "bg-blue-100 text-blue-600"
                  }`}>
                    {read ? <MailOpen className="size-4.5" /> : <Mail className="size-4.5" />}
                  </div>

                  {/* Title & Body */}
                  <div className="flex-1 min-w-0 pr-4">
                    <h4 className={`text-sm font-bold truncate ${read ? "text-slate-700" : "text-slate-900"}`}>
                      {notif.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5 leading-relaxed">
                      {notif.body}
                    </p>
                    <div className="flex items-center gap-1.5 text-[9px] text-slate-400 mt-2 font-medium">
                      <Clock className="size-3" />
                      <span>
                        {new Date(notif.createdAt).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                          hour: "2-digit",
                          minute: "2-digit"
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Detail Popup Modal (Simple, Minimalist) */}
      {selectedNotif && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-6 animate-in fade-in duration-200">
          <div 
            className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-xl border border-slate-100/50 flex flex-col relative animate-in zoom-in-95 slide-in-from-bottom-4 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedNotif(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full transition-colors active:scale-90"
            >
              <X className="size-4.5 stroke-[2]" />
            </button>

            {/* Modal Icon */}
            <div className="size-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-4 flex-shrink-0">
              <Bell className="size-5.5 stroke-[2]" />
            </div>

            {/* Content */}
            <div className="space-y-3">
              <div className="space-y-1">
                <span className="text-[9px] font-bold text-blue-600 uppercase tracking-wider">Pesan Baru</span>
                <h3 className="font-bold text-slate-900 text-base leading-tight pr-8">
                  {selectedNotif.title}
                </h3>
              </div>
              
              <div className="flex items-center gap-1 text-[10px] text-slate-400 font-medium pb-2 border-b border-slate-100">
                <Clock className="size-3" />
                <span>
                  {new Date(selectedNotif.createdAt).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit"
                  })} WIB
                </span>
              </div>

              <p className="text-slate-600 text-xs leading-relaxed py-1.5 whitespace-pre-line break-words break-all">
                {selectedNotif.body}
              </p>
            </div>

            {/* Bottom Button */}
            <button
              onClick={() => setSelectedNotif(null)}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold py-3 px-5 rounded-2xl mt-5 transition-colors active:scale-98 shadow-sm"
            >
              Tutup Pesan
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

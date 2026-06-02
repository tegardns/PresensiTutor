import { useState } from "react";
import type { PayoutTransaction } from "../types";
import {
  formatCurrency,
  formatDate,
  getTransactionStatusColor,
  getTransactionStatusLabel,
} from "../utils";
import {
  FileText,
  X,
  ChevronRight,
  Calendar,
  Clock,
  BookOpen,
  Info,
  CheckCircle,
  Clock3
} from "lucide-react";
import api from "../../../shared/lib/api";

interface PayoutTransactionCardProps {
  transaction: PayoutTransaction;
}

export default function PayoutTransactionCard({
  transaction,
}: PayoutTransactionCardProps) {
  const [showDetail, setShowDetail] = useState(false);
  const sessions = transaction.sessions || [];

  const borderCol = transaction.status === "sudah-payout"
    ? "border-l-green-500 hover:border-l-green-600"
    : "border-l-blue-500 hover:border-l-blue-600";

  return (
    <>
      <div
        onClick={() => setShowDetail(true)}
        className={`group bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-sm hover:shadow-md cursor-pointer transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 border-l-4 ${borderCol}`}
      >
        <div className="flex justify-between items-start gap-2 mb-2 sm:mb-3">
          <div className="flex-1 min-w-0">
            <p className="text-xs text-gray-500">ID Transaksi</p>
            <p className="text-sm font-mono text-gray-900 mt-0.5 truncate">
              {transaction.transactionId}
            </p>
          </div>

          <span
            className={`px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-semibold whitespace-nowrap flex-shrink-0 ${getTransactionStatusColor(
              transaction.status
            )}`}
          >
            {getTransactionStatusLabel(transaction.status)}
          </span>
        </div>

        <div className="flex justify-between items-end gap-2 pt-3 border-t border-gray-100 mt-2">
          <div className="min-w-0">
            <p className="text-xs text-gray-500">Periode</p>
            <p className="text-xs sm:text-sm text-gray-900 mt-0.5 font-semibold truncate">
              {transaction.periodeStart && transaction.periodeEnd ? (
                `${formatDate(transaction.periodeStart)} - ${formatDate(transaction.periodeEnd)}`
              ) : (
                formatDate(transaction.date)
              )}
            </p>
          </div>

          <div className="flex items-center gap-1 sm:gap-1.5 text-right flex-shrink-0">
            <div>
              <p className="text-[10px] sm:text-xs text-gray-500">Jumlah Payout</p>
              <p className="text-sm sm:text-base font-bold text-gray-900 mt-0.5">
                {formatCurrency(transaction.amount)}
              </p>
            </div>
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-gray-700 group-hover:translate-x-0.5 transition-all mt-4 sm:mt-5" />
          </div>
        </div>
      </div>

      {showDetail && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 transition-all duration-300"
          onClick={() => setShowDetail(false)}
        >
          <div
            className="bg-white rounded-t-[2rem] sm:rounded-3xl w-full sm:max-w-xl max-h-[90vh] sm:max-h-[85vh] flex flex-col shadow-2xl transform translate-y-0 transition-transform duration-300 border border-gray-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header (Fixed) */}
            <div className="flex justify-between items-center px-5 sm:px-6 pt-6 pb-4 border-b border-gray-100">
              <div className="min-w-0 flex-1 pr-4">
                <h3 className="font-extrabold text-lg sm:text-xl text-gray-900 truncate">Detail Payout</h3>
                <p className="text-xs text-gray-500 mt-1 font-mono truncate">
                  {transaction.transactionId}
                </p>
              </div>
              <button
                onClick={() => setShowDetail(false)}
                className="p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors flex-shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content Container */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5 sm:space-y-6">
              {/* Main card summary */}
              <div className="bg-gradient-to-br from-indigo-50/70 via-blue-50/50 to-sky-50/30 border border-blue-100/50 rounded-2xl p-4 sm:p-5 shadow-sm">
                <div className="flex justify-between items-center mb-3 sm:mb-4">
                  <span className="text-xs sm:text-sm font-semibold text-gray-600">Total Nominal</span>
                  <span
                    className={`px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-semibold uppercase tracking-wider ${getTransactionStatusColor(
                      transaction.status
                    )}`}
                  >
                    {getTransactionStatusLabel(transaction.status)}
                  </span>
                </div>
                <p className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
                  {formatCurrency(transaction.amount)}
                </p>

                {/* Periode & metadata grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-4 sm:mt-5 pt-4 border-t border-gray-200/50 text-xs">
                  <div>
                    <p className="text-gray-500 font-medium text-left">Periode Payout</p>
                    <p className="text-gray-800 font-bold mt-1.5 flex items-start gap-1.5 text-left">
                      <Calendar className="w-4 h-4 text-blue-500 flex-shrink-0" />
                      <span className="leading-tight">
                        {transaction.periodeStart && transaction.periodeEnd ? (
                          `${formatDate(transaction.periodeStart)} - ${formatDate(transaction.periodeEnd)}`
                        ) : (
                          formatDate(transaction.date)
                        )}
                      </span>
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 font-medium text-left">Tanggal Transfer</p>
                    <p className="text-gray-800 font-bold mt-1.5 flex items-center gap-1.5 text-left">
                      {transaction.status === "sudah-payout" ? (
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      ) : (
                        <Clock3 className="w-4 h-4 text-amber-500 flex-shrink-0" />
                      )}
                      {formatDate(transaction.tanggalTransfer || transaction.date)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Sessions list */}
              <div>
                <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2 text-sm sm:text-base">
                  <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0" />
                  Rincian Sesi ({sessions.length} Sesi)
                </h4>

                {sessions.length === 0 ? (
                  <div className="text-center py-6 text-gray-400 bg-gray-50 rounded-xl border border-dashed border-gray-200 text-sm">
                    Tidak ada rincian sesi.
                  </div>
                ) : (
                  <div className="space-y-2.5 sm:space-y-3">
                    {sessions.map((session, index) => (
                      <div
                        key={session.id || index}
                        className="flex items-center justify-between p-3 sm:p-3.5 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-gray-50 transition-colors gap-2 sm:gap-3"
                      >
                        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
                          <div className="text-left min-w-0 flex-1">
                            <p className="text-xs sm:text-sm font-semibold text-gray-900 truncate">
                              {session.siswa}
                            </p>
                            <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5 truncate">
                              {session.mapel} &bull; {formatDate(session.tanggal)}
                            </p>
                          </div>
                        </div>

                        <div className="text-right flex-shrink-0 ml-1 sm:ml-2">
                          <p className="text-xs sm:text-sm font-bold text-gray-900">
                            {formatCurrency(session.fee)}
                          </p>
                          <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5">
                            {session.durasi} menit
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Sticky Footer (Fixed) */}
            <div className="p-5 sm:p-6 border-t border-gray-100 bg-white rounded-b-[2rem] sm:rounded-b-3xl pb-8 sm:pb-6 flex flex-col gap-3">
              {transaction.status === "sudah-payout" ? (
                <button
                  onClick={() => {
                    const token = localStorage.getItem("token") || "";
                    const baseUrl = api.defaults.baseURL || "http://localhost:4000/api";
                    const pdfUrl = `${baseUrl}/tutor/payouts/${transaction.id}/pdf?token=${token}`;
                    window.open(pdfUrl, "_blank");
                  }}
                  className="w-full py-3.5 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 active:scale-[0.98] transition-all duration-150 text-sm sm:text-base"
                >
                  <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
                  Cetak Slip Gaji (PDF)
                </button>
              ) : (
                <div className="space-y-3">
                  <button
                    disabled
                    className="w-full py-3.5 px-4 bg-gray-100 text-gray-400 rounded-xl font-bold flex items-center justify-center gap-2 cursor-not-allowed border border-gray-200 text-sm sm:text-base"
                  >
                    <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
                    Slip Gaji Belum Diterbitkan
                  </button>
                  <div className="flex items-start gap-2 p-2.5 sm:p-3 bg-blue-50 text-blue-800 rounded-xl text-[10px] sm:text-xs border border-blue-100/50">
                    <Info className="w-4 h-4 sm:w-4.5 sm:h-4.5 flex-shrink-0 mt-0.5 text-blue-600" />
                    <span className="text-left leading-tight">
                      Pembayaran masih dalam proses. Slip gaji akan otomatis diterbitkan oleh admin setelah transaksi diselesaikan.
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

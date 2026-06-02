import { formatCurrency } from "../utils";

interface EarningsSummaryProps {
  settledAmount: number;
  pendingAmount: number;
  approvedAmount: number;
}

export default function EarningsSummary({
  settledAmount,
  pendingAmount,
  approvedAmount,
}: EarningsSummaryProps) {
  return (
    <div className="px-5 py-2">
      <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
        <h3 className="font-bold text-gray-900 mb-4">Pendapatan</h3>

        <div className="space-y-3">
          <div className="flex justify-between items-center opacity-50">
            <span className="text-sm text-gray-600">Diselesaikan</span>
            <span className="font-semibold text-gray-900">
              {formatCurrency(settledAmount)}
            </span>
          </div>

          <div className="flex justify-between items-center opacity-50">
            <span className="text-sm text-gray-600">Tertunda</span>
            <span className="font-semibold text-gray-900">
              {formatCurrency(pendingAmount)}
            </span>
          </div>

          <div className="flex justify-between items-center pt-3 border-t border-gray-200">
            <span className="text-sm text-gray-600">Disetujui</span>
            <span className="font-bold text-green-600">
              {formatCurrency(approvedAmount)}
            </span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500 leading-relaxed">
            Saldo yang <span className="font-semibold">"Disetujui"</span> akan
            ditransfer per minggu pada hari{" "}
            <span className="font-semibold">Minggu</span>
          </p>
        </div>
      </div>
    </div>
  );
}
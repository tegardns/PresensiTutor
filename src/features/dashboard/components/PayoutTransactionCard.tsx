import type { PayoutTransaction } from "../types";
import {
  formatCurrency,
  formatDate,
  getTransactionStatusColor,
  getTransactionStatusLabel,
} from "../utils";

interface PayoutTransactionCardProps {
  transaction: PayoutTransaction;
}

export default function PayoutTransactionCard({
  transaction,
}: PayoutTransactionCardProps) {
  return (
    <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
      <div className="flex justify-between items-start mb-2">
        <div className="flex-1">
          <p className="text-xs text-gray-500">ID Transaksi</p>
          <p className="text-sm font-mono text-gray-900 mt-0.5">
            {transaction.transactionId}
          </p>
        </div>

        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${getTransactionStatusColor(
            transaction.status
          )}`}
        >
          {getTransactionStatusLabel(transaction.status)}
        </span>
      </div>

      <div className="flex justify-between items-center pt-2 border-t border-gray-100">
        <div>
          <p className="text-xs text-gray-500">Tanggal</p>
          <p className="text-sm text-gray-900 mt-0.5">
            {formatDate(transaction.date)}
          </p>
        </div>

        <div className="text-right">
          <p className="text-xs text-gray-500">Jumlah</p>
          <p className="font-bold text-gray-900 mt-0.5">
            {formatCurrency(transaction.amount)}
          </p>
        </div>
      </div>
    </div>
  );
}
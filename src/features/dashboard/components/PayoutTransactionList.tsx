import type { PayoutTransaction } from "../types";
import PayoutTransactionCard from "./PayoutTransactionCard";

interface PayoutTransactionListProps {
  transactions: PayoutTransaction[];
}

export default function PayoutTransactionList({
  transactions,
}: PayoutTransactionListProps) {
  return (
    <div className="px-5 py-4">
      <h3 className="font-bold text-gray-900 mb-3">Riwayat Transaksi</h3>

      <div className="space-y-3">
        {transactions.map((transaction) => (
          <PayoutTransactionCard
            key={transaction.id}
            transaction={transaction}
          />
        ))}
      </div>
    </div>
  );
}
import { BANK_OPTIONS } from "../constants";
import type { BankAccountCardProps } from "../types";

export default function BankAccountCard({
  bankName,
  accountNumber,
  tempBankName,
  tempAccountNumber,
  isEditing,
  onEdit,
  onCancel,
  onSave,
  onTempBankNameChange,
  onTempAccountNumberChange,
}: BankAccountCardProps) {
  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-gray-900">Rekening Payout</h3>

        {!isEditing ? (
          <button
            onClick={onEdit}
            className="text-sm text-blue-600 hover:text-blue-700"
          >
            Edit Rekening
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={onCancel}
              className="px-3 py-1 text-sm text-gray-600 hover:text-gray-700"
            >
              Batalkan
            </button>

            <button
              onClick={onSave}
              className="px-3 py-1 text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Simpan
            </button>
          </div>
        )}
      </div>

      <p className="text-xs text-gray-500 mb-4">
        Pastikan nomor rekening benar dan aktif. Payout tentor akan dikirimkan
        admin ke rekening tersebut.
      </p>

      <div className="space-y-4">
        <div>
          <label className="block text-xs text-gray-500 mb-2">Bank</label>
          <select
            value={isEditing ? tempBankName : bankName}
            onChange={(event) => onTempBankNameChange(event.target.value)}
            disabled={!isEditing}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm disabled:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {BANK_OPTIONS.map((bank) => (
              <option key={bank} value={bank}>
                {bank}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs text-gray-500 mb-2">
            Nomor Rekening
          </label>
          <input
            type="text"
            value={isEditing ? tempAccountNumber : accountNumber}
            onChange={(event) =>
              onTempAccountNumberChange(event.target.value.replace(/\D/g, ""))
            }
            disabled={!isEditing}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm disabled:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
}
import type { PersonalInfoCardProps } from "../types";

export default function PersonalInfoCard({
  email,
  position,
  fullName,
  whatsapp,
  address,
  tempFullName,
  tempWhatsapp,
  tempAddress,
  isEditing,
  onEdit,
  onCancel,
  onSave,
  onTempFullNameChange,
  onTempWhatsappChange,
  onTempAddressChange,
}: PersonalInfoCardProps) {
  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-gray-900">Informasi</h3>

        {!isEditing ? (
          <button
            onClick={onEdit}
            className="text-sm text-blue-600 hover:text-blue-700"
          >
            Edit Informasi
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

      <div className="space-y-4">
        <div>
          <label className="block text-xs text-gray-500 mb-2">Email</label>
          <input
            type="email"
            value={email}
            disabled
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-400"
          />
        </div>

        <div>
          <label className="block text-xs text-gray-500 mb-2">Posisi</label>
          <input
            type="text"
            value={position}
            disabled
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-400"
          />
        </div>

        <div>
          <label className="block text-xs text-gray-500 mb-2">
            Nama Lengkap
          </label>
          <input
            type="text"
            value={isEditing ? tempFullName : fullName}
            onChange={(event) => onTempFullNameChange(event.target.value)}
            disabled={!isEditing}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm disabled:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-xs text-gray-500 mb-2">
            Nomor WhatsApp
          </label>
          <input
            type="tel"
            value={isEditing ? tempWhatsapp : whatsapp}
            onChange={(event) => onTempWhatsappChange(event.target.value)}
            disabled={!isEditing}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm disabled:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-xs text-gray-500 mb-2">
            Alamat (Opsional)
          </label>
          <textarea
            value={isEditing ? tempAddress : address}
            onChange={(event) => onTempAddressChange(event.target.value)}
            disabled={!isEditing}
            rows={3}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm disabled:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>
      </div>
    </div>
  );
}
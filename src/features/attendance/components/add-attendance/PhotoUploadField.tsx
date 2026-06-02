import { useRef, type ChangeEvent } from "react";
import { Upload, X } from "lucide-react";

interface PhotoUploadFieldProps {
  photoPreview: string | null;
  onPhotoSelect: (file: File) => void;
  onRemovePhoto: () => void;
}

export default function PhotoUploadField({
  photoPreview,
  onPhotoSelect,
  onRemovePhoto,
}: PhotoUploadFieldProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handlePhotoChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) return;

    onPhotoSelect(file);
  }

  function handleRemovePhoto() {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    onRemovePhoto();
  }

  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Upload Foto <span className="text-red-500">*</span>
      </label>

      <p className="text-xs text-gray-500 mb-3">
        Bukti jam dan siswa yang diajar (JPG/JPEG/PNG)
      </p>

      {photoPreview ? (
        <div className="relative">
          <img
            src={photoPreview}
            alt="Preview"
            className="w-full h-48 object-cover rounded-xl border border-gray-200"
          />

          <button
            onClick={handleRemovePhoto}
            className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 shadow-sm"
          >
            <X className="size-4" />
          </button>
        </div>
      ) : (
        <button
          onClick={() => fileInputRef.current?.click()}
          className="w-full py-8 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-500 hover:bg-blue-50/50 transition-colors"
        >
          <Upload className="size-8 mx-auto text-gray-400 mb-2" />
          <p className="text-sm text-gray-600">Klik untuk upload foto</p>
        </button>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png"
        onChange={handlePhotoChange}
        className="hidden"
      />
    </div>
  );
}